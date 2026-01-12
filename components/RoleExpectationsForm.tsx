
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
          Assess how well the employee has met the expectations of their role over the year. Consider key achievements, gaps, and overall consistency in delivery. 
          Provide clear, supportive comments to explain your assessment.
        </p>
        
        <div className="mt-6 bg-slate-50 p-6 rounded-sm border border-slate-100">
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Rating Scale</h4>
          <ul className="text-xs space-y-2 text-slate-600">
            <li><b>Sets a new standard:</b> Consistently exceeds expectations and delivers to the goals of the position.</li>
            <li><b>Often exceeds expectations:</b> Regularly exceeds expectations. Requires little to no additional direction.</li>
            <li><b>Consistently meets expectations:</b> Consistently meets expectations and sometimes exceeds expectations.</li>
            <li><b>Needs development:</b> Does not consistently meet expectations that are appropriate for the position.</li>
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Employee Side */}
        <div className="space-y-6">
          <h3 className="text-xs font-bold text-slate-400 uppercase flex items-center gap-2 border-b border-slate-50 pb-2">
            <User className="w-4 h-4" /> Employee Perspective
          </h3>
          
          <div className="space-y-4 opacity-80">
             <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase">Rating</label>
              <input readOnly value={data.employeeRating || "(no selection)"} className="w-full p-2.5 border border-slate-100 bg-slate-50 rounded-sm text-sm" />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase">Rating Description</label>
              <input readOnly value={data.employeeRatingDescription || "(empty)"} className="w-full p-2.5 border border-slate-100 bg-slate-50 rounded-sm text-sm" />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase">Comment</label>
              <div className="w-full min-h-[160px] p-4 border border-slate-100 bg-slate-50 rounded-sm text-sm text-slate-600 whitespace-pre-wrap">
                {data.employeeComment || "No comment provided."}
              </div>
            </div>
          </div>
        </div>

        {/* Manager Side */}
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
                <option value="">Select one...</option>
                {RATINGS.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase">Rating Description</label>
              <input
                readOnly={!isManager}
                type="text"
                value={data.managerRatingDescription}
                onChange={(e) => onUpdate({ ...data, managerRatingDescription: e.target.value })}
                className={`w-full p-2.5 border border-slate-200 rounded-sm bg-white text-sm outline-none focus:ring-1 focus:ring-[#0072bc] ${!isManager ? 'bg-slate-50' : ''}`}
                placeholder="(empty)"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase">Comment *</label>
              <textarea
                readOnly={!isManager}
                value={data.managerComment}
                onChange={(e) => onUpdate({ ...data, managerComment: e.target.value })}
                className={`w-full min-h-[160px] p-4 border border-slate-200 rounded-sm bg-white text-sm outline-none focus:ring-1 focus:ring-[#0072bc] ${!isManager ? 'bg-slate-50' : ''}`}
                placeholder="Enter detailed feedback..."
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 flex justify-between border-t border-slate-100 pt-8">
        <button onClick={onBack} className="flex items-center gap-2 px-6 py-2 rounded-md font-bold text-slate-500 hover:bg-slate-50">
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
        <button 
          onClick={onNext} 
          disabled={isManager && (!data.managerRating || !data.managerComment)}
          className={`px-10 py-2.5 rounded-md font-bold flex items-center gap-2 transition-all shadow-sm ${
            !isManager || (data.managerRating && data.managerComment) 
              ? 'bg-[#0072bc] text-white hover:bg-[#005a96]' 
              : 'bg-slate-100 text-slate-400 cursor-not-allowed opacity-50'
          }`}
        >
          Next <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default RoleExpectationsForm;
