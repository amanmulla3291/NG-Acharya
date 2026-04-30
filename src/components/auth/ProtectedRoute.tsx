import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  /** Optional: restrict to specific roles */
  allowedRoles?: Array<'student' | 'staff' | 'admin'>;
}

/**
 * Wraps a route to require authentication.
 * Redirects to /login with the original location preserved for post-login redirect.
 * Optionally restricts access to specific user roles.
 */
export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Preserve the attempted URL so we can redirect after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return (
      <main className="flex-1 flex items-center justify-center py-32 px-4">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-3xl font-display font-bold text-navy-900 mb-4">
            Access Denied
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            You don't have permission to view this page.
          </p>
          <a
            href="#/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-xl font-semibold hover:bg-teal-700 transition-all"
          >
            ← Back to Home
          </a>
        </div>
      </main>
    );
  }

  return <>{children}</>;
}
