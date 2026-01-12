
import React from 'react';
import { ReflectionData } from '../types';
import { ChevronRight, ChevronLeft, Eye } from 'lucide-react';

interface Props {
  data: ReflectionData;
  onUpdate: (data: ReflectionData) => void;
  onNext: () => void;
  onBack: () => void;
  readOnly?: boolean;
}

const ReflectionForm: React.FC<Props> = ({ data, onUpdate, onNext, onBack, readOnly }) => {
  return (
    <div className="bg-white rounded-md shadow-sm border border-slate-200 p-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold text-slate-800 flex items-center gap-2">
            Reflection {readOnly && <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded font-normal flex items-center gap-1"><Eye className="w-3 h-3" /> View Only</span>}
        </h2>
      </div>

      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-bold text-slate-400 uppercase">Question</span>
            <span className="text-sm font-medium text-slate-800">What am I most proud of?</span>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Employee Answer</label>
            <textarea
              readOnly={readOnly}
              value={data.mostProudOf}
              onChange={(e) => onUpdate({ ...data, mostProudOf: e.target.value })}
              className={`w-full min-h-[140px] p-4 border border-slate-200 rounded-sm bg-white text-slate-900 focus:ring-1 focus:ring-[#0072bc] focus:border-[#0072bc] outline-none transition-all text-sm ${readOnly ? 'bg-slate-50 text-slate-600 cursor-default' : ''}`}
              placeholder={readOnly ? "No answer provided" : "Reflect on your achievements..."}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-bold text-slate-400 uppercase">Question</span>
            <span className="text-sm font-medium text-slate-800">What has been most challenging? What did I learn?</span>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Employee Answer</label>
            <textarea
              readOnly={readOnly}
              value={data.challengingLearned}
              onChange={(e) => onUpdate({ ...data, challengingLearned: e.target.value })}
              className={`w-full min-h-[140px] p-4 border border-slate-200 rounded-sm bg-white text-slate-900 focus:ring-1 focus:ring-[#0072bc] focus:border-[#0072bc] outline-none transition-all text-sm ${readOnly ? 'bg-slate-50 text-slate-600 cursor-default' : ''}`}
              placeholder={readOnly ? "No answer provided" : "Describe obstacles and key takeaways..."}
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

export default ReflectionForm;
