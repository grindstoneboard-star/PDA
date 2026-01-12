
import React from 'react';
import { ConfirmationData } from '../types.ts';
import { ChevronRight, ChevronLeft, ShieldCheck } from 'lucide-react';

interface Props {
  data: ConfirmationData;
  onUpdate: (data: ConfirmationData) => void;
  onNext: () => void;
  onBack: () => void;
  isManager?: boolean;
}

const ConfirmationForm: React.FC<Props> = ({ data, onUpdate, onNext, onBack, isManager }) => {
  return (
    <div className="bg-white rounded-md shadow-sm border border-slate-200 p-10 animate-in fade-in duration-500">
      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-slate-800">Confirmation</h2>
        <p className="text-slate-500 text-sm mt-3 leading-relaxed max-w-4xl">
          Please ensure that you had an offline conversation with your employee prior to clicking submit. 
          When you have acknowledged that you have had a 1:1 conversation you can submit the form.
        </p>
      </div>

      <div className="space-y-8 bg-slate-50 p-8 rounded-sm border border-slate-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200">
          <div className="space-y-1">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Question</span>
            <p className="text-sm font-bold text-slate-700">Did you have the 1:1 conversation with your employee?</p>
          </div>
          
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                disabled={!isManager}
                type="radio"
                checked={data.hadConversation === true}
                onChange={() => onUpdate({ ...data, hadConversation: true })}
                className="w-4 h-4 text-[#0072bc] focus:ring-[#0072bc] cursor-pointer"
              />
              <span className="text-sm font-bold text-slate-700 group-hover:text-[#0072bc]">Yes</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                disabled={!isManager}
                type="radio"
                checked={data.hadConversation === false}
                onChange={() => onUpdate({ ...data, hadConversation: false })}
                className="w-4 h-4 text-[#0072bc] focus:ring-[#0072bc] cursor-pointer"
              />
              <span className="text-sm font-bold text-slate-700 group-hover:text-[#0072bc]">No</span>
            </label>
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-bold text-[#0072bc] uppercase flex items-center gap-1.5">
            <ShieldCheck className="w-3 h-3" /> Manager Acknowledgment Answer
          </label>
          <textarea
            readOnly={!isManager}
            value={data.managerComment}
            onChange={(e) => onUpdate({ ...data, managerComment: e.target.value })}
            className={`w-full min-h-[140px] p-4 border border-slate-200 rounded-sm bg-white text-sm outline-none focus:ring-1 focus:ring-[#0072bc] ${!isManager ? 'bg-white/50 text-slate-400' : ''}`}
            placeholder={isManager ? "Add final confirmation notes..." : "Manager final confirmation comment."}
          />
        </div>
      </div>

      <div className="mt-12 flex justify-between border-t border-slate-100 pt-8">
        <button onClick={onBack} className="flex items-center gap-2 px-6 py-2 rounded-md font-bold text-slate-500 hover:bg-slate-50">
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
        <button 
          onClick={onNext} 
          disabled={isManager && !data.hadConversation}
          className={`px-10 py-2.5 rounded-md font-bold flex items-center gap-2 transition-all shadow-sm ${
            !isManager || data.hadConversation
              ? 'bg-[#0072bc] text-white hover:bg-[#005a96]' 
              : 'bg-slate-100 text-slate-400 cursor-not-allowed opacity-50'
          }`}
        >
          View Summary <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ConfirmationForm;
