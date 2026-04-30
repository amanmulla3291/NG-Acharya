import { useAuth } from '@/context/AuthContext';
import { useNavigate, NavLink } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Search, LogOut, Settings, User } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';

export default function AdminTopbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="h-20 bg-white/80 backdrop-blur-xl border-b border-slate-100 flex items-center justify-between px-6 lg:px-10 flex-shrink-0 z-40 w-full sticky top-0 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_4px_6px_-2px_rgba(0,0,0,0.05)]">
      <div className="flex items-center gap-6">
        <div className="hover:bg-slate-50 p-2 rounded-xl transition-colors">
          <SidebarTrigger />
        </div>
        
        {/* Search Bar */}
        <div className="relative hidden md:block w-80 group">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none group-focus-within:text-blue-600 transition-colors">
            <Search className="h-4 w-4 text-slate-400 group-focus-within:text-blue-600" />
          </div>
          <Input 
            type="search" 
            placeholder="Quick search... (⌘K)" 
            className="w-full bg-slate-50/50 border-slate-100 pl-11 pr-4 focus-visible:ring-blue-500/20 focus-visible:ring-offset-0 focus-visible:border-blue-500 rounded-2xl h-11 transition-all font-medium text-sm placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Center Links - Premium Navigation */}
      <div className="hidden xl:flex flex-1 justify-center">
        <nav className="flex items-center gap-2 bg-slate-50/80 p-1.5 rounded-2xl border border-slate-100">
          <NavLink 
            to="/admin" 
            className={({isActive}) => `px-6 py-2 rounded-xl text-sm font-black transition-all ${isActive ? "bg-white text-navy-900 shadow-sm ring-1 ring-slate-100" : "text-slate-400 hover:text-navy-900"}`} 
            end
          >
            Dashboard
          </NavLink>
          <NavLink 
            to="/admin/notices" 
            className={({isActive}) => `px-6 py-2 rounded-xl text-sm font-black transition-all ${isActive ? "bg-white text-navy-900 shadow-sm ring-1 ring-slate-100" : "text-slate-400 hover:text-navy-900"}`}
          >
            Notices
          </NavLink>
          <NavLink 
            to="/admin/events" 
            className={({isActive}) => `px-6 py-2 rounded-xl text-sm font-black transition-all ${isActive ? "bg-white text-navy-900 shadow-sm ring-1 ring-slate-100" : "text-slate-400 hover:text-navy-900"}`}
          >
            Events
          </NavLink>
          <NavLink 
            to="/admin/settings" 
            className={({isActive}) => `px-6 py-2 rounded-xl text-sm font-black transition-all ${isActive ? "bg-white text-navy-900 shadow-sm ring-1 ring-slate-100" : "text-slate-400 hover:text-navy-900"}`}
          >
            Settings
          </NavLink>
        </nav>
      </div>

      {/* Right-side items */}
      <div className="flex items-center gap-5">
        <div className="h-8 w-px bg-slate-100 hidden sm:block mx-1" />
        
        <DropdownMenu>
          <DropdownMenuTrigger 
            render={(props) => (
              <button {...props} className="flex items-center gap-3 p-1.5 pr-3 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 group focus:outline-none">
                <Avatar className="h-9 w-9 ring-2 ring-white shadow-md group-hover:ring-blue-50 transition-all">
                  <AvatarFallback className="bg-gradient-to-br from-blue-600 to-blue-800 text-white font-black text-xs">
                    {user?.name?.charAt(0).toUpperCase() || 'A'}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden sm:flex flex-col items-start leading-none gap-1 text-left">
                  <span className="text-sm font-black text-navy-900">{user?.name || 'Administrator'}</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">Super Admin</span>
                </div>
              </button>
            )}
          />

          <DropdownMenuContent align="end" className="w-64 p-2 rounded-2xl border-slate-100 shadow-2xl mt-4">
            <DropdownMenuLabel className="font-normal px-3 py-4">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-black text-navy-900 leading-none">{user?.name || 'Administrator'}</p>
                <p className="text-xs font-medium text-slate-400 mt-1">{user?.email || 'admin@example.com'}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-50" />
            <div className="space-y-1 mt-1">
              <DropdownMenuItem className="cursor-pointer rounded-xl h-10 font-bold focus:bg-slate-50 focus:text-navy-900">
                <User className="mr-3 h-4 w-4 text-slate-400" />
                <span>Account Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer rounded-xl h-10 font-bold focus:bg-slate-50 focus:text-navy-900" onClick={() => navigate('/admin/settings')}>
                <Settings className="mr-3 h-4 w-4 text-slate-400" />
                <span>System Settings</span>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator className="bg-slate-50" />
            <DropdownMenuItem className="cursor-pointer rounded-xl h-11 font-black text-red-600 focus:bg-red-50 focus:text-red-700 mt-1" onClick={handleLogout}>
              <LogOut className="mr-3 h-4 w-4" />
              <span>Sign out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
