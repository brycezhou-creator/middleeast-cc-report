import React from 'react';
import { Lock, Unlock } from 'lucide-react';

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (value: boolean) => void;
  label: string;
}

export const ToggleSwitch = ({ checked, onChange, label }: ToggleSwitchProps) => (
  <button 
    onClick={() => onChange(!checked)}
    className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all border ${
      checked ? 'bg-royal/10 border-royal/20 text-royal' : 'bg-gray-100 border-gray-200 text-gray-500'
    }`}
  >
    {checked ? <Lock size={14} /> : <Unlock size={14} />}
    <span className="text-xs font-bold">{label}</span>
    <div className={`w-8 h-4 rounded-full relative transition-colors ${checked ? 'bg-success' : 'bg-gray-300'}`}>
      <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full shadow-sm transition-all ${checked ? 'start-[18px]' : 'start-0.5'}`} />
    </div>
  </button>
);



