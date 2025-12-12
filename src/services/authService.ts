import { PublicClientApplication, AccountInfo, AuthenticationResult } from '@azure/msal-browser';
import { azureConfig } from '../config/azureConfig';

/**
 * MSAL Public Client Application instance
 */
export const msalInstance = new PublicClientApplication({
  auth: {
    clientId: azureConfig.clientId,
    authority: azureConfig.authority,
    redirectUri: azureConfig.redirectUri,
  },
  cache: {
    cacheLocation: 'sessionStorage', // or 'localStorage' for persistence
    storeAuthStateInCookie: false,
  },
});

/**
 * Initialize MSAL - must be called before using authentication
 */
export async function initializeMsal(): Promise<void> {
  await msalInstance.initialize();
}

/**
 * Get access token for Microsoft Graph API
 */
export async function getAccessToken(): Promise<string | null> {
  try {
    const account = msalInstance.getActiveAccount();
    if (!account) {
      throw new Error('No active account found. Please sign in.');
    }

    const response = await msalInstance.acquireTokenSilent({
      scopes: azureConfig.scopes,
      account: account,
    });

    return response.accessToken;
  } catch (error) {
    console.error('Error acquiring token:', error);
    // Try interactive login if silent fails
    try {
      const response = await msalInstance.acquireTokenPopup({
        scopes: azureConfig.scopes,
      });
      return response.accessToken;
    } catch (popupError) {
      console.error('Error with popup login:', popupError);
      return null;
    }
  }
}

/**
 * Sign in user
 */
export async function signIn(): Promise<AuthenticationResult | null> {
  try {
    const response = await msalInstance.loginPopup({
      scopes: azureConfig.scopes,
    });
    return response;
  } catch (error) {
    console.error('Sign in error:', error);
    return null;
  }
}

/**
 * Sign out user
 */
export async function signOut(): Promise<void> {
  const account = msalInstance.getActiveAccount();
  if (account) {
    await msalInstance.logoutPopup({
      account: account,
    });
  }
}

/**
 * Get current account
 */
export function getCurrentAccount(): AccountInfo | null {
  return msalInstance.getActiveAccount();
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return msalInstance.getActiveAccount() !== null;
}

