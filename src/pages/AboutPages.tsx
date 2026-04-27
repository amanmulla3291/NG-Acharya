import { motion } from 'framer-motion';
import { Quote, Users, BookOpen, Award, Mail } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import {
  principalMessage,
  secretaryMessage,
  founders,
  inspiration,
  governingCouncil,
} from '@/lib/data/about';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

// ═══════════════════════════════════════════════════════════════════════════════
// PRINCIPAL'S DESK
// ═══════════════════════════════════════════════════════════════════════════════
export function PrincipalPage() {
  const p = principalMessage;
  return (
    <PageLayout
      title="Principal's Desk"
      subtitle="A message from the head of our institution."
      breadcrumbItems={[{ label: 'About Us', href: '/about' }, { label: "Principal's Desk" }]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Sidebar */}
        <motion.aside {...fadeUp} className="order-2 lg:order-1 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-navy-700 to-teal-500" />
            <div className="p-8 text-center">
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-navy-600 to-teal-600 flex items-center justify-center text-white font-bold text-4xl mx-auto mb-5 shadow-navy">
                {p.name.charAt(4)}
              </div>
              <h3 className="font-display font-bold text-navy-900 text-xl mb-1">{p.name}</h3>
              <p className="text-teal-700 font-semibold text-sm mb-2">{p.designation}</p>
              <p className="text-xs text-gray-500 mb-5">{p.qualification}</p>
              <a
                href={`mailto:${p.name.toLowerCase().replace(/\s+/g, '.').replace(/^dr\.\s*/, '')}@ngacharya.edu.in`}
                className="inline-flex items-center gap-2 px-4 py-2 border border-teal-500 text-teal-600 rounded-lg hover:bg-teal-50 transition-all text-sm font-medium"
              >
                <Mail size={14} />
                Email Principal
              </a>
            </div>
          </div>

          {/* Quick stats */}
          <div className="bg-navy-50 rounded-xl p-6 space-y-4">
            {[
              { label: 'Years of Experience', value: '30+' },
              { label: 'Research Publications', value: '22+' },
              { label: 'Students Guided', value: '12,000+' },
              { label: 'National Awards', value: '3' },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between">
                <span className="text-sm text-gray-700">{item.label}</span>
                <span className="font-bold text-navy-800">{item.value}</span>
              </div>
            ))}
          </div>
        </motion.aside>

        {/* Message */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 order-1 lg:order-2"
        >
          <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-8 md:p-12">
            <div className="flex items-center gap-3 mb-8">
              <Quote size={32} className="text-teal-500 flex-shrink-0" />
              <h2 className="font-display text-2xl font-bold text-navy-900">
                Message from the Principal
              </h2>
            </div>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
              {p.message}
            </div>
          </div>
        </motion.article>
      </div>
    </PageLayout>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// GENERAL SECRETARY'S MESSAGE
// ═══════════════════════════════════════════════════════════════════════════════
export function SecretaryMessagePage() {
  const s = secretaryMessage;
  return (
    <PageLayout
      title="General Secretary's Message"
      subtitle="A message from the management of Chembur Education Society."
      breadcrumbItems={[{ label: 'About Us', href: '/about' }, { label: "Secretary's Message" }]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <motion.aside {...fadeUp} className="order-2 lg:order-1">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-navy-700 to-teal-500" />
            <div className="p-8 text-center">
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-navy-800 to-navy-600 flex items-center justify-center text-white font-bold text-4xl mx-auto mb-5">
                {s.name.split(' ').slice(-1)[0].charAt(0)}
              </div>
              <h3 className="font-display font-bold text-navy-900 text-xl mb-1">{s.name}</h3>
              <p className="text-teal-700 font-semibold text-sm leading-snug">{s.designation}</p>
            </div>
          </div>
        </motion.aside>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 order-1 lg:order-2"
        >
          <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-8 md:p-12">
            <div className="flex items-center gap-3 mb-8">
              <Quote size={32} className="text-teal-500 flex-shrink-0" />
              <h2 className="font-display text-2xl font-bold text-navy-900">
                Message from the General Secretary
              </h2>
            </div>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
              {s.message}
            </div>
          </div>
        </motion.article>
      </div>
    </PageLayout>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// OUR FOUNDERS
// ═══════════════════════════════════════════════════════════════════════════════
export function FoundersPage() {
  return (
    <PageLayout
      title="Our Founders"
      subtitle="Honoring the visionaries who built an institution that has shaped thousands of lives."
      breadcrumbItems={[{ label: 'About Us', href: '/about' }, { label: 'Our Founders' }]}
    >
      <div className="space-y-16">
        {founders.map((founder, i) => (
          <motion.section
            key={founder.shortName}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start"
          >
            {/* Portrait */}
            <div className={`${i % 2 === 1 ? 'lg:order-last' : ''}`}>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-navy-700 to-teal-500" />
                <div className="p-8 text-center">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-navy-700 to-teal-600 flex items-center justify-center text-white font-display font-bold text-5xl mx-auto mb-5 shadow-navy">
                    {founder.shortName.charAt(0)}
                  </div>
                  <h3 className="font-display font-bold text-navy-900 text-lg leading-snug mb-1">
                    {founder.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">{founder.years}</p>
                  <p className="text-xs italic text-teal-700 bg-teal-50 rounded-lg px-4 py-2">
                    {founder.legacy}
                  </p>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="lg:col-span-2">
              <h2 className="font-display text-3xl font-bold text-navy-900 mb-6">
                {founder.shortName}
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
                {founder.description}
              </div>
            </div>
          </motion.section>
        ))}
      </div>
    </PageLayout>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// GOVERNING COUNCIL
// ═══════════════════════════════════════════════════════════════════════════════
export function GoverningCouncilPage() {
  return (
    <PageLayout
      title="Governing Council"
      subtitle="The eminent professionals and educators who guide our institution's vision and governance."
      breadcrumbItems={[{ label: 'About Us', href: '/about' }, { label: 'Governing Council' }]}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {governingCouncil.map((member, i) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="bg-white rounded-xl border border-gray-100 shadow-card p-6 hover:shadow-hover transition-all"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-navy-600 to-teal-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                {member.name.split(' ').slice(-1)[0].charAt(0)}
              </div>
              <div>
                <h3 className="font-semibold text-navy-900 leading-tight">{member.name}</h3>
                <p className="text-xs text-teal-700 mt-0.5 font-medium">{member.designation}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </PageLayout>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// OUR INSPIRATION
// ═══════════════════════════════════════════════════════════════════════════════
export function InspirationPage() {
  return (
    <PageLayout
      title="Our Inspiration"
      subtitle="The philosophy and values that guide everything we do."
      breadcrumbItems={[{ label: 'About Us', href: '/about' }, { label: 'Our Inspiration' }]}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-card p-10 md:p-14 mb-12"
        >
          <blockquote className="text-2xl md:text-3xl font-display font-bold text-navy-800 italic text-center mb-8 leading-relaxed">
            "Education is the manifestation of the perfection already in man."
          </blockquote>
          <p className="text-center text-gray-500 font-semibold">— Swami Vivekananda</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
        >
          <p className="whitespace-pre-line">{inspiration.content}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { icon: BookOpen, title: 'Academic Excellence', desc: 'NAAC \'A\' Grade recognition; 60 years of consistent results and research.' },
            { icon: Users, title: 'Community Impact', desc: 'NSS, NCC, and outreach programmes serving Chembur and beyond.' },
            { icon: Award, title: 'Character First', desc: 'Building integrity, empathy, and leadership alongside professional skills.' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-teal-50 rounded-xl p-6 border border-teal-100">
              <Icon size={28} className="text-teal-600 mb-3" />
              <h3 className="font-semibold text-navy-900 mb-2">{title}</h3>
              <p className="text-sm text-gray-600">{desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </PageLayout>
  );
}
