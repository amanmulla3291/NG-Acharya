import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, Award, Users, BookOpen, Zap, TrendingUp, ChevronRight,
  Clock, Globe, Star, CheckCircle2
} from 'lucide-react';
import CourseCard from '@/components/cards/CourseCard';
import NoticeCard from '@/components/cards/NoticeCard';
import EventCard from '@/components/cards/EventCard';
import { fetchCourses, fetchCoursesByLevel } from '@/lib/data/courses';
import { fetchNotices } from '@/lib/data/notices';
import { fetchUpcomingEvents } from '@/lib/data/events';
import { collegeStats, testimonials } from '@/lib/data/infrastructure';
import type { Course, Notice, CollegeEvent } from '@/types';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function HomePage() {
  const [ugCourses, setUgCourses] = useState<Course[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [events, setEvents] = useState<CollegeEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const [courses, noticeData, eventData] = await Promise.all([
        fetchCoursesByLevel('UG'),
        fetchNotices(),
        fetchUpcomingEvents(),
      ]);
      setUgCourses(courses.slice(0, 3));
      setNotices(noticeData.slice(0, 4));
      setEvents(eventData.slice(0, 3));
      setLoading(false);
    };
    load();
  }, []);

  return (
    <main className="flex-1">
      {/* ══════════════════════════════════════════════════════════════════════════════
          HERO SECTION
          ══════════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-hero-gradient text-white relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 left-20 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* ── Left: Text content ── */}
            <motion.div variants={fadeInUp} initial="initial" animate="animate">
              <div className="flex items-center gap-2 mb-6">
                <Award size={20} className="text-gold-400" />
                <span className="text-sm font-semibold text-gold-300">NAAC Accredited 'A' Grade</span>
              </div>

              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-balance mb-6">
                Where Excellence Meets
                <span className="text-teal-300"> Opportunity</span>
              </h1>

              <p className="text-lg text-navy-200 leading-relaxed mb-8 max-w-xl">
                Est. 1964 — N. G. Acharya & D. K. Marathe College transforms 6,000+ students across 25+ programmes with world-class education, industry exposure, and holistic development.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  to="/courses"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-teal-500 text-white font-semibold rounded-xl hover:bg-teal-600 transition-all shadow-lg hover:shadow-xl"
                >
                  Explore Programmes
                  <ArrowRight size={18} />
                </Link>
                <a
                  href="#latest-notices"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all"
                >
                  Latest Updates
                  <ChevronRight size={18} />
                </a>
              </div>

              {/* ── Trust badges ── */}
              <div className="flex gap-4 flex-wrap">
                {[
                  { icon: Users, label: '6,000+ Students' },
                  { icon: Globe, label: 'Global Placements' },
                  { icon: Star, label: 'Top Ranked' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 text-sm text-navy-200">
                    <Icon size={14} className="text-teal-300" />
                    {label}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ── Right: Visual showcase ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative h-96 md:h-full"
            >
              <div className="grid grid-cols-2 gap-4 h-full">
                {[
                  { title: 'Smart Labs', icon: Zap, color: 'from-blue-500 to-cyan-500' },
                  { title: 'Research', icon: BookOpen, color: 'from-purple-500 to-pink-500' },
                  { title: 'Placements', icon: TrendingUp, color: 'from-green-500 to-emerald-500' },
                  { title: 'Global', icon: Globe, color: 'from-orange-500 to-red-500' },
                ].map(({ title, icon: Icon, color }, i) => (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className={`bg-gradient-to-br ${color} rounded-2xl p-6 flex flex-col justify-between text-white shadow-lg hover:shadow-xl transition-all hover:scale-105`}
                  >
                    <Icon size={32} className="opacity-80" />
                    <span className="font-semibold text-sm">{title}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════════════
          STATS SECTION
          ══════════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-section-gradient py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {collegeStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-xl p-6 text-center shadow-card border border-gray-100"
              >
                <div className="text-3xl md:text-4xl font-bold text-navy-700 mb-2">
                  {stat.value}
                  {stat.suffix && <span className="text-teal-600">{stat.suffix}</span>}
                </div>
                <p className="text-xs md:text-sm text-gray-600 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════════════
          FEATURED PROGRAMMES
          ══════════════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-semibold mb-4">
              ✨ Explore Our Programmes
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-navy-900 mb-4">
              Programmes That Shape Futures
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From undergraduate to Ph.D., our diverse offerings prepare students for global careers in commerce, technology, media, and more.
            </p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-96 bg-gray-200 rounded-2xl skeleton" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {ugCourses.map((course, i) => (
                <CourseCard key={course.id} course={course} index={i} />
              ))}
            </div>
          )}

          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center"
          >
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 px-6 py-3 bg-navy-900 text-white font-semibold rounded-xl hover:bg-navy-800 transition-all"
            >
              View All 25+ Programmes
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════════════
          LATEST NOTICES
          ══════════════════════════════════════════════════════════════════════════════ */}
      <section id="latest-notices" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="flex items-center justify-between mb-12"
          >
            <div>
              <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
                📢 Important Updates
              </span>
              <h2 className="font-display text-4xl font-bold text-navy-900">
                Latest Notices & Circulars
              </h2>
            </div>
            <Link
              to="/notices"
              className="hidden md:flex items-center gap-2 text-teal-600 font-semibold hover:gap-3 transition-all"
            >
              View All <ArrowRight size={18} />
            </Link>
          </motion.div>

          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-200 rounded-xl skeleton" />
              ))}
            </div>
          ) : (
            <div className="space-y-4 mb-8">
              {notices.map((notice, i) => (
                <NoticeCard key={notice.id} notice={notice} index={i} />
              ))}
            </div>
          )}

          <Link
            to="/notices"
            className="md:hidden flex items-center justify-center gap-2 w-full py-3 border border-teal-600 text-teal-600 font-semibold rounded-lg hover:bg-teal-50 transition-all"
          >
            View All Notices <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════════════
          UPCOMING EVENTS
          ══════════════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-section-gradient">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="flex items-center justify-between mb-12"
          >
            <div>
              <span className="inline-block px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold mb-4">
                🎉 Campus Life
              </span>
              <h2 className="font-display text-4xl font-bold text-navy-900">
                Upcoming Events & Festivals
              </h2>
            </div>
            <Link
              to="/events"
              className="hidden md:flex items-center gap-2 text-teal-600 font-semibold hover:gap-3 transition-all"
            >
              View All <ArrowRight size={18} />
            </Link>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-80 bg-gray-200 rounded-lg skeleton" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {events.map((event, i) => (
                <EventCard key={event.id} event={event} index={i} />
              ))}
            </div>
          )}

          <Link
            to="/events"
            className="flex md:hidden items-center justify-center gap-2 w-full py-3 border border-teal-600 text-teal-600 font-semibold rounded-lg hover:bg-teal-50 transition-all"
          >
            View All Events <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════════════
          TESTIMONIALS
          ══════════════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-4">
              💬 Success Stories
            </span>
            <h2 className="font-display text-4xl font-bold text-navy-900">
              Voices of Our Alumni
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-xl p-8 shadow-card border border-gray-100"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-navy-600 to-teal-600 flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy-900">{testimonial.name}</h4>
                    <p className="text-xs text-gray-500">{testimonial.batch} Batch — {testimonial.programme}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic leading-relaxed mb-4">"{testimonial.content}"</p>
                {testimonial.currentPosition && (
                  <div className="pt-4 border-t border-gray-100 text-sm">
                    <p className="font-semibold text-navy-800">{testimonial.currentPosition}</p>
                    <p className="text-gray-600">{testimonial.company}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════════════
          CTA SECTION
          ══════════════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-hero-gradient text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-balance">
              Ready to Transform Your Future?
            </h2>
            <p className="text-lg text-navy-200 mb-8 max-w-2xl mx-auto">
              Join thousands of successful graduates at N. G. Acharya & D. K. Marathe College. Admissions for 2025-26 are now open!
            </p>
            <Link
              to="/courses"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-teal-500 text-white font-semibold rounded-xl hover:bg-teal-600 transition-all shadow-lg hover:shadow-xl"
            >
              Apply Now
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
