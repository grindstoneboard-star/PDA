import React, { useState, useEffect, useMemo } from 'react';
import { 
  CheckCircle2, 
  AlertCircle,
  Download,
  ChevronLeft,
  ChevronRight,
  Send,
  Mail,
  Lock,
  ArrowRight,
  User,
  ShieldCheck
} from 'lucide-react';
import { FormStep, PDAData } from './types.ts';
import IdentificationForm from './components/IdentificationForm.tsx';
import ReflectionForm from './components/ReflectionForm.tsx';
import RoleExpectationsForm from './components/RoleExpectationsForm.tsx';
import UpcomingFocusForm from './components/UpcomingFocusForm.tsx';
import ManagerFeedbackForm from './components/ManagerFeedbackForm.tsx';
import ConfirmationForm from './components/ConfirmationForm.tsx';
import ReviewForm from './components/ReviewForm.tsx';
import { saveToGoogleSheets } from './services/sheetsService.ts';
import { exportToPDF } from './utils/pdfExport.ts';
import { decodeState, getMagicLink } from './utils/urlState.ts';

const INITIAL_DATA: PDAData = {
  employee: { fullName: '', employeeId: '', department: '', position: '', managerEmail: '' },
  reflection: { 
    employeeMostProudOf: '', employeeChallengingLearned: '',
    managerMostProudOf: '', managerChallengingLearned: '' 
  },
  roleExpectations: { 
    employeeRating: '', employeeRatingDescription: '', employeeComment: '',
    managerRating: '', managerRatingDescription: '', managerComment: ''
  },
  upcomingFocus: { 
    employeeBusinessFocus: '', employeeDevelopmentFocus: '',
    managerBusinessFocus: '', managerDevelopmentFocus: ''
  },
  managerFeedback: { employeeAnswer: '', managerAnswer: '' },
  confirmation: { hadConversation: false, managerComment: '' },
  submissionDate: new Date().toISOString()
};

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<FormStep>(FormStep.IDENTIFICATION);
  const [data, setData] = useState<PDAData>(INITIAL_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isManagerMode, setIsManagerMode] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const encodedData = params.get('data');
    if (encodedData) {
      try {
        const decoded = decodeState(encodedData);
        if (decoded) {
          setData(decoded);
          setIsManagerMode(true);
          setCurrentStep(FormStep.REFLECTION);
        }
      } catch (e) {
        console.error("URL Hydration failed:", e);
        setError("Invalid assessment link. Loading default form.");
      }
    }
  }, []);

  const updateData = (section: keyof PDAData, value: any) => {
    setData(prev => ({ ...prev, [section]: value }));
  };

  const handleNext = () => setCurrentStep(prev => prev + 1);
  const handleBack = () => setCurrentStep(prev => prev - 1);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      const success = await saveToGoogleSheets(data);
      if (!success) throw new Error("Database sync failed");
      
      if (isManagerMode) {
          setCurrentStep(FormStep.COMPLETE);
      } else {
          const magicLink = getMagicLink(data);
          const subject = `PDA Assessment - Action Required: ${data.employee.fullName}`;
          const body = `Hi,\n\nI have completed my self-assessment portion of the PDA.\n\nPlease click the link below to view my answers, provide your feedback, and finalize our review.\n\nACCESS LINK:\n${magicLink}\n\nBest regards,\n${data.employee.fullName}`;
          
          const mailtoUrl = `mailto:${data.employee.managerEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
          
          window.location.href = mailtoUrl;
          setCurrentStep(FormStep.COMPLETE);
      }
    } catch (err) {
      setError("Failed to save data. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentStepLabel = useMemo(() => {
    const labels = ['Identity', 'Reflection', 'Expectations', 'Strategic Focus', 'Manager Feedback', 'Confirmation', 'Review'];
    return labels[currentStep] || 'PDA';
  }, [currentStep]);

  const renderStep = () => {
    switch (currentStep) {
      case FormStep.IDENTIFICATION:
        return <IdentificationForm data={data.employee} onUpdate={(v) => updateData('employee', v)} onNext={handleNext} />;
      case FormStep.REFLECTION:
        return <ReflectionForm data={data.reflection} onUpdate={(v) => updateData('reflection', v)} onNext={handleNext} onBack={handleBack} isManager={isManagerMode} />;
      case FormStep.ROLE_EXPECTATIONS:
        return <RoleExpectationsForm data={data.roleExpectations} onUpdate={(v) => updateData('roleExpectations', v)} onNext={handleNext} onBack={handleBack} isManager={isManagerMode} />;
      case FormStep.UPCOMING_FOCUS:
        return <UpcomingFocusForm data={data.upcomingFocus} onUpdate={(v) => updateData('upcomingFocus', v)} onNext={handleNext} onBack={handleBack} isManager={isManagerMode} />;
      case FormStep.MANAGER_FEEDBACK:
        return <ManagerFeedbackForm data={data.managerFeedback} onUpdate={(v) => updateData('managerFeedback', v)} onNext={handleNext} onBack={handleBack} isManager={isManagerMode} />;
      case FormStep.CONFIRMATION:
        return <ConfirmationForm data={data.confirmation} onUpdate={(v) => updateData('confirmation', v)} onNext={handleNext} onBack={handleBack} isManager={isManagerMode} />;
      case FormStep.SUMMARY:
        return <ReviewForm data={data} onBack={handleBack} onSubmit={handleSubmit} isSubmitting={isSubmitting} isManager={isManagerMode} />;
      case FormStep.COMPLETE:
        return (
          <div className="flex flex-col items-center justify-center min-h-[500px] text-center p-12 bg-white rounded-md shadow-sm border border-slate-200 animate-in zoom-in duration-300">
            <div className="bg-emerald-50 p-6 rounded-full mb-8">
                <CheckCircle2 className="w-20 h-20 text-emerald-500" />
            </div>
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              {isManagerMode ? 'Assessment Archived' : 'Assessment Shared'}
            </h2>
            <p className="text-slate-500 mb-10 max-w-lg leading-relaxed text-lg">
              {isManagerMode 
                ? 'The process is now complete. Feedback has been recorded and synchronized with the central repository.' 
                : 'Your self-reflection has been shared. An email draft was created for your manager with the access link.'}
            </p>
            
            {isManagerMode ? (
              <button 
                onClick={() => exportToPDF('printable-pda', `PDA_Final_${data.employee.fullName.replace(/\s+/g, '_')}.pdf`)}
                className="flex items-center justify-center gap-3 bg-[#0072bc] text-white px-12 py-4 rounded-md font-bold hover:bg-[#005a96] transition-all shadow-xl hover:shadow-2xl scale-105"
              >
                <Download className="w-5 h-5" /> Download Official PDF
              </button>
            ) : (
                <div className="flex flex-col items-center gap-6">
                  <div className="bg-blue-50 text-blue-700 p-6 rounded-lg border border-blue-100 flex items-center gap-5 max-w-sm">
                    <Mail className="w-8 h-8 shrink-0" />
                    <div className="text-left">
                        <p className="text-[10px] font-black uppercase opacity-60 tracking-widest">Notification Sent</p>
                        <p className="text-sm font-semibold">Sent to: {data.employee.managerEmail}</p>
                    </div>
                  </div>
                  <button onClick={() => window.location.href = window.location.origin + window.location.pathname} className="flex items-center gap-2 text-slate-400 text-sm hover:text-[#0072bc] transition-colors group mt-4">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /> Start New Assessment
                  </button>
                </div>
            )}
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] flex flex-col font-sans selection:bg-[#0072bc]/10">
      <nav className="bg-white h-16 border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="text-[#0072bc] font-black text-2xl tracking-tighter flex items-center gap-2">
            <span className="bg-[#0072bc] text-white p-1 rounded-sm"><CheckCircle2 className="w-6 h-6" /></span>
            MUNTERS PDA
          </div>
        </div>
        
        <div className="flex items-center gap-6">
            {isManagerMode && (
                <div className="bg-amber-100 text-amber-800 px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest flex items-center gap-2 border border-amber-200 shadow-sm uppercase">
                    <Lock className="w-3 h-3" /> Manager Access Active
                </div>
            )}
            <div className="h-8 w-[1px] bg-slate-200"></div>
            <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                    <p className="text-xs font-bold text-slate-800 leading-tight">{data.employee.fullName || 'New Assessment'}</p>
                    <p className="text-[10px] text-slate-400 font-medium">{currentStepLabel}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 text-slate-600 flex items-center justify-center text-sm font-bold shadow-sm">
                    {data.employee.fullName ? data.employee.fullName.charAt(0).toUpperCase() : <User className="w-4 h-4"/>}
                </div>
            </div>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {currentStep !== FormStep.COMPLETE && (
          <aside className="w-72 bg-white border-r border-slate-200 flex flex-col pt-10 overflow-y-auto no-print shadow-sm">
            <div className="px-8 mb-10">
                <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.25em] mb-6">Workflow Progress</h3>
                <div className="space-y-1">
                    {[
                      'Identity', 'Reflection', 'Expectations', 'Strategic Focus', 'Manager Feedback', 'Confirmation', 'Review'
                    ].map((label, idx) => (
                      <div 
                        key={idx}
                        className={`flex items-center gap-4 px-4 py-4 border-l-4 transition-all rounded-r-lg mb-1 ${
                          currentStep === idx 
                            ? 'bg-blue-50/50 border-[#0072bc] text-[#0072bc] font-bold' 
                            : currentStep > idx 
                              ? 'border-emerald-500 text-emerald-600'
                              : 'border-transparent text-slate-400'
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] border shrink-0 transition-colors ${
                          currentStep === idx ? 'bg-[#0072bc] text-white border-[#0072bc]' : currentStep > idx ? 'bg-emerald-500 text-white border-emerald-500' : 'border-slate-200 bg-white'
                        }`}>
                          {currentStep > idx ? '✓' : idx + 1}
                        </div>
                        <span className="text-xs truncate">{label}</span>
                      </div>
                    ))}
                </div>
            </div>
          </aside>
        )}

        <main className="flex-1 overflow-y-auto bg-[#f8fafc] p-6 lg:p-12">
          <div className="max-w-6xl mx-auto">
            {error && (
              <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-600 rounded-md flex items-center gap-3 text-sm font-bold shadow-sm animate-in slide-in-from-top-4">
                <AlertCircle className="w-5 h-5" /> {error}
                <button onClick={() => setError(null)} className="ml-auto text-xs opacity-60 hover:opacity-100">Dismiss</button>
              </div>
            )}
            <div className="min-h-[600px]">
              {renderStep()}
            </div>
          </div>
        </main>
      </div>

      {/* Hidden printable layout for PDF generation */}
      <div id="printable-pda" className="fixed left-[-9999px] top-0 w-[1100px] bg-white p-20 text-slate-900">
          <div className="flex justify-between items-center mb-16 border-b-8 border-[#0072bc] pb-8">
              <div>
                  <h1 className="text-6xl font-black italic text-[#0072bc] mb-1 tracking-tighter">MUNTERS</h1>
                  <h2 className="text-2xl font-bold text-slate-400 tracking-widest uppercase ml-1">Personal Development Assessment</h2>
              </div>
              <div className="text-right">
                  <div className="bg-slate-900 text-white px-5 py-2 text-sm font-bold uppercase tracking-widest mb-2">Final Document</div>
                  <div className="text-lg font-bold text-slate-600">{new Date().toLocaleDateString('en-GB')}</div>
              </div>
          </div>
          <div className="space-y-12">
              <section className="grid grid-cols-2 gap-10">
                  <div className="bg-slate-50 p-6 border border-slate-100">
                      <h3 className="text-xs font-black text-slate-400 uppercase mb-4 tracking-widest">Employee Details</h3>
                      <p className="text-xl font-bold">{data.employee.fullName}</p>
                      <p className="text-slate-500 text-sm mt-1">{data.employee.position} | {data.employee.department}</p>
                      <p className="text-slate-400 text-xs mt-2">ID: {data.employee.employeeId}</p>
                  </div>
                  <div className="bg-slate-50 p-6 border border-slate-100">
                      <h3 className="text-xs font-black text-slate-400 uppercase mb-4 tracking-widest">Manager Details</h3>
                      <p className="text-xl font-bold">{data.employee.managerEmail}</p>
                  </div>
              </section>
              {/* Detailed sections would continue here in the PDF hidden container */}
          </div>
      </div>
    </div>
  );
};

export default App;