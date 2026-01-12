
import React from 'react';
import { ManagerFeedbackData } from '../types';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface Props {
  data: ManagerFeedbackData;
  onUpdate: (data: ManagerFeedbackData) => void;
  onNext: () => void;
  onBack: () => void;
}

const ManagerFeedbackForm: React.FC<Props> = ({ data, onUpdate, onNext, onBack }) => {
  return (
    <div className="bg-white rounded-md shadow-sm border border-slate-200 p-8 animate-in fade-in duration-500">
      <h2 className="text-2xl font-semibold text-slate-800 mb-8">Manager Feedback</h2>

      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <span className="text-[12px] font-bold text-slate-400 uppercase">Question</span>
          <span className="text-sm font-medium text-slate-800">What should my manager start, stop, or continue doing?</span>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Employee Answer</label>
          <textarea
            value={data.startStopContinue}
            onChange={(e) => onUpdate({ ...data, startStopContinue: e.target.value })}
            className="w-full min-h-[180px] p-4 border border-slate-200 rounded-sm bg-white text-slate-900 focus:ring-1 focus:ring-[#0072bc] outline-none text-sm"
            placeholder="Start: ... | Stop: ... | Continue: ..."
          />
        </div>
      </div>

      <div className="mt-12 flex justify-between border-t border-slate-100 pt-8">
        <button onClick={onBack} className="flex items-center gap-2 px-6 py-2 rounded-md font-bold text-slate-500 hover:bg-slate-50">
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
        <button onClick={onNext} className="bg-[#0072bc] text-white px-8 py-2 rounded-md font-bold hover:bg-[#005a96] flex items-center gap-2">
          Next <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ManagerFeedbackForm;
