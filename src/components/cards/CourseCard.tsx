import { Link } from 'react-router-dom';
import { Clock, Users, ArrowRight, BookOpen, BadgeCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Course } from '@/types';
import { cn } from '@/utils/cn';

const levelColors: Record<string, string> = {
  UG: 'bg-navy-100 text-navy-700',
  PG: 'bg-teal-100 text-teal-700',
  PhD: 'bg-purple-100 text-purple-700',
  Certificate: 'bg-amber-100 text-amber-700',
  'Junior College': 'bg-rose-100 text-rose-700',
  Unaided: 'bg-orange-100 text-orange-700',
};

interface CourseCardProps {
  course: Course;
  index?: number;
}

export default function CourseCard({ course, index = 0 }: CourseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
    >
      <Link
        to={`/courses/${course.slug}`}
        className="group block h-full bg-white rounded-2xl border border-gray-100 shadow-card hover:shadow-hover hover:-translate-y-1 transition-all duration-300 overflow-hidden"
      >
        {/* ── Top accent ── */}
        <div className="h-1.5 bg-gradient-to-r from-navy-700 to-teal-500" />

        <div className="p-6">
          {/* ── Badges ── */}
          <div className="flex items-center gap-2 mb-4">
            <span className={cn(
              'inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full',
              levelColors[course.level] ?? 'bg-gray-100 text-gray-700'
            )}>
              <BookOpen size={10} />
              {course.level}
            </span>
            {course.admissionOpen && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-green-100 text-green-700">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 badge-pulse" />
                Admissions Open
              </span>
            )}
          </div>

          {/* ── Title ── */}
          <h3 className="font-display font-bold text-navy-900 text-lg leading-snug mb-1 group-hover:text-navy-700 transition-colors">
            {course.shortTitle}
          </h3>
          <p className="text-xs text-gray-500 mb-3 font-medium">{course.title}</p>

          {/* ── Description ── */}
          <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed mb-5">
            {course.description}
          </p>

          {/* ── Meta ── */}
          <div className="flex items-center gap-4 text-xs text-gray-500 mb-5">
            <span className="flex items-center gap-1.5">
              <Clock size={13} className="text-teal-500" />
              {course.duration}
            </span>
            <span className="flex items-center gap-1.5">
              <Users size={13} className="text-teal-500" />
              {course.seats} Seats
            </span>
            <span className="flex items-center gap-1.5">
              <BadgeCheck size={13} className="text-teal-500" />
              {course.affiliatedTo.includes('Mumbai') ? 'MU Affiliated' : 'College Cert.'}
            </span>
          </div>

          {/* ── Highlights preview ── */}
          <div className="space-y-1.5 mb-5">
            {course.highlights.slice(0, 2).map((h, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-gray-600">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 flex-shrink-0 mt-1.5" />
                {h}
              </div>
            ))}
          </div>

          {/* ── Footer ── */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div>
              <p className="text-xs text-gray-400">Annual Fees</p>
              <p className="font-bold text-navy-800 text-sm">
                ₹{course.fees.perYear.toLocaleString('en-IN')}
              </p>
            </div>
            <span className="flex items-center gap-1 text-teal-600 text-sm font-semibold group-hover:gap-2 transition-all">
              View Details
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
