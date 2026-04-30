import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { noticeStore } from '@/lib/data/stores';
import type { Notice, NoticeCategory } from '@/types';
import Editor from 'react-simple-wysiwyg';

const categories: Exclude<NoticeCategory, 'All'>[] = [
  'Admission', 'Academic', 'Examination', 'Result', 'General', 'Scholarship', 'Event',
];

export default function NoticeFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    title: '',
    slug: '',
    category: 'General' as Exclude<NoticeCategory, 'All'>,
    content: '',
    publishedAt: new Date().toISOString().slice(0, 16),
    isImportant: false,
    attachmentUrl: '',
    attachmentName: '',
    postedBy: '',
  });

  useEffect(() => {
    if (isEdit && id) {
      const item = noticeStore.getById(Number(id));
      if (item) {
        setForm({
          title: item.title,
          slug: item.slug,
          category: item.category,
          content: item.content,
          publishedAt: item.publishedAt.slice(0, 16),
          isImportant: item.isImportant,
          attachmentUrl: item.attachmentUrl || '',
          attachmentName: item.attachmentName || '',
          postedBy: item.postedBy,
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

  const autoSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setForm((prev) => ({
      ...prev,
      title,
      slug: isEdit ? prev.slug : autoSlug(title),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data: Omit<Notice, 'id'> = {
      ...form,
      publishedAt: new Date(form.publishedAt).toISOString(),
      attachmentUrl: form.attachmentUrl || undefined,
      attachmentName: form.attachmentName || undefined,
    };

    if (isEdit && id) {
      noticeStore.update(Number(id), data);
    } else {
      noticeStore.create(data);
    }
    navigate('/admin/notices');
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-navy-900">{isEdit ? 'Edit Notice' : 'Create Notice'}</h1>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Published At</label>
                <input 
                  name="publishedAt" 
                  type="datetime-local" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors outline-none" 
                  value={form.publishedAt} 
                  onChange={handleChange} 
                />
              </div>
              <div className="md:col-span-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Posted By</label>
                <input 
                  name="postedBy" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors outline-none" 
                  value={form.postedBy} 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className="md:col-span-12">
                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-teal-500 focus-within:border-teal-500 transition-shadow">
                  <Editor 
                    value={form.content} 
                    onChange={(e) => setForm(prev => ({ ...prev, content: e.target.value }))} 
                    containerProps={{ style: { height: '300px', border: 'none' } }}
                  />
                </div>
              </div>

              <div className="md:col-span-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Attachment URL</label>
                <input 
                  name="attachmentUrl" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors outline-none" 
                  value={form.attachmentUrl} 
                  onChange={handleChange} 
                  placeholder="https://..." 
                />
              </div>
              <div className="md:col-span-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Attachment Name</label>
                <input 
                  name="attachmentName" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors outline-none" 
                  value={form.attachmentName} 
                  onChange={handleChange} 
                  placeholder="e.g. Circular PDF" 
                />
              </div>

              <div className="md:col-span-12">
                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="checkbox"
                    name="isImportant"
                    id="isImportant"
                    className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                    checked={form.isImportant}
                    onChange={handleChange}
                  />
                  <label className="text-sm font-medium text-gray-700 cursor-pointer" htmlFor="isImportant">
                    Mark as Important
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex gap-3">
            <button type="submit" className="px-5 py-2.5 bg-navy-700 text-white rounded-lg font-medium hover:bg-navy-800 transition-colors flex items-center gap-2">
              <i className="bi bi-check-circle" />
              {isEdit ? 'Update Notice' : 'Create Notice'}
            </button>
            <button type="button" className="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors" onClick={() => navigate('/admin/notices')}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
