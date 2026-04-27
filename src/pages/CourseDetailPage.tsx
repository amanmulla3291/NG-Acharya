import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Clock, Users, Globe, BookOpen, DollarSign, ArrowLeft, CheckCircle2,
  Target, Briefcase, AlertCircle, Download, Share2
} from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { fetchCourseBySlug } from '@/lib/data/courses';
import { formatCurrency } from '@/utils/cn';
import type { Course } from '@/types';

export default function CourseDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!slug) return;
      setLoading(true);
      const data = await fetchCourseBySlug(slug);
      if (!data) navigate('/courses');
      else setCourse(data);
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

  if (!course) return null;

  return (
    <>
      <div className="bg-hero-gradient text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <button
            onClick={() => navigate('/courses')}
            className="flex items-center gap-2 text-navy-200 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft size={18} />
            Back to Programmes
          </button>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold mb-4">
                {course.level}
              </span>
              <h1 className="font-display text-5xl font-bold mb-4 text-balance">
                {course.title}
              </h1>
              <p className="text-navy-200 text-lg mb-6">{course.description}</p>

              <div className="flex gap-6 flex-wrap text-sm">
                <div className="flex items-center gap-2">
                  <Clock size={18} className="text-teal-300" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={18} className="text-teal-300" />
                  <span>{course.seats} Seats</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe size={18} className="text-teal-300" />
                  <span>{course.affiliatedTo}</span>
                </div>
              </div>
            </div>

            {/* Quick info card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
            >
              <h3 className="font-semibold text-lg mb-6">Admission Details</h3>

              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-xs text-navy-200 uppercase font-semibold mb-1">Annual Fees</p>
                  <p className="text-3xl font-bold">
                    {formatCurrency(course.fees.perYear)}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/20">
                  <p className="text-xs text-navy-200 uppercase font-semibold mb-2">Eligibility</p>
                  <p className="text-sm leading-relaxed">{course.eligibility}</p>
                </div>
              </div>

              {course.admissionOpen ? (
                <button className="w-full bg-teal-500 text-white font-semibold py-3 rounded-lg hover:bg-teal-600 transition-all mb-3">
                  Apply Now
                </button>
              ) : (
                <div className="w-full bg-gray-500 text-white font-semibold py-3 rounded-lg text-center mb-3 flex items-center justify-center gap-2">
                  <AlertCircle size={16} />
                  Admissions Closed
                </div>
              )}

              <button className="w-full border border-white/30 text-white font-semibold py-3 rounded-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                <Share2 size={16} />
                Share
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto px-4 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Overview */}
            <section>
              <h2 className="font-display text-3xl font-bold text-navy-900 mb-6">
                Programme Overview
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {course.description}
              </p>
            </section>

            {/* Highlights */}
            <section>
              <h2 className="font-display text-3xl font-bold text-navy-900 mb-6">
                ✨ Key Highlights
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.highlights.map((highlight, i) => (
                  <div key={i} className="flex gap-3 p-4 bg-teal-50 rounded-lg border border-teal-100">
                    <CheckCircle2 size={20} className="text-teal-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{highlight}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Career prospects */}
            <section>
              <h2 className="font-display text-3xl font-bold text-navy-900 mb-6 flex items-center gap-3">
                <Briefcase size={28} className="text-teal-600" />
                Career Prospects
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {course.careerProspects.map((prospect, i) => (
                  <div
                    key={i}
                    className="p-4 bg-blue-50 rounded-lg border border-blue-100 text-gray-800 font-medium flex items-center gap-2"
                  >
                    <span className="w-2 h-2 rounded-full bg-blue-600" />
                    {prospect}
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Quick facts */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl border border-gray-100 p-6 shadow-card"
            >
              <h3 className="font-semibold text-navy-900 mb-6">Quick Facts</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Duration</p>
                  <p className="text-lg font-semibold text-navy-900">{course.duration}</p>
                </div>
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Seats Available</p>
                  <p className="text-lg font-semibold text-navy-900">{course.seats}</p>
                </div>
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Annual Fees</p>
                  <p className="text-lg font-semibold text-navy-900">
                    {formatCurrency(course.fees.perYear)}
                  </p>
                </div>
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Affiliated To</p>
                  <p className="text-sm text-navy-900 font-medium">{course.affiliatedTo}</p>
                </div>
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Eligibility</p>
                  <p className="text-sm text-gray-700">{course.eligibility}</p>
                </div>
              </div>

              <button className="w-full mt-6 flex items-center justify-center gap-2 px-4 py-2.5 border border-teal-600 text-teal-600 font-semibold rounded-lg hover:bg-teal-50 transition-all">
                <Download size={16} />
                Download Brochure
              </button>
            </motion.div>

            {/* Contact CTA */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-hero-gradient text-white rounded-xl p-6 shadow-navy"
            >
              <h3 className="font-semibold text-lg mb-4">Have Questions?</h3>
              <p className="text-navy-200 text-sm mb-6">
                Our admission team is ready to help you with any enquiries about this programme.
              </p>
              <Link
                to="/contact"
                className="block text-center w-full bg-teal-500 text-white font-semibold py-2.5 rounded-lg hover:bg-teal-600 transition-all mb-3"
              >
                Contact Us
              </Link>
              <div className="text-sm text-navy-300">
                <p className="font-semibold mb-1">📞 +91 22 2522 4175</p>
                <p>Mon–Fri, 10:00 AM – 4:00 PM</p>
              </div>
            </motion.div>
          </aside>
        </div>

        {/* Related courses CTA */}
        <section className="mt-20 pt-12 border-t border-gray-100">
          <h2 className="font-display text-3xl font-bold text-navy-900 mb-6">
            Explore Related Programmes
          </h2>
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 px-6 py-3 bg-navy-900 text-white font-semibold rounded-lg hover:bg-navy-800 transition-all"
          >
            View All Programmes
          </Link>
        </section>
      </main>
    </>
  );
}
