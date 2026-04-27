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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="h-full"
    >
      <Link
        to={`/events/${event.slug}`}
        className="group flex flex-col h-full bg-white rounded-2xl shadow-card hover:shadow-xl border border-gray-100 hover:border-teal-100 transition-all duration-300 overflow-hidden relative"
      >
        {/* Subtle top border accent line based on category */}
        <div className={cn("absolute top-0 left-0 right-0 h-1 bg-gradient-to-r", categoryBg[event.category] ?? 'from-navy-600 to-teal-600')} />

        <div className="p-6 flex flex-col h-full">
          <div className="flex gap-4 items-start mb-4">
            {/* ── Date Calendar Icon ── */}
            <div className="flex flex-col items-center justify-center flex-shrink-0 bg-gray-50 border border-gray-100 rounded-xl w-14 h-16 shadow-sm group-hover:bg-navy-50 group-hover:border-navy-100 transition-colors">
              <span className="text-[10px] font-bold text-teal-600 uppercase tracking-widest">{eventDate.toLocaleDateString('en-IN', { month: 'short' })}</span>
              <span className="text-2xl font-bold text-navy-900 leading-none mt-0.5">{eventDate.getDate()}</span>
            </div>

            <div className="flex-1 min-w-0 pt-1">
              <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 mb-2 uppercase tracking-wide">
                {event.category}
              </span>
              <h4 className="font-bold font-display text-navy-900 text-lg leading-tight line-clamp-2 group-hover:text-teal-600 transition-colors">
                {event.title}
              </h4>
            </div>
          </div>

          <p className="text-sm text-gray-600 line-clamp-2 mb-6 flex-1">
            {event.description || "Join us for this exciting upcoming event. Make sure to mark your calendar."}
          </p>

          <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
            <p className="text-xs text-gray-500 font-medium flex items-center gap-1.5">
              <MapPin size={14} className="text-gray-400" />
              <span className="truncate max-w-[120px]">{event.venue}</span>
            </p>
            <span className="text-xs font-bold text-teal-600 flex items-center gap-1 group-hover:gap-1.5 transition-all">
              {isUpcoming ? 'Reserve Spot' : 'View Recap'} <ArrowRight size={14} />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
