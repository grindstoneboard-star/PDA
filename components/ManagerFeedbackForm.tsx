
import React from 'react';
import { ManagerFeedbackData } from '../types.ts';
import { ChevronRight, ChevronLeft, ShieldCheck, User } from 'lucide-react';

interface Props {
  data: ManagerFeedbackData;
  onUpdate: (data: ManagerFeedbackData) => void;
  onNext: () => void;
  onBack: () => void;
  isManager?: boolean;
}

const ManagerFeedbackForm: React.FC<Props> = ({ data, onUpdate, onNext, onBack, isManager }) => {
  return (
    <div className="bg-white rounded-md shadow-sm border border-slate-200 p-10 animate-in fade-in duration-500">
      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-slate-800">Manager Feedback</h2>
        <p className="text-slate-500 text-sm mt-3 leading-relaxed max-w-4xl">
          Reflect on the feedback you receive and comment on how you intend to act on it. Show that the feedback is heard and appreciated.
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2 mb-6">
          <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Question</span>
          <span className="text-sm font-bold text-slate-700">What should my manager start, stop, or continue doing?</span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1.5"><User className="w-3 h-3"/> Employee Feedback</label>
            <textarea
              readOnly={isManager}
              value={data.employeeAnswer}
              onChange={(e) => onUpdate({ ...data, employeeAnswer: e.target.value })}
              className={`w-full min-h-[180px] p-4 border border-slate-200 rounded-sm bg-white text-sm outline-none focus:ring-1 focus:ring-[#0072bc] ${isManager ? 'bg-slate-50' : ''}`}
              placeholder="Start: ... | Stop: ... | Continue: ..."
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-[#0072bc] uppercase flex items-center gap-1.5"><ShieldCheck className="w-3 h-3"/> Manager Response</label>
            <textarea
              readOnly={!isManager}
              value={data.managerAnswer}
              onChange={(e) => onUpdate({ ...data, managerAnswer: e.target.value })}
              className={`w-full min-h-[180px] p-4 border border-slate-200 rounded-sm bg-white text-sm outline-none focus:ring-1 focus:ring-[#0072bc] ${!isManager ? 'bg-slate-50' : ''}`}
              placeholder="Manager's acknowledgment..."
            />
          </div>
        </div>
      </div>

      <div className="mt-12 flex justify-between border-t border-slate-100 pt-8">
        <button onClick={onBack} className="flex items-center gap-2 px-6 py-2 rounded-md font-bold text-slate-500 hover:bg-slate-50">
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
        <button onClick={onNext} className="bg-[#0072bc] text-white px-10 py-2.5 rounded-md font-bold hover:bg-[#005a96] flex items-center gap-2 shadow-sm transition-all">
          Next <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ManagerFeedbackForm;
