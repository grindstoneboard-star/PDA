
import React from 'react';
import { ConfirmationData } from '../types';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface Props {
  data: ConfirmationData;
  onUpdate: (data: ConfirmationData) => void;
  onNext: () => void;
  onBack: () => void;
}

const ConfirmationForm: React.FC<Props> = ({ data, onUpdate, onNext, onBack }) => {
  return (
    <div className="bg-white rounded-md shadow-sm border border-slate-200 p-8 animate-in fade-in duration-500">
      <h2 className="text-2xl font-semibold text-slate-800 mb-8">Confirmation</h2>

      <div className="space-y-8 bg-slate-50 p-6 rounded-md">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-bold text-slate-400 uppercase">Question</span>
            <span className="text-sm font-medium text-slate-800">Did you have the 1:1 conversation with your employee?</span>
          </div>
          <div className="flex items-center gap-6 ml-auto">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={data.hadConversation === true}
                onChange={() => onUpdate({ hadConversation: true })}
                className="w-4 h-4 text-[#0072bc] focus:ring-[#0072bc]"
              />
              <span className="text-sm font-bold text-slate-700">Yes</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={data.hadConversation === false}
                onChange={() => onUpdate({ hadConversation: false })}
                className="w-4 h-4 text-[#0072bc] focus:ring-[#0072bc]"
              />
              <span className="text-sm font-bold text-slate-700">No</span>
            </label>
          </div>
        </div>
      </div>

      <div className="mt-12 flex justify-between border-t border-slate-100 pt-8">
        <button onClick={onBack} className="flex items-center gap-2 px-6 py-2 rounded-md font-bold text-slate-500 hover:bg-slate-50">
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
        <button onClick={onNext} className="bg-[#0072bc] text-white px-8 py-2 rounded-md font-bold hover:bg-[#005a96] flex items-center gap-2">
          View Summary <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ConfirmationForm;
