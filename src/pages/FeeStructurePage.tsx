import { useState } from 'react';
import { motion } from 'framer-motion';
import { Info, Download, IndianRupee, AlertCircle, CheckCircle2 } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';

type FeeLevel = 'UG' | 'PG' | 'PhD' | 'Certificate' | 'Junior College';

interface FeeRow {
  programme: string;
  shortTitle: string;
  year1: number;
  year2?: number;
  year3?: number;
  total: number;
  notes?: string;
}

const feeData: Record<FeeLevel, { label: string; fees: FeeRow[] }> = {
  'Junior College': {
    label: 'Junior College (XI & XII)',
    fees: [
      { programme: 'HSC Science (XI & XII)', shortTitle: 'HSC Science', year1: 8000, year2: 8000, total: 16000 },
      { programme: 'HSC Commerce (XI & XII)', shortTitle: 'HSC Commerce', year1: 7000, year2: 7000, total: 14000 },
      { programme: 'HSC Arts (XI & XII)', shortTitle: 'HSC Arts', year1: 6000, year2: 6000, total: 12000 },
    ],
  },
  UG: {
    label: 'Undergraduate Programmes',
    fees: [
      { programme: 'Bachelor of Accounting & Finance', shortTitle: 'BAF', year1: 14000, year2: 14000, year3: 14000, total: 42000 },
      { programme: 'Bachelor of Banking & Insurance', shortTitle: 'BBI', year1: 14000, year2: 14000, year3: 14000, total: 42000 },
      { programme: 'Bachelor of Financial Markets', shortTitle: 'BFM', year1: 14000, year2: 14000, year3: 14000, total: 42000 },
      { programme: 'Bachelor of Management Studies', shortTitle: 'BMS', year1: 20000, year2: 20000, year3: 20000, total: 60000, notes: 'Includes lab/activity charges' },
      { programme: 'Bachelor of Arts in Mass Media', shortTitle: 'BAMMC', year1: 18000, year2: 18000, year3: 18000, total: 54000, notes: 'Media lab fee included' },
      { programme: 'B.Sc. Information Technology', shortTitle: 'B.Sc. IT', year1: 22000, year2: 22000, year3: 22000, total: 66000, notes: 'Includes lab & software fee' },
      { programme: 'B.Sc. Computer Science', shortTitle: 'B.Sc. CS', year1: 22000, year2: 22000, year3: 22000, total: 66000 },
      { programme: 'B.Sc. Data Science', shortTitle: 'B.Sc. DS', year1: 22000, year2: 22000, year3: 22000, total: 66000 },
    ],
  },
  PG: {
    label: 'Postgraduate Programmes',
    fees: [
      { programme: 'M.Sc. Finance', shortTitle: 'M.Sc. Finance', year1: 35000, year2: 35000, total: 70000 },
      { programme: 'M.Sc. Information Technology', shortTitle: 'M.Sc. IT', year1: 38000, year2: 38000, total: 76000, notes: 'Includes research lab access' },
    ],
  },
  PhD: {
    label: 'Doctoral Programmes',
    fees: [
      { programme: 'Ph.D. in Commerce', shortTitle: 'Ph.D.', year1: 28000, year2: 28000, year3: 28000, total: 84000, notes: 'Per year; duration 3–5 years' },
    ],
  },
  Certificate: {
    label: 'Certificate Courses',
    fees: [
      { programme: 'Certificate in Tally ERP & GST', shortTitle: 'Tally & GST', year1: 6000, total: 6000, notes: '3-month duration' },
      { programme: 'Certificate in Python Programming', shortTitle: 'Python', year1: 5000, total: 5000, notes: '2-month duration' },
    ],
  },
};

const additionalCharges = [
  { item: 'Admission Form (one-time)', amount: 100 },
  { item: 'Library Deposit (refundable)', amount: 500 },
  { item: 'Student Identity Card', amount: 100 },
  { item: 'Gymkhana / Sports Fee (per year)', amount: 300 },
  { item: 'NSS Contribution (optional)', amount: 150 },
  { item: 'Students\' Council Fee (per year)', amount: 50 },
  { item: 'Magazine Fee (per year)', amount: 50 },
  { item: 'University Enrollment Fee (one-time)', amount: 150 },
];

const tabs: FeeLevel[] = ['Junior College', 'UG', 'PG', 'PhD', 'Certificate'];

function formatINR(amount: number) {
  return '₹' + amount.toLocaleString('en-IN');
}

export default function FeeStructurePage() {
  const [activeTab, setActiveTab] = useState<FeeLevel>('UG');

  const { label, fees } = feeData[activeTab];
  const isDual = activeTab === 'Junior College' || activeTab === 'PG';
  const isTriple = activeTab === 'UG' || activeTab === 'PhD';

  return (
    <PageLayout
      title="Fee Structure"
      subtitle="Transparent, affordable fee details for all programmes offered at our college."
      breadcrumbItems={[{ label: 'Fee Structure' }]}
    >
      {/* Disclaimer */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8"
      >
        <AlertCircle size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-amber-800">
          <strong>Important:</strong> Fees mentioned are indicative for AY 2025-26 and are subject to
          revision by the University of Mumbai / State Government. Additional charges (see below) are
          not included. Verify final fees at the time of admission from the college office.
        </p>
      </motion.div>

      {/* ── Level tabs ── */}
      <div className="flex flex-wrap gap-2 mb-8">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full font-semibold text-sm transition-all ${
              activeTab === tab
                ? 'bg-navy-900 text-white shadow-navy'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tab === 'Junior College' ? 'Jr. College' : tab}
          </button>
        ))}
      </div>

      {/* ── Fee Table ── */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden mb-12"
      >
        <div className="bg-navy-900 text-white px-6 py-4 flex items-center justify-between">
          <h2 className="font-semibold text-lg">{label}</h2>
          <button className="flex items-center gap-2 text-sm text-teal-300 hover:text-white transition-colors">
            <Download size={16} />
            Download PDF
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-600 uppercase">
                <th className="text-left px-6 py-3">Programme</th>
                <th className="text-right px-4 py-3">Year 1</th>
                {(isDual || isTriple) && <th className="text-right px-4 py-3">Year 2</th>}
                {isTriple && <th className="text-right px-4 py-3">Year 3</th>}
                <th className="text-right px-6 py-3">Total</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {fees.map((fee, i) => (
                <tr
                  key={fee.shortTitle}
                  className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                    i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                  }`}
                >
                  <td className="px-6 py-4">
                    <p className="font-semibold text-navy-900">{fee.shortTitle}</p>
                    <p className="text-xs text-gray-500">{fee.programme}</p>
                  </td>
                  <td className="text-right px-4 py-4 font-medium text-gray-800">
                    {formatINR(fee.year1)}
                  </td>
                  {(isDual || isTriple) && (
                    <td className="text-right px-4 py-4 font-medium text-gray-800">
                      {fee.year2 ? formatINR(fee.year2) : '—'}
                    </td>
                  )}
                  {isTriple && (
                    <td className="text-right px-4 py-4 font-medium text-gray-800">
                      {fee.year3 ? formatINR(fee.year3) : '—'}
                    </td>
                  )}
                  <td className="text-right px-6 py-4 font-bold text-teal-700 text-lg">
                    {formatINR(fee.total)}
                  </td>
                  <td className="px-4 py-4 text-xs text-gray-500 italic max-w-[160px]">
                    {fee.notes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* ── Additional Charges ── */}
      <section className="mb-12">
        <h2 className="font-display text-2xl font-bold text-navy-900 mb-6 flex items-center gap-3">
          <IndianRupee size={24} className="text-teal-600" />
          Additional Charges (One-time / Annual)
        </h2>
        <div className="bg-white rounded-xl border border-gray-100 shadow-card overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b text-xs font-semibold text-gray-600 uppercase">
                <th className="text-left px-6 py-3">Item</th>
                <th className="text-right px-6 py-3">Amount</th>
              </tr>
            </thead>
            <tbody>
              {additionalCharges.map((charge, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3 text-sm text-gray-800">{charge.item}</td>
                  <td className="text-right px-6 py-3 text-sm font-medium text-gray-800">
                    {formatINR(charge.amount)}
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-50 font-semibold">
                <td className="px-6 py-3 text-navy-900">Approximate Total (Additional)</td>
                <td className="text-right px-6 py-3 text-navy-800">
                  {formatINR(additionalCharges.reduce((a, c) => a + c.amount, 0))}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Scholarship / Concession note ── */}
      <section className="mb-12">
        <h2 className="font-display text-2xl font-bold text-navy-900 mb-6">
          Scholarships & Fee Concessions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: 'Government Scholarships', desc: 'EBC, OBC, SC/ST, VJNT fee concessions as per Maharashtra State Government norms. Apply via MahaDBT portal.' },
            { title: 'National Scholarship Portal', desc: 'Post-matric scholarships for SC/ST/OBC/Minority students via scholarships.gov.in.' },
            { title: 'Merit Scholarship', desc: 'Full fee waiver for first-year students with HSC ≥ 90% marks (subject to availability).' },
            { title: 'Sports Quota', desc: 'Special fee concession for national/state level sportspersons. Contact the Sports Department.' },
            { title: 'Physically Challenged', desc: 'Full fee exemption for students with >40% disability as per UGC norms.' },
            { title: 'Alumni Scholarship', desc: 'The Alumni Association provides needs-based scholarships for deserving students each year.' },
          ].map(item => (
            <div key={item.title} className="flex gap-3 p-5 bg-green-50 rounded-xl border border-green-100">
              <CheckCircle2 size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-green-900 mb-1">{item.title}</h4>
                <p className="text-sm text-green-800">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Payment info */}
      <div className="bg-navy-50 rounded-xl p-6 border border-navy-100">
        <h3 className="font-semibold text-navy-900 mb-3 flex items-center gap-2">
          <Info size={18} className="text-teal-600" />
          Fee Payment Information
        </h3>
        <ul className="text-sm text-gray-700 space-y-2">
          <li>• Fees are payable by DD / NEFT / RTGS in favour of <strong>"N. G. Acharya & D. K. Marathe College"</strong></li>
          <li>• Online payment available at the college portal: <strong>my.ngacharya.edu.in</strong></li>
          <li>• Annual fees are typically payable in two instalments (July and January)</li>
          <li>• Separate challan for University exam fees issued by the exam section</li>
          <li>• Library deposit is fully refundable at the end of the programme</li>
        </ul>
      </div>
    </PageLayout>
  );
}
