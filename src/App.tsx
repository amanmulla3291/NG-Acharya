import { HashRouter, useLocation } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SocialSidebar from '@/components/layout/SocialSidebar';
import AppRoutes from '@/routes/AppRoutes';

function AppShell() {

  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className={isAdmin ? '' : 'flex flex-col min-h-screen bg-white relative'}>
      {!isAdmin && <Navbar />}
      {!isAdmin && <SocialSidebar />}
      <AppRoutes />
      {!isAdmin && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <AppShell />
      </HashRouter>
    </AuthProvider>
  );
}





