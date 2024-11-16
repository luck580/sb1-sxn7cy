import React, { useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import Sidebar from '../navigation/Sidebar';
import Dashboard from '../dashboard/Dashboard';
import UserMenu from '../navigation/UserMenu';

export default function DashboardLayout() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <div className="flex">
        <Sidebar darkMode={darkMode} />
        <main className="flex-1 p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              AI Control Center
            </h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg ${
                  darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
                } hover:opacity-80 transition-opacity`}
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <UserMenu darkMode={darkMode} />
            </div>
          </div>
          <Dashboard darkMode={darkMode} />
        </main>
      </div>
    </div>
  );
}