import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminTopbar from './AdminTopbar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useAuth } from '@/context/AuthContext';

/**
 * Root layout for all /admin/* routes.
 * Uses Tailwind CSS for a modern, smooth admin interface.
 */
export default function AdminLayout() {
  const { isAuthenticated } = useAuth();

  // Guard: If authentication state changes (logout), stop rendering
  // ProtectedRoute will handle the actual redirect.
  if (!isAuthenticated) return null;

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-50 overflow-hidden font-sans-custom w-full">
        <AdminSidebar />
        <div className="flex flex-col flex-1 overflow-hidden w-full">
          <AdminTopbar />
          <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
