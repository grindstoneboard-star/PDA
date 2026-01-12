
import React from 'react';
import { ReflectionData } from '../types.ts';
import { ChevronRight, ChevronLeft, User, ShieldCheck } from 'lucide-react';

interface Props {
  data: ReflectionData;
  onUpdate: (data: ReflectionData) => void;
  onNext: () => void;
  onBack: () => void;
  isManager?: boolean;
}

const ReflectionForm: React.FC<Props> = ({ data, onUpdate, onNext, onBack, isManager }) => {
  return (
    <div className="bg-white rounded-md shadow-sm border border-slate-200 p-10 animate-in fade-in duration-500">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-slate-800">Reflection</h2>
        <p className="text-slate-500 text-sm mt-2 max-w-2xl leading-relaxed">
          Use this section to reflect on key outcomes from the last year. 
          Summarize the employee's key contributions and strengths. Highlight achievements, patterns you observe, and any challenges or learnings visible from your perspective.
        </p>
      </div>

      <div className="space-y-12">
        {/* Question 1 */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Question</span>
            <span className="text-sm font-bold text-slate-700">What am I most proud of?</span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <User className="w-3 h-3" /> Employee Response
              </label>
              <textarea
                readOnly={isManager}
                value={data.employeeMostProudOf}
                onChange={(e) => onUpdate({ ...data, employeeMostProudOf: e.target.value })}
                className={`w-full min-h-[140px] p-4 border border-slate-200 rounded-sm bg-white text-slate-900 focus:ring-1 focus:ring-[#0072bc] outline-none transition-all text-sm ${isManager ? 'bg-slate-50' : ''}`}
                placeholder={!isManager ? "Reflect on your achievements..." : "Employee didn't provide an answer"}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-[#0072bc] uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3 h-3" /> Manager Response
              </label>
              <textarea
                readOnly={!isManager}
                value={data.managerMostProudOf}
                onChange={(e) => onUpdate({ ...data, managerMostProudOf: e.target.value })}
                className={`w-full min-h-[140px] p-4 border border-slate-200 rounded-sm bg-white text-slate-900 focus:ring-1 focus:ring-[#0072bc] outline-none transition-all text-sm ${!isManager ? 'bg-slate-50' : ''}`}
                placeholder={isManager ? "Enter your perspective..." : "Awaiting manager input"}
              />
            </div>
          </div>
        </div>

        {/* Question 2 */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Question</span>
            <span className="text-sm font-bold text-slate-700">What has been most challenging? What did I learn?</span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <User className="w-3 h-3" /> Employee Response
              </label>
              <textarea
                readOnly={isManager}
                value={data.employeeChallengingLearned}
                onChange={(e) => onUpdate({ ...data, employeeChallengingLearned: e.target.value })}
                className={`w-full min-h-[140px] p-4 border border-slate-200 rounded-sm bg-white text-slate-900 focus:ring-1 focus:ring-[#0072bc] outline-none transition-all text-sm ${isManager ? 'bg-slate-50' : ''}`}
                placeholder={!isManager ? "Describe obstacles and key takeaways..." : "Employee didn't provide an answer"}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-[#0072bc] uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3 h-3" /> Manager Response
              </label>
              <textarea
                readOnly={!isManager}
                value={data.managerChallengingLearned}
                onChange={(e) => onUpdate({ ...data, managerChallengingLearned: e.target.value })}
                className={`w-full min-h-[140px] p-4 border border-slate-200 rounded-sm bg-white text-slate-900 focus:ring-1 focus:ring-[#0072bc] outline-none transition-all text-sm ${!isManager ? 'bg-slate-50' : ''}`}
                placeholder={isManager ? "Enter your perspective..." : "Awaiting manager input"}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 flex justify-between border-t border-slate-100 pt-8">
        <button onClick={onBack} className="flex items-center gap-2 px-6 py-2 rounded-md font-bold text-slate-500 hover:bg-slate-50 transition-colors">
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
        <button onClick={onNext} className="bg-[#0072bc] text-white px-10 py-2.5 rounded-md font-bold hover:bg-[#005a96] flex items-center gap-2 shadow-sm transition-all">
          Next <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ReflectionForm;
