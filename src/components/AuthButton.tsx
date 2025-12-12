import { Button } from './ui/button';
import { useAuth } from '../contexts/AuthContext';
import { LogIn, LogOut, User } from 'lucide-react';

export function AuthButton() {
  const { account, isAuthenticated, isLoading, login, logout } = useAuth();

  if (isLoading) {
    return (
      <Button variant="outline" disabled>
        Loading...
      </Button>
    );
  }

  if (isAuthenticated && account) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <User className="w-4 h-4" />
          <span>{account.name || account.username}</span>
        </div>
        <Button variant="outline" onClick={logout}>
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>
    );
  }

  return (
    <Button onClick={login}>
      <LogIn className="w-4 h-4 mr-2" />
      Sign In
    </Button>
  );
}

