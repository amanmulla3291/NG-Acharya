import { motion } from 'framer-motion';
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';

const socialLinks = [
  { 
    icon: Facebook, 
    href: 'https://facebook.com', 
    color: 'hover:bg-blue-600',
    label: 'Facebook'
  },
  { 
    icon: Instagram, 
    href: 'https://instagram.com', 
    color: 'hover:bg-pink-600',
    label: 'Instagram'
  },
  { 
    icon: Linkedin, 
    href: 'https://linkedin.com', 
    color: 'hover:bg-blue-700',
    label: 'LinkedIn'
  },
  { 
    icon: Twitter, 
    href: 'https://twitter.com', 
    color: 'hover:bg-sky-500',
    label: 'Twitter'
  },
  { 
    icon: Youtube, 
    href: 'https://youtube.com', 
    color: 'hover:bg-red-600',
    label: 'YouTube'
  }
];

export default function SocialSidebar() {
  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-2 p-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-r-2xl shadow-2xl">
      {socialLinks.map((social, i) => (
        <motion.a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 + i * 0.1 }}
          whileHover={{ x: 5, scale: 1.1 }}
          className={`w-10 h-10 flex items-center justify-center rounded-xl bg-navy-900/80 text-white transition-all duration-300 ${social.color} group relative`}
        >
          <social.icon size={18} />
          
          {/* Tooltip */}
          <span className="absolute left-full ml-4 px-3 py-1.5 bg-navy-900 text-white text-[10px] font-bold rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 translate-x-[-10px] group-hover:translate-x-0 whitespace-nowrap shadow-xl">
            {social.label}
            {/* Arrow */}
            <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-navy-900 rotate-45" />
          </span>
        </motion.a>
      ))}
    </div>
  );
}
