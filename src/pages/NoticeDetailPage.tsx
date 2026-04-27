import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Calendar, Clock, User, Download, Share2, AlertCircle,
  FileText, Star
} from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { fetchNoticeBySlug } from '@/lib/data/notices';
import { formatDate, timeAgo } from '@/utils/cn';
import type { Notice } from '@/types';

const categoryColors: Record<string, string> = {
  Admission: 'bg-blue-100 text-blue-700 border-blue-200',
  Examination: 'bg-purple-100 text-purple-700 border-purple-200',
  Result: 'bg-green-100 text-green-700 border-green-200',
  General: 'bg-gray-100 text-gray-700 border-gray-200',
  Scholarship: 'bg-amber-100 text-amber-700 border-amber-200',
  Event: 'bg-rose-100 text-rose-700 border-rose-200',
};

export default function NoticeDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [notice, setNotice] = useState<Notice | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!slug) return;
      setLoading(true);
      const data = await fetchNoticeBySlug(slug);
      if (!data) navigate('/notices');
      else setNotice(data);
      setLoading(false);
    };
    load();
  }, [slug, navigate]);

  if (loading)
    return (
      <PageLayout title="Loading..." subtitle="">
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-lg skeleton" />
          ))}
        </div>
      </PageLayout>
    );

  if (!notice) return null;

  const published = new Date(notice.publishedAt);
  const isExpiring = notice.expiresAt && new Date(notice.expiresAt).getTime() - Date.now() < 7 * 24 * 60 * 60 * 1000;

  return (
    <>
      <div className="bg-section-gradient py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4">
          <button
            onClick={() => navigate('/notices')}
            className="flex items-center gap-2 text-navy-600 hover:text-navy-700 transition-colors mb-6"
          >
            <ArrowLeft size={18} />
            Back to Notices
          </button>

          <div className="space-y-4">
            {/* Category badge */}
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full border ${categoryColors[notice.category]}`}>
                {notice.isImportant && <Star size={10} />}
                {notice.category}
              </span>
              {isExpiring && (
                <span className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-orange-100 text-orange-700 border border-orange-200">
                  <AlertCircle size={10} />
                  Expiring Soon
                </span>
              )}
            </div>

            <h1 className="font-display text-4xl md:text-5xl font-bold text-navy-900 text-balance">
              {notice.title}
            </h1>

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 pt-2">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-teal-600" />
                {formatDate(notice.publishedAt, 'long')}
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-teal-600" />
                {timeAgo(notice.publishedAt)}
              </div>
              <div className="flex items-center gap-2">
                <User size={16} className="text-teal-600" />
                {notice.postedBy}
              </div>
              {notice.expiresAt && (
                <div className="flex items-center gap-2 text-orange-600 font-medium">
                  <AlertCircle size={16} />
                  Expires: {formatDate(notice.expiresAt)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-4xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Notice content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl border border-gray-100 p-8 md:p-10 shadow-card"
            >
              <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
                {notice.content}
              </div>

              {/* Attachment */}
              {notice.attachmentUrl && (
                <div className="mt-8 pt-8 border-t border-gray-100">
                  <h3 className="font-semibold text-navy-900 mb-4 flex items-center gap-2">
                    <FileText size={18} className="text-teal-600" />
                    Attachments
                  </h3>
                  <a
                    href={notice.attachmentUrl}
                    download
                    className="flex items-center gap-3 px-4 py-3 border border-teal-200 rounded-lg text-teal-600 hover:bg-teal-50 transition-all"
                  >
                    <Download size={16} />
                    <div>
                      <p className="font-medium text-sm">{notice.attachmentName}</p>
                      <p className="text-xs text-gray-500">PDF Document</p>
                    </div>
                  </a>
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Share */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl border border-gray-100 p-6 shadow-card"
            >
              <h3 className="font-semibold text-navy-900 mb-4">Share This Notice</h3>
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all font-medium">
                <Share2 size={16} />
                Share
              </button>
            </motion.div>

            {/* Related actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-blue-50 rounded-xl border border-blue-100 p-6"
            >
              <h3 className="font-semibold text-blue-900 mb-3">Need More Help?</h3>
              <p className="text-sm text-blue-700 mb-4">
                For any questions regarding this notice, contact the college office.
              </p>
              <a
                href="tel:+912225224175"
                className="block text-center w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium text-sm"
              >
                Call: +91 22 2522 4175
              </a>
            </motion.div>

            {/* Quick links */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl border border-gray-100 p-6 shadow-card space-y-2"
            >
              <h3 className="font-semibold text-navy-900 mb-4 text-sm">Quick Links</h3>
              <Link to="/notices" className="block text-sm text-teal-600 hover:text-teal-700 font-medium">
                ← All Notices
              </Link>
              <Link to="/courses" className="block text-sm text-teal-600 hover:text-teal-700 font-medium">
                View Programmes
              </Link>
              <Link to="/contact" className="block text-sm text-teal-600 hover:text-teal-700 font-medium">
                Contact Admissions
              </Link>
            </motion.div>
          </aside>
        </div>
      </main>
    </>
  );
}
