import React from 'react';
import { RoleExpectationsData } from '../types.ts';
import { ChevronRight, ChevronLeft, ShieldCheck, User } from 'lucide-react';

interface Props {
  data: RoleExpectationsData;
  onUpdate: (data: RoleExpectationsData) => void;
  onNext: () => void;
  onBack: () => void;
  isManager?: boolean;
}

const RATINGS = [
  "Sets a new standard",
  "Often exceeds expectations",
  "Consistently meets expectations",
  "Needs development"
];

const RoleExpectationsForm: React.FC<Props> = ({ data, onUpdate, onNext, onBack, isManager }) => {
  return (
    <div className="bg-white rounded-md shadow-sm border border-slate-200 p-10 animate-in fade-in duration-500">
      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-slate-800">Meeting Role Expectations</h2>
        <p className="text-slate-500 text-sm mt-3 leading-relaxed max-w-4xl">
          Assess how well the employee has met the expectations of their role over the year.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left Side: Employee */}
        <div className="space-y-6">
          <h3 className="text-xs font-bold text-slate-400 uppercase flex items-center gap-2 border-b border-slate-50 pb-2">
            <User className="w-4 h-4" /> Employee Perspective
          </h3>
          
          <div className="space-y-4">
             <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase">Rating</label>
              <select
                disabled={isManager}
                value={data.employeeRating}
                onChange={(e) => onUpdate({ ...data, employeeRating: e.target.value })}
                className={`w-full p-2.5 border border-slate-200 rounded-sm bg-white text-sm outline-none focus:ring-1 focus:ring-[#0072bc] ${isManager ? 'bg-slate-50' : ''}`}
              >
                <option value="">Select...</option>
                {RATINGS.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase">Comment</label>
              <textarea
                readOnly={isManager}
                value={data.employeeComment}
                onChange={(e) => onUpdate({ ...data, employeeComment: e.target.value })}
                className={`w-full min-h-[160px] p-4 border border-slate-200 rounded-sm bg-white text-sm outline-none focus:ring-1 focus:ring-[#0072bc] ${isManager ? 'bg-slate-50 text-slate-500' : ''}`}
                placeholder="Self-reflection on performance..."
              />
            </div>
          </div>
        </div>

        {/* Right Side: Manager */}
        <div className="space-y-6">
          <h3 className="text-xs font-bold text-[#0072bc] uppercase flex items-center gap-2 border-b border-blue-50 pb-2">
            <ShieldCheck className="w-4 h-4" /> Manager Assessment
          </h3>
          
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase">Rating *</label>
              <select
                disabled={!isManager}
                value={data.managerRating}
                onChange={(e) => onUpdate({ ...data, managerRating: e.target.value })}
                className={`w-full p-2.5 border border-slate-200 rounded-sm bg-white text-sm outline-none focus:ring-1 focus:ring-[#0072bc] ${!isManager ? 'bg-slate-50' : ''}`}
              >
                <option value="">Select...</option>
                {RATINGS.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase">Comment *</label>
              <textarea
                readOnly={!isManager}
                value={data.managerComment}
                onChange={(e) => onUpdate({ ...data, managerComment: e.target.value })}
                className={`w-full min-h-[160px] p-4 border border-slate-200 rounded-sm bg-white text-sm outline-none focus:ring-1 focus:ring-[#0072bc] ${!isManager ? 'bg-slate-50' : ''}`}
                placeholder="Manager assessment feedback..."
              />
            </div>
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

export default RoleExpectationsForm;