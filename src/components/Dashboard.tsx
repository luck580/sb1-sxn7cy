import React from 'react';
import { Activity, Brain, Database, Users } from 'lucide-react';
import MetricCard from './MetricCard';
import ModelCard from './ModelCard';
import ChatInterface from './chat/ChatInterface';

interface DashboardProps {
  darkMode: boolean;
}

const metrics = [
  { icon: Activity, label: 'Active Models', value: '12' },
  { icon: Brain, label: 'Training Jobs', value: '5' },
  { icon: Database, label: 'Data Points', value: '1.2M' },
  { icon: Users, label: 'Active Users', value: '328' },
];

const models = [
  {
    name: 'Prediction Model Alpha',
    status: 'Active',
    accuracy: 97.8,
    lastUpdated: '2h ago',
  },
  {
    name: 'Classification Beta',
    status: 'Training',
    accuracy: 94.2,
    lastUpdated: '5h ago',
  },
  {
    name: 'Reinforcement Model',
    status: 'Stopped',
    accuracy: 89.5,
    lastUpdated: '1d ago',
  },
];

function Dashboard({ darkMode }: DashboardProps) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} darkMode={darkMode} />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          {models.map((model) => (
            <ModelCard key={model.name} {...model} darkMode={darkMode} />
          ))}
        </div>
        <ChatInterface darkMode={darkMode} />
      </div>
    </div>
  );
}

export default Dashboard;