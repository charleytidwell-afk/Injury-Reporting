import { Client } from '@microsoft/microsoft-graph-client';
import { getAccessToken } from './authService';
import { sharePointConfig } from '../config/azureConfig';

/**
 * Get Microsoft Graph client instance
 */
async function getGraphClient(): Promise<Client> {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('Unable to get access token. Please sign in.');
  }

  return Client.init({
    authProvider: (done) => {
      done(null, token);
    },
  });
}

/**
 * Get SharePoint site ID from hostname and path
 */
async function getSiteId(hostname: string, sitePath: string): Promise<string> {
  const client = await getGraphClient();
  const response = await client
    .api(`/sites/${hostname}:${sitePath}`)
    .get();
  return response.id;
}

/**
 * Get SharePoint list ID by name
 */
async function getListId(siteId: string, listName: string): Promise<string> {
  const client = await getGraphClient();
  const response = await client
    .api(`/sites/${siteId}/lists`)
    .filter(`displayName eq '${listName}'`)
    .get();
  
  if (response.value && response.value.length > 0) {
    return response.value[0].id;
  }
  
  throw new Error(`List "${listName}" not found in SharePoint site`);
}

/**
 * Get the SharePoint list ID (cached or fetched)
 */
let cachedListId: string | null = null;
let cachedSiteId: string | null = null;

async function ensureListId(): Promise<{ siteId: string; listId: string }> {
  if (cachedSiteId && cachedListId) {
    return { siteId: cachedSiteId, listId: cachedListId };
  }

  let siteId = sharePointConfig.siteId;
  
  // If site ID not provided, get it from hostname and path
  if (!siteId && sharePointConfig.siteHostname && sharePointConfig.sitePath) {
    siteId = await getSiteId(sharePointConfig.siteHostname, sharePointConfig.sitePath);
    cachedSiteId = siteId;
  } else if (siteId) {
    cachedSiteId = siteId;
  } else {
    throw new Error('SharePoint site ID or hostname/path must be configured');
  }

  const listId = await getListId(siteId, sharePointConfig.listName);
  cachedListId = listId;

  return { siteId, listId };
}

/**
 * SharePoint List Item Field Types
 */
export interface SharePointInjuryReport {
  Title?: string;
  EmployeeName?: string;
  EmployeeID?: string;
  DateOfInjury?: string; // ISO date string
  TimeOfInjury?: string; // ISO date string or time
  Location?: string;
  Description?: string;
  Severity?: string; // Minor / Serious / SIF
  TreatmentType?: string; // First aid only, Sent to clinic, Hospitalized, etc.
  AKOSHReportRequired?: boolean;
  AKOSHReportType?: string; // Fatality / Hospitalization / Amputation / LossOfEye / None
  AKOSHReportDeadline?: string; // ISO date string
  ReportedToSupervisorAt?: string; // ISO date string
  ReportedToCSMAt?: string; // ISO date string
  ReportedToAKOSHAt?: string; // ISO date string
  AKOSHConfirmationNo?: string;
  IsSIF?: boolean;
  InvestigationCompleted?: boolean;
  InvestigationCompletedAt?: string; // ISO date string
  
  // Additional fields from form
  [key: string]: any;
}

/**
 * Create a new injury report in SharePoint
 */
export async function createInjuryReport(data: SharePointInjuryReport): Promise<any> {
  const client = await getGraphClient();
  const { siteId, listId } = await ensureListId();

  // Convert data to SharePoint list item format
  const fields: any = {
    ...data,
  };

  const response = await client
    .api(`/sites/${siteId}/lists/${listId}/items`)
    .post({
      fields: fields,
    });

  return response;
}

/**
 * Update an existing injury report
 */
export async function updateInjuryReport(itemId: string, data: Partial<SharePointInjuryReport>): Promise<any> {
  const client = await getGraphClient();
  const { siteId, listId } = await ensureListId();

  const response = await client
    .api(`/sites/${siteId}/lists/${listId}/items/${itemId}`)
    .patch({
      fields: data,
    });

  return response;
}

/**
 * Get an injury report by ID
 */
export async function getInjuryReport(itemId: string): Promise<any> {
  const client = await getGraphClient();
  const { siteId, listId } = await ensureListId();

  const response = await client
    .api(`/sites/${siteId}/lists/${listId}/items/${itemId}`)
    .expand('fields')
    .get();

  return response;
}

/**
 * Get all injury reports
 */
export async function getAllInjuryReports(): Promise<any[]> {
  const client = await getGraphClient();
  const { siteId, listId } = await ensureListId();

  const response = await client
    .api(`/sites/${siteId}/lists/${listId}/items`)
    .expand('fields')
    .get();

  return response.value || [];
}

/**
 * Delete an injury report
 */
export async function deleteInjuryReport(itemId: string): Promise<void> {
  const client = await getGraphClient();
  const { siteId, listId } = await ensureListId();

  await client
    .api(`/sites/${siteId}/lists/${listId}/items/${itemId}`)
    .delete();
}

