import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

// ── Public Pages ──────────────────────────────────────────────
import HomePage from '@/pages/HomePage';
import AboutOverviewPage from '@/pages/AboutOverviewPage';
import {
  PrincipalPage,
  SecretaryMessagePage,
  FoundersPage,
  GoverningCouncilPage,
  InspirationPage,
} from '@/pages/AboutPages';
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
import {
  AdmissionsPage,
  AcademicsPage,
  ScholarshipsPage,
  LibraryPage,
  AlumniPage,
  GalleryPage,
} from '@/pages/PlaceholderPages';
import LoginPage from '@/pages/LoginPage';

// ── Protected Pages ───────────────────────────────────────────
import PlacementsPage from '@/pages/PlacementsPage';
import FeeStructurePage from '@/pages/FeeStructurePage';
import StudentZonePage from '@/pages/StudentZonePage';
import { StaffPage, StaffDetailPage } from '@/pages/StaffPages';

// ── Admin ─────────────────────────────────────────────────────
import AdminLayout from '@/components/admin/AdminLayout';
import DashboardPage from '@/pages/admin/DashboardPage';
import NoticeListPage from '@/pages/admin/notices/NoticeListPage';
import NoticeFormPage from '@/pages/admin/notices/NoticeFormPage';
import EventListPage from '@/pages/admin/events/EventListPage';
import EventFormPage from '@/pages/admin/events/EventFormPage';
import CourseListPage from '@/pages/admin/courses/CourseListPage';
import CourseFormPage from '@/pages/admin/courses/CourseFormPage';
import DepartmentListPage from '@/pages/admin/departments/DepartmentListPage';
import DepartmentFormPage from '@/pages/admin/departments/DepartmentFormPage';
import StaffListPage from '@/pages/admin/staff/StaffListPage';
import StaffFormPage from '@/pages/admin/staff/StaffFormPage';
import InfraListPage from '@/pages/admin/infrastructure/InfraListPage';
import InfraFormPage from '@/pages/admin/infrastructure/InfraFormPage';
import SettingsPage from '@/pages/admin/settings/SettingsPage';

// ── 404 ───────────────────────────────────────────────────────
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
          href="#/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-xl font-semibold hover:bg-teal-700 transition-all"
        >
          ← Back to Home
        </a>
      </div>
    </main>
  );
}

// ── Route Definitions ─────────────────────────────────────────
export default function AppRoutes() {
  return (
    <Routes>
      {/* ─── Public Routes ─────────────────────────────────── */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* About */}
      <Route path="/about" element={<AboutOverviewPage />} />
      <Route path="/about/inspiration" element={<InspirationPage />} />
      <Route path="/about/founders" element={<FoundersPage />} />
      <Route path="/about/governing-council" element={<GoverningCouncilPage />} />
      <Route path="/about/secretary-message" element={<SecretaryMessagePage />} />
      <Route path="/about/principal" element={<PrincipalPage />} />

      {/* Courses */}
      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/courses/:slug" element={<CourseDetailPage />} />

      {/* Notices */}
      <Route path="/notices" element={<NoticesPage />} />
      <Route path="/notices/:slug" element={<NoticeDetailPage />} />

      {/* Events */}
      <Route path="/events" element={<EventsPage />} />
      <Route path="/events/:slug" element={<EventDetailPage />} />

      {/* Departments */}
      <Route path="/departments" element={<DepartmentsPage />} />
      <Route path="/departments/:slug" element={<DepartmentDetailPage />} />

      {/* Other public */}
      <Route path="/infrastructure" element={<InfrastructurePage />} />
      <Route path="/admissions" element={<AdmissionsPage />} />
      <Route path="/academics" element={<AcademicsPage />} />
      <Route path="/scholarships" element={<ScholarshipsPage />} />
      <Route path="/library" element={<LibraryPage />} />
      <Route path="/alumni" element={<AlumniPage />} />
      <Route path="/gallery" element={<GalleryPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/staffs" element={<StaffPage />} />
      <Route path="/staffs/:slug" element={<StaffDetailPage />} />

      {/* ─── Public Informational Pages ─────────────────────── */}
      <Route path="/student-zone" element={<StudentZonePage />} />
      <Route path="/placements" element={<PlacementsPage />} />
      <Route path="/fee-structure" element={<FeeStructurePage />} />

      {/* ─── Admin Routes (require admin role) ─────────────── */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />

        {/* Notices */}
        <Route path="notices" element={<NoticeListPage />} />
        <Route path="notices/new" element={<NoticeFormPage />} />
        <Route path="notices/:id/edit" element={<NoticeFormPage />} />

        {/* Events */}
        <Route path="events" element={<EventListPage />} />
        <Route path="events/new" element={<EventFormPage />} />
        <Route path="events/:id/edit" element={<EventFormPage />} />

        {/* Courses */}
        <Route path="courses" element={<CourseListPage />} />
        <Route path="courses/new" element={<CourseFormPage />} />
        <Route path="courses/:id/edit" element={<CourseFormPage />} />

        {/* Departments */}
        <Route path="departments" element={<DepartmentListPage />} />
        <Route path="departments/new" element={<DepartmentFormPage />} />
        <Route path="departments/:id/edit" element={<DepartmentFormPage />} />

        {/* Staff */}
        <Route path="staff" element={<StaffListPage />} />
        <Route path="staff/new" element={<StaffFormPage />} />
        <Route path="staff/:id/edit" element={<StaffFormPage />} />

        {/* Infrastructure */}
        <Route path="infrastructure" element={<InfraListPage />} />
        <Route path="infrastructure/new" element={<InfraFormPage />} />
        <Route path="infrastructure/:id/edit" element={<InfraFormPage />} />
        
        {/* Settings */}
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      {/* ─── Catch-all ─────────────────────────────────────── */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
