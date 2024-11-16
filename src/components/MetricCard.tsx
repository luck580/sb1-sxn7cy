import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  darkMode: boolean;
}

function MetricCard({ icon: Icon, label, value, darkMode }: MetricCardProps) {
  return (
    <div
      className={`p-6 rounded-xl ${
        darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
      } shadow-lg`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{label}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div
          className={`p-3 rounded-full ${
            darkMode ? 'bg-gray-700' : 'bg-indigo-100'
          }`}
        >
          <Icon size={24} className={darkMode ? 'text-indigo-400' : 'text-indigo-600'} />
        </div>
      </div>
    </div>
  );
}

export default MetricCard;