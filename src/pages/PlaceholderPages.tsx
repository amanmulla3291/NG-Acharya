import PageLayout from '@/components/layout/PageLayout';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

function PlaceholderPage({ title, subtitle, path }: { title: string; subtitle: string; path: string }) {
  return (
    <PageLayout title={title} subtitle={subtitle} breadcrumbItems={[{ label: title }]}>
      <div className="text-center py-16">
        <p className="text-gray-600 text-lg mb-8">This page is coming soon!</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-all"
        >
          Back to Home <ArrowRight size={16} />
        </Link>
      </div>
    </PageLayout>
  );
}

export function AdmissionsPage() {
  return <PlaceholderPage title="Admissions" subtitle="Start your journey with us" path="/admissions" />;
}

export function AcademicsPage() {
  return <PlaceholderPage title="Academics" subtitle="Excellence in education and research" path="/academics" />;
}

export function ScholarshipsPage() {
  return <PlaceholderPage title="Scholarships" subtitle="Support for deserving students" path="/scholarships" />;
}

export function LibraryPage() {
  return <PlaceholderPage title="Library" subtitle="Knowledge at your fingertips" path="/library" />;
}

export function AlumniPage() {
  return <PlaceholderPage title="Alumni" subtitle="Staying connected with our graduates" path="/alumni" />;
}

export function GalleryPage() {
  return <PlaceholderPage title="Gallery" subtitle="Glimpses of life at NG Acharya" path="/gallery" />;
}
