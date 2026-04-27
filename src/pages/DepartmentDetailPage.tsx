import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { fetchDepartmentBySlug } from '@/lib/data/departments';
import type { Department } from '@/types';

export default function DepartmentDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [dept, setDept] = useState<Department | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!slug) return;
      const data = await fetchDepartmentBySlug(slug);
      if (!data) navigate('/departments');
      else setDept(data);
      setLoading(false);
    };
    load();
  }, [slug, navigate]);

  if (loading) return <PageLayout title="Loading..." subtitle=""><div className="skeleton h-32" /></PageLayout>;
  if (!dept) return null;

  return (
    <PageLayout title={dept.name} subtitle={dept.description} breadcrumbItems={[
      { label: 'Departments', href: '/departments' },
      { label: dept.name }
    ]}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="font-display text-3xl font-bold text-navy-900 mb-4">Vision</h2>
            <p className="text-gray-700 text-lg">{dept.vision}</p>
          </section>

          <section>
            <h2 className="font-display text-3xl font-bold text-navy-900 mb-4">Mission</h2>
            <p className="text-gray-700 text-lg">{dept.mission}</p>
          </section>

          {dept.achievements && dept.achievements.length > 0 && (
            <section>
              <h2 className="font-display text-3xl font-bold text-navy-900 mb-6">Achievements</h2>
              <div className="space-y-3">
                {dept.achievements.map((achievement, i) => (
                  <div key={i} className="flex gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <span className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0 mt-2" />
                    <span className="text-gray-800">{achievement}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {dept.facilities && dept.facilities.length > 0 && (
            <section>
              <h2 className="font-display text-3xl font-bold text-navy-900 mb-6">Facilities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {dept.facilities.map((facility, i) => (
                  <div key={i} className="p-4 bg-teal-50 rounded-lg border border-teal-100">
                    <p className="text-teal-900 font-medium">{facility}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-card">
            <h3 className="font-semibold text-navy-900 mb-6">Department Head</h3>
            <div className="mb-6 p-4 bg-navy-50 rounded-lg text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-navy-600 to-teal-600 flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">
                {dept.headName.charAt(0)}
              </div>
              <p className="font-semibold text-navy-900">{dept.headName}</p>
              <p className="text-sm text-gray-600">{dept.headDesignation}</p>
            </div>
            <a href="mailto:dept@ngacharya.edu.in" className="w-full block text-center px-4 py-2 bg-teal-600 text-white rounded-lg font-medium text-sm hover:bg-teal-700 transition-all">
              Contact Department
            </a>
          </div>
        </aside>
      </div>
    </PageLayout>
  );
}
