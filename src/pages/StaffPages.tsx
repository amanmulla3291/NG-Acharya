import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Mail, BookOpen, Award, GraduationCap, Briefcase,
  ArrowLeft, ArrowRight, Users
} from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { fetchStaff, fetchStaffBySlug } from '@/lib/data/staff';
import { fetchDepartments } from '@/lib/data/departments';
import type { StaffMember, Department } from '@/types';

// ══════════════════════════════════════════════════════════════════════════════
// STAFF LISTING PAGE
// ══════════════════════════════════════════════════════════════════════════════
export function StaffPage() {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeDept, setActiveDept] = useState('all');

  useEffect(() => {
    Promise.all([fetchStaff(), fetchDepartments()]).then(([s, d]) => {
      setStaff(s);
      setDepartments(d);
      setLoading(false);
    });
  }, []);

  const filtered = activeDept === 'all'
    ? staff
    : staff.filter(s => s.departmentSlug === activeDept);

  return (
    <PageLayout
      title="Faculty & Staff"
      subtitle="Meet the dedicated educators and researchers who make Acharya Marathe College a centre of excellence."
      breadcrumbItems={[{ label: 'Faculty' }]}
    >
      {/* Department filter */}
      <div className="flex flex-wrap gap-2 mb-10">
        <button
          onClick={() => setActiveDept('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            activeDept === 'all' ? 'bg-navy-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Departments
        </button>
        {departments.map(d => (
          <button
            key={d.slug}
            onClick={() => setActiveDept(d.slug)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeDept === d.slug ? 'bg-navy-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {d.shortName}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => <div key={i} className="h-64 skeleton rounded-xl" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Link
                to={`/staffs/${member.slug}`}
                className="group block bg-white rounded-xl border border-gray-100 shadow-card hover:shadow-hover hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div className="h-1.5 bg-gradient-to-r from-navy-700 to-teal-500" />
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-navy-600 to-teal-500 flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
                      {member.name.split(' ').slice(-1)[0].charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-navy-900 leading-tight group-hover:text-navy-700 transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-xs text-teal-700 font-medium mt-0.5">{member.designation}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{member.department}</p>
                    </div>
                  </div>

                  <p className="text-xs text-gray-600 mb-4 line-clamp-2">{member.qualification}</p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {member.specialization.slice(0, 2).map(s => (
                      <span key={s} className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full">
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-xs text-gray-500 pt-4 border-t border-gray-100">
                    <span className="flex items-center gap-1">
                      <Briefcase size={11} className="text-teal-500" />
                      {member.experience}y exp.
                    </span>
                    {member.publications && (
                      <span className="flex items-center gap-1">
                        <BookOpen size={11} className="text-teal-500" />
                        {member.publications} pubs.
                      </span>
                    )}
                    <span className="ml-auto text-teal-600 font-medium flex items-center gap-1">
                      View <ArrowRight size={11} />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </PageLayout>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// STAFF DETAIL PAGE
// ══════════════════════════════════════════════════════════════════════════════
export function StaffDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [member, setMember] = useState<StaffMember | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    fetchStaffBySlug(slug).then(data => {
      if (!data) navigate('/staffs');
      else setMember(data);
      setLoading(false);
    });
  }, [slug, navigate]);

  if (loading) return <PageLayout title="Loading..." subtitle=""><div className="skeleton h-64 rounded-xl" /></PageLayout>;
  if (!member) return null;

  return (
    <PageLayout
      title={member.name}
      subtitle={member.designation}
      breadcrumbItems={[
        { label: 'Faculty', href: '/staffs' },
        { label: member.name },
      ]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Sidebar */}
        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          {/* Profile Card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
            <div className="bg-hero-gradient p-8 text-center">
              <div className="w-28 h-28 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white font-bold text-4xl mx-auto mb-4 border-2 border-white/30">
                {member.name.split(' ').slice(-1)[0].charAt(0)}
              </div>
              <h2 className="font-display font-bold text-white text-xl mb-1">{member.name}</h2>
              <p className="text-teal-300 text-sm font-medium">{member.designation}</p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Department</p>
                <Link
                  to={`/departments/${member.departmentSlug}`}
                  className="text-teal-600 font-medium hover:text-teal-700 text-sm"
                >
                  {member.department}
                </Link>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Qualification</p>
                <p className="text-sm text-gray-800">{member.qualification}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Experience</p>
                <p className="text-sm font-semibold text-navy-900">{member.experience} Years</p>
              </div>
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  className="flex items-center gap-2 text-teal-600 hover:text-teal-700 text-sm font-medium"
                >
                  <Mail size={14} />
                  {member.email}
                </a>
              )}
            </div>
          </div>

          {/* Quick stats */}
          {(member.publications || member.awards) && (
            <div className="bg-white rounded-xl border border-gray-100 shadow-card p-6 space-y-4">
              <h3 className="font-semibold text-navy-900 text-sm uppercase tracking-wide">
                Research & Honours
              </h3>
              {member.publications && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <BookOpen size={18} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="font-bold text-navy-800">{member.publications}</p>
                    <p className="text-xs text-gray-500">Publications</p>
                  </div>
                </div>
              )}
              {member.awards && member.awards.length > 0 && (
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <Award size={18} className="text-amber-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Awards</p>
                    {member.awards.map(a => (
                      <p key={a} className="text-xs text-gray-700 leading-snug mb-1">{a}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </motion.aside>

        {/* Main content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 space-y-8"
        >
          {/* Bio */}
          {member.bio && (
            <section className="bg-white rounded-xl border border-gray-100 shadow-card p-8">
              <h2 className="font-display text-2xl font-bold text-navy-900 mb-5">About</h2>
              <p className="text-gray-700 leading-relaxed text-lg">{member.bio}</p>
            </section>
          )}

          {/* Specialization */}
          <section className="bg-white rounded-xl border border-gray-100 shadow-card p-8">
            <h2 className="font-display text-2xl font-bold text-navy-900 mb-5 flex items-center gap-3">
              <GraduationCap size={24} className="text-teal-600" />
              Areas of Specialization
            </h2>
            <div className="flex flex-wrap gap-3">
              {member.specialization.map(s => (
                <span
                  key={s}
                  className="px-4 py-2 bg-teal-50 border border-teal-200 text-teal-800 rounded-full font-medium"
                >
                  {s}
                </span>
              ))}
            </div>
          </section>

          {/* Awards */}
          {member.awards && member.awards.length > 0 && (
            <section className="bg-white rounded-xl border border-gray-100 shadow-card p-8">
              <h2 className="font-display text-2xl font-bold text-navy-900 mb-5 flex items-center gap-3">
                <Award size={24} className="text-amber-500" />
                Awards & Recognition
              </h2>
              <div className="space-y-3">
                {member.awards.map(award => (
                  <div key={award} className="flex gap-3 p-3 bg-amber-50 rounded-lg border border-amber-100">
                    <span className="text-amber-500 mt-0.5">🏆</span>
                    <span className="text-gray-800">{award}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Back link */}
          <div className="pt-4">
            <button
              onClick={() => navigate('/staffs')}
              className="flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium"
            >
              <ArrowLeft size={18} />
              Back to Faculty Directory
            </button>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
}
