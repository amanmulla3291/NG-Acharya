import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, ChevronDown, Phone, Mail, Search,
  GraduationCap, Sun, Moon, ExternalLink
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
    label: 'Facilities',
    href: '/infrastructure',
    children: [
      { label: 'Central Library', href: '/infrastructure/central-library' },
      { label: 'IT Laboratories', href: '/infrastructure/it-lab' },
      { label: 'Auditorium', href: '/infrastructure/auditorium' },
      { label: 'Sports Complex', href: '/infrastructure/sports-complex' },
    ],
  },
  { label: 'Notices', href: '/notices' },
  { label: 'News & Events', href: '/events' },
  { label: 'Placements', href: '/placements' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
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

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  return (
    <>
      {/* ── Topbar ── */}
      <div className="bg-navy-900 text-white text-xs hidden md:block">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex gap-6">
            <a href="tel:02225218797" className="flex items-center gap-1.5 hover:text-teal-400 transition-colors">
              <Phone size={11} />
              022-25218797
            </a>
            <a href="mailto:office@acharyamarathecollege.in" className="flex items-center gap-1.5 hover:text-teal-400 transition-colors">
              <Mail size={11} />
              office@acharyamarathecollege.in
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-gold-500 badge-pulse" />
              NAAC Accredited — 'A' Grade
            </span>
            <a href="https://ngacharya.edu.in/erp" target="_blank" rel="noopener noreferrer"
               className="flex items-center gap-1 hover:text-teal-400 transition-colors">
              Student ERP <ExternalLink size={10} />
            </a>
          </div>
        </div>
      </div>

      {/* ── Main Navbar ── */}
      <header
        ref={navRef}
        className={cn(
          'sticky top-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-navy border-b border-navy-100'
            : 'bg-white shadow-sm'
        )}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-[4.5rem]">

            {/* ── Logo ── */}
            <Link to="/" className="flex items-center gap-3 group" aria-label="Home">
              <div className="w-11 h-11 rounded-xl bg-navy-700 flex items-center justify-center flex-shrink-0 group-hover:bg-teal-600 transition-colors">
                <GraduationCap size={22} className="text-white" />
              </div>
              <div className="hidden sm:block">
                <p className="font-display font-bold text-navy-900 text-sm leading-tight">
                  N.G. Acharya & D.K. Marathe
                </p>
                <p className="text-xs text-gray-500 font-sans-custom">
                  College of Arts, Science & Commerce
                </p>
              </div>
            </Link>

            {/* ── Desktop Nav ── */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {navItems.map(item => (
                <div key={item.label} className="relative">
                  {item.children ? (
                    <button
                      className={cn(
                        'flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-all',
                        'text-gray-700 hover:text-navy-700 hover:bg-navy-50',
                        openDropdown === item.label && 'text-navy-700 bg-navy-50'
                      )}
                      onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                      onMouseEnter={() => setOpenDropdown(item.label)}
                    >
                      {item.label}
                      <ChevronDown size={14} className={cn(
                        'transition-transform duration-200',
                        openDropdown === item.label && 'rotate-180'
                      )} />
                    </button>
                  ) : (
                    <NavLink
                      to={item.href}
                      className={({ isActive }) => cn(
                        'px-3 py-2 text-sm font-medium rounded-lg transition-all nav-link',
                        'text-gray-700 hover:text-navy-700 hover:bg-navy-50',
                        isActive && 'text-navy-700 font-semibold'
                      )}
                    >
                      {item.label}
                    </NavLink>
                  )}

                  {/* Dropdown */}
                  <AnimatePresence>
                    {item.children && openDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                        className="absolute top-full left-0 mt-1 w-72 bg-white rounded-2xl shadow-hover border border-navy-100 overflow-hidden"
                        onMouseLeave={() => setOpenDropdown(null)}
                      >
                        <div className="p-2">
                          {item.children.map(child => (
                            <Link
                              key={child.href}
                              to={child.href}
                              className="block px-4 py-3 rounded-xl hover:bg-navy-50 transition-colors group/link"
                            >
                              <p className="text-sm font-medium text-navy-800 group-hover/link:text-navy-700">
                                {child.label}
                              </p>
                              {child.description && (
                                <p className="text-xs text-gray-500 mt-0.5">{child.description}</p>
                              )}
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
            <div className="flex items-center gap-2">
              <button
                aria-label="Search"
                className="p-2 rounded-lg text-gray-600 hover:text-navy-700 hover:bg-navy-50 transition-all"
              >
                <Search size={18} />
              </button>
              <button
                aria-label="Toggle dark mode"
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg text-gray-600 hover:text-navy-700 hover:bg-navy-50 transition-all hidden sm:flex"
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <Link
                to="/courses"
                className="hidden lg:inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white text-sm font-semibold rounded-xl hover:bg-teal-700 transition-all shadow-sm"
              >
                Apply Now
              </Link>
              {/* Mobile menu toggle */}
              <button
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-navy-700 hover:bg-navy-50 transition-all"
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
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
              className="lg:hidden border-t border-navy-100 bg-white overflow-hidden"
            >
              <div className="px-4 py-3 max-h-[75vh] overflow-y-auto">
                {navItems.map(item => (
                  <MobileNavItem key={item.label} item={item} />
                ))}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <Link
                    to="/courses"
                    className="block w-full text-center px-4 py-3 bg-teal-600 text-white text-sm font-semibold rounded-xl"
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
