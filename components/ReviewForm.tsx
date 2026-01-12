
import React from 'react';
import { PDAData } from '../types';
import { Send, ChevronLeft, Loader2, Printer, FileText, CheckCircle } from 'lucide-react';

interface Props {
  data: PDAData;
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  isManager?: boolean;
}

const ReviewForm: React.FC<Props> = ({ data, onBack, onSubmit, isSubmitting, isManager }) => {
  const SummaryCard = ({ title, children }: { title: string; children?: React.ReactNode }) => (
    <div className="bg-white border border-slate-200 rounded-sm p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-800">{title}</h3>
            <div className="flex gap-2">
                <FileText className="w-4 h-4 text-slate-300" />
                <Printer className="w-4 h-4 text-slate-300" />
            </div>
        </div>
        {children}
    </div>
  );

  return (
    <div className="animate-in fade-in duration-500 max-h-[80vh] overflow-y-auto pr-10">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">
            {isManager ? 'Final Manager Review' : 'Review Summary'}
        </h2>
        <p className="text-slate-500 text-sm">
            {isManager 
                ? 'Please review the employee\'s input and ensure your feedback is accurate before final completion.' 
                : 'Review your evaluation before sending it to your manager for final comments.'}
        </p>
      </div>

      <SummaryCard title="Reflection">
        <div className="space-y-4">
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase mb-1">What am I most proud of?</p>
            <p className="text-sm text-slate-800">{data.reflection.mostProudOf || '(empty)'}</p>
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase mb-1">What has been most challenging? What did I learn?</p>
            <p className="text-sm text-slate-800">{data.reflection.challengingLearned || '(empty)'}</p>
          </div>
        </div>
      </SummaryCard>

      <SummaryCard title="Meeting Role Expectations">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase mb-1">Rating</p>
            <p className="text-sm text-[#0072bc] font-bold">{data.roleExpectations.rating || '(empty)'}</p>
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase mb-1">Rating Description</p>
            <p className="text-sm text-slate-800">{data.roleExpectations.ratingDescription || '(empty)'}</p>
          </div>
          <div className="col-span-2">
            <p className="text-[11px] font-bold text-slate-400 uppercase mb-1">Comment</p>
            <p className="text-sm text-slate-800">{data.roleExpectations.comment || '(empty)'}</p>
          </div>
        </div>
      </SummaryCard>

      <SummaryCard title="Focus for upcoming period">
        <div className="space-y-4">
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase mb-1">What is my business focus (the what)?</p>
            <p className="text-sm text-slate-800">{data.upcomingFocus.businessFocus || '(empty)'}</p>
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase mb-1">What is my individual development focus (the how)?</p>
            <p className="text-sm text-slate-800">{data.upcomingFocus.developmentFocus || '(empty)'}</p>
          </div>
        </div>
      </SummaryCard>

      <SummaryCard title="Manager Feedback">
        <div>
          <p className="text-[11px] font-bold text-slate-400 uppercase mb-1">Employee Feedback</p>
          <p className="text-sm text-slate-800">{data.managerFeedback.startStopContinue || '(empty)'}</p>
        </div>
      </SummaryCard>

      <SummaryCard title="Confirmation">
        <div>
          <p className="text-[11px] font-bold text-slate-400 uppercase mb-1">1:1 Conversation Held?</p>
          <p className={`text-sm font-bold ${data.confirmation.hadConversation ? 'text-emerald-600' : 'text-red-500'}`}>
            {data.confirmation.hadConversation ? 'Yes' : 'No'}
          </p>
        </div>
      </SummaryCard>

      <div className="mt-8 flex justify-between pb-10">
        <button onClick={onBack} disabled={isSubmitting} className="flex items-center gap-2 px-6 py-3 rounded-md font-bold text-slate-500 hover:bg-white transition-all disabled:opacity-50">
          <ChevronLeft className="w-5 h-5" /> Back to Edit
        </button>
        <button 
            onClick={onSubmit} 
            disabled={isSubmitting} 
            className={`flex items-center gap-2 px-10 py-3 rounded-md font-bold transition-all shadow-lg disabled:opacity-70 ${
                isManager ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'bg-[#0072bc] hover:bg-[#005a96] text-white'
            }`}
        >
          {isSubmitting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
              isManager ? (
                  <><CheckCircle className="w-5 h-5" /> Finalize Review</>
              ) : (
                  <><Send className="w-5 h-5" /> Send to Manager</>
              )
          )}
        </button>
      </div>
    </div>
  );
};

export default ReviewForm;
