import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { courseStore } from '@/lib/data/stores';
import type { Course, CourseLevel } from '@/types';
import Editor from 'react-simple-wysiwyg';
import { getRandomImageUrl } from '@/lib/utils/randomImage';

const levels: CourseLevel[] = ['UG', 'PG', 'PhD', 'Certificate', 'Junior College', 'Unaided'];

export default function CourseFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    title: '', shortTitle: '', slug: '', level: 'UG' as CourseLevel,
    duration: '3 Years', seats: 60, eligibility: '', description: '',
    highlightsText: '', careerText: '', departmentSlug: '',
    affiliatedTo: 'University of Mumbai', feePerYear: 10000,
    isActive: true, admissionOpen: true, imageUrl: '',
  });

  useEffect(() => {
    if (isEdit && id) {
      const item = courseStore.getById(Number(id));
      if (item) {
        setForm({
          title: item.title, shortTitle: item.shortTitle, slug: item.slug,
          level: item.level, duration: item.duration, seats: item.seats,
          eligibility: item.eligibility, description: item.description,
          highlightsText: item.highlights.join(', '),
          careerText: item.careerProspects.join(', '),
          departmentSlug: item.departmentSlug, affiliatedTo: item.affiliatedTo,
          feePerYear: item.fees.perYear, isActive: item.isActive,
          admissionOpen: item.admissionOpen, imageUrl: item.imageUrl || '',
        });
      }
    }
  }, [id, isEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : type === 'number' ? Number(value) : value,
    }));
  };

  const autoSlug = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data: Omit<Course, 'id'> = {
      title: form.title, shortTitle: form.shortTitle, slug: form.slug,
      level: form.level, duration: form.duration, seats: form.seats,
      eligibility: form.eligibility, description: form.description,
      highlights: form.highlightsText.split(',').map((s) => s.trim()).filter(Boolean),
      careerProspects: form.careerText.split(',').map((s) => s.trim()).filter(Boolean),
      departmentSlug: form.departmentSlug, affiliatedTo: form.affiliatedTo,
      fees: { perYear: form.feePerYear, currency: 'INR' },
      isActive: form.isActive, admissionOpen: form.admissionOpen,
      imageUrl: form.imageUrl || undefined,
    };
    if (isEdit && id) courseStore.update(Number(id), data);
    else courseStore.create(data);
    navigate('/admin/courses');
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-navy-900">{isEdit ? 'Edit Course' : 'Create Course'}</h1>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <form onSubmit={handleSubmit}>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              <div className="md:col-span-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Title</label>
                <input 
                  name="title" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors outline-none" 
                  value={form.title}
                  onChange={(e) => setForm((p) => ({ ...p, title: e.target.value, slug: isEdit ? p.slug : autoSlug(e.target.value) }))} 
                  required 
                />
              </div>
              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Short Title</label>
                <input 
                  name="shortTitle" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors outline-none" 
                  value={form.shortTitle} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                <input 
                  name="slug" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors outline-none bg-gray-50" 
                  value={form.slug} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              
              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
                <select 
                  name="level" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors outline-none" 
                  value={form.level} 
                  onChange={handleChange}
                >
                  {levels.map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                <input 
                  name="duration" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors outline-none" 
                  value={form.duration} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Seats</label>
                <input 
                  name="seats" 
                  type="number" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors outline-none" 
                  value={form.seats} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Fee / Year (₹)</label>
                <input 
                  name="feePerYear" 
                  type="number" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors outline-none" 
                  value={form.feePerYear} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              
              <div className="md:col-span-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Department Slug</label>
                <input 
                  name="departmentSlug" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors outline-none" 
                  value={form.departmentSlug} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="md:col-span-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Affiliated To</label>
                <input 
                  name="affiliatedTo" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors outline-none" 
                  value={form.affiliatedTo} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              
              <div className="md:col-span-12">
                <label className="block text-sm font-medium text-gray-700 mb-1">Eligibility</label>
                <input 
                  name="eligibility" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors outline-none" 
                  value={form.eligibility} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="md:col-span-12">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-teal-500 focus-within:border-teal-500 transition-shadow">
                  <Editor 
                    value={form.description} 
                    onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))} 
                    containerProps={{ style: { height: '300px', border: 'none' } }}
                  />
                </div>
              </div>
              
              <div className="md:col-span-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Highlights (comma-separated)</label>
                <textarea 
                  name="highlightsText" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors outline-none" 
                  rows={3} 
                  value={form.highlightsText} 
                  onChange={handleChange} 
                />
              </div>
              <div className="md:col-span-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Career Prospects (comma-separated)</label>
                <textarea 
                  name="careerText" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors outline-none" 
                  rows={3} 
                  value={form.careerText} 
                  onChange={handleChange} 
                />
              </div>
              
              <div className="md:col-span-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <div className="flex gap-2">
                  <input 
                    name="imageUrl" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors outline-none" 
                    value={form.imageUrl} 
                    onChange={handleChange} 
                  />
                  <button 
                    className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg font-medium hover:bg-gray-200 transition-colors whitespace-nowrap" 
                    type="button" 
                    onClick={() => setForm(prev => ({ ...prev, imageUrl: getRandomImageUrl() }))}
                  >
                    Random
                  </button>
                </div>
              </div>
              <div className="md:col-span-6 flex items-end gap-6 mb-2">
                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    name="isActive" 
                    className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500" 
                    id="isActive" 
                    checked={form.isActive} 
                    onChange={handleChange} 
                  />
                  <label className="text-sm font-medium text-gray-700 cursor-pointer" htmlFor="isActive">
                    Active
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    name="admissionOpen" 
                    className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500" 
                    id="admissionOpen" 
                    checked={form.admissionOpen} 
                    onChange={handleChange} 
                  />
                  <label className="text-sm font-medium text-gray-700 cursor-pointer" htmlFor="admissionOpen">
                    Admission Open
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex gap-3">
            <button type="submit" className="px-5 py-2.5 bg-navy-700 text-white rounded-lg font-medium hover:bg-navy-800 transition-colors flex items-center gap-2">
              <i className="bi bi-check-circle" />
              {isEdit ? 'Update' : 'Create'} Course
            </button>
            <button type="button" className="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors" onClick={() => navigate('/admin/courses')}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
