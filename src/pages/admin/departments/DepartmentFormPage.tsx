import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { departmentStore } from '@/lib/data/stores';
import type { Department } from '@/types';
import Editor from 'react-simple-wysiwyg';
import { getRandomImageUrl } from '@/lib/utils/randomImage';

export default function DepartmentFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    name: '', shortName: '', slug: '', description: '', vision: '', mission: '',
    headName: '', headDesignation: '', headImageUrl: '', established: 2000,
    coursesText: '', achievementsText: '', facilitiesText: '', imageUrl: '',
  });

  useEffect(() => {
    if (isEdit && id) {
      const item = departmentStore.getById(Number(id));
      if (item) {
        setForm({
          name: item.name, shortName: item.shortName || '', slug: item.slug,
          description: item.description, vision: item.vision, mission: item.mission,
          headName: item.headName, headDesignation: item.headDesignation,
          headImageUrl: item.headImageUrl || '', established: item.established,
          coursesText: item.courses.join(', '),
          achievementsText: item.achievements.join('\n'),
          facilitiesText: item.facilities.join('\n'),
          imageUrl: item.imageUrl || '',
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
    const data: Omit<Department, 'id'> = {
      name: form.name, shortName: form.shortName || undefined, slug: form.slug,
      description: form.description, vision: form.vision, mission: form.mission,
      headName: form.headName, headDesignation: form.headDesignation,
      headImageUrl: form.headImageUrl || undefined, established: form.established,
      faculty: isEdit && id ? departmentStore.getById(Number(id))?.faculty || [] : [], // preserved
      courses: form.coursesText.split(',').map((s) => s.trim()).filter(Boolean),
      achievements: form.achievementsText.split('\n').map((s) => s.trim()).filter(Boolean),
      facilities: form.facilitiesText.split('\n').map((s) => s.trim()).filter(Boolean),
      imageUrl: form.imageUrl || undefined,
    };
    if (isEdit && id) departmentStore.update(Number(id), data);
    else departmentStore.create(data);
    navigate('/admin/departments');
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-navy-900">
          {isEdit ? 'Edit Department' : 'Create Department'}
        </h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              <div className="md:col-span-5">
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input 
                  name="name" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all" 
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value, slug: isEdit ? p.slug : autoSlug(e.target.value) }))} 
                  required 
                />
              </div>

              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Short Name</label>
                <input 
                  name="shortName" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all" 
                  value={form.shortName} 
                  onChange={handleChange} 
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                <input 
                  name="slug" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all" 
                  value={form.slug} 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Est.</label>
                <input 
                  name="established" 
                  type="number" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all" 
                  value={form.established} 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className="md:col-span-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Head Name</label>
                <input 
                  name="headName" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all" 
                  value={form.headName} 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className="md:col-span-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Head Designation</label>
                <input 
                  name="headDesignation" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all" 
                  value={form.headDesignation} 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className="col-span-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <div className="prose-editor-container border border-gray-300 rounded-lg overflow-hidden">
                  <Editor 
                    value={form.description} 
                    onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))} 
                  />
                </div>
              </div>

              <div className="md:col-span-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Vision</label>
                <textarea 
                  name="vision" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all" 
                  rows={3} 
                  value={form.vision} 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className="md:col-span-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Mission</label>
                <textarea 
                  name="mission" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all" 
                  rows={3} 
                  value={form.mission} 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className="md:col-span-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Course Slugs (comma-separated)</label>
                <input 
                  name="coursesText" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all" 
                  value={form.coursesText} 
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

              <div className="md:col-span-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Achievements (one per line)</label>
                <textarea 
                  name="achievementsText" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all" 
                  rows={4} 
                  value={form.achievementsText} 
                  onChange={handleChange} 
                />
              </div>

              <div className="md:col-span-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Facilities (one per line)</label>
                <textarea 
                  name="facilitiesText" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all" 
                  rows={4} 
                  value={form.facilitiesText} 
                  onChange={handleChange} 
                />
              </div>
            </div>
          </div>
          
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex gap-3">
            <button 
              type="submit" 
              className="px-6 py-2 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-colors flex items-center gap-2"
            >
              <i className="bi bi-check-circle" />
              {isEdit ? 'Update' : 'Create'} Department
            </button>
            <button 
              type="button" 
              className="px-6 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors" 
              onClick={() => navigate('/admin/departments')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
