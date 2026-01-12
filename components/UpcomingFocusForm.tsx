
import React from 'react';
import { UpcomingFocusData } from '../types';
import { ChevronRight, ChevronLeft, Eye } from 'lucide-react';

interface Props {
  data: UpcomingFocusData;
  onUpdate: (data: UpcomingFocusData) => void;
  onNext: () => void;
  onBack: () => void;
  readOnly?: boolean;
}

const UpcomingFocusForm: React.FC<Props> = ({ data, onUpdate, onNext, onBack, readOnly }) => {
  return (
    <div className="bg-white rounded-md shadow-sm border border-slate-200 p-8 animate-in fade-in duration-500">
      <h2 className="text-2xl font-semibold text-slate-800 mb-8 flex items-center gap-2">
        Upcoming Focus {readOnly && <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded font-normal flex items-center gap-1"><Eye className="w-3 h-3" /> View Only</span>}
      </h2>

      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-bold text-slate-400 uppercase">Question</span>
            <span className="text-sm font-medium text-slate-800">What is my business focus (the what)?</span>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Employee Answer</label>
            <textarea
              readOnly={readOnly}
              value={data.businessFocus}
              onChange={(e) => onUpdate({ ...data, businessFocus: e.target.value })}
              className={`w-full min-h-[140px] p-4 border border-slate-200 rounded-sm bg-white text-slate-900 focus:ring-1 focus:ring-[#0072bc] outline-none text-sm ${readOnly ? 'bg-slate-50' : ''}`}
              placeholder="Goals related to business outcomes..."
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-bold text-slate-400 uppercase">Question</span>
            <span className="text-sm font-medium text-slate-800">What is my individual development focus (the how)?</span>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Employee Answer</label>
            <textarea
              readOnly={readOnly}
              value={data.developmentFocus}
              onChange={(e) => onUpdate({ ...data, developmentFocus: e.target.value })}
              className={`w-full min-h-[140px] p-4 border border-slate-200 rounded-sm bg-white text-slate-900 focus:ring-1 focus:ring-[#0072bc] outline-none text-sm ${readOnly ? 'bg-slate-50' : ''}`}
              placeholder="Skills, competencies and personal growth..."
            />
          </div>
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

export default UpcomingFocusForm;
