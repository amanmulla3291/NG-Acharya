import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { noticeStore } from '@/lib/data/stores';
import type { Notice, NoticeCategory } from '@/types';
import Editor from 'react-simple-wysiwyg';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronLeft, 
  Save, 
  X, 
  Megaphone, 
  Calendar, 
  User, 
  Link as LinkIcon, 
  Type, 
  FileText,
  AlertCircle
} from 'lucide-react';

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
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      <div className="flex items-center gap-6">
        <Button variant="ghost" size="icon" asChild className="rounded-2xl h-12 w-12 bg-white shadow-sm border border-slate-100 hover:bg-slate-50 hover:border-slate-200 transition-all">
          <Link to="/admin/notices">
            <ChevronLeft className="h-6 w-6 text-navy-900" />
          </Link>
        </Button>
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-navy-900 tracking-tight">{isEdit ? 'Edit Notice' : 'Compose New Notice'}</h1>
          <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">Configure communication details and delivery</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white overflow-hidden rounded-[2.5rem]">
          <CardHeader className="px-10 py-8 border-b border-slate-50 bg-slate-50/30">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
                <Megaphone className="h-5 w-5" />
              </div>
              <CardTitle className="text-xl font-black text-navy-900">Communication Payload</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
              
              <div className="md:col-span-8 space-y-3">
                <Label htmlFor="title" className="text-navy-900 font-black text-xs uppercase tracking-widest ml-1">Notice Headline</Label>
                <div className="relative group">
                  <Type className="absolute left-4 top-3.5 h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                  <Input 
                    id="title"
                    name="title" 
                    placeholder="e.g. End Semester Examination Schedule 2024"
                    className="pl-12 h-12 rounded-2xl border-slate-100 bg-slate-50/50 focus-visible:ring-blue-600/10 focus-visible:border-blue-600 focus-visible:bg-white transition-all font-bold text-navy-900" 
                    value={form.title} 
                    onChange={handleTitleChange} 
                    required 
                  />
                </div>
              </div>

              <div className="md:col-span-4 space-y-3">
                <Label htmlFor="slug" className="text-navy-900 font-black text-xs uppercase tracking-widest ml-1">Identifier Slug</Label>
                <Input 
                  id="slug"
                  name="slug" 
                  className="h-12 rounded-2xl bg-slate-100/50 border-slate-100 text-slate-400 font-bold px-4 cursor-not-allowed" 
                  value={form.slug} 
                  onChange={handleChange} 
                  required 
                  readOnly
                />
              </div>

              <div className="md:col-span-4 space-y-3">
                <Label htmlFor="category" className="text-navy-900 font-black text-xs uppercase tracking-widest ml-1">Distribution Type</Label>
                <select 
                  id="category"
                  name="category" 
                  className="w-full flex h-12 rounded-2xl border border-slate-100 bg-slate-50/50 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 focus:bg-white transition-all font-black text-navy-900" 
                  value={form.category} 
                  onChange={handleChange}
                >
                  {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="md:col-span-4 space-y-3">
                <Label htmlFor="publishedAt" className="text-navy-900 font-black text-xs uppercase tracking-widest ml-1">Publication Timestamp</Label>
                <div className="relative group">
                  <Calendar className="absolute left-4 top-3.5 h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors pointer-events-none" />
                  <Input 
                    id="publishedAt"
                    name="publishedAt" 
                    type="datetime-local" 
                    className="pl-12 h-12 rounded-2xl border-slate-100 bg-slate-50/50 focus-visible:ring-blue-600/10 focus-visible:border-blue-600 focus-visible:bg-white transition-all font-bold text-navy-900" 
                    value={form.publishedAt} 
                    onChange={handleChange} 
                  />
                </div>
              </div>

              <div className="md:col-span-4 space-y-3">
                <Label htmlFor="postedBy" className="text-navy-900 font-black text-xs uppercase tracking-widest ml-1">Issuing Authority</Label>
                <div className="relative group">
                  <User className="absolute left-4 top-3.5 h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                  <Input 
                    id="postedBy"
                    name="postedBy" 
                    placeholder="e.g. Principal's Office"
                    className="pl-12 h-12 rounded-2xl border-slate-100 bg-slate-50/50 focus-visible:ring-blue-600/10 focus-visible:border-blue-600 focus-visible:bg-white transition-all font-bold text-navy-900" 
                    value={form.postedBy} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
              </div>

              <div className="md:col-span-12 space-y-3">
                <Label className="text-navy-900 font-black text-xs uppercase tracking-widest ml-1 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-blue-600" /> Primary Communication Body
                </Label>
                <div className="border border-slate-100 rounded-3xl overflow-hidden focus-within:ring-4 focus-within:ring-blue-600/5 focus-within:border-blue-600 transition-all bg-slate-50/30">
                  <Editor 
                    value={form.content} 
                    onChange={(e) => setForm(prev => ({ ...prev, content: e.target.value }))} 
                    containerProps={{ style: { height: '350px', border: 'none', background: 'transparent' } }}
                  />
                </div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider ml-1 italic">Visual formatting will be preserved in the public portal.</p>
              </div>

              <div className="md:col-span-6 space-y-3">
                <Label htmlFor="attachmentUrl" className="text-navy-900 font-black text-xs uppercase tracking-widest ml-1">Digital Attachment Link</Label>
                <div className="relative group">
                  <LinkIcon className="absolute left-4 top-3.5 h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                  <Input 
                    id="attachmentUrl"
                    name="attachmentUrl" 
                    className="pl-12 h-12 rounded-2xl border-slate-100 bg-slate-50/50 focus-visible:ring-blue-600/10 focus-visible:border-blue-600 focus-visible:bg-white transition-all font-bold text-navy-900" 
                    value={form.attachmentUrl} 
                    onChange={handleChange} 
                    placeholder="https://drive.google.com/..." 
                  />
                </div>
              </div>

              <div className="md:col-span-6 space-y-3">
                <Label htmlFor="attachmentName" className="text-navy-900 font-black text-xs uppercase tracking-widest ml-1">Attachment Descriptor</Label>
                <Input 
                  id="attachmentName"
                  name="attachmentName" 
                  className="h-12 rounded-2xl border-slate-100 bg-slate-50/50 focus-visible:ring-blue-600/10 focus-visible:border-blue-600 focus-visible:bg-white transition-all font-bold text-navy-900 px-4" 
                  value={form.attachmentName} 
                  onChange={handleChange} 
                  placeholder="e.g. Download PDF Version" 
                />
              </div>

              <div className="md:col-span-12 pt-4">
                <div 
                  className={`flex items-center gap-5 p-6 rounded-3xl border transition-all duration-500 cursor-pointer ${form.isImportant ? 'bg-red-50/30 border-red-100 shadow-[0_10px_40px_-10px_rgba(220,38,38,0.1)]' : 'bg-slate-50/50 border-slate-100 hover:border-slate-200'}`}
                  onClick={() => setForm(prev => ({ ...prev, isImportant: !prev.isImportant }))}
                >
                  <div className={`h-12 w-12 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-sm ${form.isImportant ? 'bg-red-600 text-white rotate-12 scale-110' : 'bg-white text-slate-400'}`}>
                    <AlertCircle className="h-6 w-6" />
                  </div>
                  <div className="flex flex-col flex-1">
                    <Label htmlFor="isImportant" className="text-navy-900 font-black text-base cursor-pointer">Escalate to Priority</Label>
                    <p className="text-xs text-slate-400 font-medium">Priority notices are anchored at the top of the portal with visual emphasis.</p>
                  </div>
                  <Checkbox 
                    id="isImportant"
                    checked={form.isImportant}
                    className="h-6 w-6 rounded-lg data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-slate-50/30 border-t border-slate-50 p-10 flex justify-between items-center">
            <Button variant="ghost" type="button" onClick={() => navigate('/admin/notices')} className="text-slate-400 font-black hover:text-navy-900 hover:bg-slate-100 rounded-xl h-12 px-6">
              Discard Draft
            </Button>
            <Button type="submit" className="bg-navy-900 hover:bg-blue-600 text-white shadow-2xl shadow-navy-900/10 font-black px-12 h-14 rounded-2xl transition-all duration-300">
              <Save className="mr-3 h-5 w-5" /> {isEdit ? 'Commit Changes' : 'Broadcast Notice'}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
