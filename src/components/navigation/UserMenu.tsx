import React, { useState, useRef } from 'react';
import { User, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useClickOutside } from '../../hooks/useClickOutside';

interface UserMenuProps {
  darkMode: boolean;
}

function UserMenu({ darkMode }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();

  useClickOutside(menuRef, () => setIsOpen(false));

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 p-2 rounded-lg ${
          darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
        }`}
      >
        <User size={20} className={darkMode ? 'text-white' : 'text-gray-800'} />
        <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          {user?.email}
        </span>
      </button>

      {isOpen && (
        <div
          className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          } ring-1 ring-black ring-opacity-5`}
        >
          <button
            onClick={logout}
            className={`flex items-center w-full px-4 py-2 text-sm ${
              darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <LogOut size={16} className="mr-2" />
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}

export default UserMenu;