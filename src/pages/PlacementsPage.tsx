import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Briefcase, Award, Building2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import { placements, testimonials } from '@/lib/data/infrastructure';

const placementStats = [
  { label: 'Students Placed (2024)', value: '420+', icon: Users, color: 'from-blue-600 to-blue-700' },
  { label: 'Highest Package', value: '₹12 LPA', icon: TrendingUp, color: 'from-green-600 to-green-700' },
  { label: 'Recruiting Companies', value: '60+', icon: Building2, color: 'from-purple-600 to-purple-700' },
  { label: 'Placement Rate', value: '94%', icon: Award, color: 'from-orange-600 to-orange-700' },
];

const domains = ['All', 'Technology', 'Banking', 'Consulting', 'Finance', 'Insurance'];

const placementProcess = [
  {
    step: '01',
    title: 'Career Orientation',
    description: 'Resume workshops, mock interviews, and aptitude training starting from the 2nd year.',
  },
  {
    step: '02',
    title: 'Pre-Placement Training',
    description: 'Industry-specific skill tracks — communication, coding, case studies, GD/PI preparation.',
  },
  {
    step: '03',
    title: 'Company Registration',
    description: 'Students register with the Placement Cell and are shortlisted based on eligibility criteria.',
  },
  {
    step: '04',
    title: 'Campus Drives',
    description: 'Companies visit campus or conduct virtual drives with written tests, GDs, and interviews.',
  },
  {
    step: '05',
    title: 'Offer & Onboarding',
    description: 'Offer letters are issued; Placement Cell facilitates smooth joining and follow-up.',
  },
];

export default function PlacementsPage() {
  const [activeDomain, setActiveDomain] = useState('All');

  const filtered = activeDomain === 'All'
    ? placements
    : placements.filter(p => p.domain === activeDomain);

  const itTestimonials = testimonials.filter(t =>
    t.company?.includes('TCS') || t.company?.includes('Infosys') || t.programme?.includes('IT') || t.programme?.includes('BMS')
  );

  return (
    <PageLayout
      title="Training & Placements"
      subtitle="Building career-ready professionals through industry partnerships, skill training, and 94% placement success."
      breadcrumbItems={[{ label: 'Placements' }]}
    >

      {/* ── Stats Banner ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
        {placementStats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className={`bg-gradient-to-br ${stat.color} text-white rounded-2xl p-6 shadow-navy`}
          >
            <stat.icon size={28} className="mb-3 opacity-80" />
            <p className="text-3xl font-bold mb-1">{stat.value}</p>
            <p className="text-sm opacity-80">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* ── Our Recruiters ── */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display text-3xl font-bold text-navy-900">Our Recruiters</h2>
            <p className="text-gray-600 mt-2">Top companies that hire from our campus every year</p>
          </div>

          {/* Domain filter */}
          <div className="hidden md:flex gap-2">
            {domains.map(d => (
              <button
                key={d}
                onClick={() => setActiveDomain(d)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  activeDomain === d
                    ? 'bg-navy-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile domain filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 md:hidden mb-6">
          {domains.map(d => (
            <button
              key={d}
              onClick={() => setActiveDomain(d)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeDomain === d ? 'bg-navy-900 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
              className="bg-white rounded-xl border border-gray-100 p-5 shadow-card hover:shadow-hover transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                {/* Logo placeholder */}
                <div className="w-12 h-12 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center">
                  <Building2 size={22} className="text-gray-400" />
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-100 text-blue-700">
                  {p.domain}
                </span>
              </div>

              <h3 className="font-semibold text-navy-900 mb-3">{p.companyName}</h3>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Package</p>
                  <p className="font-bold text-green-700">₹{p.packageLPA} LPA</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Placed ({p.year})</p>
                  <p className="font-bold text-navy-800">{p.studentsPlaced} Students</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Placement Process ── */}
      <section className="mb-16 bg-section-gradient rounded-2xl p-8 md:p-12">
        <h2 className="font-display text-3xl font-bold text-navy-900 mb-10 text-center">
          Our Placement Process
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {placementProcess.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative text-center"
            >
              {/* Connector line */}
              {i < placementProcess.length - 1 && (
                <div className="hidden lg:block absolute top-6 left-[60%] w-[80%] h-0.5 bg-teal-200 z-0" />
              )}
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-teal-600 text-white font-bold text-lg flex items-center justify-center mx-auto mb-4 shadow-lg">
                  {step.step}
                </div>
                <h3 className="font-semibold text-navy-900 mb-2 text-sm">{step.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Success Stories ── */}
      <section className="mb-16">
        <h2 className="font-display text-3xl font-bold text-navy-900 mb-8">
          Alumni Success Stories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-xl border border-gray-100 p-8 shadow-card"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-navy-600 to-teal-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-navy-900">{t.name}</h4>
                  <p className="text-xs text-gray-500">{t.batch} Batch • {t.programme}</p>
                </div>
              </div>
              <p className="text-gray-700 italic mb-4 leading-relaxed">"{t.content}"</p>
              {t.currentPosition && (
                <div className="pt-4 border-t border-gray-100">
                  <p className="font-semibold text-sm text-navy-800">{t.currentPosition}</p>
                  <p className="text-sm text-gray-500">{t.company}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Contact Placement Cell ── */}
      <section className="bg-hero-gradient text-white rounded-2xl p-10 md:p-14 text-center">
        <Briefcase size={48} className="mx-auto text-teal-300 mb-6" />
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
          Partner With Our Placement Cell
        </h2>
        <p className="text-navy-200 text-lg mb-8 max-w-2xl mx-auto">
          Companies wishing to recruit from our campus can contact the Training & Placement Cell.
          We facilitate end-to-end campus hiring with pre-screened, industry-ready candidates.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="mailto:placements@ngacharya.edu.in"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-teal-500 text-white font-semibold rounded-xl hover:bg-teal-600 transition-all"
          >
            placements@ngacharya.edu.in
            <ArrowRight size={18} />
          </a>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-all"
          >
            Contact Us
          </Link>
        </div>
        <p className="text-navy-300 text-sm mt-6">
          Training & Placement Cell • Room 204, Second Floor<br />
          +91 22 2522 4175 (Ext. 204) • Mon–Fri, 10:00 AM – 4:00 PM
        </p>
      </section>
    </PageLayout>
  );
}
