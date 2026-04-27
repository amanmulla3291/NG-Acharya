import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SocialSidebar from '@/components/layout/SocialSidebar';

import HomePage from '@/pages/HomePage';
import CoursesPage from '@/pages/CoursesPage';
import CourseDetailPage from '@/pages/CourseDetailPage';
import NoticesPage from '@/pages/NoticesPage';
import NoticeDetailPage from '@/pages/NoticeDetailPage';
import EventsPage from '@/pages/EventsPage';
import EventDetailPage from '@/pages/EventDetailPage';
import DepartmentsPage from '@/pages/DepartmentsPage';
import DepartmentDetailPage from '@/pages/DepartmentDetailPage';
import InfrastructurePage from '@/pages/InfrastructurePage';
import ContactPage from '@/pages/ContactPage';
import PlacementsPage from '@/pages/PlacementsPage';
import FeeStructurePage from '@/pages/FeeStructurePage';
import StudentZonePage from '@/pages/StudentZonePage';
import AboutOverviewPage from '@/pages/AboutOverviewPage';
import {
  PrincipalPage,
  SecretaryMessagePage,
  FoundersPage,
  GoverningCouncilPage,
  InspirationPage,
} from '@/pages/AboutPages';
import { StaffPage, StaffDetailPage } from '@/pages/StaffPages';
import {
  AdmissionsPage,
  AcademicsPage,
  ScholarshipsPage,
  LibraryPage,
  AlumniPage,
  GalleryPage,
} from '@/pages/PlaceholderPages';

function NotFoundPage() {
  return (
    <main className="flex-1 flex items-center justify-center py-32 px-4">
      <div className="text-center">
        <div className="text-8xl font-display font-bold text-navy-200 mb-4">404</div>
        <h1 className="text-3xl font-display font-bold text-navy-900 mb-4">Page Not Found</h1>
        <p className="text-lg text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <a
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-xl font-semibold hover:bg-teal-700 transition-all"
        >
          ← Back to Home
        </a>
      </div>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-white relative">
        <Navbar />
        <SocialSidebar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutOverviewPage />} />
          <Route path="/about/inspiration" element={<InspirationPage />} />
          <Route path="/about/founders" element={<FoundersPage />} />
          <Route path="/about/governing-council" element={<GoverningCouncilPage />} />
          <Route path="/about/secretary-message" element={<SecretaryMessagePage />} />
          <Route path="/about/principal" element={<PrincipalPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:slug" element={<CourseDetailPage />} />
          <Route path="/notices" element={<NoticesPage />} />
          <Route path="/notices/:slug" element={<NoticeDetailPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:slug" element={<EventDetailPage />} />
          <Route path="/departments" element={<DepartmentsPage />} />
          <Route path="/departments/:slug" element={<DepartmentDetailPage />} />
          <Route path="/infrastructure" element={<InfrastructurePage />} />
          <Route path="/student-zone" element={<StudentZonePage />} />
          <Route path="/placements" element={<PlacementsPage />} />
          <Route path="/fee-structure" element={<FeeStructurePage />} />
          <Route path="/staffs" element={<StaffPage />} />
          <Route path="/staffs/:slug" element={<StaffDetailPage />} />
          <Route path="/admissions" element={<AdmissionsPage />} />
          <Route path="/academics" element={<AcademicsPage />} />
          <Route path="/scholarships" element={<ScholarshipsPage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/alumni" element={<AlumniPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
