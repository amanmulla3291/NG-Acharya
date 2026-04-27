import { Link } from 'react-router-dom';
import { GraduationCap, MapPin, Phone, Mail, Globe, Facebook, Instagram, Youtube, Twitter } from 'lucide-react';

const footerLinks = {
  Academics: [
    { label: 'UG Courses', href: '/courses?level=UG' },
    { label: 'PG Courses', href: '/courses?level=PG' },
    { label: 'Ph.D. Programme', href: '/courses?level=PhD' },
    { label: 'Certificate Courses', href: '/courses?level=Certificate' },
    { label: 'Junior College', href: '/courses?level=Junior+College' },
  ],
  'Quick Links': [
    { label: 'Admission 2025-26', href: '/courses' },
    { label: 'Notices & Circulars', href: '/notices' },
    { label: 'News & Events', href: '/events' },
    { label: 'Placements', href: '/placements' },
    { label: 'Student Zone', href: '/student-zone' },
    { label: 'Fee Structure', href: '/fee-structure' },
    { label: 'Contact Us', href: '/contact' },
  ],
  Resources: [
    { label: 'IQAC', href: '/iqac' },
    { label: 'Research Cell', href: '/research' },
    { label: 'NSS / NCC', href: '/student-zone/nss-ncc' },
    { label: 'Grievance Redressal', href: '/grievance' },
    { label: 'Anti-Ragging', href: '/anti-ragging' },
    { label: 'RTI', href: '/rti' },
    { label: 'NAAC', href: '/naac' },
  ],
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-900 text-white">
      {/* ── Notice ticker ── */}
      <div className="bg-teal-600 py-2 overflow-hidden">
        <div className="flex">
          <div className="animate-marquee flex gap-16 whitespace-nowrap text-sm font-medium">
            {[
              '🎓 Admission Open 2025-26 — Apply Online Now',
              '📢 NAAC Peer Team Visit — A+ Grade Preparation',
              '🏆 Best College Awardee — University of Mumbai',
              '📻 Acharya 90 FM — Mumbai\'s Leading Community Radio',
              '🔬 Recognized Ph.D. Research Centre in Chemistry & Commerce',
              '🎓 Admission Open 2025-26 — Apply Online Now',
              '📢 NAAC Peer Team Visit — A+ Grade Preparation',
              '🏆 Best College Awardee — University of Mumbai',
              '📻 Acharya 90 FM — Mumbai\'s Leading Community Radio',
              '🔬 Recognized Ph.D. Research Centre in Chemistry & Commerce',
            ].map((item, i) => (
              <span key={i}>{item}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* ── Brand column ── */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-xl bg-teal-600 flex items-center justify-center">
                <GraduationCap size={24} className="text-white" />
              </div>
              <div>
                <p className="font-display font-bold text-base leading-tight">
                  N.G. Acharya & D.K. Marathe College
                </p>
                <p className="text-navy-300 text-xs mt-0.5">of Arts, Science & Commerce</p>
              </div>
            </Link>

            <p className="text-navy-300 text-sm leading-relaxed mb-6 max-w-sm">
              Established in 1978, NAAC 'A' Grade accredited institution in Chembur, Mumbai — nurturing
              8,000+ students across various academic programmes with excellence, integrity, and innovation.
            </p>

            {/* Contact */}
            <div className="space-y-3 text-sm">
              <div className="flex gap-3 text-navy-300">
                <MapPin size={16} className="flex-shrink-0 text-teal-400 mt-0.5" />
                <span>Shri. N.G. Acharya Marg, Chembur, Mumbai 400 071</span>
              </div>
              <a href="tel:02225218797" className="flex gap-3 text-navy-300 hover:text-teal-400 transition-colors">
                <Phone size={16} className="flex-shrink-0 text-teal-400 mt-0.5" />
                022-25218797 / 022-25217344
              </a>
              <a href="mailto:office@acharyamarathecollege.in" className="flex gap-3 text-navy-300 hover:text-teal-400 transition-colors">
                <Mail size={16} className="flex-shrink-0 text-teal-400 mt-0.5" />
                office@acharyamarathecollege.in
              </a>
              <a href="https://acharyamarathecollege.in" target="_blank" rel="noopener noreferrer" className="flex gap-3 text-navy-300 hover:text-teal-400 transition-colors">
                <Globe size={16} className="flex-shrink-0 text-teal-400 mt-0.5" />
                acharyamarathecollege.in
              </a>
            </div>

            {/* Social */}
            <div className="flex gap-3 mt-6">
              {[
                { Icon: Facebook, label: 'Facebook', href: '#' },
                { Icon: Instagram, label: 'Instagram', href: '#' },
                { Icon: Youtube, label: 'YouTube', href: '#' },
                { Icon: Twitter, label: 'Twitter', href: '#' },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-navy-800 flex items-center justify-center text-navy-300 hover:bg-teal-600 hover:text-white transition-all"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* ── Link columns ── */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="font-semibold text-sm text-white mb-4 uppercase tracking-wider">{heading}</h3>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-navy-300 text-sm hover:text-teal-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-12 pt-6 border-t border-navy-800 flex flex-col sm:flex-row justify-between items-center gap-3 text-navy-400 text-xs">
          <p>© {year} N.G. Acharya & D.K. Marathe College. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-teal-400 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-teal-400 transition-colors">Terms of Use</Link>
            <Link to="/sitemap" className="hover:text-teal-400 transition-colors">Sitemap</Link>
          </div>
          <p>Affiliated to University of Mumbai</p>
        </div>
      </div>
    </footer>
  );
}
