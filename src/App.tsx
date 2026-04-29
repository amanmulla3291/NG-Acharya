import { HashRouter } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SocialSidebar from '@/components/layout/SocialSidebar';
import AppRoutes from '@/routes/AppRoutes';

export default function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <div className="flex flex-col min-h-screen bg-white relative">
          <Navbar />
          <SocialSidebar />
          <AppRoutes />
          <Footer />
        </div>
      </HashRouter>
    </AuthProvider>
  );
}
