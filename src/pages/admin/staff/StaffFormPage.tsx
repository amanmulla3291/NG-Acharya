import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { staffStore } from '@/lib/data/stores';
import type { StaffMember } from '@/types';
import Editor from 'react-simple-wysiwyg';
import { getRandomImageUrl } from '@/lib/utils/randomImage';

export default function StaffFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    name: '', slug: '', designation: '', qualification: '',
    department: '', departmentSlug: '', experience: 0,
    specializationText: '', email: '', imageUrl: '',
    publications: 0, awardsText: '', bio: '',
  });

  useEffect(() => {
    if (isEdit && id) {
      const item = staffStore.getById(Number(id));
      if (item) {
        setForm({
          name: item.name, slug: item.slug, designation: item.designation,
          qualification: item.qualification, department: item.department,
          departmentSlug: item.departmentSlug, experience: item.experience,
          specializationText: item.specialization.join(', '),
          email: item.email || '', imageUrl: item.imageUrl || '',
          publications: item.publications || 0,
          awardsText: item.awards?.join('\n') || '',
          bio: item.bio || '',
        });
      }
    }
  }, [id, isEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'number' ? Number(value) : value }));
  };

  const autoSlug = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data: Omit<StaffMember, 'id'> = {
      name: form.name, slug: form.slug, designation: form.designation,
      qualification: form.qualification, department: form.department,
      departmentSlug: form.departmentSlug, experience: form.experience,
      specialization: form.specializationText.split(',').map((s) => s.trim()).filter(Boolean),
      email: form.email || undefined, imageUrl: form.imageUrl || undefined,
      publications: form.publications || undefined,
      awards: form.awardsText ? form.awardsText.split('\n').map((s) => s.trim()).filter(Boolean) : undefined,
      bio: form.bio || undefined,
    };
    if (isEdit && id) staffStore.update(Number(id), data);
    else staffStore.create(data);
    navigate('/admin/staff');
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-navy-900">
          {isEdit ? 'Edit Staff' : 'Add Staff'}
        </h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              <div className="md:col-span-5">
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input 
                  name="name" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all" 
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value, slug: isEdit ? p.slug : autoSlug(e.target.value) }))} 
                  required 
                />
              </div>

              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                <input 
                  name="slug" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all" 
                  value={form.slug} 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className="md:col-span-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
                <input 
                  name="designation" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all" 
                  value={form.designation} 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className="md:col-span-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Qualification</label>
                <input 
                  name="qualification" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all" 
                  value={form.qualification} 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <input 
                  name="department" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all" 
                  value={form.department} 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Dept. Slug</label>
                <input 
                  name="departmentSlug" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all" 
                  value={form.departmentSlug} 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Experience (years)</label>
                <input 
                  name="experience" 
                  type="number" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all" 
                  value={form.experience} 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Publications</label>
                <input 
                  name="publications" 
                  type="number" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all" 
                  value={form.publications} 
                  onChange={handleChange} 
                />
              </div>

              <div className="md:col-span-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  name="email" 
                  type="email" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all" 
                  value={form.email} 
                  onChange={handleChange} 
                />
              </div>

              <div className="col-span-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">Specializations (comma-separated)</label>
                <input 
                  name="specializationText" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all" 
                  value={form.specializationText} 
                  onChange={handleChange} 
                />
              </div>

              <div className="col-span-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                <div className="prose-editor-container border border-gray-300 rounded-lg overflow-hidden">
                  <Editor 
                    value={form.bio} 
                    onChange={(e) => setForm(prev => ({ ...prev, bio: e.target.value }))} 
                  />
                </div>
              </div>

              <div className="md:col-span-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Awards (one per line)</label>
                <textarea 
                  name="awardsText" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all" 
                  rows={3} 
                  value={form.awardsText} 
                  onChange={handleChange} 
                />
              </div>

              <div className="md:col-span-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <div className="flex">
                  <input 
                    name="imageUrl" 
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all" 
                    value={form.imageUrl} 
                    onChange={handleChange} 
                  />
                  <button 
                    className="px-4 py-2 bg-gray-100 text-gray-700 border border-l-0 border-gray-300 rounded-r-lg hover:bg-gray-200 transition-colors" 
                    type="button" 
                    onClick={() => setForm(prev => ({ ...prev, imageUrl: getRandomImageUrl() }))}
                  >
                    Random
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex gap-3">
            <button 
              type="submit" 
              className="px-6 py-2 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-colors flex items-center gap-2"
            >
              <i className="bi bi-check-circle" />
              {isEdit ? 'Update' : 'Add'} Staff
            </button>
            <button 
              type="button" 
              className="px-6 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors" 
              onClick={() => navigate('/admin/staff')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
