import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu';
import { 
  LogOut, 
  Settings, 
  User, 
  LayoutDashboard, 
  Megaphone, 
  Calendar, 
  BookOpen, 
  Network, 
  Building2, 
  Users,
  ExternalLink,
  ChevronUp
} from 'lucide-react';

const navigateItems = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/admin/notices', icon: Megaphone, label: 'Notices & Announcements' },
  { to: '/admin/events', icon: Calendar, label: 'Events & Media' },
  { to: '/admin/courses', icon: BookOpen, label: 'Courses' },
  { to: '/admin/departments', icon: Network, label: 'Departments' },
  { to: '/admin/infrastructure', icon: Building2, label: 'Infrastructure' },
  { to: '/admin/staff', icon: Users, label: 'Faculty & Staff' },
];

export default function AdminSidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Sidebar className="border-r border-slate-200/60 bg-white/80 backdrop-blur-xl">
      <SidebarHeader className="h-16 flex items-center justify-center border-b border-slate-100 px-6">
        <a href="#/admin" className="text-sm font-bold tracking-tight text-navy-900 flex items-center gap-3 w-full">
          <div className="p-1.5 bg-blue-50 rounded-lg">
            <img src="/logo.png" alt="AMC Logo" className="w-6 h-6 object-contain" />
          </div>
          <span className="leading-tight font-black uppercase tracking-wider text-[11px]">
            Admin Portal
          </span>
        </a>
      </SidebarHeader>

      <SidebarContent className="custom-scrollbar py-6 px-3">
        <SidebarGroup>
          <SidebarGroupLabel className="text-navy-900/40 font-black uppercase tracking-widest text-[10px] mb-4 px-4">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {navigateItems.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) =>
                      `group flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 ${
                        isActive 
                          ? 'bg-navy-900 text-white shadow-lg shadow-navy-900/20' 
                          : 'text-slate-500 hover:bg-slate-100 hover:text-navy-900'
                      }`
                    }
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    <span className="text-sm font-bold tracking-tight">{item.label}</span>
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-navy-900/40 font-black uppercase tracking-widest text-[10px] mb-4 mt-8 px-4">Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              <SidebarMenuItem>
                <NavLink
                  to="/admin/settings"
                  className={({ isActive }) =>
                    `group flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 ${
                      isActive 
                        ? 'bg-navy-900 text-white shadow-lg shadow-navy-900/20' 
                        : 'text-slate-500 hover:bg-slate-100 hover:text-navy-900'
                    }`
                  }
                >
                  <Settings className="h-5 w-5 shrink-0" />
                  <span className="text-sm font-bold tracking-tight">System Settings</span>
                </NavLink>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-navy-900/40 font-black uppercase tracking-widest text-[10px] mb-4 mt-8 px-4">External</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              <SidebarMenuItem>
                <a 
                  href="#/" 
                  className="group flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 text-slate-500 hover:bg-slate-100 hover:text-navy-900"
                >
                  <ExternalLink className="h-5 w-5 shrink-0" />
                  <span className="text-sm font-bold tracking-tight">Live Website</span>
                </a>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-200 p-4">
        <DropdownMenu>
          <DropdownMenuTrigger 
            nativeButton={false}
            render={(props) => (
              <div {...props} className="flex items-center gap-3 overflow-hidden cursor-pointer hover:bg-gray-50 p-2 rounded-xl transition-colors">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-blue-100 text-blue-600 font-bold">
                    {user?.name?.charAt(0).toUpperCase() || 'A'}
                  </AvatarFallback>
                </Avatar>
                <div className="overflow-hidden flex-1 text-left">
                  <div className="text-sm font-bold text-gray-900 truncate">{user?.name || 'Admin User'}</div>
                  <div className="text-xs text-gray-500 truncate">{user?.email || 'admin@example.com'}</div>
                </div>
                <ChevronUp className="h-4 w-4 text-gray-400" />
              </div>
            )}
          />

          <DropdownMenuContent side="top" className="w-56" align="end" sideOffset={10}>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
