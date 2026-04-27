import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  BookOpen, Activity, Trophy, Heart, Shield, Globe,
  Music, Users, Cpu, ExternalLink, ArrowRight, Star
} from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';

const studentClubs = [
  {
    name: 'Entrepreneurship Cell (E-Cell)',
    department: 'BMS Department',
    description: 'Nurturing the next generation of entrepreneurs through startup pitching, mentorship, and incubation support. 5 startups incubated in 2024.',
    icon: Star,
    color: 'from-amber-500 to-orange-500',
    activities: ['Startup Pitching Arena', 'Mentor Connect', 'Incubation Programme', 'Business Plan Competition'],
  },
  {
    name: 'IT Club — CodeCraft',
    department: 'IT & CS Departments',
    description: 'For technology enthusiasts — coding contests, hackathons, app development, and competitive programming culture.',
    icon: Cpu,
    color: 'from-blue-600 to-cyan-500',
    activities: ['Weekly DSA Challenges', 'Hackathons', 'Tech Talks', 'Open Source Contributions'],
  },
  {
    name: 'Media Club',
    department: 'Mass Media Department',
    description: 'Students run the college magazine "Expressions", a YouTube channel, and weekly radio show on the college FM transmitter.',
    icon: Music,
    color: 'from-purple-600 to-pink-500',
    activities: ['College Magazine', 'YouTube Channel', 'Radio Show', 'Photography Club'],
  },
  {
    name: 'Commerce & Finance Club',
    department: 'Commerce Department',
    description: 'Investing Club, Mock Stock Exchange, CA preparation study groups, and financial literacy drives for the community.',
    icon: Activity,
    color: 'from-green-600 to-emerald-500',
    activities: ['Mock Stock Exchange', 'Finance Quizzes', 'CA Study Groups', 'Guest Lectures'],
  },
  {
    name: 'NSS — National Service Scheme',
    department: 'Student Welfare',
    description: '800+ NSS volunteers annually engaged in blood donation drives, tree plantations, village adoption, and community education.',
    icon: Heart,
    color: 'from-red-500 to-rose-500',
    activities: ['Blood Donation Camp', 'Village Adoption Programme', 'Swachh Bharat Activities', 'Digital Literacy'],
  },
  {
    name: 'NCC — National Cadet Corps',
    department: 'Student Welfare',
    description: 'One of Mumbai\'s strongest NCC units producing officers, national parade participants, and discipline-trained citizens.',
    icon: Shield,
    color: 'from-olive-600 to-green-700',
    activities: ['Annual Training Camp', 'Republic Day Parade', 'Trekking & Adventure', 'Social Service'],
  },
  {
    name: 'Cultural Committee',
    department: 'Student Council',
    description: 'Organises Kaleidoscope (the annual cultural festival), Inter-college cultural events, and the Freshers\' Welcome.',
    icon: Music,
    color: 'from-indigo-500 to-violet-600',
    activities: ['Kaleidoscope Festival', 'Freshers Party', 'Farewell Ceremony', 'Inter-College Events'],
  },
  {
    name: 'Sports Committee',
    department: 'Physical Education',
    description: 'Manages all sports activities, representing the college in Mumbai University and Chembur Zone competitions.',
    icon: Trophy,
    color: 'from-orange-500 to-red-600',
    activities: ['Inter-College Tournaments', 'Annual Sports Day', 'Fitness Workshops', 'Career in Sports'],
  },
];

const studentResources = [
  {
    category: 'Academic',
    links: [
      { label: 'University of Mumbai Portal', url: 'https://mu.ac.in', external: true },
      { label: 'College Digital Library (N-LIST)', url: 'https://nlist.inflibnet.ac.in', external: true },
      { label: 'Exam Time-tables & Results', url: '/notices?category=Examination' },
      { label: 'NAAC SSR Documents', url: '/naac' },
    ],
  },
  {
    category: 'Scholarships',
    links: [
      { label: 'MahaDBT Scholarship Portal', url: 'https://mahadbt.maharashtra.gov.in', external: true },
      { label: 'National Scholarship Portal', url: 'https://scholarships.gov.in', external: true },
      { label: 'College Merit Scholarship', url: '/notices?category=Scholarship' },
    ],
  },
  {
    category: 'Student Services',
    links: [
      { label: 'Anti-Ragging Helpline: 1800-180-5522', url: 'tel:18001805522' },
      { label: 'Student Grievance Form', url: '/grievance' },
      { label: 'Counselling Cell', url: '/counselling' },
      { label: 'Student ERP Portal', url: 'https://erp.ngacharya.edu.in', external: true },
    ],
  },
  {
    category: 'Placements',
    links: [
      { label: 'Placement Cell', url: '/placements' },
      { label: 'Resume Builder Resources', url: '/placements#resources' },
      { label: 'Upcoming Drives', url: '/notices?category=Placement' },
    ],
  },
];

export default function StudentZonePage() {
  return (
    <PageLayout
      title="Student Zone"
      subtitle="Your hub for campus life, resources, clubs, activities, and student services at Acharya Marathe College."
      breadcrumbItems={[{ label: 'Student Zone' }]}
    >

      {/* ── Quick Stats ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {[
          { value: '8+', label: 'Student Clubs' },
          { value: '12', label: 'Sports Available' },
          { value: '800+', label: 'NSS Volunteers' },
          { value: '100+', label: 'Events / Year' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="bg-white rounded-xl border border-gray-100 p-5 shadow-card text-center"
          >
            <p className="text-3xl font-bold text-navy-700 mb-1">{stat.value}</p>
            <p className="text-sm text-gray-600">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* ── Clubs & Committees ── */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display text-3xl font-bold text-navy-900">Clubs & Committees</h2>
            <p className="text-gray-600 mt-2">
              Find your tribe — from tech to art, sports to social service.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {studentClubs.map((club, i) => (
            <motion.div
              key={club.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="bg-white rounded-xl border border-gray-100 shadow-card hover:shadow-hover transition-all overflow-hidden"
            >
              {/* Header gradient */}
              <div className={`bg-gradient-to-r ${club.color} p-5 flex items-center gap-4`}>
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <club.icon size={22} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{club.name}</h3>
                  <p className="text-xs text-white/80">{club.department}</p>
                </div>
              </div>

              <div className="p-5">
                <p className="text-sm text-gray-700 mb-4 leading-relaxed">{club.description}</p>
                <div className="flex flex-wrap gap-2">
                  {club.activities.map(act => (
                    <span
                      key={act}
                      className="text-xs px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full"
                    >
                      {act}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Student Resources ── */}
      <section className="mb-16">
        <h2 className="font-display text-3xl font-bold text-navy-900 mb-8">Student Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {studentResources.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-xl border border-gray-100 shadow-card p-6"
            >
              <h3 className="font-semibold text-navy-900 mb-4 text-sm uppercase tracking-wide flex items-center gap-2">
                <Globe size={14} className="text-teal-500" />
                {group.category}
              </h3>
              <ul className="space-y-2">
                {group.links.map(link => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-teal-600 hover:text-teal-700 font-medium"
                      >
                        {link.label}
                        <ExternalLink size={12} />
                      </a>
                    ) : (
                      <Link
                        to={link.url}
                        className="flex items-center gap-2 text-sm text-teal-600 hover:text-teal-700 font-medium"
                      >
                        {link.label}
                        <ArrowRight size={12} />
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Anti-Ragging Notice ── */}
      <section className="bg-red-50 border border-red-200 rounded-2xl p-8 mb-12">
        <div className="flex items-start gap-4">
          <Shield size={32} className="text-red-500 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-red-900 text-xl mb-3">
              Zero Tolerance for Ragging
            </h3>
            <p className="text-red-800 leading-relaxed mb-4">
              N. G. Acharya & D. K. Marathe College has a strict zero-tolerance policy towards ragging
              in any form. Ragging is a punishable offence under UGC regulations and applicable laws.
              All students are required to submit the anti-ragging affidavit at the time of admission.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="tel:18001805522"
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all font-medium text-sm"
              >
                Anti-Ragging Helpline: 1800-180-5522
              </a>
              <a
                href="https://antiragging.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border border-red-400 text-red-700 rounded-lg hover:bg-red-100 transition-all font-medium text-sm"
              >
                antiragging.in
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Student Council CTA ── */}
      <section className="bg-hero-gradient text-white rounded-2xl p-10 text-center">
        <Users size={48} className="mx-auto text-teal-300 mb-5" />
        <h2 className="font-display text-3xl font-bold mb-4">Get Involved!</h2>
        <p className="text-navy-200 text-lg mb-6 max-w-xl mx-auto">
          Join a club, run for Student Council, volunteer for NSS, or represent the college in
          sports. Your college life is what you make it.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 bg-teal-500 text-white font-semibold rounded-xl hover:bg-teal-600 transition-all"
        >
          Contact Student Welfare Office
          <ArrowRight size={18} />
        </Link>
      </section>
    </PageLayout>
  );
}
