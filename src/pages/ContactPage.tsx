import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send, Clock } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Enquiry',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', subject: 'General Enquiry', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <PageLayout
      title="Contact Us"
      subtitle="Get in touch with us for admissions, placements, or any other enquiries."
      breadcrumbItems={[{ label: 'Contact' }]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact info cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Address */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-card hover:shadow-hover transition-all">
            <h3 className="font-semibold text-navy-900 mb-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                <MapPin size={18} className="text-orange-600" />
              </div>
              Campus Address
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Plot No. 2, Govardhan Das Colony<br />
              Chembur, Mumbai – 400 071<br />
              Maharashtra, India
            </p>
          </div>

          {/* Phone */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-card hover:shadow-hover transition-all">
            <h3 className="font-semibold text-navy-900 mb-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Phone size={18} className="text-blue-600" />
              </div>
              Phone
            </h3>
            <div className="space-y-2">
              <a href="tel:+912225224175" className="block text-teal-600 hover:text-teal-700 font-medium text-sm">
                +91 22 2522 4175
              </a>
              <a href="tel:+912225226149" className="block text-teal-600 hover:text-teal-700 font-medium text-sm">
                +91 22 2522 6149
              </a>
            </div>
          </div>

          {/* Email */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-card hover:shadow-hover transition-all">
            <h3 className="font-semibold text-navy-900 mb-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <Mail size={18} className="text-purple-600" />
              </div>
              Email
            </h3>
            <div className="space-y-2">
              <a href="mailto:principal@ngacharya.edu.in" className="block text-teal-600 hover:text-teal-700 font-medium text-sm break-all">
                principal@ngacharya.edu.in
              </a>
              <a href="mailto:admissions@ngacharya.edu.in" className="block text-teal-600 hover:text-teal-700 font-medium text-sm break-all">
                admissions@ngacharya.edu.in
              </a>
            </div>
          </div>

          {/* Hours */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-card">
            <h3 className="font-semibold text-navy-900 mb-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <Clock size={18} className="text-green-600" />
              </div>
              Office Hours
            </h3>
            <div className="space-y-1 text-sm text-gray-700">
              <p className="font-medium">Monday – Friday</p>
              <p>10:00 AM – 4:00 PM</p>
              <p className="pt-2 font-medium text-xs text-gray-500">Closed on Sundays & Holidays</p>
            </div>
          </div>
        </motion.div>

        {/* Contact form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2"
        >
          <div className="bg-white rounded-xl border border-gray-100 p-8 md:p-10 shadow-card">
            <h2 className="font-display text-3xl font-bold text-navy-900 mb-2">Send us a Message</h2>
            <p className="text-gray-600 mb-8">
              Fill out the form below and we'll get back to you as soon as possible.
            </p>

            {submitted ? (
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="p-6 bg-green-50 border border-green-200 rounded-lg text-center"
              >
                <p className="text-green-700 font-semibold text-lg mb-2">✓ Message Sent Successfully!</p>
                <p className="text-green-600 text-sm">
                  Thank you for reaching out. We'll respond to your message within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-navy-900 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy-900 mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-navy-900 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy-900 mb-2">Subject *</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-500 transition-colors"
                    >
                      <option>General Enquiry</option>
                      <option>Admissions</option>
                      <option>Placements</option>
                      <option>Academic</option>
                      <option>Facilities</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-navy-900 mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell us how we can help you..."
                    rows={6}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-500 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white font-semibold rounded-lg hover:from-teal-700 hover:to-teal-800 transition-all shadow-lg hover:shadow-xl"
                >
                  <Send size={18} />
                  Send Message
                </button>

                <p className="text-xs text-gray-500 text-center">
                  We typically respond within 24 business hours.
                </p>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
}
