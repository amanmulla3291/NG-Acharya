import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import type { CollegeEvent } from '@/types';
import { cn } from '@/utils/cn';

const categoryBg: Record<string, string> = {
  Cultural: 'from-purple-600 to-pink-600',
  Sports: 'from-orange-600 to-red-600',
  Academic: 'from-blue-600 to-cyan-600',
  Workshop: 'from-green-600 to-emerald-600',
  Placement: 'from-indigo-600 to-blue-600',
  Alumni: 'from-amber-600 to-orange-600',
  'NSS/NCC': 'from-green-700 to-teal-600',
};

interface EventCardProps {
  event: CollegeEvent;
  index?: number;
  featured?: boolean;
}

export default function EventCard({ event, index = 0, featured = false }: EventCardProps) {
  const eventDate = new Date(event.date);
  const isUpcoming = event.isUpcoming;

  if (featured) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Link
          to={`/events/${event.slug}`}
          className="group block bg-white rounded-2xl border border-gray-100 shadow-navy overflow-hidden hover:shadow-hover transition-all duration-300"
        >
          {/* ── Image/Hero ── */}
          <div className={cn(
            'h-56 bg-gradient-to-br flex items-center justify-center relative overflow-hidden',
            categoryBg[event.category] ?? 'from-navy-700 to-navy-900'
          )}>
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative text-center text-white z-10">
              <div className="text-5xl font-bold font-display mb-2">
                {eventDate.getDate()}
              </div>
              <p className="text-sm font-medium opacity-90">
                {eventDate.toLocaleDateString('en-IN', { month: 'short', year: '2-digit' })}
              </p>
            </div>
          </div>

          {/* ── Content ── */}
          <div className="p-6">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 mb-3">
              {event.category}
              {isUpcoming && <span className="ml-1.5 w-1.5 h-1.5 rounded-full bg-green-500 inline-block badge-pulse" />}
            </span>

            <h3 className="font-display font-bold text-navy-900 text-xl leading-tight mb-3 group-hover:text-navy-700 transition-colors line-clamp-2">
              {event.title}
            </h3>

            <p className="text-sm text-gray-600 line-clamp-2 mb-4">{event.description}</p>

            <div className="space-y-2 text-sm text-gray-600 mb-6">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-teal-500 flex-shrink-0" />
                {event.venue}
              </div>
              {event.registrationLink && (
                <button className="flex items-center gap-2 text-teal-600 font-semibold">
                  <Users size={14} />
                  Register Now
                </button>
              )}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <span className="text-xs text-gray-400 font-medium">
                {isUpcoming ? '📅 Upcoming' : '✓ Completed'}
              </span>
              <span className="flex items-center gap-1 text-teal-600 font-semibold group-hover:gap-2 transition-all">
                Learn More
                <ArrowRight size={14} />
              </span>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  // Regular card
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Link
        to={`/events/${event.slug}`}
        className="group block bg-white rounded-lg border border-gray-100 shadow-card hover:shadow-hover hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
      >
        {/* ── Mini hero ── */}
        <div className={cn(
          'h-32 bg-gradient-to-br flex items-end justify-end p-4 relative',
          categoryBg[event.category] ?? 'from-navy-700 to-navy-900'
        )}>
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative text-white text-center w-full">
            <div className="text-3xl font-bold font-display">{eventDate.getDate()}</div>
            <p className="text-xs font-medium opacity-90">
              {eventDate.toLocaleDateString('en-IN', { month: 'short' })}
            </p>
          </div>
        </div>

        {/* ── Content ── */}
        <div className="p-4">
          <span className="inline-block text-xs font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 mb-2">
            {event.category}
          </span>
          <h4 className="font-semibold text-navy-900 text-sm leading-tight mb-2 line-clamp-2 group-hover:text-navy-700 transition-colors">
            {event.title}
          </h4>
          <p className="text-xs text-gray-600 line-clamp-1 mb-3 flex items-center gap-1">
            <MapPin size={11} className="text-teal-500 flex-shrink-0" />
            {event.venue}
          </p>
          <span className="text-xs font-medium text-teal-600 flex items-center gap-1">
            {isUpcoming ? '🎉 Upcoming' : '✓ Completed'}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
