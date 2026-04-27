import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight, Award, Users, BookOpen, Zap, TrendingUp, ChevronRight,
  Globe, Star
} from 'lucide-react';
import { cn } from '@/utils/cn';
import CourseCard from '@/components/cards/CourseCard';
import NoticeCard from '@/components/cards/NoticeCard';
import EventCard from '@/components/cards/EventCard';
import { fetchCoursesByLevel } from '@/lib/data/courses';
import { fetchNotices } from '@/lib/data/notices';
import { fetchUpcomingEvents } from '@/lib/data/events';
import { collegeStats, testimonials } from '@/lib/data/infrastructure';
import type { Course, Notice, CollegeEvent } from '@/types';

type TabType = 'UG' | 'PG' | 'Junior College';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

export default function HomePage() {
  const [coursesData, setCoursesData] = useState<Record<TabType, Course[]>>({
    UG: [],
    PG: [],
    'Junior College': []
  });
  const [activeTab, setActiveTab] = useState<TabType>('UG');
  const [notices, setNotices] = useState<Notice[]>([]);
  const [events, setEvents] = useState<CollegeEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Parallax Hooks
  const { scrollY } = useScroll();
  const heroBlob1Y = useTransform(scrollY, [0, 500], [0, 150]);
  const heroBlob2Y = useTransform(scrollY, [0, 500], [0, -100]);

  const ctaRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: ctaScrollY } = useScroll({
    target: ctaRef,
    offset: ["start end", "end start"]
  });
  const ctaBlob1Y = useTransform(ctaScrollY, [0, 1], [150, -150]);
  const ctaBlob2Y = useTransform(ctaScrollY, [0, 1], [-150, 150]);

  const heroSlides = [
    {
      url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      caption: 'State-of-the-art Infrastructure'
    },
    {
      url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      caption: 'Vibrant Campus Life'
    },
    {
      url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      caption: 'Advanced IT Laboratories'
    },
    {
      url: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      caption: 'Central Library & Resources'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const [ugCourses, pgCourses, jcCourses, noticeData, eventData] = await Promise.all([
        fetchCoursesByLevel('UG'),
        fetchCoursesByLevel('PG'),
        fetchCoursesByLevel('Junior College'),
        fetchNotices(),
        fetchUpcomingEvents(),
      ]);
      setCoursesData({
        UG: ugCourses.slice(0, 3),
        PG: pgCourses.slice(0, 3),
        'Junior College': jcCourses.slice(0, 3)
      });
      setNotices(noticeData.slice(0, 4));
      setEvents(eventData.slice(0, 3));
      setLoading(false);
    };
    load();
  }, []);

  return (
    <main className="flex-1 relative">
      {/* ══════════════════════════════════════════════════════════════════════════════
          HERO SECTION
          ══════════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-hero-gradient text-white relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            style={{ y: heroBlob1Y }}
            className="absolute top-20 right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" 
          />
          <motion.div 
            style={{ y: heroBlob2Y }}
            className="absolute -bottom-20 left-20 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl" 
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* ── Left: Text content ── */}
            <motion.div variants={fadeInUp} initial="initial" animate="animate">
              <div className="flex items-center gap-3 mb-6 flex-wrap">
                <div className="flex items-center gap-2 px-3 py-1 bg-gold-400/20 rounded-full border border-gold-400/30 backdrop-blur-sm">
                  <Award size={16} className="text-gold-400" />
                  <span className="text-xs font-semibold text-gold-300">NAAC Accredited 'A' Grade</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-teal-500/20 rounded-full border border-teal-400/30 backdrop-blur-sm">
                  <Star size={16} className="text-teal-400" />
                  <span className="text-xs font-semibold text-teal-300">Best College Awardee</span>
                </div>
              </div>

              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-balance mb-6">
                Where Excellence Meets
                <span className="text-teal-300"> Opportunity</span>
              </h1>

              <p className="text-lg text-navy-200 leading-relaxed mb-8 max-w-xl">
                Est. 1978 — N. G. Acharya & D. K. Marathe College transforms 8,000+ students annually with a legacy of 45+ years in academic excellence and holistic development.
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
              <div className="flex gap-6 flex-wrap">
                {[
                  { icon: Users, label: '8,000+ Students' },
                  { icon: BookOpen, label: '40+ Programmes' },
                  { icon: Globe, label: '90,000+ Alumni' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 text-sm font-medium text-navy-200">
                    <Icon size={16} className="text-teal-300" />
                    {label}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ── Right: Visual showcase (Carousel) ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-white/10 group"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentSlide}
                  src={heroSlides[currentSlide].url}
                  alt={heroSlides[currentSlide].caption}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/20 to-transparent opacity-90" />
              
              {/* Caption & Controls */}
              <div className="absolute bottom-0 left-0 right-0 p-8 flex items-end justify-between z-10">
                <motion.div
                  key={`caption-${currentSlide}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-8 h-1 bg-teal-400 rounded-full" />
                    <span className="text-teal-400 text-sm font-bold uppercase tracking-widest drop-shadow-md">Campus Gallery</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white font-display drop-shadow-lg">
                    {heroSlides[currentSlide].caption}
                  </h3>
                </motion.div>
                
                {/* Dots indicator */}
                <div className="flex gap-2">
                  {heroSlides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={cn(
                        "w-2 h-2 rounded-full transition-all duration-300",
                        currentSlide === idx ? "w-6 bg-teal-400" : "bg-white/50 hover:bg-white"
                      )}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════════════
          STATS SECTION
          ══════════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-section-gradient pb-16 md:pb-20 pt-8">
        <div className="max-w-7xl mx-auto px-4 relative z-20 -mt-20 md:-mt-28">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {collegeStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-xl p-6 text-center shadow-xl border border-gray-100"
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
            className="text-center mb-10"
          >
            <span className="inline-block px-4 py-1.5 bg-navy-50 border border-navy-100 text-navy-700 rounded-full text-sm font-semibold mb-4 tracking-wide">
              ✨ Explore Our Programmes
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-navy-900 mb-4">
              Programmes That Shape Futures
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From undergraduate to Ph.D., our diverse offerings prepare students for global careers in commerce, technology, media, and more.
            </p>
          </motion.div>

          {/* Interactive Tabs */}
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3 mb-10"
          >
            {(['UG', 'PG', 'Junior College'] as TabType[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-6 py-2.5 rounded-full font-semibold transition-all duration-300 text-sm md:text-base",
                  activeTab === tab 
                    ? "bg-navy-900 text-white shadow-lg scale-105" 
                    : "bg-white text-navy-600 hover:bg-navy-50 border border-gray-200"
                )}
              >
                {tab === 'UG' ? 'Undergraduate' : tab === 'PG' ? 'Postgraduate' : 'Junior College'}
              </button>
            ))}
          </motion.div>

          <div className="min-h-[400px]">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-96 bg-gray-200 rounded-2xl skeleton" />
                ))}
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeTab}
                  variants={staggerContainer}
                  initial="initial"
                  animate="animate"
                  exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
                >
                  {coursesData[activeTab].map((course, i) => (
                    <motion.div key={course.id} variants={itemVariants}>
                      <CourseCard course={course} index={i} />
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            )}
          </div>

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
              <span className="inline-block px-4 py-1.5 bg-navy-50 border border-navy-100 text-navy-700 rounded-full text-sm font-semibold mb-4 tracking-wide">
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
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-50px" }}
              className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-8"
            >
              <div className="divide-y divide-gray-100">
                {notices.map((notice, i) => (
                  <motion.div key={notice.id} variants={itemVariants}>
                    <NoticeCard notice={notice} index={i} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
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
              <span className="inline-block px-4 py-1.5 bg-navy-50 border border-navy-100 text-navy-700 rounded-full text-sm font-semibold mb-4 tracking-wide">
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
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
            >
              {events.map((event, i) => (
                <motion.div key={event.id} variants={itemVariants}>
                  <EventCard event={event} index={i} />
                </motion.div>
              ))}
            </motion.div>
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
      <section className="py-16 md:py-24 overflow-hidden bg-section-gradient">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 bg-navy-50 border border-navy-100 text-navy-700 rounded-full text-sm font-semibold mb-4 tracking-wide">
              💬 Success Stories
            </span>
            <h2 className="font-display text-4xl font-bold text-navy-900">
              Voices of Our Alumni
            </h2>
          </motion.div>
        </div>

        {/* Marquee Container */}
        <div className="relative w-full flex overflow-hidden py-4">
          {/* Fading Edges */}
          <div className="absolute inset-y-0 left-0 w-24 md:w-64 bg-gradient-to-r from-[#f0f4f8] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 md:w-64 bg-gradient-to-l from-[#f0f4f8] to-transparent z-10 pointer-events-none" />

          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 40,
              ease: "linear",
              repeat: Infinity,
            }}
            className="flex gap-6 px-3"
            style={{ width: "max-content" }}
          >
            {/* Triple the array to create seamless loop for wide screens */}
            {[...testimonials, ...testimonials, ...testimonials].map((testimonial, i) => (
              <div
                key={`${testimonial.id}-${i}`}
                className="w-[350px] md:w-[450px] bg-white rounded-2xl p-8 shadow-xl border border-gray-100 flex-shrink-0 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-navy-600 to-teal-600 flex items-center justify-center text-white font-bold text-xl shadow-md">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-navy-900 text-lg">{testimonial.name}</h4>
                      <p className="text-xs text-gray-500 font-medium">{testimonial.batch} Batch — {testimonial.programme}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-6 italic">"{testimonial.content}"</p>
                </div>
                {testimonial.currentPosition && (
                  <div className="pt-4 border-t border-gray-100">
                    <p className="font-bold text-navy-800">{testimonial.currentPosition}</p>
                    <p className="text-sm text-gray-600 font-medium">{testimonial.company}</p>
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════════════
          CTA SECTION
          ══════════════════════════════════════════════════════════════════════════════ */}
      <section ref={ctaRef} className="py-20 md:py-32 bg-navy-900 text-white relative overflow-hidden">
        {/* Parallax Blobs for CTA */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            style={{ y: ctaBlob1Y }}
            className="absolute -top-20 right-0 w-[500px] h-[500px] bg-teal-500/20 rounded-full blur-[100px]" 
          />
          <motion.div 
            style={{ y: ctaBlob2Y }}
            className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-gold-500/10 rounded-full blur-[80px]" 
          />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
              Ready to Transform Your Future?
            </h2>
            <p className="text-lg text-navy-200 mb-10 max-w-2xl mx-auto">
              Join thousands of successful graduates at N. G. Acharya & D. K. Marathe College. Admissions for 2025-26 are now open!
            </p>
            <div className="relative inline-block group">
              {/* Pulsing Background Glow */}
              <div className="absolute inset-0 bg-teal-400 rounded-xl blur-md opacity-40 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
              <Link
                to="/courses"
                className="relative flex items-center justify-center gap-3 px-8 py-4 bg-teal-500 text-white font-bold rounded-xl hover:bg-teal-400 transition-all shadow-xl hover:shadow-teal-500/25 scale-100 hover:scale-105"
              >
                Apply Now
                <ArrowRight size={20} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
