import React from 'react';
import { Brain, BarChart3, Database, Settings } from 'lucide-react';

const menuItems = [
  { icon: Brain, label: 'Models' },
  { icon: BarChart3, label: 'Analytics' },
  { icon: Database, label: 'Data Sources' },
  { icon: Settings, label: 'Settings' },
];

function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-indigo-600 text-white p-6">
      <div className="flex items-center space-x-3 mb-8">
        <Brain size={32} />
        <h2 className="text-xl font-bold">AI Platform</h2>
      </div>
      <nav>
        <ul className="space-y-4">
          {menuItems.map(({ icon: Icon, label }) => (
            <li key={label}>
              <button className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-indigo-700 transition-colors">
                <Icon size={20} />
                <span>{label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;