import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import NoticeCard from '@/components/cards/NoticeCard';
import { fetchNotices, fetchNoticesByCategory } from '@/lib/data/notices';
import type { Notice, NoticeCategory } from '@/types';

const categories: NoticeCategory[] = ['All', 'Admission', 'Examination', 'Result', 'General', 'Scholarship', 'Event'];

export default function NoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<NoticeCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await fetchNotices();
      setNotices(data);
      setLoading(false);
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    let result = notices;

    // Category filter
    if (selectedCategory !== 'All') {
      result = result.filter(n => n.category === selectedCategory);
    }

    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        n =>
          n.title.toLowerCase().includes(q) ||
          n.content.toLowerCase().includes(q)
      );
    }

    return result;
  }, [notices, selectedCategory, searchQuery]);

  return (
    <PageLayout
      title="Notices & Circulars"
      subtitle="Stay informed with the latest announcements, admissions updates, examination schedules, and college news."
      breadcrumbItems={[{ label: 'Notices' }]}
    >
      <div className="space-y-8">
        {/* ── Search & Filter Bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Search */}
          <div className="relative">
            <Search size={18} className="absolute left-4 top-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search notices..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-500"
            />
          </div>

          {/* Category tabs */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'bg-navy-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
                <span className="ml-2 text-xs opacity-70">
                  ({notices.filter(n => category === 'All' || n.category === category).length})
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── Results info ── */}
        <div className="flex items-center justify-between">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-navy-900">{filtered.length}</span> notice
            {filtered.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* ── Notices list ── */}
        {loading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-lg skeleton" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-lg">
            <Filter size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-600 text-lg font-medium mb-2">No notices found</p>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((notice, i) => (
              <NoticeCard key={notice.id} notice={notice} index={i} />
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  );
}
