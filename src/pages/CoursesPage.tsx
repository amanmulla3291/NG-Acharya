import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, X } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import CourseCard from '@/components/cards/CourseCard';
import { fetchCourses } from '@/lib/data/courses';
import type { Course, CourseLevel } from '@/types';

const levels: { value: CourseLevel; label: string }[] = [
  { value: 'UG', label: 'Undergraduate' },
  { value: 'PG', label: 'Postgraduate' },
  { value: 'PhD', label: 'Ph.D.' },
  { value: 'Certificate', label: 'Certificate' },
  { value: 'Junior College', label: 'Junior College' },
  { value: 'Unaided', label: 'Unaided' },
];

export default function CoursesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevels, setSelectedLevels] = useState<CourseLevel[]>(() => {
    const level = searchParams.get('level');
    return level ? [level as CourseLevel] : [];
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await fetchCourses();
      setCourses(data);
      setLoading(false);
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    let result = courses;

    // Level filter
    if (selectedLevels.length > 0) {
      result = result.filter(c => selectedLevels.includes(c.level));
    }

    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        c =>
          c.title.toLowerCase().includes(q) ||
          c.shortTitle.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q)
      );
    }

    return result;
  }, [courses, selectedLevels, searchQuery]);

  const handleLevelToggle = (level: CourseLevel) => {
    setSelectedLevels(prev =>
      prev.includes(level)
        ? prev.filter(l => l !== level)
        : [...prev, level]
    );
  };

  const handleClearFilters = () => {
    setSelectedLevels([]);
    setSearchQuery('');
  };

  return (
    <PageLayout
      title="Academic Programmes"
      subtitle="Explore 25+ undergraduate, postgraduate, and professional programmes designed to shape your future."
      breadcrumbItems={[{ label: 'Courses' }]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* ── Sidebar filters ── */}
        <aside
          className={`${
            showFilters ? 'block' : 'hidden'
          } lg:block lg:sticky lg:top-24 h-fit`}
        >
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-card">
            <div className="flex items-center justify-between mb-6 lg:hidden">
              <h3 className="font-semibold text-navy-900">Filters</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-all"
              >
                <X size={18} />
              </button>
            </div>

            {/* Search */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">
                Search
              </label>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>

            {/* Level filter */}
            <div className="mb-6">
              <h4 className="text-xs font-semibold text-gray-600 uppercase mb-3">
                Programme Level
              </h4>
              <div className="space-y-2">
                {levels.map(level => (
                  <label key={level.value} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedLevels.includes(level.value)}
                      onChange={() => handleLevelToggle(level.value)}
                      className="w-4 h-4 rounded accent-teal-600"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-navy-900 transition-colors">
                      {level.label}
                    </span>
                    <span className="ml-auto text-xs text-gray-400">
                      {courses.filter(c => c.level === level.value).length}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Clear filters */}
            {(selectedLevels.length > 0 || searchQuery) && (
              <button
                onClick={handleClearFilters}
                className="w-full py-2 px-4 text-sm font-medium text-teal-600 hover:text-teal-700 border border-teal-200 rounded-lg hover:bg-teal-50 transition-all"
              >
                Clear All Filters
              </button>
            )}
          </div>
        </aside>

        {/* ── Main content ── */}
        <main className="lg:col-span-3">
          {/* Filter toggle (mobile) */}
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <h2 className="font-semibold text-navy-900">
              {filtered.length} Programme{filtered.length !== 1 ? 's' : ''}
            </h2>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-navy-900 text-white rounded-lg hover:bg-navy-800 transition-all"
            >
              <Filter size={16} />
              Filters
            </button>
          </div>

          {/* Results header */}
          <div className="mb-8">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-navy-900">{filtered.length}</span> of{' '}
              <span className="font-semibold text-navy-900">{courses.length}</span> programmes
            </p>
          </div>

          {/* Loading state */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-96 bg-gray-200 rounded-2xl skeleton" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg mb-2">No programmes found</p>
              <p className="text-gray-500 text-sm">
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={handleClearFilters}
                className="mt-6 px-6 py-2 text-sm font-medium text-teal-600 border border-teal-600 rounded-lg hover:bg-teal-50 transition-all"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filtered.map((course, i) => (
                <CourseCard key={course.id} course={course} index={i} />
              ))}
            </div>
          )}
        </main>
      </div>
    </PageLayout>
  );
}
