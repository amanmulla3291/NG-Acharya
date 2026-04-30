import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { infraStore } from '@/lib/data/stores';
import type { InfrastructureItem } from '@/types';
import Editor from 'react-simple-wysiwyg';
import { getRandomImageUrl } from '@/lib/utils/randomImage';

const categories: InfrastructureItem['category'][] = [
  'Library', 'Sports', 'IT', 'Labs', 'Auditorium', 'Canteen', 'Media', 'Environment', 'Other',
];

export default function InfraFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    name: '', slug: '', category: 'Other' as InfrastructureItem['category'],
    description: '', area: '', capacity: 0,
    featuresText: '', imagesText: '',
  });

  useEffect(() => {
    if (isEdit && id) {
      const item = infraStore.getById(Number(id));
      if (item) {
        setForm({
          name: item.name, slug: item.slug, category: item.category,
          description: item.description, area: item.area || '',
          capacity: item.capacity || 0,
          featuresText: item.features.join('\n'),
          imagesText: item.images.join('\n'),
        });
      }
    }
  }, [id, isEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'number' ? Number(value) : value }));
  };

  const autoSlug = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data: Omit<InfrastructureItem, 'id'> = {
      name: form.name, slug: form.slug, category: form.category,
      description: form.description, area: form.area || undefined,
      capacity: form.capacity || undefined,
      features: form.featuresText.split('\n').map((s) => s.trim()).filter(Boolean),
      images: form.imagesText.split('\n').map((s) => s.trim()).filter(Boolean),
    };
    if (isEdit && id) infraStore.update(Number(id), data);
    else infraStore.create(data);
    navigate('/admin/infrastructure');
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-navy-900">
          {isEdit ? 'Edit Infrastructure' : 'Add Infrastructure'}
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select 
                  name="category" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all bg-white" 
                  value={form.category} 
                  onChange={handleChange}
                >
                  {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="md:col-span-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Area</label>
                <input 
                  name="area" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all" 
                  value={form.area} 
                  onChange={handleChange} 
                  placeholder="e.g. 5000 sq. ft." 
                />
              </div>

              <div className="md:col-span-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
                <input 
                  name="capacity" 
                  type="number" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all" 
                  value={form.capacity} 
                  onChange={handleChange} 
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Features (one per line)</label>
                <textarea 
                  name="featuresText" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all" 
                  rows={4} 
                  value={form.featuresText} 
                  onChange={handleChange} 
                />
              </div>

              <div className="md:col-span-6">
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-sm font-medium text-gray-700">Image URLs (one per line)</label>
                  <button 
                    className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors" 
                    type="button" 
                    onClick={() => setForm(prev => ({ ...prev, imagesText: prev.imagesText ? prev.imagesText + '\n' + getRandomImageUrl() : getRandomImageUrl() }))}
                  >
                    Add Random
                  </button>
                </div>
                <textarea 
                  name="imagesText" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all" 
                  rows={4} 
                  value={form.imagesText} 
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
              {isEdit ? 'Update' : 'Add'} Item
            </button>
            <button 
              type="button" 
              className="px-6 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors" 
              onClick={() => navigate('/admin/infrastructure')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
