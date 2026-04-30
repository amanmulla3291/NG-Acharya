import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AdminTopbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="h-16 bg-white border-b border-gray-200 shadow-sm flex items-center justify-end px-6 flex-shrink-0 z-10">
      {/* Right-side items */}
      <div className="flex items-center gap-4">
        {/* User menu */}
        <div className="relative" ref={dropdownRef}>
          <button 
            className="flex items-center gap-2 text-gray-700 hover:text-navy-700 transition-colors focus:outline-none"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <i className="bi bi-person-circle text-xl" />
            <span className="hidden sm:inline font-medium">
              {user?.name || 'Admin'}
            </span>
            <i className="bi bi-chevron-down text-xs text-gray-400" />
          </button>
          
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.name || 'Administrator'}
                </p>
                <p className="text-xs text-gray-500 truncate mt-1">
                  {user?.email || 'admin@ngacharya.edu'}
                </p>
                <div className="mt-2 inline-block px-2 py-1 bg-navy-100 text-navy-700 text-xs font-semibold rounded-md">
                  {user?.role || 'admin'}
                </div>
              </div>
              <button 
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors flex items-center gap-2"
                onClick={handleLogout}
              >
                <i className="bi bi-box-arrow-right" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
