
import React from 'react';
import { BarChart3, ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react';
import { CompetencyScore } from '../types';

interface Props {
  data: CompetencyScore[];
  onUpdate: (data: CompetencyScore[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const CompetencyForm: React.FC<Props> = ({ data, onUpdate, onNext, onBack }) => {
  const handleScoreChange = (index: number, score: number) => {
    const newData = [...data];
    newData[index].score = score;
    onUpdate(newData);
  };

  const handleCommentChange = (index: number, comments: string) => {
    const newData = [...data];
    newData[index].comments = comments;
    onUpdate(newData);
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Skill Competencies</h2>
        <p className="text-slate-500 mt-1">Rate your performance in key areas on a scale of 1 to 5.</p>
      </div>

      <div className="space-y-8">
        {data.map((item, index) => (
          <div key={index} className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-4">
              <h3 className="font-bold text-slate-800 text-lg">{item.category}</h3>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    onClick={() => handleScoreChange(index, s)}
                    className={`w-10 h-10 rounded-lg font-bold transition-all ${
                      item.score === s 
                        ? 'bg-blue-600 text-white shadow-md scale-110' 
                        : 'bg-white text-slate-400 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute left-4 top-3.5 text-slate-400">
                <MessageSquare className="w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="Brief justification or example (optional)..."
                value={item.comments}
                onChange={(e) => handleCommentChange(index, e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white text-sm"
              />
            </div>
          </div>
        ))}
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
          Next: Goals <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default CompetencyForm;
