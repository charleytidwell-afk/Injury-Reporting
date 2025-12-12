import { useState } from 'react';
import logo from 'figma:asset/1bcebbebdeca114bb54a8da607b649cd40cadd65.png';
import { AuthButton } from './AuthButton';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';

interface NavigationProps {
  onStartReport?: () => void;
  showStartButton?: boolean;
}

export function Navigation({ onStartReport, showStartButton = false }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Company Name */}
          <div className="flex items-center gap-4">
            <img 
              src={logo} 
              alt="Silver Bay Seafoods" 
              className="h-12 w-auto"
            />
            <div className="hidden md:block">
              <div className="text-lg font-bold text-slate-900">Silver Bay Seafoods</div>
              <div className="text-xs text-slate-500 uppercase tracking-wide">Safety Management System</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {showStartButton && onStartReport && (
              <Button
                onClick={onStartReport}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-blue-500/30"
              >
                Start New Report
              </Button>
            )}
            <AuthButton />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            {showStartButton && onStartReport && (
              <Button
                onClick={onStartReport}
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                Start Report
              </Button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200">
            <div className="flex flex-col gap-3">
              {onStartReport && (
                <Button
                  onClick={() => {
                    onStartReport();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  Start New Report
                </Button>
              )}
              <div className="pt-2">
                <AuthButton />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

