# SharePoint Integration Setup Guide

This guide will help you set up SharePoint as the database for your Injury Reporting System.

## Prerequisites

- Access to Azure Portal
- Access to SharePoint site where you want to store injury reports
- Admin permissions to create app registrations and grant API permissions

## Step 1: Create SharePoint List

1. Navigate to your SharePoint site
2. Go to **Settings** → **Site contents** → **New** → **List**
3. Name it `InjuryReports` (or update `VITE_SHAREPOINT_LIST_NAME` in `.env`)
4. Add the following columns:

### Required Columns

| Column Name | Type | Required | Notes |
|------------|------|----------|-------|
| Title | Single line of text | Yes | Incident ID or short description |
| EmployeeName | Single line of text | No | Employee name |
| EmployeeID | Single line of text | No | Employee ID number |
| DateOfInjury | Date and Time | No | Date of injury |
| TimeOfInjury | Date and Time | No | Time of injury |
| Location | Single line of text | No | Location of incident |
| Description | Multiple lines of text | No | Incident description |
| Severity | Choice | No | Options: Minor, Serious, SIF |
| TreatmentType | Choice | No | Options: First aid only, Sent to clinic, Hospitalized, etc. |
| AKOSHReportRequired | Yes/No | No | Whether AKOSH report is required |
| AKOSHReportType | Choice | No | Options: Fatality, Hospitalization, Amputation, LossOfEye, None |
| AKOSHReportDeadline | Date and Time | No | Calculated deadline |
| ReportedToSupervisorAt | Date and Time | No | When reported to supervisor |
| ReportedToCSMAt | Date and Time | No | When reported to Corporate Safety Manager |
| ReportedToAKOSHAt | Date and Time | No | When reported to AKOSH |
| AKOSHConfirmationNo | Single line of text | No | AKOSH confirmation number |
| IsSIF | Yes/No | No | Serious Injury or Fatality flag |
| InvestigationCompleted | Yes/No | No | Whether investigation is completed |
| InvestigationCompletedAt | Date and Time | No | When investigation was completed |
| FirstReportData | Multiple lines of text | No | JSON storage for first report form data |
| InvestigationData | Multiple lines of text | No | JSON storage for investigation form data |
| RootCauseData | Multiple lines of text | No | JSON storage for root cause form data |

### Column Setup Instructions

1. **Title**: Default column, keep as is
2. **Choice columns** (Severity, TreatmentType, AKOSHReportType):
   - Column type: Choice
   - Add each option as a separate choice
3. **Yes/No columns**: Column type: Yes/No
4. **Date and Time columns**: Column type: Date and Time
5. **Text columns**: Column type: Single line of text or Multiple lines of text

## Step 2: Register App in Azure AD

1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to **Azure Active Directory** → **App registrations**
3. Click **New registration**
4. Fill in:
   - **Name**: Injury Reporting App (or your preferred name)
   - **Supported account types**: Accounts in this organizational directory only
   - **Redirect URI**: 
     - Type: Single-page application (SPA)
     - URI: `http://localhost:5173` (for development) or your production URL
5. Click **Register**
6. Note down:
   - **Application (client) ID** → `VITE_AZURE_CLIENT_ID`
   - **Directory (tenant) ID** → `VITE_AZURE_TENANT_ID`

## Step 3: Configure API Permissions

1. In your app registration, go to **API permissions**
2. Click **Add a permission**
3. Select **Microsoft Graph**
4. Select **Delegated permissions**
5. Add the following permissions:
   - `Sites.ReadWrite.All` - Read and write items in all site collections
   - `User.Read` - Sign in and read user profile
6. Click **Add permissions**
7. Click **Grant admin consent for [Your Organization]**
8. Confirm the consent

## Step 4: Get SharePoint Site Information

### Option A: Using Site ID (Recommended)

1. Go to your SharePoint site
2. Click **Settings** (gear icon) → **Site information**
3. Copy the **Site ID** (GUID format)
4. Use this as `VITE_SHAREPOINT_SITE_ID` in `.env`

### Option B: Using Hostname and Site Path

1. Note your SharePoint hostname (e.g., `yourtenant.sharepoint.com`)
2. Note your site path (e.g., `/sites/YourSite`)
3. Use these as `VITE_SHAREPOINT_HOSTNAME` and `VITE_SHAREPOINT_SITE_PATH` in `.env`

## Step 5: Configure Environment Variables

1. Copy `.env.example` to `.env`
2. Fill in the values:

```env
VITE_AZURE_CLIENT_ID=your-client-id-from-step-2
VITE_AZURE_TENANT_ID=your-tenant-id-from-step-2
VITE_AZURE_REDIRECT_URI=http://localhost:5173
VITE_SHAREPOINT_SITE_ID=your-site-id-from-step-4
VITE_SHAREPOINT_LIST_NAME=InjuryReports
```

## Step 6: Test the Integration

1. Start the development server: `npm run dev`
2. Click **Sign In** button
3. Sign in with your Microsoft account
4. Fill out a test injury report
5. Click **Save Draft** or **Submit Report**
6. Check your SharePoint list to verify the data was saved

## Troubleshooting

### "Unable to get access token"
- Verify your Azure AD app registration is correct
- Check that API permissions are granted and admin consent is given
- Ensure redirect URI matches exactly

### "List not found"
- Verify the list name matches exactly (case-sensitive)
- Check that you have permissions to access the SharePoint site
- Ensure the site ID or hostname/path is correct

### "Insufficient permissions"
- Verify `Sites.ReadWrite.All` permission is granted
- Ensure admin consent is given
- Check that your account has access to the SharePoint site

## Security Notes

- Never commit `.env` file to version control
- Use environment-specific redirect URIs
- Consider using Azure Key Vault for production secrets
- Regularly review and audit API permissions

## Additional Resources

- [Microsoft Graph API Documentation](https://docs.microsoft.com/en-us/graph/overview)
- [MSAL.js Documentation](https://github.com/AzureAD/microsoft-authentication-library-for-js)
- [SharePoint Lists API](https://docs.microsoft.com/en-us/graph/api/resources/list)

