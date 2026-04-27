import { motion } from 'framer-motion';
import { BookOpen, Award, Users, Book, GraduationCap, Microscope, Star } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { visionMission, collegeHistory } from '@/lib/data/about';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function AboutOverviewPage() {
  return (
    <PageLayout
      title="About Our Institution"
      subtitle="A legacy of 45+ years in academic excellence and holistic development."
      breadcrumbItems={[{ label: 'About Us' }]}
    >
      <div className="space-y-16">
        {/* ── Vision & Mission ── */}
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            {...fadeUp}
            className="bg-navy-900 text-white p-10 rounded-2xl shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Award size={120} />
            </div>
            <h2 className="font-display text-3xl font-bold mb-6 text-teal-400">Our Vision</h2>
            <p className="text-xl leading-relaxed text-navy-100 italic">
              "{visionMission.vision}"
            </p>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ delay: 0.1 }}
            className="bg-white border border-gray-100 p-10 rounded-2xl shadow-card"
          >
            <h2 className="font-display text-3xl font-bold mb-6 text-navy-900">Our Mission</h2>
            <ul className="space-y-4">
              {visionMission.mission.map((item, i) => (
                <li key={i} className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center flex-shrink-0 text-xs font-bold">
                    {i + 1}
                  </div>
                  <p className="text-gray-700 leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* ── History ── */}
        <motion.section {...fadeUp} className="bg-section-gradient p-8 md:p-12 rounded-3xl">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-4xl font-bold text-navy-900 mb-8 text-center">Our History</h2>
            <div className="relative border-l-2 border-teal-200 pl-8 space-y-12">
              <div className="relative">
                <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-teal-500 border-4 border-white shadow-sm" />
                <h3 className="text-2xl font-bold text-navy-800 mb-2">Established 1978</h3>
                <p className="text-gray-700 leading-relaxed">
                  {collegeHistory.foundation}
                </p>
              </div>
              <div className="relative">
                <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-navy-600 border-4 border-white shadow-sm" />
                <h3 className="text-2xl font-bold text-navy-800 mb-2">Growth & Expansion</h3>
                <p className="text-gray-700 leading-relaxed">
                  {collegeHistory.milestones}
                </p>
              </div>
              <div className="relative">
                <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-gold-500 border-4 border-white shadow-sm" />
                <h3 className="text-2xl font-bold text-navy-800 mb-2">Modern Era</h3>
                <p className="text-gray-700 leading-relaxed">
                  {collegeHistory.modernEra}
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ── Key Highlights ── */}
        <section>
          <h2 className="font-display text-4xl font-bold text-navy-900 mb-12 text-center">Institutional Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Award, title: 'NAAC "A" Grade', desc: 'Consistently maintaining high academic standards and quality assurance.' },
              { icon: Star, title: 'Best College Award', desc: 'Recognized by the University of Mumbai for excellence in higher education.' },
              { icon: Microscope, title: 'Research Centre', desc: 'Recognized Ph.D. centre for Chemistry and Commerce/Accountancy.' },
              { icon: GraduationCap, title: '8,000+ Students', desc: 'A vibrant student community across diverse academic streams.' },
              { icon: Book, title: 'Study Centres', desc: 'Authorized centres for IDOL and YCMOU for distance learning.' },
              { icon: Users, title: '90,000+ Alumni', desc: 'A strong network of professionals making a global impact.' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white p-8 rounded-xl border border-gray-100 shadow-card hover:shadow-hover transition-all group"
              >
                <div className="w-14 h-14 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-6 group-hover:bg-teal-600 group-hover:text-white transition-all">
                  <item.icon size={28} />
                </div>
                <h3 className="font-bold text-navy-900 text-xl mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
