
import React from 'react';
import { UpcomingFocusData } from '../types.ts';
import { ChevronRight, ChevronLeft, ShieldCheck, User } from 'lucide-react';

interface Props {
  data: UpcomingFocusData;
  onUpdate: (data: UpcomingFocusData) => void;
  onNext: () => void;
  onBack: () => void;
  isManager?: boolean;
}

const UpcomingFocusForm: React.FC<Props> = ({ data, onUpdate, onNext, onBack, isManager }) => {
  return (
    <div className="bg-white rounded-md shadow-sm border border-slate-200 p-10 animate-in fade-in duration-500">
      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-slate-800">Focus for the upcoming period</h2>
        <p className="text-slate-500 text-sm mt-3 leading-relaxed max-w-4xl">
          This section outlines the key priorities for the coming period. It can include short-term (next quarter) and longer-term (6-12+ months) goals.
        </p>
        <div className="mt-6 space-y-4 text-xs text-slate-600">
           <p><b>Business focus (the what):</b> Define concrete priorities that support business goals. They should be clear enough to guide action.</p>
           <p><b>Individual development focus (the how):</b> Identify the skills, behaviors, or capabilities the individual should strengthen to grow.</p>
        </div>
      </div>

      <div className="space-y-16">
        {/* Row 1: Business Focus */}
        <div className="space-y-4">
           <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Goal 1</span>
            <span className="text-sm font-bold text-slate-700">What is my business focus (the what)?</span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1.5"><User className="w-3 h-3"/> Employee Perspective</label>
              <textarea
                readOnly={isManager}
                value={data.employeeBusinessFocus}
                onChange={(e) => onUpdate({ ...data, employeeBusinessFocus: e.target.value })}
                className={`w-full min-h-[140px] p-4 border border-slate-200 rounded-sm bg-white text-sm outline-none focus:ring-1 focus:ring-[#0072bc] ${isManager ? 'bg-slate-50' : ''}`}
                placeholder="List your business priorities..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-[#0072bc] uppercase flex items-center gap-1.5"><ShieldCheck className="w-3 h-3"/> Manager Perspective</label>
              <textarea
                readOnly={!isManager}
                value={data.managerBusinessFocus}
                onChange={(e) => onUpdate({ ...data, managerBusinessFocus: e.target.value })}
                className={`w-full min-h-[140px] p-4 border border-slate-200 rounded-sm bg-white text-sm outline-none focus:ring-1 focus:ring-[#0072bc] ${!isManager ? 'bg-slate-50' : ''}`}
                placeholder="Manager assessment of business goals..."
              />
            </div>
          </div>
        </div>

        {/* Row 2: Development Focus */}
        <div className="space-y-4">
           <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Goal 2</span>
            <span className="text-sm font-bold text-slate-700">What is my individual development focus (the how)?</span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1.5"><User className="w-3 h-3"/> Employee Perspective</label>
              <textarea
                readOnly={isManager}
                value={data.employeeDevelopmentFocus}
                onChange={(e) => onUpdate({ ...data, employeeDevelopmentFocus: e.target.value })}
                className={`w-full min-h-[140px] p-4 border border-slate-200 rounded-sm bg-white text-sm outline-none focus:ring-1 focus:ring-[#0072bc] ${isManager ? 'bg-slate-50' : ''}`}
                placeholder="List your development goals..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-[#0072bc] uppercase flex items-center gap-1.5"><ShieldCheck className="w-3 h-3"/> Manager Perspective</label>
              <textarea
                readOnly={!isManager}
                value={data.managerDevelopmentFocus}
                onChange={(e) => onUpdate({ ...data, managerDevelopmentFocus: e.target.value })}
                className={`w-full min-h-[140px] p-4 border border-slate-200 rounded-sm bg-white text-sm outline-none focus:ring-1 focus:ring-[#0072bc] ${!isManager ? 'bg-slate-50' : ''}`}
                placeholder="Manager assessment of development goals..."
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

export default UpcomingFocusForm;
