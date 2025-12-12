import { SharePointInjuryReport } from '../services/sharePointService';

/**
 * Form data structure from the app
 */
export interface InjuryReportFormData {
  firstReport: {
    employeeName?: string;
    plant?: string;
    dateOfReport?: string;
    socialSecurityNumber?: string;
    sex?: string;
    dateTimeOfIncident?: string;
    dateOfIncident?: string;
    timeOfIncident?: string;
    addressExcludingCity?: string;
    phoneNumber?: string;
    emailAddress?: string;
    emergencyContactNamePhone?: string;
    bodyPartInjured?: string;
    bodyPartInjuredOther?: string;
    howDidIncidentHappen?: string;
    jobTitle?: string;
    whereWereYou?: string;
    witness1Name?: string;
    witness1Position?: string;
    witness2Name?: string;
    witness2Position?: string;
    witness3Name?: string;
    witness3Position?: string;
    whereWereWitnesses?: string;
    reportedRightAway?: string;
    whyDelayedReport?: string;
    preventionSuggestion?: string;
    osha300CaseNumber?: string;
    osha300Applicable?: string;
    photos?: any[];
  };
  investigation: {
    employee?: string;
    jobTitle?: string;
    employeeIdNumber?: string;
    originalDateOfHire?: string;
    locationOfIncident?: string;
    dateOfIncident?: string;
    shiftEmployeeWorked?: string;
    natureOfInjuryAndBodyParts?: string;
    witness1?: string;
    witness2?: string;
    witness3?: string;
    locationOfWitness?: string;
    incidentDescription?: string;
    accidentScene?: string;
    didBreakSafetyRule?: string;
    breakSafetyRuleExplanation?: string;
    supervisorCorrectiveAction?: string;
    investigatedBy?: string;
    investigationDate?: string;
    photos?: any[];
  };
  rootCause: {
    rootCauseMethod?: string;
    immediateRootCause?: string;
    underlyingRootCause?: string;
    systemicIssues?: string;
    whyAnalysis?: string[];
    correctiveActions?: Array<{
      action: string;
      responsible: string;
      dueDate: string;
      status: string;
    }>;
    preventiveMeasures?: string;
    policyChanges?: string;
    trainingNeeds?: string;
    verificationMethod?: string;
    verificationDate?: string;
    effectiveness?: string;
    lessonsLearned?: string;
    photos?: any[];
  };
}

/**
 * Calculate AKOSH report deadline based on report type
 * 8 hours for fatality, hospitalization, amputation, loss of eye
 * 24 hours for other reportable incidents
 */
function calculateAKOSHDeadline(reportType: string, dateOfInjury: string): string | undefined {
  if (!reportType || reportType === 'None' || !dateOfInjury) {
    return undefined;
  }

  const injuryDate = new Date(dateOfInjury);
  const hours = ['Fatality', 'Hospitalization', 'Amputation', 'LossOfEye'].includes(reportType) ? 8 : 24;
  const deadline = new Date(injuryDate.getTime() + hours * 60 * 60 * 1000);
  
  return deadline.toISOString();
}

/**
 * Determine severity based on treatment type and other factors
 */
function determineSeverity(treatmentType: string, isSIF: boolean): string {
  if (isSIF) return 'SIF';
  if (['Hospitalized', 'Fatality'].includes(treatmentType)) return 'Serious';
  return 'Minor';
}

/**
 * Determine if AKOSH report is required
 */
function isAKOSHReportRequired(treatmentType: string): boolean {
  const reportableTypes = [
    'Fatality',
    'Hospitalization',
    'Amputation',
    'LossOfEye'
  ];
  return reportableTypes.includes(treatmentType);
}

/**
 * Determine AKOSH report type from treatment type
 */
function getAKOSHReportType(treatmentType: string): string {
  const mapping: Record<string, string> = {
    'Fatality': 'Fatality',
    'Hospitalized': 'Hospitalization',
    'Amputation': 'Amputation',
    'Loss of Eye': 'LossOfEye',
  };
  return mapping[treatmentType] || 'None';
}

/**
 * Convert form data to SharePoint list item format
 */
export function mapFormDataToSharePoint(data: InjuryReportFormData): SharePointInjuryReport {
  const firstReport = data.firstReport || {};
  const investigation = data.investigation || {};
  const rootCause = data.rootCause || {};

  // Parse date/time of incident
  const dateTimeOfIncident = firstReport.dateTimeOfIncident 
    ? new Date(firstReport.dateTimeOfIncident).toISOString()
    : undefined;
  
  const dateOfInjury = dateTimeOfIncident 
    ? dateTimeOfInjury.split('T')[0]
    : investigation.dateOfIncident || undefined;
  
  const timeOfInjury = dateTimeOfIncident 
    ? dateTimeOfIncident.split('T')[1]?.split('.')[0]
    : firstReport.timeOfIncident || undefined;

  // Determine treatment type (simplified - you may need to add a field for this)
  const treatmentType = 'First aid only'; // Default - should be added to form
  
  // Determine if SIF (Serious Injury or Fatality)
  const isSIF = treatmentType === 'Fatality' || treatmentType === 'Hospitalized';
  
  // Calculate AKOSH report requirements
  const akoshReportRequired = isAKOSHReportRequired(treatmentType);
  const akoshReportType = getAKOSHReportType(treatmentType);
  const akoshReportDeadline = akoshReportRequired && dateOfInjury
    ? calculateAKOSHDeadline(akoshReportType, dateOfInjury)
    : undefined;

  // Build description from incident details
  const description = [
    firstReport.howDidIncidentHappen,
    investigation.incidentDescription,
    investigation.accidentScene,
  ].filter(Boolean).join('\n\n');

  // Check if investigation is completed
  const investigationCompleted = !!investigation.investigationDate;
  const investigationCompletedAt = investigation.investigationDate
    ? new Date(investigation.investigationDate).toISOString()
    : undefined;

  // Build SharePoint item
  const sharePointItem: SharePointInjuryReport = {
    // Title - use employee name and date as incident ID
    Title: `${firstReport.employeeName || investigation.employee || 'Unknown'} - ${dateOfInjury || 'No Date'}`,
    
    // Employee information
    EmployeeName: firstReport.employeeName || investigation.employee || '',
    EmployeeID: investigation.employeeIdNumber || '',
    
    // Incident date/time
    DateOfInjury: dateOfInjury,
    TimeOfInjury: timeOfInjury,
    
    // Location
    Location: investigation.locationOfIncident || firstReport.whereWereYou || firstReport.plant || '',
    
    // Description
    Description: description || firstReport.howDidIncidentHappen || '',
    
    // Severity and treatment
    Severity: determineSeverity(treatmentType, isSIF),
    TreatmentType: treatmentType,
    
    // AKOSH reporting
    AKOSHReportRequired: akoshReportRequired,
    AKOSHReportType: akoshReportType,
    AKOSHReportDeadline: akoshReportDeadline,
    
    // Reporting timestamps (set when actually reported)
    ReportedToSupervisorAt: firstReport.reportedRightAway === 'Y' ? new Date().toISOString() : undefined,
    ReportedToCSMAt: isSIF ? new Date().toISOString() : undefined,
    ReportedToAKOSHAt: undefined, // Set when actually reported
    AKOSHConfirmationNo: undefined, // Set when AKOSH confirms
    
    // SIF and investigation
    IsSIF: isSIF,
    InvestigationCompleted: investigationCompleted,
    InvestigationCompletedAt: investigationCompletedAt,
    
    // Store full form data as JSON for reference
    FirstReportData: JSON.stringify(firstReport),
    InvestigationData: JSON.stringify(investigation),
    RootCauseData: JSON.stringify(rootCause),
  };

  return sharePointItem;
}

/**
 * Convert SharePoint list item back to form data format
 */
export function mapSharePointToFormData(sharePointItem: any): InjuryReportFormData {
  const fields = sharePointItem.fields || sharePointItem;
  
  // Try to parse stored JSON data first
  let firstReport = {};
  let investigation = {};
  let rootCause = {};

  try {
    if (fields.FirstReportData) {
      firstReport = JSON.parse(fields.FirstReportData);
    }
    if (fields.InvestigationData) {
      investigation = JSON.parse(fields.InvestigationData);
    }
    if (fields.RootCauseData) {
      rootCause = JSON.parse(fields.RootCauseData);
    }
  } catch (e) {
    console.warn('Error parsing stored form data, using field mapping instead', e);
    
    // Fallback: reconstruct from SharePoint fields
    firstReport = {
      employeeName: fields.EmployeeName,
      dateTimeOfIncident: fields.DateOfInjury && fields.TimeOfInjury
        ? `${fields.DateOfInjury}T${fields.TimeOfInjury}`
        : fields.DateOfInjury,
      whereWereYou: fields.Location,
      howDidIncidentHappen: fields.Description,
    };
    
    investigation = {
      employee: fields.EmployeeName,
      employeeIdNumber: fields.EmployeeID,
      locationOfIncident: fields.Location,
      dateOfIncident: fields.DateOfInjury,
      investigationDate: fields.InvestigationCompletedAt,
    };
  }

  return {
    firstReport,
    investigation,
    rootCause,
  };
}

