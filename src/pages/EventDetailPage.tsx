import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Calendar, MapPin, Users, Share2, ExternalLink, ArrowRight,
  Clock, Lightbulb
} from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { fetchEventBySlug } from '@/lib/data/events';
import { formatDate } from '@/utils/cn';
import type { CollegeEvent } from '@/types';

const categoryBg: Record<string, string> = {
  Cultural: 'from-purple-600 to-pink-600',
  Sports: 'from-orange-600 to-red-600',
  Academic: 'from-blue-600 to-cyan-600',
  Workshop: 'from-green-600 to-emerald-600',
  Placement: 'from-indigo-600 to-blue-600',
  Alumni: 'from-amber-600 to-orange-600',
  'NSS/NCC': 'from-green-700 to-teal-600',
};

export default function EventDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<CollegeEvent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!slug) return;
      setLoading(true);
      const data = await fetchEventBySlug(slug);
      if (!data) navigate('/events');
      else setEvent(data);
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

  if (!event) return null;

  const eventDate = new Date(event.date);
  const endDate = event.endDate ? new Date(event.endDate) : null;
  const isUpcoming = event.isUpcoming;

  return (
    <>
      {/* ── Hero with gradient background ── */}
      <div className={`bg-gradient-to-br ${categoryBg[event.category] ?? 'from-navy-700 to-navy-900'} text-white py-16 md:py-24`}>
        <div className="max-w-4xl mx-auto px-4 relative">
          <button
            onClick={() => navigate('/events')}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft size={18} />
            Back to Events
          </button>

          <div className="space-y-6">
            <span className="inline-block px-4 py-2 rounded-full bg-white/20 backdrop-blur text-white text-sm font-bold">
              {event.category}
              {isUpcoming && <span className="ml-2 w-2 h-2 rounded-full bg-green-300 inline-block badge-pulse" />}
            </span>

            <h1 className="font-display text-5xl md:text-6xl font-bold leading-tight text-balance">
              {event.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <Calendar size={20} className="text-yellow-300" />
                <span className="text-lg">
                  {eventDate.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  {endDate && ` - ${endDate.toLocaleDateString('en-IN', { month: 'long', day: 'numeric' })}`}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={20} className="text-yellow-300" />
                <span className="text-lg">{event.venue}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 max-w-4xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl border border-gray-100 p-8 md:p-10 shadow-card mb-8"
            >
              <h2 className="font-display text-3xl font-bold text-navy-900 mb-6">
                About This Event
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {event.description}
              </p>
            </motion.div>

            {/* Highlights */}
            {event.highlights && event.highlights.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-blue-50 rounded-xl border border-blue-100 p-8 md:p-10"
              >
                <h3 className="font-display text-2xl font-bold text-blue-900 mb-6 flex items-center gap-2">
                  <Lightbulb size={24} className="text-blue-600" />
                  Event Highlights
                </h3>
                <div className="space-y-3">
                  {event.highlights.map((highlight, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0 mt-2" />
                      <span className="text-blue-900">{highlight}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Event details card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl border border-gray-100 p-6 shadow-card"
            >
              <h3 className="font-semibold text-navy-900 mb-6">Event Details</h3>

              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold mb-2">Date & Time</p>
                  <div className="flex items-start gap-2">
                    <Calendar size={16} className="text-teal-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-gray-800">
                      <p className="font-medium">
                        {eventDate.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                      <p className="text-xs text-gray-600">
                        {eventDate.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })} onwards
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-500 uppercase font-semibold mb-2">Venue</p>
                  <div className="flex items-start gap-2">
                    <MapPin size={16} className="text-teal-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-800">{event.venue}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-500 uppercase font-semibold mb-2">Status</p>
                  <p className="text-sm font-medium">
                    {isUpcoming ? (
                      <span className="flex items-center gap-2 text-green-700">
                        <span className="w-2 h-2 rounded-full bg-green-500 badge-pulse" />
                        Upcoming
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 text-gray-600">
                        <span className="w-2 h-2 rounded-full bg-gray-400" />
                        Completed
                      </span>
                    )}
                  </p>
                </div>
              </div>

              {isUpcoming && event.registrationLink && (
                <a
                  href={event.registrationLink}
                  className="w-full mt-6 flex items-center justify-center gap-2 px-4 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-all"
                >
                  Register Now
                  <ExternalLink size={16} />
                </a>
              )}
            </motion.div>

            {/* Share */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl border border-gray-100 p-6 shadow-card"
            >
              <h3 className="font-semibold text-navy-900 mb-4">Share This Event</h3>
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all font-medium">
                <Share2 size={16} />
                Share
              </button>
            </motion.div>

            {/* Info box */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-navy-700 to-navy-900 text-white rounded-xl p-6"
            >
              <h3 className="font-semibold mb-3">Have Questions?</h3>
              <p className="text-sm text-navy-200 mb-4">
                For event-related queries, please contact the college office.
              </p>
              <a
                href="tel:+912225224175"
                className="block text-center px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-all font-medium text-sm"
              >
                Call +91 22 2522 4175
              </a>
            </motion.div>
          </aside>
        </div>

        {/* More events CTA */}
        <section className="mt-16 pt-12 border-t border-gray-100">
          <h2 className="font-display text-3xl font-bold text-navy-900 mb-6">
            More Events
          </h2>
          <Link
            to="/events"
            className="inline-flex items-center gap-2 px-6 py-3 bg-navy-900 text-white font-semibold rounded-lg hover:bg-navy-800 transition-all"
          >
            View All Events
            <ArrowRight size={18} />
          </Link>
        </section>
      </main>
    </>
  );
}
