import { Link } from 'react-router-dom';
import { Calendar, FileText, ArrowRight, Star, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Notice } from '@/types';
import { cn } from '@/utils/cn';

const categoryColors: Record<string, string> = {
  Admission: 'bg-blue-100 text-blue-700 border-blue-200',
  Examination: 'bg-purple-100 text-purple-700 border-purple-200',
  Result: 'bg-green-100 text-green-700 border-green-200',
  General: 'bg-gray-100 text-gray-700 border-gray-200',
  Scholarship: 'bg-amber-100 text-amber-700 border-amber-200',
  Event: 'bg-rose-100 text-rose-700 border-rose-200',
};

interface NoticeCardProps {
  notice: Notice;
  index?: number;
}

export default function NoticeCard({ notice, index = 0 }: NoticeCardProps) {
  const isExpiring = notice.expiresAt && new Date(notice.expiresAt).getTime() - Date.now() < 7 * 24 * 60 * 60 * 1000;
  const published = new Date(notice.publishedAt);
  const daysAgo = Math.floor((Date.now() - published.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Link
        to={`/notices/${notice.slug}`}
        className="group block bg-white hover:bg-navy-50/50 transition-colors duration-300 relative"
      >
        <div className="flex gap-4 p-5 sm:p-6">
          {/* ── Left: Date Block ── */}
          <div className="w-16 h-16 flex flex-col items-center justify-center flex-shrink-0 bg-navy-900 text-white rounded-xl shadow-md border border-navy-700 group-hover:scale-105 transition-transform duration-300">
            <span className="text-[10px] font-bold tracking-widest uppercase text-navy-200">{published.toLocaleDateString('en-IN', { month: 'short' })}</span>
            <span className="text-2xl font-bold leading-none mt-0.5">{published.getDate()}</span>
          </div>

          {/* ── Content ── */}
          <div className="flex-1 min-w-0">
            {/* ── Header ── */}
            <div className="flex items-start gap-2 mb-2">
              <span className={cn(
                'inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full border whitespace-nowrap',
                categoryColors[notice.category]
              )}>
                {notice.isImportant && <Star size={10} />}
                {notice.category}
              </span>
              <span className="text-xs text-gray-400 ml-auto">{daysAgo === 0 ? 'Today' : `${daysAgo}d ago`}</span>
            </div>

            {/* ── Title ── */}
            <h3 className="font-semibold text-navy-900 text-sm leading-snug line-clamp-2 group-hover:text-navy-700 transition-colors mb-2">
              {notice.title}
            </h3>

            {/* ── Preview ── */}
            <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-3">
              {notice.content.split('\n')[0]}
            </p>

            {/* ── Footer ── */}
            <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
              <div className="flex items-center gap-2 font-medium">
                {daysAgo === 0 ? 'Published Today' : `Published ${daysAgo} days ago`}
              </div>
              <div className="flex items-center gap-4">
                {notice.attachmentUrl && (
                  <span className="flex items-center gap-1 text-teal-600 font-medium">
                    <FileText size={12} />
                    PDF
                  </span>
                )}
                <span className="flex items-center gap-1 text-navy-600 font-bold group-hover:text-teal-600 transition-colors">
                  Read Notice <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Expiring indicator ── */}
        {isExpiring && (
          <div className="px-5 py-2 bg-orange-50 border-t border-orange-100 text-xs text-orange-700 font-medium">
            ⚠️ Expiring soon — {notice.expiresAt && new Date(notice.expiresAt).toLocaleDateString('en-IN')}
          </div>
        )}
      </Link>
    </motion.div>
  );
}
