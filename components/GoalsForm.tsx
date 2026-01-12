
import React from 'react';
import { Target, ChevronLeft, ChevronRight, PenTool } from 'lucide-react';

interface Props {
  data: { shortTerm: string; longTerm: string };
  feedback: string;
  onUpdateGoals: (goals: { shortTerm: string; longTerm: string }) => void;
  onUpdateFeedback: (feedback: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const GoalsForm: React.FC<Props> = ({ data, feedback, onUpdateGoals, onUpdateFeedback, onNext, onBack }) => {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Growth & Goals</h2>
        <p className="text-slate-500 mt-1">Define your path for the coming months.</p>
      </div>

      <div className="space-y-8">
        <div className="space-y-3">
          <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
            <Target className="w-4 h-4 text-emerald-500" /> Short-Term Goals (Next 1-3 Months)
          </label>
          <textarea
            value={data.shortTerm}
            onChange={(e) => onUpdateGoals({ ...data, shortTerm: e.target.value })}
            placeholder="Focus areas, certifications, project milestones..."
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none min-h-[120px]"
          />
        </div>

        <div className="space-y-3">
          <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
            <Target className="w-4 h-4 text-blue-500" /> Long-Term Goals (6-12 Months)
          </label>
          <textarea
            value={data.longTerm}
            onChange={(e) => onUpdateGoals({ ...data, longTerm: e.target.value })}
            placeholder="Career progression, skill mastery, organizational impact..."
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none min-h-[120px]"
          />
        </div>

        <div className="pt-6 border-t border-slate-100 space-y-3">
          <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
            <PenTool className="w-4 h-4 text-amber-500" /> General Feedback / Self-Reflection
          </label>
          <textarea
            value={feedback}
            onChange={(e) => onUpdateFeedback(e.target.value)}
            placeholder="Any other comments or reflections on your recent performance..."
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none min-h-[100px] bg-slate-50"
          />
        </div>
      </div>

      <div className="mt-10 flex justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-50 transition-all"
        >
          <ChevronLeft className="w-5 h-5" /> Back
        </button>
        <button
          onClick={onNext}
          className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all shadow-lg shadow-blue-200"
        >
          Review Summary <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default GoalsForm;
