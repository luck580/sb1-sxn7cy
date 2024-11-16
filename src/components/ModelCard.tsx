import React from 'react';
import { Play, Pause, RefreshCw } from 'lucide-react';

interface ModelCardProps {
  name: string;
  status: string;
  accuracy: number;
  lastUpdated: string;
  darkMode: boolean;
}

function ModelCard({ name, status, accuracy, lastUpdated, darkMode }: ModelCardProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'text-green-500';
      case 'training':
        return 'text-yellow-500';
      default:
        return 'text-red-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return <Play size={16} />;
      case 'training':
        return <RefreshCw size={16} className="animate-spin" />;
      default:
        return <Pause size={16} />;
    }
  };

  return (
    <div
      className={`p-6 rounded-xl ${
        darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
      } shadow-lg`}
    >
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-lg">{name}</h3>
        <div className={`flex items-center space-x-2 ${getStatusColor(status)}`}>
          {getStatusIcon(status)}
          <span className="text-sm">{status}</span>
        </div>
      </div>
      <div className="mt-4 space-y-3">
        <div className="flex justify-between items-center">
          <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Accuracy</span>
          <span className="font-medium">{accuracy}%</span>
        </div>
        <div className="flex justify-between items-center">
          <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Last Updated</span>
          <span className="text-sm">{lastUpdated}</span>
        </div>
      </div>
    </div>
  );
}

export default ModelCard;