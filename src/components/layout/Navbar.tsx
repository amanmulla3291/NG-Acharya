import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, ChevronDown, Phone, Mail, Search,
  GraduationCap
} from 'lucide-react';
import { cn } from '@/utils/cn';

interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'About Us',
    href: '/about',
    children: [
      { label: 'College Overview', href: '/about', description: 'Legacy of 45+ years' },
      { label: 'Our Inspiration', href: '/about/inspiration', description: 'The vision that founded our institution' },
      { label: 'Our Founders', href: '/about/founders', description: 'Shri N. G. Acharya & D. K. Marathe' },
      { label: 'Governing Council', href: '/about/governing-council', description: 'The guiding body of the college' },
      { label: "General Secretary's Message", href: '/about/secretary-message', description: 'A message from our leadership' },
      { label: "Principal's Desk", href: '/about/principal', description: 'Vision for the academic year' },
    ],
  },
  {
    label: 'Academics',
    href: '/academics',
    children: [
      { label: 'Undergraduate Courses', href: '/courses?level=UG', description: 'BAF, BBI, BFM, BMS, BAMMC, B.Sc. IT/CS/DS' },
      { label: 'Unaided Courses', href: '/courses?level=Unaided', description: 'Self-financed programmes' },
      { label: 'Postgraduate Courses', href: '/courses?level=PG', description: 'M.Sc. Finance, M.Sc. IT' },
      { label: 'Ph.D. Programme', href: '/courses?level=PhD', description: 'Doctoral research in Commerce' },
      { label: 'Certificate Courses', href: '/courses?level=Certificate', description: 'Short-term skill programmes' },
      { label: 'Junior College (XI & XII)', href: '/courses?level=Junior+College', description: 'HSC Arts, Science & Commerce' },
    ],
  },
  {
    label: 'Departments',
    href: '/departments',
    children: [
      { label: 'Mass Media (BAMMC)', href: '/departments/mass-media' },
      { label: 'Commerce', href: '/departments/commerce' },
      { label: 'Management Studies', href: '/departments/management' },
      { label: 'Information Technology', href: '/departments/it' },
      { label: 'Computer Science', href: '/departments/cs' },
      { label: 'Junior College', href: '/departments/junior-college' },
    ],
  },
  {
    label: 'Admissions',
    href: '/admissions',
    children: [
      { label: 'Apply Now', href: '/courses', description: 'Start your application process' },
      { label: 'Prospectus', href: '/admissions/prospectus', description: 'Download the college prospectus' },
      { label: 'Fee Structure', href: '/admissions/fees', description: 'Detailed fee information' },
    ]
  },
  {
    label: 'Campus Life',
    href: '/infrastructure',
    children: [
      { label: 'Central Library', href: '/infrastructure/central-library' },
      { label: 'IT Laboratories', href: '/infrastructure/it-lab' },
      { label: 'Auditorium', href: '/infrastructure/auditorium' },
      { label: 'Sports Complex', href: '/infrastructure/sports-complex' },
    ],
  },
  {
    label: 'Announcements',
    href: '/updates',
    children: [
      { label: 'Notice Board', href: '/notices', description: 'Important announcements' },
      { label: 'News & Events', href: '/events', description: 'Campus life and activities' },
    ]
  },
  { label: 'Careers', href: '/placements' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsOpen(false);
    setOpenDropdown(null);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      {/* ── Topbar ── */}
      <div className="bg-navy-900 text-white text-[11px] font-medium hidden md:block">
        <div className="max-w-[1440px] mx-auto px-4 xl:px-8 py-1.5 flex justify-between items-center">
          <div className="flex gap-6">
            <a href="tel:02225218797" className="flex items-center gap-1.5 text-navy-50 hover:text-teal-300 transition-colors">
              <Phone size={12} />
              022-25218797
            </a>
            <a href="mailto:office@acharyamarathecollege.in" className="flex items-center gap-1.5 text-navy-50 hover:text-teal-300 transition-colors">
              <Mail size={12} />
              office@acharyamarathecollege.in
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-gold-50">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400 badge-pulse" />
              NAAC Accredited — 'A' Grade
            </span>
            <div className="w-px h-3 bg-navy-50/30" />
            <Link to="/contact" className="hover:text-teal-300 transition-colors tracking-wide">
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* ── Main Navbar ── */}
      <header
        ref={navRef}
        className={cn(
          'sticky top-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-navy-50'
            : 'bg-white shadow-sm'
        )}
      >
        <div className="max-w-[1440px] mx-auto px-4 xl:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* ── Logo ── */}
            <div className="flex items-center min-w-0 flex-shrink-0 mr-2 xl:mr-4">
              <Link to="/" className="flex flex-col justify-center group" aria-label="Home">
                <p className="text-[#e31e24] text-[8px] xl:text-[9px] font-bold tracking-wider uppercase leading-tight">
                  Chembur Trombay Education Society's
                </p>
                <h1 className="font-display font-black text-navy-900 text-[14px] xl:text-[17px] uppercase leading-tight tracking-tight group-hover:text-teal-700 transition-colors">
                  N.G. Acharya & D.K. Marathe
                </h1>
                <p className="text-[10px] xl:text-[11px] text-gray-500 font-semibold leading-tight">
                  College of Arts, Science & Commerce
                </p>
              </Link>
            </div>

            {/* ── Desktop Nav ── */}
            <nav className="hidden xl:flex items-center gap-1 xl:gap-2">
              {navItems.map(item => (
                <div key={item.label} className="relative group/navitem">
                  {item.children ? (
                    <button
                      className={cn(
                        'flex items-center gap-1 px-3 py-2 text-[13px] font-semibold rounded-full transition-all duration-300 whitespace-nowrap',
                        openDropdown === item.label
                          ? 'bg-navy-50 text-navy-900'
                          : 'text-gray-600 hover:bg-navy-50/50 hover:text-navy-900'
                      )}
                      onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                      onMouseEnter={() => setOpenDropdown(item.label)}
                    >
                      {item.label}
                      <ChevronDown size={14} className={cn(
                        'transition-transform duration-300',
                        openDropdown === item.label && 'rotate-180 text-teal-600'
                      )} />
                    </button>
                  ) : (
                    <NavLink
                      to={item.href}
                      className={({ isActive }) => cn(
                        'relative px-3 py-2 text-[13px] font-semibold rounded-full transition-all duration-300 whitespace-nowrap',
                        isActive
                          ? 'bg-navy-50 text-navy-900'
                          : 'text-gray-600 hover:bg-navy-50/50 hover:text-navy-900'
                      )}
                    >
                      {item.label}
                    </NavLink>
                  )}

                  {/* Dropdown - Glass Panel */}
                  <AnimatePresence>
                    {item.children && openDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
                        transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                        className="absolute top-full left-0 mt-2 w-72 bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white/20 overflow-hidden ring-1 ring-black/5"
                        onMouseLeave={() => setOpenDropdown(null)}
                      >
                        <div className="p-2">
                          {item.children.map(child => (
                            <Link
                              key={child.href}
                              to={child.href}
                              className="block px-4 py-3 rounded-xl hover:bg-navy-50/80 transition-all duration-200 group/link relative overflow-hidden"
                            >
                              <div className="relative z-10">
                                <p className="text-sm font-semibold text-navy-900 group-hover/link:text-teal-700 transition-colors">
                                  {child.label}
                                </p>
                                {child.description && (
                                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{child.description}</p>
                                )}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* ── Actions ── */}
            <div className="flex items-center gap-3 xl:gap-4">
              {/* Utilities Pill */}
              <div className="hidden sm:flex items-center bg-gray-50 border border-gray-100 rounded-full p-1 shadow-sm">
                <button
                  aria-label="Search"
                  className="p-1.5 rounded-full text-gray-500 hover:text-navy-700 hover:bg-white hover:shadow-sm transition-all"
                >
                  <Search size={16} strokeWidth={2.5} />
                </button>
              </div>

              <Link
                to="/courses"
                className="hidden md:inline-flex items-center justify-center px-5 py-2 bg-navy-900 text-white text-[13px] font-bold tracking-wide uppercase rounded-full hover:bg-navy-800 transition-colors shadow-sm ring-1 ring-navy-900/10 hover:shadow-md whitespace-nowrap"
              >
                Apply Now
              </Link>
              
              {/* Mobile menu toggle */}
              <button
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                onClick={() => setIsOpen(!isOpen)}
                className="xl:hidden p-2 rounded-lg text-gray-800 hover:bg-gray-100 transition-colors"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="xl:hidden border-t border-navy-50 bg-white/95 backdrop-blur-md overflow-hidden shadow-lg"
            >
              <div className="px-4 py-3 max-h-[75vh] overflow-y-auto">
                {navItems.map(item => (
                  <MobileNavItem key={item.label} item={item} />
                ))}
                <div className="mt-5 pt-5 border-t border-navy-50 mb-4">
                  <Link
                    to="/courses"
                    className="block w-full text-center px-4 py-3.5 bg-teal-600 text-white text-sm font-semibold rounded-xl hover:bg-teal-700 transition-colors shadow-sm"
                  >
                    Apply Now — 2025-26 Admissions Open
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}

function MobileNavItem({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-50 last:border-0">
      {item.children ? (
        <>
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center justify-between w-full py-3 text-sm font-medium text-gray-800"
          >
            {item.label}
            <ChevronDown size={16} className={cn('transition-transform', open && 'rotate-180')} />
          </button>
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="pl-4 pb-2 space-y-1">
                  {item.children.map(child => (
                    <NavLink
                      key={child.href}
                      to={child.href}
                      className={({ isActive }) =>
                        cn('block py-2 text-sm text-gray-600 hover:text-navy-700', isActive && 'text-navy-700 font-medium')
                      }
                    >
                      {child.label}
                    </NavLink>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        <NavLink
          to={item.href}
          className={({ isActive }) =>
            cn('block py-3 text-sm font-medium', isActive ? 'text-navy-700' : 'text-gray-800')
          }
        >
          {item.label}
        </NavLink>
      )}
    </div>
  );
}
