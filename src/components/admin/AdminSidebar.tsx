import { NavLink } from 'react-router-dom';

const menuItems = [
  { to: '/admin', icon: 'bi-speedometer2', label: 'Dashboard', end: true },
  { to: '/admin/notices', icon: 'bi-megaphone', label: 'Notices' },
  { to: '/admin/events', icon: 'bi-calendar-event', label: 'Events' },
  { to: '/admin/courses', icon: 'bi-book', label: 'Courses' },
  { to: '/admin/departments', icon: 'bi-building', label: 'Departments' },
  { to: '/admin/staff', icon: 'bi-people', label: 'Staff' },
  { to: '/admin/infrastructure', icon: 'bi-houses', label: 'Infrastructure' },
];

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-navy-900 text-white flex flex-col h-screen flex-shrink-0">
      {/* Brand */}
      <div className="h-16 flex items-center px-6 border-b border-navy-800">
        <a href="#/admin" className="text-xl font-bold tracking-wider text-white hover:text-white flex items-center gap-2">
          <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
            <span className="text-navy-900 font-bold text-sm">NG</span>
          </div>
          <span className="font-light">Admin</span>
        </a>
      </div>

      {/* Sidebar Menu */}
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-3">
          {/* Menu Header */}
          <div className="px-3 mb-2 text-xs font-semibold text-navy-300 uppercase tracking-wider">
            Content Management
          </div>

          <ul className="space-y-1 mb-8">
            {menuItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-navy-800 text-white font-medium' 
                        : 'text-navy-100 hover:bg-navy-800 hover:text-white'
                    }`
                  }
                >
                  <i className={`bi ${item.icon} text-lg`} />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Divider */}
          <div className="px-3 mb-2 text-xs font-semibold text-navy-300 uppercase tracking-wider">
            System
          </div>
          <ul className="space-y-1">
            <li>
              <NavLink
                to="/admin/settings"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-navy-800 text-white font-medium' 
                      : 'text-navy-100 hover:bg-navy-800 hover:text-white'
                  }`
                }
              >
                <i className="bi bi-gear text-lg" />
                <span>Settings</span>
              </NavLink>
            </li>
            <li>
              <a 
                href="#/" 
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-teal-400 hover:bg-navy-800 transition-colors mt-4 border border-navy-800"
              >
                <i className="bi bi-arrow-left-circle text-lg" />
                <span>Back to Site</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}
