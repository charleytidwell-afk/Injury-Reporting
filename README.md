
# Injury and Illness Reporting App

Deployed at: https://charleytidwell-afk.github.io/Injury-Reporting/

This is a code bundle for Injury and Illness Reporting App. The original project is available at https://www.figma.com/design/WZcQy2O162ahWiFUtZpYcr/Injury-and-Illness-Reporting-App.

## Features

- **Multi-step form workflow** for injury/illness reporting
- **SharePoint integration** - Stores all reports in SharePoint lists
- **Microsoft Azure AD authentication** - Secure sign-in with Microsoft accounts
- **Real-time save/load** - Save drafts and submit reports to SharePoint
- **Policy compliance** - Built-in AKOSH reporting deadlines and requirements

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure SharePoint Integration

1. Copy `.env.example` to `.env`
2. Follow the detailed setup guide in `SHAREPOINT_SETUP.md`
3. Configure your Azure AD app registration and SharePoint list

### 3. Run Development Server

```bash
npm run dev
```

The app will open at `http://localhost:5173`

## SharePoint Integration

This app uses SharePoint as its database backend. All injury reports are stored in SharePoint lists using Microsoft Graph API.

### Architecture

```
Your App ⇄ (Azure AD / Entra ID Auth) ⇄ Microsoft Graph API ⇄ SharePoint List
```

### Key Components

- **Authentication**: MSAL.js for Azure AD/Entra ID sign-in
- **Data Storage**: SharePoint lists (InjuryReports list)
- **API**: Microsoft Graph API for SharePoint operations
- **Mapping**: Automatic conversion between form data and SharePoint fields

### Required Setup

1. **SharePoint List**: Create `InjuryReports` list with required columns
2. **Azure AD App**: Register app with `Sites.ReadWrite.All` permission
3. **Environment Variables**: Configure `.env` file with credentials

See `SHAREPOINT_SETUP.md` for detailed setup instructions.

## Project Structure

```
src/
├── components/          # React components
│   ├── FirstReport.tsx  # First report form
│   ├── Investigation.tsx # Investigation form
│   ├── RootCauseAction.tsx # Root cause analysis form
│   └── AuthButton.tsx   # Authentication button
├── config/             # Configuration files
│   └── azureConfig.ts  # Azure AD and SharePoint config
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication context
├── services/           # Service layers
│   ├── authService.ts  # MSAL authentication service
│   └── sharePointService.ts # SharePoint API service
└── utils/             # Utility functions
    └── sharePointMapper.ts # Form data to SharePoint mapping
```

## Environment Variables

Create a `.env` file with:

```env
VITE_AZURE_CLIENT_ID=your-client-id
VITE_AZURE_TENANT_ID=your-tenant-id
VITE_AZURE_REDIRECT_URI=http://localhost:5173
VITE_SHAREPOINT_SITE_ID=your-site-id
VITE_SHAREPOINT_LIST_NAME=InjuryReports
```

## Building for Production

```bash
npm run build
```

The built files will be in the `build` directory.

## Documentation

- **Setup Guide**: See `SHAREPOINT_SETUP.md` for detailed SharePoint configuration
- **API Documentation**: [Microsoft Graph API](https://docs.microsoft.com/en-us/graph/overview)
- **MSAL Documentation**: [MSAL.js](https://github.com/AzureAD/microsoft-authentication-library-for-js)

## Troubleshooting

### Authentication Issues
- Verify Azure AD app registration is correct
- Check API permissions are granted with admin consent
- Ensure redirect URI matches exactly

### SharePoint Issues
- Verify list name matches exactly (case-sensitive)
- Check site ID or hostname/path is correct
- Ensure user has permissions to the SharePoint site

See `SHAREPOINT_SETUP.md` for more troubleshooting tips.