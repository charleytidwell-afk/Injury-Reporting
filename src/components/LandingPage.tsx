import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Navigation } from './Navigation';
import { 
  ClipboardList, 
  Search, 
  Target, 
  Shield, 
  Clock, 
  FileText,
  ArrowRight,
  CheckCircle2,
  BarChart3,
  Users,
  Lock,
  Zap,
  TrendingUp,
  AlertTriangle,
  FileCheck
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface LandingPageProps {
  onStartReport: () => void;
}

export function LandingPage({ onStartReport }: LandingPageProps) {
  const { isAuthenticated } = useAuth();

  const processSteps = [
    {
      icon: ClipboardList,
      step: '01',
      title: 'First Report',
      description: 'Capture comprehensive incident details including employee information, injury specifics, and immediate circumstances. Our intuitive form guides you through all required fields.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Search,
      step: '02',
      title: 'Investigation',
      description: 'Conduct thorough investigation with witness statements, scene analysis, and root cause identification. Document findings systematically for compliance.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Target,
      step: '03',
      title: 'Root Cause & Action',
      description: 'Identify underlying causes using proven methodologies. Develop and track corrective actions to prevent recurrence.',
      color: 'from-green-500 to-green-600'
    }
  ];

  const features = [
    {
      icon: Shield,
      title: 'AKOSH Compliance',
      description: 'Automatic deadline calculations and reporting requirements based on incident severity',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Lock,
      title: 'Secure Storage',
      description: 'Enterprise-grade SharePoint integration with encrypted data transmission',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Zap,
      title: 'Real-time Updates',
      description: 'Instant notifications and deadline tracking for critical reporting requirements',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      icon: BarChart3,
      title: 'Analytics & Insights',
      description: 'Comprehensive reporting and trend analysis for safety improvement initiatives',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: FileCheck,
      title: 'Policy Compliance',
      description: 'Built-in validation ensures all reports meet company policy and regulatory standards',
      gradient: 'from-indigo-500 to-blue-500'
    },
    {
      icon: TrendingUp,
      title: 'Continuous Improvement',
      description: 'Track corrective actions and measure effectiveness of safety interventions',
      gradient: 'from-teal-500 to-cyan-500'
    }
  ];

  const stats = [
    { label: 'Reports Processed', value: '100%', description: 'Compliance Rate' },
    { label: 'Response Time', value: '< 24hr', description: 'Average Processing' },
    { label: 'Data Security', value: 'Enterprise', description: 'SharePoint Integration' },
    { label: 'User Satisfaction', value: '98%', description: 'System Reliability' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <Navigation onStartReport={onStartReport} showStartButton={true} />
      
      {/* Spacer for fixed navigation */}
      <div className="h-20"></div>
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full text-blue-700 text-sm font-medium mb-6 animate-fade-in">
              <Shield className="w-4 h-4" />
              <span>Enterprise Safety Management System</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight animate-fade-in-up">
              Injury & Illness
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Reporting Platform
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
              Streamline workplace safety reporting with our comprehensive, 
              policy-compliant system. From initial incident capture to root cause 
              analysis—all in one integrated platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up animation-delay-400">
              <Button 
                onClick={onStartReport} 
                size="lg" 
                className="text-lg px-10 py-7 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/50 transition-all duration-300 hover:scale-105"
              >
                Start New Report
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              {!isAuthenticated && (
                <div className="flex items-center gap-2 text-slate-500">
                  <Lock className="w-4 h-4" />
                  <span className="text-sm">Sign in required to save reports</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm border-y border-slate-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm font-semibold text-slate-700 mb-1">{stat.label}</div>
                <div className="text-xs text-slate-500">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Streamlined Reporting Process
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Three comprehensive steps to ensure complete incident documentation and compliance
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative group">
                <Card className="h-full border-2 border-slate-200 hover:border-blue-300 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <span className="text-6xl font-bold text-slate-100 group-hover:text-slate-200 transition-colors">
                        {step.step}
                      </span>
                    </div>
                    <CardTitle className="text-2xl font-bold text-slate-900">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base text-slate-600 leading-relaxed">
                      {step.description}
                    </CardDescription>
                  </CardContent>
                </Card>
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transform -translate-y-1/2 z-0">
                    <ArrowRight className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-purple-400" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Everything you need for comprehensive injury reporting and safety management
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index} 
                  className="group border-2 border-slate-200 hover:border-transparent hover:shadow-2xl transition-all duration-300 overflow-hidden relative"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                  <CardHeader>
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-slate-900">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base text-slate-600">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Critical Reporting Timelines
            </h2>
            <p className="text-xl text-slate-600">
              Automated deadline tracking ensures compliance with regulatory requirements
            </p>
          </div>
          <div className="space-y-6">
            <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Report to Supervisor</CardTitle>
                    <CardDescription className="text-base">Required within 24 hours</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700">
                  All workplace injuries and illnesses must be reported to the immediate supervisor 
                  within 24 hours of occurrence, as per company policy.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-red-200 bg-gradient-to-r from-red-50 to-orange-50">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-red-600 flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">AKOSH Reporting</CardTitle>
                    <CardDescription className="text-base">Severity-based deadlines</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-slate-900">8 Hours</p>
                      <p className="text-sm text-slate-600">Fatality, Hospitalization, Amputation, Loss of Eye</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-slate-900">24 Hours</p>
                      <p className="text-sm text-slate-600">Other reportable incidents requiring AKOSH notification</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-600 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Investigation Completion</CardTitle>
                    <CardDescription className="text-base">Within 7 days per policy</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700">
                  Complete investigation including root cause analysis and corrective actions 
                  must be finalized within 7 days of the incident.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"></div>
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-white text-sm font-medium mb-6 backdrop-blur-sm">
              <Users className="w-4 h-4" />
              <span>Trusted by Safety Professionals</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Ready to Report an Incident?
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
              Start the reporting process now. Our system ensures all data is securely stored 
              in SharePoint and complies with company policies and regulatory standards.
            </p>
            <Button 
              onClick={onStartReport} 
              size="lg" 
              variant="secondary"
              className="text-lg px-10 py-7 bg-white text-blue-600 hover:bg-blue-50 shadow-2xl transition-all duration-300 hover:scale-105"
            >
              Start New Report
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer Info */}
      {!isAuthenticated && (
        <div className="bg-yellow-50 border-t border-yellow-200 py-6">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-3 text-yellow-800">
              <Lock className="w-5 h-5" />
              <p className="text-sm font-medium">
                <strong>Authentication Required:</strong> Please sign in using the button in the header to save and submit reports to SharePoint.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
