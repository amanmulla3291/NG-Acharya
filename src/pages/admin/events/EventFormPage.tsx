// Admin Event Form Page
import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { eventStore } from '@/lib/data/stores';
import type { CollegeEvent, EventCategory } from '@/types';
import Editor from 'react-simple-wysiwyg';
import { getRandomImageUrl } from '@/lib/utils/randomImage';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  ChevronLeft, 
  Save, 
  X, 
  Sparkles, 
  Calendar, 
  MapPin, 
  Link as LinkIcon, 
  Image as ImageIcon,
  Tag,
  Clock,
  Layout,
  Info
} from 'lucide-react';

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
    highlightsText: '',
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
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
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
    <div className="max-w-6xl mx-auto space-y-10 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-6">
          <Button variant="ghost" size="icon" asChild className="rounded-2xl h-12 w-12 bg-white shadow-sm border border-slate-100 hover:bg-slate-50 hover:border-slate-200 transition-all">
            <Link to="/admin/events"><ChevronLeft className="h-6 w-6 text-navy-900" /></Link>
          </Button>
          <div className="space-y-1">
            <h1 className="text-4xl font-black text-navy-900 tracking-tight">
              {isEdit ? 'Refine Event' : 'Schedule Event'}
            </h1>
            <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">
              {isEdit ? `Modifying technical registry: #EVT-${id}` : 'Drafting institutional encounter details'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <Button variant="ghost" asChild className="text-slate-400 font-black hover:text-navy-900 hover:bg-slate-100 rounded-xl h-12 px-6">
            <Link to="/admin/events">Discard changes</Link>
          </Button>
          <Button onClick={handleSubmit} className="bg-navy-900 hover:bg-blue-600 text-white shadow-2xl shadow-navy-900/10 font-black px-8 h-14 rounded-2xl transition-all duration-300 gap-3">
            <Save className="h-5 w-5" /> {isEdit ? 'Commit Updates' : 'Broadcast Event'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-10">
          {/* Primary Details */}
          <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white overflow-hidden rounded-[2.5rem]">
            <CardHeader className="px-10 py-8 border-b border-slate-50 bg-slate-50/30">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
                  <Info className="h-5 w-5" />
                </div>
                <CardTitle className="text-xl font-black text-navy-900">Event Specification</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-10 space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                <div className="md:col-span-8 space-y-3">
                  <Label className="text-navy-900 font-black text-xs uppercase tracking-widest ml-1">Encounter Title</Label>
                  <Input 
                    name="title"
                    value={form.title}
                    onChange={handleTitleChange}
                    className="h-12 rounded-2xl border-slate-100 bg-slate-50/50 focus-visible:ring-blue-600/10 focus-visible:border-blue-600 focus-visible:bg-white transition-all font-bold text-navy-900 px-4"
                    placeholder="e.g. Annual Cultural Fest 2024"
                    required
                  />
                </div>
                <div className="md:col-span-4 space-y-3">
                  <Label className="text-navy-900 font-black text-xs uppercase tracking-widest ml-1">Taxonomy</Label>
                  <select 
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full flex h-12 rounded-2xl border border-slate-100 bg-slate-50/50 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 focus:bg-white transition-all font-black text-navy-900"
                  >
                    {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-navy-900 font-black text-xs uppercase tracking-widest ml-1">Narrative Description</Label>
                <div className="border border-slate-100 rounded-3xl overflow-hidden focus-within:ring-4 focus-within:ring-blue-600/5 focus-within:border-blue-600 transition-all bg-slate-50/30">
                  <Editor 
                    value={form.description} 
                    onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))} 
                    containerProps={{ style: { height: '350px', border: 'none', background: 'transparent' } }}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-navy-900 font-black text-xs uppercase tracking-widest ml-1">Key Manifestations (Comma Separated)</Label>
                <Textarea 
                  name="highlightsText"
                  value={form.highlightsText}
                  onChange={handleChange}
                  placeholder="Guest Performance, Prize Distribution, Food Stalls..."
                  className="min-h-[120px] rounded-3xl border-slate-100 bg-slate-50/50 focus-visible:ring-blue-600/10 focus-visible:border-blue-600 focus-visible:bg-white transition-all font-bold text-navy-900 px-6 py-4 resize-none"
                />
              </div>
            </CardContent>
          </Card>

          {/* Schedule & Logistics */}
          <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white overflow-hidden rounded-[2.5rem]">
            <CardHeader className="px-10 py-8 border-b border-slate-50 bg-slate-50/30">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-navy-900 flex items-center justify-center text-white shadow-lg shadow-navy-900/20">
                  <Layout className="h-5 w-5" />
                </div>
                <CardTitle className="text-xl font-black text-navy-900">Logistics & Temporality</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-10 space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <Label className="text-navy-900 font-black text-xs uppercase tracking-widest ml-1 text-blue-600">Commencement Timestamp</Label>
                  <div className="relative group">
                    <Calendar className="absolute left-4 top-3.5 h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors pointer-events-none" />
                    <Input 
                      type="datetime-local"
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                      className="pl-12 h-12 rounded-2xl border-slate-100 bg-slate-50/50 focus-visible:ring-blue-600/10 focus-visible:border-blue-600 focus-visible:bg-white transition-all font-black text-navy-900"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <Label className="text-navy-900 font-black text-xs uppercase tracking-widest ml-1">Termination (Optional)</Label>
                  <div className="relative group">
                    <Clock className="absolute left-4 top-3.5 h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors pointer-events-none" />
                    <Input 
                      type="datetime-local"
                      name="endDate"
                      value={form.endDate}
                      onChange={handleChange}
                      className="pl-12 h-12 rounded-2xl border-slate-100 bg-slate-50/50 focus-visible:ring-blue-600/10 focus-visible:border-blue-600 focus-visible:bg-white transition-all font-black text-navy-900"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <Label className="text-navy-900 font-black text-xs uppercase tracking-widest ml-1">Physical Venue / Coordinates</Label>
                  <div className="relative group">
                    <MapPin className="absolute left-4 top-3.5 h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors pointer-events-none" />
                    <Input 
                      name="venue"
                      value={form.venue}
                      onChange={handleChange}
                      placeholder="e.g. Main Auditorium, Ground Floor"
                      className="pl-12 h-12 rounded-2xl border-slate-100 bg-slate-50/50 focus-visible:ring-blue-600/10 focus-visible:border-blue-600 focus-visible:bg-white transition-all font-bold text-navy-900"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <Label className="text-navy-900 font-black text-xs uppercase tracking-widest ml-1">External Registration Gateway</Label>
                  <div className="relative group">
                    <LinkIcon className="absolute left-4 top-3.5 h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors pointer-events-none" />
                    <Input 
                      name="registrationLink"
                      value={form.registrationLink}
                      onChange={handleChange}
                      placeholder="https://forms.gle/..."
                      className="pl-12 h-12 rounded-2xl border-slate-100 bg-slate-50/50 focus-visible:ring-blue-600/10 focus-visible:border-blue-600 focus-visible:bg-white transition-all font-bold text-navy-900"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-4 space-y-10">
          {/* Status & Settings */}
          <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white overflow-hidden rounded-[2.5rem]">
            <CardHeader className="px-8 py-6 border-b border-slate-50 bg-slate-50/30">
              <CardTitle className="text-lg font-black text-navy-900">Protocol Settings</CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div 
                className={`flex items-center justify-between p-5 rounded-3xl border transition-all duration-500 cursor-pointer ${form.isUpcoming ? 'bg-blue-50/30 border-blue-100 shadow-[0_10px_40px_-10px_rgba(37,99,235,0.1)]' : 'bg-slate-50/50 border-slate-100'}`}
                onClick={() => setForm(prev => ({ ...prev, isUpcoming: !prev.isUpcoming }))}
              >
                <div className="space-y-0.5">
                  <Label className="text-sm font-black text-navy-900 cursor-pointer">Live Engagement</Label>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Active Visibility State</p>
                </div>
                <Switch 
                  checked={form.isUpcoming}
                  onCheckedChange={(checked: boolean) => setForm(prev => ({ ...prev, isUpcoming: checked }))}
                  className="data-[state=checked]:bg-blue-600"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-navy-900 font-black text-xs uppercase tracking-widest ml-1">Canonical Handle</Label>
                <div className="flex h-12 w-full items-center rounded-2xl border border-slate-100 bg-slate-100/50 px-4 py-2 text-xs font-mono font-bold text-slate-400 overflow-hidden">
                  <span className="opacity-50">/events/</span>{form.slug || '...'}
                </div>
                <p className="text-[10px] text-slate-400 font-bold italic ml-1">System-generated immutable identifier.</p>
              </div>
            </CardContent>
          </Card>

          {/* Media */}
          <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white overflow-hidden rounded-[2.5rem]">
            <CardHeader className="px-8 py-6 border-b border-slate-50 bg-slate-50/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ImageIcon className="h-5 w-5 text-blue-600" />
                  <CardTitle className="text-lg font-black text-navy-900">Visual Asset</CardTitle>
                </div>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setForm(prev => ({ ...prev, imageUrl: getRandomImageUrl() }))}
                  className="h-10 text-[10px] font-black uppercase tracking-widest gap-2 text-blue-600 hover:bg-blue-50 rounded-xl"
                >
                  <Sparkles className="h-4 w-4" /> Randomize
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="aspect-[4/3] w-full bg-slate-50 relative group overflow-hidden">
                {form.imageUrl ? (
                  <>
                    <img src={form.imageUrl} alt="Preview" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-navy-900/60 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <Button 
                        type="button" 
                        variant="destructive" 
                        size="sm" 
                        onClick={() => setForm(prev => ({ ...prev, imageUrl: '' }))}
                        className="gap-2 rounded-xl font-black uppercase tracking-widest text-[10px] h-10 px-4"
                      >
                        <X className="h-4 w-4" /> Purge Asset
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-4 p-10 text-center">
                    <div className="h-16 w-16 rounded-3xl bg-slate-100 flex items-center justify-center border border-slate-200/50">
                      <ImageIcon className="h-8 w-8 opacity-20" />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-[0.15em] leading-relaxed">No high-fidelity asset<br/>registered for this event.</p>
                  </div>
                )}
              </div>
              <div className="p-8 space-y-4">
                <div className="space-y-3">
                  <Label className="text-navy-900 font-black text-xs uppercase tracking-widest ml-1">Remote Asset URL</Label>
                  <Input 
                    name="imageUrl"
                    value={form.imageUrl}
                    onChange={handleChange}
                    placeholder="https://images.unsplash.com/..."
                    className="h-12 rounded-2xl border-slate-100 bg-slate-50/50 focus-visible:ring-blue-600/10 focus-visible:border-blue-600 focus-visible:bg-white transition-all font-bold text-navy-900 px-4"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
