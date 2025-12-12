import { useState } from 'react';
import { FirstReport } from './components/FirstReport';
import { Investigation } from './components/Investigation';
import { RootCauseAction } from './components/RootCauseAction';
import { LandingPage } from './components/LandingPage';
import { Button } from './components/ui/button';
import { CheckCircle2, ClipboardList, Search, Target, Save, Loader2 } from 'lucide-react';
import { Navigation } from './components/Navigation';
import { useAuth } from './contexts/AuthContext';
import { createInjuryReport, updateInjuryReport } from './services/sharePointService';
import { mapFormDataToSharePoint, InjuryReportFormData } from './utils/sharePointMapper';
import { toast } from 'sonner';

export default function App() {
  const { isAuthenticated } = useAuth();
  const [showLandingPage, setShowLandingPage] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [reportData, setReportData] = useState<InjuryReportFormData>({
    firstReport: {},
    investigation: {},
    rootCause: {}
  });
  const [isSaving, setIsSaving] = useState(false);
  const [sharePointItemId, setSharePointItemId] = useState<string | null>(null);

  const steps = [
    { id: 0, title: 'First Report', icon: ClipboardList },
    { id: 1, title: 'Investigation', icon: Search },
    { id: 2, title: 'Root Cause & Corrective Action', icon: Target }
  ];

  const updateReportData = (section: string, data: any) => {
    setReportData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = async () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to save your report');
      return;
    }

    setIsSaving(true);
    try {
      const sharePointData = mapFormDataToSharePoint(reportData);
      
      if (sharePointItemId) {
        await updateInjuryReport(sharePointItemId, sharePointData);
        toast.success('Report updated successfully in SharePoint');
      } else {
        const result = await createInjuryReport(sharePointData);
        setSharePointItemId(result.id);
        toast.success('Report saved successfully to SharePoint');
      }
    } catch (error: any) {
      console.error('Error saving to SharePoint:', error);
      toast.error(`Failed to save report: ${error.message || 'Unknown error'}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSubmit = async () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to submit your report');
      return;
    }

    setIsSaving(true);
    try {
      const sharePointData = mapFormDataToSharePoint(reportData);
      
      if (sharePointItemId) {
        await updateInjuryReport(sharePointItemId, sharePointData);
      } else {
        const result = await createInjuryReport(sharePointData);
        setSharePointItemId(result.id);
      }
      
      toast.success('Report submitted successfully to SharePoint!');
      // Reset form after successful submission
      setReportData({
        firstReport: {},
        investigation: {},
        rootCause: {}
      });
      setSharePointItemId(null);
      setCurrentStep(0);
    } catch (error: any) {
      console.error('Error submitting to SharePoint:', error);
      toast.error(`Failed to submit report: ${error.message || 'Unknown error'}`);
    } finally {
      setIsSaving(false);
    }
  };

  if (showLandingPage) {
    return <LandingPage onStartReport={() => setShowLandingPage(false)} />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      {/* Spacer for fixed navigation */}
      <div className="h-20"></div>
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            {/* Progress Line */}
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-slate-200 -z-10">
              <div 
                className="h-full bg-blue-600 transition-all duration-300"
                style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
              />
            </div>

            {/* Step Indicators */}
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;
              
              return (
                <div key={step.id} className="flex flex-col items-center flex-1">
                  <button
                    onClick={() => setCurrentStep(index)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all mb-2 ${
                      isActive
                        ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                        : isCompleted
                        ? 'bg-green-600 text-white'
                        : 'bg-white text-slate-400 border-2 border-slate-200'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </button>
                  <span className={`text-sm text-center ${
                    isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-slate-500'
                  }`}>
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          {currentStep === 0 && (
            <FirstReport
              data={reportData.firstReport}
              onUpdate={(data) => updateReportData('firstReport', data)}
            />
          )}
          {currentStep === 1 && (
            <Investigation
              data={reportData.investigation}
              onUpdate={(data) => updateReportData('investigation', data)}
            />
          )}
          {currentStep === 2 && (
            <RootCauseAction
              data={reportData.rootCause}
              onUpdate={(data) => updateReportData('rootCause', data)}
            />
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <Button
            onClick={handlePrevious}
            disabled={currentStep === 0 || isSaving}
            variant="outline"
            size="lg"
          >
            Previous
          </Button>
          
          <div className="flex gap-2">
            {isAuthenticated && (
              <Button
                onClick={handleSave}
                disabled={isSaving}
                variant="outline"
                size="lg"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Draft
                  </>
                )}
              </Button>
            )}
            
            {currentStep === steps.length - 1 ? (
              <Button onClick={handleSubmit} disabled={isSaving} size="lg">
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Report'
                )}
              </Button>
            ) : (
              <Button onClick={handleNext} size="lg">
                Next
              </Button>
            )}
          </div>
        </div>
        
        {!isAuthenticated && (
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              ⚠️ Please sign in to save and submit reports to SharePoint.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}