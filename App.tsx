import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  AlertCircle,
  Download,
  ChevronLeft,
  ChevronRight,
  Send,
  Mail,
  Lock,
  ArrowRight
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
      const decoded = decodeState(encodedData);
      if (decoded) {
        setData(decoded);
        setIsManagerMode(true);
        setCurrentStep(FormStep.REFLECTION);
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
      await saveToGoogleSheets(data);
      
      if (isManagerMode) {
          setCurrentStep(FormStep.COMPLETE);
      } else {
          const magicLink = getMagicLink(data);
          const subject = `PDA Assessment - Action Required: ${data.employee.fullName}`;
          const body = `Hi,\n\nI have completed my self-assessment portion of the PDA.\n\nPlease click the link below to view my answers, provide your feedback, and finalize our review.\n\nACCESS LINK:\n${magicLink}\n\nBest regards,\n${data.employee.fullName}`;
          
          const mailtoUrl = `mailto:${data.employee.managerEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
          
          setTimeout(() => {
            window.location.href = mailtoUrl;
            setCurrentStep(FormStep.COMPLETE);
          }, 500);
      }
    } catch (err) {
      setError("Failed to save data. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <div className="flex flex-col items-center justify-center min-h-[450px] text-center p-12 bg-white rounded-lg shadow-sm border border-slate-200 animate-in zoom-in duration-300">
            <div className="bg-emerald-50 p-4 rounded-full mb-6">
                <CheckCircle2 className="w-16 h-16 text-emerald-500" />
            </div>
            <h2 className="text-3xl font-bold text-slate-800 mb-3">
              {isManagerMode ? 'Assessment Archived' : 'Assessment Shared'}
            </h2>
            <p className="text-slate-500 mb-10 max-w-lg leading-relaxed">
              {isManagerMode 
                ? 'The process is complete. Data has been saved to the central database. You can now download the official PDF for your records.' 
                : 'Your self-reflection is ready. Your email client should have opened with a link for your manager. Once they confirm, the final document will be generated.'}
            </p>
            
            {isManagerMode ? (
              <div className="space-y-4">
                  <button 
                    onClick={() => exportToPDF('printable-pda', `PDA_Final_${data.employee.fullName.replace(/\s+/g, '_')}.pdf`)}
                    className="flex items-center justify-center gap-3 bg-[#0072bc] text-white px-12 py-4 rounded-md font-bold hover:bg-[#005a96] transition-all shadow-xl hover:shadow-2xl scale-105 active:scale-95"
                  >
                    <Download className="w-5 h-5" /> Download Final PDF
                  </button>
              </div>
            ) : (
                <div className="flex flex-col items-center gap-6">
                  <div className="bg-blue-50 text-blue-700 p-5 rounded-lg border border-blue-100 flex items-center gap-4 max-w-sm">
                    <Mail className="w-6 h-6 shrink-0" />
                    <div className="text-left">
                        <p className="text-xs font-bold uppercase opacity-60">Success</p>
                        <p className="text-sm">Link created for <b>{data.employee.managerEmail}</b></p>
                    </div>
                  </div>
                  <button onClick={() => window.location.href = window.location.origin + window.location.pathname} className="flex items-center gap-2 text-slate-400 text-sm hover:text-[#0072bc] transition-colors group">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /> Start new form
                  </button>
                </div>
            )}
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] flex flex-col font-sans">
      <nav className="bg-white h-16 border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="text-[#0072bc] font-bold text-2xl tracking-tighter flex items-center gap-3">
            <span className="bg-[#0072bc] text-white p-1.5 rounded-sm shadow-sm"><CheckCircle2 className="w-6 h-6" /></span>
            Munters PDA
          </div>
        </div>
        
        <div className="flex items-center gap-6">
            {isManagerMode && (
                <div className="bg-amber-100 text-amber-800 px-5 py-2 rounded-full text-[10px] font-black tracking-widest flex items-center gap-2 border border-amber-200 shadow-sm uppercase">
                    <Lock className="w-3 h-3" /> External Access Link Active
                </div>
            )}
            <div className="h-10 w-[1px] bg-slate-100"></div>
            <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                    <p className="text-xs font-bold text-slate-800">{data.employee.fullName || 'Guest'}</p>
                    <p className="text-[10px] text-slate-400">{data.employee.employeeId || 'PDA System'}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-800 text-white flex items-center justify-center text-sm font-bold shadow-inner">
                    {data.employee.fullName ? data.employee.fullName.charAt(0).toUpperCase() : '?'}
                </div>
            </div>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {currentStep !== FormStep.COMPLETE && (
          <aside className="w-72 bg-white border-r border-slate-200 flex flex-col pt-8 overflow-y-auto no-print">
            <div className="px-8 mb-10">
                <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-4">Assessment Flow</h3>
                <div className="space-y-1">
                    {[
                      'Identity', 'Reflection', 'Expectations', 'Strategic Focus', 'Manager Feedback', 'Confirmation', 'Review'
                    ].map((label, idx) => (
                      <div 
                        key={idx}
                        className={`flex items-center gap-4 px-4 py-3.5 border-l-4 transition-all rounded-r-md ${
                          currentStep === idx 
                            ? 'bg-blue-50 border-[#0072bc] text-[#0072bc] font-bold' 
                            : currentStep > idx 
                              ? 'border-emerald-400 text-emerald-600'
                              : 'border-transparent text-slate-300'
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] border ${
                          currentStep === idx ? 'bg-[#0072bc] text-white border-[#0072bc]' : currentStep > idx ? 'bg-emerald-500 text-white border-emerald-500' : 'border-slate-100'
                        }`}>
                          {currentStep > idx ? '✓' : idx + 1}
                        </div>
                        <span className="text-xs">{label}</span>
                      </div>
                    ))}
                </div>
            </div>
          </aside>
        )}

        <main className="flex-1 overflow-y-auto bg-[#f8fafc] p-10">
          <div className="max-w-6xl mx-auto">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-md flex items-center gap-3 text-sm font-medium animate-bounce">
                <AlertCircle className="w-5 h-5" /> {error}
              </div>
            )}
            {renderStep()}
          </div>
        </main>
      </div>

      {/* Final Printable/PDF structure */}
      <div id="printable-pda" className="fixed left-[-9999px] top-0 w-[1000px] bg-white p-20 text-slate-900 border-[16px] border-[#0072bc]">
          <div className="flex justify-between items-start mb-16">
              <div>
                  <h1 className="text-5xl font-black italic text-[#0072bc] mb-2 tracking-tighter leading-none">MUNTERS</h1>
                  <h2 className="text-xl font-bold text-slate-400 tracking-widest uppercase ml-1">Personal Development Assessment</h2>
              </div>
              <div className="text-right">
                  <div className="bg-slate-900 text-white px-4 py-2 text-sm font-bold uppercase tracking-widest">Digital Archive</div>
                  <div className="text-sm font-bold text-slate-400 mt-2">{new Date().toLocaleDateString()}</div>
              </div>
          </div>
          {/* Add more printable content details here if needed */}
      </div>
    </div>
  );
};

export default App;