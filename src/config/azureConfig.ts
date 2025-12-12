/**
 * Azure AD / Entra ID Configuration
 * 
 * To configure:
 * 1. Go to Azure Portal → App registrations → New registration
 * 2. Set redirect URIs (e.g., http://localhost:5173 for Vite dev server)
 * 3. Under API permissions, add: Sites.ReadWrite.All (delegated)
 * 4. Grant admin consent
 * 5. Copy Client ID and Tenant ID here
 */

// Type-safe access to environment variables
const getEnvVar = (key: string): string => {
  const meta = import.meta as any;
  return meta.env?.[key] || '';
};

export const azureConfig = {
  // Azure AD App Registration Client ID
  clientId: getEnvVar('VITE_AZURE_CLIENT_ID') || '',
  
  // Azure AD Tenant ID (or 'common' for multi-tenant)
  authority: `https://login.microsoftonline.com/${getEnvVar('VITE_AZURE_TENANT_ID') || 'common'}`,
  
  // Redirect URI (must match Azure AD app registration)
  redirectUri: getEnvVar('VITE_AZURE_REDIRECT_URI') || window.location.origin,
  
  // Microsoft Graph API scopes
  scopes: [
    'Sites.ReadWrite.All',
    'User.Read'
  ]
};

/**
 * SharePoint Site Configuration
 * 
 * To get these values:
 * 1. Go to your SharePoint site
 * 2. Site ID: Site Settings → Site Information → Site ID
 * 3. List Name: The name of your SharePoint list (e.g., "InjuryReports")
 */
export const sharePointConfig = {
  // SharePoint site ID (GUID format)
  siteId: getEnvVar('VITE_SHAREPOINT_SITE_ID') || '',
  
  // SharePoint list name (must match exactly)
  listName: getEnvVar('VITE_SHAREPOINT_LIST_NAME') || 'InjuryReports',
  
  // Alternative: Use site hostname and site path
  // Example: { hostname: 'yourtenant.sharepoint.com', sitePath: '/sites/YourSite' }
  siteHostname: getEnvVar('VITE_SHAREPOINT_HOSTNAME') || '',
  sitePath: getEnvVar('VITE_SHAREPOINT_SITE_PATH') || ''
};

