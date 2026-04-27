import PageLayout from '@/components/layout/PageLayout';
import { Link } from 'react-router-dom';
import { ArrowRight, Book, Phone, Mail, BookOpen, Microscope, Award, GraduationCap } from 'lucide-react';

function PlaceholderPage({ title, subtitle, path }: { title: string; subtitle: string; path: string }) {
  return (
    <PageLayout title={title} subtitle={subtitle} breadcrumbItems={[{ label: title }]}>
      <div className="text-center py-16">
        <p className="text-gray-600 text-lg mb-8">This page is coming soon!</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-all"
        >
          Back to Home <ArrowRight size={16} />
        </Link>
      </div>
    </PageLayout>
  );
}

export function AdmissionsPage() {
  return (
    <PageLayout
      title="Admissions 2025-26"
      subtitle="Join one of Mumbai's premier institutions for higher education."
      breadcrumbItems={[{ label: 'Admissions' }]}
    >
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="bg-teal-50 border border-teal-100 p-8 rounded-2xl">
          <h2 className="text-2xl font-bold text-navy-900 mb-4">Online Admission Process</h2>
          <p className="text-gray-700 mb-6">
            The admission process for the academic year 2025-26 is conducted online as per the University of Mumbai guidelines.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Register on University of Mumbai portal',
              'Fill the college online form',
              'Upload required documents',
              'Wait for Merit List declaration',
              'Payment of fees and confirmation',
            ].map((step, i) => (
              <div key={i} className="flex gap-3 items-center bg-white p-4 rounded-xl shadow-sm border border-teal-50">
                <span className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                  {i + 1}
                </span>
                <span className="text-sm font-medium text-navy-800">{step}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold text-navy-900 mb-4 flex items-center gap-2">
              <Book size={20} className="text-teal-600" />
              Documents Required
            </h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" />
                Original HSC Marksheet + 3 Attested Copies
              </li>
              <li className="flex gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" />
                Leaving Certificate (LC) Original + 2 Copies
              </li>
              <li className="flex gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" />
                SSC Marksheet (1 Copy)
              </li>
              <li className="flex gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" />
                Aadhar Card (1 Copy)
              </li>
              <li className="flex gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" />
                Caste Certificate (if applicable)
              </li>
              <li className="flex gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" />
                Passport size photographs (4)
              </li>
            </ul>
          </div>
          <div className="bg-navy-900 text-white p-8 rounded-2xl shadow-xl">
            <h3 className="text-xl font-bold mb-4">Need Help?</h3>
            <p className="text-navy-100 text-sm mb-6">
              Our admission helpdesk is active from 10:00 AM to 4:00 PM on all working days.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-navy-800 flex items-center justify-center text-teal-400">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-xs text-navy-400">Call Us</p>
                  <p className="text-sm font-semibold">022-25218797</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-navy-800 flex items-center justify-center text-teal-400">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-xs text-navy-400">Email Us</p>
                  <p className="text-sm font-semibold">admission@acharyamarathecollege.in</p>
                </div>
              </div>
            </div>
            <button className="w-full mt-8 py-3 bg-teal-600 hover:bg-teal-700 transition-all rounded-xl font-bold text-sm">
              Apply Online Portal
            </button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export function AcademicsPage() {
  return (
    <PageLayout
      title="Academic Excellence"
      subtitle="Comprehensive education across Arts, Science, and Commerce streams."
      breadcrumbItems={[{ label: 'Academics' }]}
    >
      <div className="space-y-16">
        {/* Streams Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: 'Arts', 
              icon: BookOpen, 
              desc: 'Focus on Humanities, Social Sciences, and Languages with specialized courses in Psychology and Economics.' 
            },
            { 
              title: 'Science', 
              icon: Microscope, 
              desc: 'Advanced labs for Physics, Chemistry, Biology, IT, Computer Science, and Data Science.' 
            },
            { 
              title: 'Commerce', 
              icon: Award, 
              desc: 'Leading faculty for Accountancy, Finance, Banking, Insurance, and Financial Markets.' 
            },
          ].map((stream) => (
            <div key={stream.title} className="bg-white p-8 rounded-2xl shadow-card border border-gray-100 hover:border-teal-200 transition-all">
              <div className="w-12 h-12 rounded-xl bg-navy-50 text-navy-700 flex items-center justify-center mb-6">
                <stream.icon size={24} />
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-3">{stream.title} Stream</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{stream.desc}</p>
            </div>
          ))}
        </div>

        {/* Specialized Centres */}
        <div className="bg-navy-900 text-white rounded-3xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-10 md:p-14">
              <h2 className="text-3xl font-display font-bold mb-6">Research & Distance Learning</h2>
              <p className="text-navy-100 mb-8 leading-relaxed">
                We are committed to making higher education accessible through distance learning and fostering a culture of research through our recognized centres.
              </p>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-navy-800 flex items-center justify-center text-teal-400 shrink-0">
                    <GraduationCap size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Recognized Ph.D. Centre</h4>
                    <p className="text-navy-300 text-sm">Doctoral research in Chemistry and Commerce/Accountancy affiliated with University of Mumbai.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-navy-800 flex items-center justify-center text-teal-400 shrink-0">
                    <Book size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Study Centres (IDOL & YCMOU)</h4>
                    <p className="text-navy-300 text-sm">Authorized study centre for Institute of Distance and Open Learning (IDOL) and Yashwantrao Chavan Maharashtra Open University (YCMOU).</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-navy-800 p-10 md:p-14 border-l border-navy-700">
              <h3 className="text-xl font-bold mb-6 text-teal-400">Academic Features</h3>
              <ul className="space-y-4">
                {[
                  'Credit Based Semester and Grading System (CBSGS)',
                  'Continuous Assessment and Practical Training',
                  'Industry-Aligned Curriculum for Professional Courses',
                  'Remedial Coaching for Slow Learners',
                  'Mentoring and Career Guidance Sessions',
                  'E-Learning Resources and Digital Library Access',
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm text-navy-200">
                    <div className="w-5 h-5 rounded-full bg-teal-600/20 text-teal-400 flex items-center justify-center shrink-0">
                      <ArrowRight size={12} />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export function ScholarshipsPage() {
  return (
    <PageLayout
      title="Scholarships & Financial Aid"
      subtitle="Ensuring that financial constraints do not hinder academic pursuit."
      breadcrumbItems={[{ label: 'Scholarships' }]}
    >
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { 
              title: 'Government Scholarships', 
              desc: 'SC/ST/OBC and Minority scholarships as per Maharashtra Government norms.',
              types: ['Post-Matric Scholarship', 'Tuition Fee Waiver', 'Exam Fee Reimbursement']
            },
            { 
              title: 'Institutional Support', 
              desc: 'Special concessions for students with exceptional sports or cultural achievements.',
              types: ['Merit-cum-Means', 'Sports Excellence', 'Student Welfare Fund']
            },
          ].map((s) => (
            <div key={s.title} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-card">
              <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-6">
                <Award size={24} />
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-3">{s.title}</h3>
              <p className="text-gray-600 text-sm mb-6">{s.desc}</p>
              <ul className="space-y-2">
                {s.types.map(t => (
                  <li key={t} className="flex gap-2 text-xs font-medium text-navy-700">
                    <span className="text-teal-500">→</span> {t}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}

export function LibraryPage() {
  return (
    <PageLayout
      title="Central Library"
      subtitle="A hub of knowledge with over 50,000+ volumes and digital resources."
      breadcrumbItems={[{ label: 'Library' }]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-card">
            <h2 className="text-2xl font-bold text-navy-900 mb-6">Library Resources</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { label: 'Books', value: '55,000+' },
                { label: 'Journals', value: '45+' },
                { label: 'E-Books', value: '31 Lakh+' },
                { label: 'E-Journals', value: '6,000+' },
                { label: 'Newspapers', value: '12' },
                { label: 'CD/DVDs', value: '800+' },
              ].map(item => (
                <div key={item.label} className="text-center p-4 bg-navy-50 rounded-xl">
                  <p className="text-2xl font-bold text-navy-900">{item.value}</p>
                  <p className="text-xs text-gray-500 font-medium uppercase">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="prose prose-navy max-w-none text-gray-600">
            <p>
              The N.G. Acharya & D.K. Marathe College Library is one of the oldest and largest in the Chembur area. 
              It is fully automated with modern library management software and provides access to N-LIST and other digital repositories.
            </p>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-navy-900 text-white p-8 rounded-2xl shadow-xl">
            <h3 className="text-lg font-bold mb-4">Library Hours</h3>
            <ul className="space-y-3 text-sm text-navy-200">
              <li className="flex justify-between border-b border-navy-800 pb-2">
                <span>Mon – Fri</span>
                <span className="text-teal-400 font-medium">8:00 AM – 6:00 PM</span>
              </li>
              <li className="flex justify-between border-b border-navy-800 pb-2">
                <span>Saturday</span>
                <span className="text-teal-400 font-medium">8:00 AM – 4:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span className="text-red-400 font-medium">Closed</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export function AlumniPage() {
  return (
    <PageLayout
      title="Alumni Network"
      subtitle="Connecting our past to our present for a better future."
      breadcrumbItems={[{ label: 'Alumni' }]}
    >
      <div className="text-center max-w-3xl mx-auto space-y-8">
        <div className="flex justify-center mb-6">
          <div className="flex -space-x-4">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="w-16 h-16 rounded-full border-4 border-white bg-navy-100 flex items-center justify-center text-navy-700 font-bold text-xl">
                {String.fromCharCode(64 + i)}
              </div>
            ))}
            <div className="w-16 h-16 rounded-full border-4 border-white bg-teal-600 flex items-center justify-center text-white font-bold text-xs">
              90K+
            </div>
          </div>
        </div>
        <h2 className="text-3xl font-display font-bold text-navy-900">A Legacy of 90,000+ Success Stories</h2>
        <p className="text-gray-600 leading-relaxed text-lg">
          Our alumni are the true ambassadors of our institution, holding leadership positions across the globe in fields ranging from Research and IT to Arts and Governance.
        </p>
        <div className="pt-8">
          <button className="px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold shadow-lg transition-all">
            Join Alumni Association
          </button>
        </div>
      </div>
    </PageLayout>
  );
}

export function GalleryPage() {
  return (
    <PageLayout
      title="Campus Gallery"
      subtitle="Visual glimpses of life, learning, and celebration at our college."
      breadcrumbItems={[{ label: 'Gallery' }]}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1,2,3,4,5,6,7,8].map(i => (
          <div key={i} className="aspect-square bg-gray-100 rounded-2xl overflow-hidden relative group">
            <div className="absolute inset-0 bg-navy-900/0 group-hover:bg-navy-900/40 transition-all flex items-center justify-center">
              <span className="text-white opacity-0 group-hover:opacity-100 transition-all font-bold text-sm">View Photo</span>
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  );
}
