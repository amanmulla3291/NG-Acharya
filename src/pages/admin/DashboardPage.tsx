import { Link } from 'react-router-dom';
import { noticeStore, eventStore, courseStore, departmentStore, staffStore, infraStore } from '@/lib/data/stores';

const stats = [
  { label: 'Notices', count: () => noticeStore.count(), icon: 'bi-megaphone', color: 'text-blue-600', bg: 'bg-blue-50', to: '/admin/notices' },
  { label: 'Events', count: () => eventStore.count(), icon: 'bi-calendar-event', color: 'text-green-600', bg: 'bg-green-50', to: '/admin/events' },
  { label: 'Courses', count: () => courseStore.count(), icon: 'bi-book', color: 'text-cyan-600', bg: 'bg-cyan-50', to: '/admin/courses' },
  { label: 'Departments', count: () => departmentStore.count(), icon: 'bi-building', color: 'text-amber-600', bg: 'bg-amber-50', to: '/admin/departments' },
  { label: 'Staff', count: () => staffStore.count(), icon: 'bi-people', color: 'text-red-600', bg: 'bg-red-50', to: '/admin/staff' },
  { label: 'Infrastructure', count: () => infraStore.count(), icon: 'bi-houses', color: 'text-slate-600', bg: 'bg-slate-50', to: '/admin/infrastructure' },
];

export default function DashboardPage() {
  return (
    <>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Overview and quick actions</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h6 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">{s.label}</h6>
                  <h2 className="text-3xl font-bold text-navy-900">{s.count()}</h2>
                </div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${s.bg} ${s.color}`}>
                  <i className={`bi ${s.icon} text-2xl`} />
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-6 py-3 border-t border-gray-100">
              <Link to={s.to} className={`text-sm font-semibold flex items-center ${s.color} hover:opacity-80 transition-opacity`}>
                View all <i className="bi bi-arrow-right ms-2" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-bold text-navy-900">Quick Actions</h3>
        </div>
        <div className="p-6">
          <div className="flex flex-wrap gap-4">
            <Link to="/admin/notices/new" className="px-5 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
              <i className="bi bi-plus-circle" /> New Notice
            </Link>
            <Link to="/admin/events/new" className="px-5 py-2.5 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors flex items-center gap-2">
              <i className="bi bi-plus-circle" /> New Event
            </Link>
            <Link to="/admin/courses/new" className="px-5 py-2.5 bg-cyan-600 text-white rounded-xl font-medium hover:bg-cyan-700 transition-colors flex items-center gap-2">
              <i className="bi bi-plus-circle" /> New Course
            </Link>
            <Link to="/admin/staff/new" className="px-5 py-2.5 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors flex items-center gap-2">
              <i className="bi bi-plus-circle" /> New Staff
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
