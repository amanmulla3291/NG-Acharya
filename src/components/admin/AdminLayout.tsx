import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminTopbar from './AdminTopbar';

/**
 * Root layout for all /admin/* routes.
 * Uses Tailwind CSS for a modern, smooth admin interface.
 */
export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans-custom">
      <AdminSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminTopbar />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
