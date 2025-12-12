import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { AccountInfo } from '@azure/msal-browser';
import { 
  initializeMsal, 
  signIn, 
  signOut, 
  getCurrentAccount, 
  isAuthenticated as checkIsAuthenticated 
} from '../services/authService';

interface AuthContextType {
  account: AccountInfo | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [account, setAccount] = useState<AccountInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function initialize() {
      try {
        await initializeMsal();
        const currentAccount = getCurrentAccount();
        setAccount(currentAccount);
      } catch (error) {
        console.error('Error initializing MSAL:', error);
      } finally {
        setIsLoading(false);
      }
    }

    initialize();
  }, []);

  const login = async () => {
    try {
      const result = await signIn();
      if (result) {
        setAccount(result.account);
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut();
      setAccount(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const value: AuthContextType = {
    account,
    isAuthenticated: checkIsAuthenticated(),
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

