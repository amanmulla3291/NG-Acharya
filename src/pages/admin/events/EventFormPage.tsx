import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { eventStore } from '@/lib/data/stores';
import type { CollegeEvent, EventCategory } from '@/types';
import Editor from 'react-simple-wysiwyg';
import { getRandomImageUrl } from '@/lib/utils/randomImage';

const categories: EventCategory[] = ['Cultural', 'Sports', 'Academic', 'Workshop', 'Placement', 'Alumni', 'NSS/NCC'];

export default function EventFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    title: '',
    slug: '',
    category: 'Academic' as EventCategory,
    description: '',
    date: new Date().toISOString().slice(0, 16),
    endDate: '',
    venue: '',
    imageUrl: '',
    registrationLink: '',
    isUpcoming: true,
    highlightsText: '', // comma-separated, split on save
  });

  useEffect(() => {
    if (isEdit && id) {
      const item = eventStore.getById(Number(id));
      if (item) {
        setForm({
          title: item.title,
          slug: item.slug,
          category: item.category,
          description: item.description,
          date: item.date.slice(0, 16),
          endDate: item.endDate?.slice(0, 16) || '',
          venue: item.venue,
          imageUrl: item.imageUrl || '',
          registrationLink: item.registrationLink || '',
          isUpcoming: item.isUpcoming,
          highlightsText: item.highlights?.join(', ') || '',
        });
      }
    }
  }, [id, isEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const autoSlug = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setForm((prev) => ({ ...prev, title, slug: isEdit ? prev.slug : autoSlug(title) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data: Omit<CollegeEvent, 'id'> = {
      title: form.title,
      slug: form.slug,
      category: form.category,
      description: form.description,
      date: new Date(form.date).toISOString(),
      endDate: form.endDate ? new Date(form.endDate).toISOString() : undefined,
      venue: form.venue,
      imageUrl: form.imageUrl || undefined,
      registrationLink: form.registrationLink || undefined,
      isUpcoming: form.isUpcoming,
      highlights: form.highlightsText ? form.highlightsText.split(',').map((s) => s.trim()).filter(Boolean) : undefined,
    };
    if (isEdit && id) {
      eventStore.update(Number(id), data);
    } else {
      eventStore.create(data);
    }
    navigate('/admin/events');
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-navy-900">{isEdit ? 'Edit Event' : 'Create Event'}</h1>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <form onSubmit={handleSubmit}>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              <div className="md:col-span-8">
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input 
                  name="title" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors outline-none" 
                  value={form.title} 
                  onChange={handleTitleChange} 
                  required 
                />
              </div>
              <div className="md:col-span-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                <input 
                  name="slug" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors outline-none bg-gray-50" 
                  value={form.slug} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              
              <div className="md:col-span-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select 
                  name="category" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors outline-none" 
                  value={form.category} 
                  onChange={handleChange}
                >
                  {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="md:col-span-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input 
                  name="date" 
                  type="datetime-local" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors outline-none" 
                  value={form.date} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="md:col-span-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input 
                  name="endDate" 
                  type="datetime-local" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors outline-none" 
                  value={form.endDate} 
                  onChange={handleChange} 
                />
              </div>
              
              <div className="md:col-span-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Venue</label>
                <input 
                  name="venue" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors outline-none" 
                  value={form.venue} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="md:col-span-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Registration Link</label>
                <input 
                  name="registrationLink" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors outline-none" 
                  value={form.registrationLink} 
                  onChange={handleChange} 
                  placeholder="https://..." 
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
              
              <div className="md:col-span-12">
                <label className="block text-sm font-medium text-gray-700 mb-1">Highlights (comma-separated)</label>
                <textarea 
                  name="highlightsText" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors outline-none" 
                  rows={3} 
                  value={form.highlightsText} 
                  onChange={handleChange} 
                  placeholder="Highlight 1, Highlight 2, ..." 
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
                    placeholder="https://..." 
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
              
              <div className="md:col-span-6 flex items-end">
                <div className="flex items-center gap-2 mb-2">
                  <input 
                    type="checkbox" 
                    name="isUpcoming" 
                    className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500" 
                    id="isUpcoming" 
                    checked={form.isUpcoming} 
                    onChange={handleChange} 
                  />
                  <label className="text-sm font-medium text-gray-700 cursor-pointer" htmlFor="isUpcoming">
                    Upcoming Event
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex gap-3">
            <button type="submit" className="px-5 py-2.5 bg-navy-700 text-white rounded-lg font-medium hover:bg-navy-800 transition-colors flex items-center gap-2">
              <i className="bi bi-check-circle" />
              {isEdit ? 'Update Event' : 'Create Event'}
            </button>
            <button type="button" className="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors" onClick={() => navigate('/admin/events')}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
