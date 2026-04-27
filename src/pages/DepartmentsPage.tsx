import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, BookOpen, Award, ArrowRight } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { fetchDepartments } from '@/lib/data/departments';
import type { Department } from '@/types';

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await fetchDepartments();
      setDepartments(data);
      setLoading(false);
    };
    load();
  }, []);

  return (
    <PageLayout
      title="Academic Departments"
      subtitle="Meet our 6 departments driving excellence in commerce, technology, media, and humanities."
      breadcrumbItems={[{ label: 'Departments' }]}
    >
      <div className="space-y-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-lg skeleton" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {departments.map((dept, i) => (
              <motion.div
                key={dept.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  to={`/departments/${dept.slug}`}
                  className="group block bg-white rounded-xl border border-gray-100 shadow-card hover:shadow-hover hover:-translate-y-1 transition-all duration-300 overflow-hidden h-full"
                >
                  {/* Gradient header */}
                  <div className="h-3 bg-gradient-to-r from-navy-700 to-teal-500" />

                  <div className="p-6 md:p-8">
                    {/* Icon + title */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-display font-bold text-navy-900 text-xl leading-tight mb-1 group-hover:text-navy-700 transition-colors">
                          {dept.name}
                        </h3>
                        <p className="text-xs text-gray-500 font-mono">{dept.shortName}</p>
                      </div>
                      <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center group-hover:bg-teal-200 transition-colors">
                        <BookOpen size={20} className="text-teal-600" />
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-600 line-clamp-2 mb-5">
                      {dept.description}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-3 mb-5 pt-5 border-t border-gray-100">
                      <div>
                        <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Est.</p>
                        <p className="text-sm font-semibold text-navy-800">{dept.established}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Programmes</p>
                        <p className="text-sm font-semibold text-navy-800">{dept.courses.length}</p>
                      </div>
                    </div>

                    {/* Head info */}
                    <div className="flex items-center gap-2 text-xs text-gray-600 mb-5">
                      <Users size={12} className="text-teal-500" />
                      <span className="font-medium">
                        Headed by {dept.headName.split(' ')[0]}
                      </span>
                    </div>

                    {/* CTA */}
                    <span className="inline-flex items-center gap-1 text-teal-600 text-sm font-semibold group-hover:gap-2 transition-all">
                      Explore <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  );
}
