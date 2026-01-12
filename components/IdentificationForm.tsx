
import React from 'react';
import { User, Building2, Briefcase, Mail, Hash, ChevronRight } from 'lucide-react';
import { EmployeeInfo } from '../types';

interface Props {
  data: EmployeeInfo;
  onUpdate: (data: EmployeeInfo) => void;
  onNext: () => void;
}

const IdentificationForm: React.FC<Props> = ({ data, onUpdate, onNext }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ ...data, [e.target.name]: e.target.value });
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isFormValid = 
    data.fullName.trim() !== '' && 
    data.employeeId.trim() !== '' && 
    data.managerEmail.trim() !== '' && 
    isValidEmail(data.managerEmail);

  return (
    <div className="bg-white rounded-md shadow-sm border border-slate-200 p-8 animate-in fade-in duration-500">
      <div className="mb-8 border-b border-slate-100 pb-4">
        <h2 className="text-2xl font-semibold text-slate-800">Identify Yourself</h2>
        <p className="text-slate-500 text-sm mt-1">Provide your professional details to start the evaluation.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
             Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={data.fullName}
            onChange={handleChange}
            placeholder="Victor Verhogliadov"
            className="w-full px-4 py-2.5 rounded-sm border border-slate-200 bg-white text-slate-900 focus:ring-1 focus:ring-[#0072bc] focus:border-[#0072bc] outline-none transition-all text-sm"
            required
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Employee ID
          </label>
          <input
            type="text"
            name="employeeId"
            value={data.employeeId}
            onChange={handleChange}
            placeholder="MNT-9982"
            className="w-full px-4 py-2.5 rounded-sm border border-slate-200 bg-white text-slate-900 focus:ring-1 focus:ring-[#0072bc] focus:border-[#0072bc] outline-none transition-all text-sm"
            required
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Department
          </label>
          <input
            type="text"
            name="department"
            value={data.department}
            onChange={handleChange}
            placeholder="Touchpoint FoodTech"
            className="w-full px-4 py-2.5 rounded-sm border border-slate-200 bg-white text-slate-900 focus:ring-1 focus:ring-[#0072bc] focus:border-[#0072bc] outline-none transition-all text-sm"
            required
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Position
          </label>
          <input
            type="text"
            name="position"
            value={data.position}
            onChange={handleChange}
            placeholder="Operations Specialist"
            className="w-full px-4 py-2.5 rounded-sm border border-slate-200 bg-white text-slate-900 focus:ring-1 focus:ring-[#0072bc] focus:border-[#0072bc] outline-none transition-all text-sm"
            required
          />
        </div>

        <div className="md:col-span-2 space-y-1.5 pt-4">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Manager's Email Address *
          </label>
          <input
            type="email"
            name="managerEmail"
            value={data.managerEmail}
            onChange={handleChange}
            placeholder="manager@munters.com"
            className={`w-full px-4 py-2.5 rounded-sm border bg-white text-slate-900 focus:ring-1 outline-none transition-all text-sm ${
              data.managerEmail && !isValidEmail(data.managerEmail) 
              ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
              : 'border-slate-200 focus:ring-[#0072bc] focus:border-[#0072bc]'
            }`}
            required
          />
          {data.managerEmail && !isValidEmail(data.managerEmail) && (
            <p className="text-[10px] text-red-500 mt-1">Please enter a valid email address.</p>
          )}
          <p className="text-[11px] text-slate-400 mt-1 italic">This field is mandatory. The completion report will be sent to this address.</p>
        </div>
      </div>

      <div className="mt-10 flex justify-end">
        <button
          onClick={onNext}
          disabled={!isFormValid}
          className={`flex items-center gap-2 px-8 py-2.5 rounded-md font-bold transition-all ${
            isFormValid 
              ? 'bg-[#0072bc] hover:bg-[#005a96] text-white shadow-md' 
              : 'bg-slate-100 text-slate-400 cursor-not-allowed opacity-50'
          }`}
        >
          Start Evaluation <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default IdentificationForm;
