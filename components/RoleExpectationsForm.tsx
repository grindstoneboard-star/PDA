
import React from 'react';
import { RoleExpectationsData } from '../types';
import { ChevronRight, ChevronLeft, Eye } from 'lucide-react';

interface Props {
  data: RoleExpectationsData;
  onUpdate: (data: RoleExpectationsData) => void;
  onNext: () => void;
  onBack: () => void;
  readOnly?: boolean;
}

const RATINGS = [
  "Outstanding",
  "Exceeding Expectations",
  "Meeting Expectations",
  "Developing",
  "Improvement Required"
];

const RoleExpectationsForm: React.FC<Props> = ({ data, onUpdate, onNext, onBack, readOnly }) => {
  return (
    <div className="bg-white rounded-md shadow-sm border border-slate-200 p-8 animate-in fade-in duration-500">
      <h2 className="text-2xl font-semibold text-slate-800 mb-8 flex items-center gap-2">
        Meeting Role Expectations {readOnly && <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded font-normal flex items-center gap-1"><Eye className="w-3 h-3" /> View Only</span>}
      </h2>

      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Rating</label>
            <select
              disabled={readOnly}
              value={data.rating}
              onChange={(e) => onUpdate({ ...data, rating: e.target.value })}
              className={`w-full p-3 border border-slate-200 rounded-sm bg-white text-slate-900 focus:ring-1 focus:ring-[#0072bc] outline-none text-sm ${readOnly ? 'bg-slate-50 opacity-80' : ''}`}
            >
              <option value="">Select a rating...</option>
              {RATINGS.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Rating Description</label>
            <input
              readOnly={readOnly}
              type="text"
              value={data.ratingDescription}
              onChange={(e) => onUpdate({ ...data, ratingDescription: e.target.value })}
              className={`w-full p-3 border border-slate-200 rounded-sm bg-white text-slate-900 focus:ring-1 focus:ring-[#0072bc] outline-none text-sm ${readOnly ? 'bg-slate-50' : ''}`}
              placeholder="e.g. Consistently delivering high quality results..."
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Comment</label>
          <textarea
            readOnly={readOnly}
            value={data.comment}
            onChange={(e) => onUpdate({ ...data, comment: e.target.value })}
            className={`w-full min-h-[140px] p-4 border border-slate-200 rounded-sm bg-white text-slate-900 focus:ring-1 focus:ring-[#0072bc] outline-none text-sm ${readOnly ? 'bg-slate-50' : ''}`}
            placeholder="Detailed feedback regarding role expectations..."
          />
        </div>
      </div>

      <div className="mt-12 flex justify-between border-t border-slate-100 pt-8">
        <button onClick={onBack} className="flex items-center gap-2 px-6 py-2 rounded-md font-bold text-slate-500 hover:bg-slate-50">
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
        <button 
          onClick={onNext} 
          disabled={!data.rating && !readOnly}
          className={`px-8 py-2 rounded-md font-bold flex items-center gap-2 transition-all ${
            data.rating || readOnly ? 'bg-[#0072bc] text-white hover:bg-[#005a96]' : 'bg-slate-100 text-slate-400 cursor-not-allowed'
          }`}
        >
          Next <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default RoleExpectationsForm;
