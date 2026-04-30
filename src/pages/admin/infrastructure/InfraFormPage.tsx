import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { infraStore } from '@/lib/data/stores';
import type { InfrastructureItem } from '@/types';
import Editor from 'react-simple-wysiwyg';
import { getRandomImageUrl } from '@/lib/utils/randomImage';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Save, 
  Building2, 
  Layout, 
  Image as ImageIcon, 
  PlusCircle, 
  Sparkles,
  Maximize,
  Users,
  Box,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

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
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-5">
          <Button variant="ghost" size="icon" asChild className="h-14 w-14 rounded-2xl bg-white shadow-sm border border-slate-200 hover:bg-slate-50 transition-all group">
            <Link to="/admin/infrastructure">
              <ArrowLeft className="h-6 w-6 text-slate-400 group-hover:text-navy-900 transition-colors" />
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="h-2 w-2 rounded-full bg-blue-600"></div>
              <span className="tracking-widest text-[10px] text-slate-400 font-black uppercase">Campus Management</span>
            </div>
            <h1 className="text-4xl font-black text-navy-900 tracking-tight italic uppercase">
              {isEdit ? 'Refine Facility' : 'Initialize Asset'}
            </h1>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="h-10 px-4 rounded-xl border-slate-200 text-slate-400 font-bold hidden md:flex">
            DRAFT MODE
          </Badge>
          <div className="h-10 w-[1px] bg-slate-200 hidden md:block mx-2"></div>
          <Button variant="ghost" asChild className="text-slate-400 font-black tracking-widest text-[10px] uppercase hover:bg-slate-100 h-14 px-6 rounded-2xl">
            <Link to="/admin/infrastructure">Discard Matrix</Link>
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* PRIMARY IDENTIFICATION */}
        <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white/70 backdrop-blur-xl rounded-[2.5rem] overflow-hidden border border-white/40">
          <CardHeader className="p-8 pb-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Building2 className="h-5 w-5 text-blue-600" />
                  </div>
                  <CardTitle className="text-2xl font-black text-navy-900 tracking-tight uppercase italic">Identification</CardTitle>
                </div>
                <CardDescription className="text-slate-500 font-medium ml-10">Primary nomenclature and classification parameters</CardDescription>
              </div>
              <Badge className="bg-navy-900 text-white border-none px-4 py-1.5 rounded-xl font-black tracking-widest text-[10px] uppercase italic">Priority: Institutional</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-8 pt-4 grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-8 space-y-3 group">
              <Label htmlFor="name" className="tracking-widest text-[10px] text-navy-400 font-black uppercase ml-1">Facility Designation</Label>
              <div className="relative">
                <input 
                  id="name"
                  name="name" 
                  placeholder="e.g. ADVANCED COMPUTING WING"
                  className="w-full h-14 pl-5 pr-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/10 transition-all outline-none font-bold text-navy-900 placeholder:text-slate-300 placeholder:font-medium"
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value, slug: isEdit ? p.slug : autoSlug(e.target.value) }))} 
                  required 
                />
                <Box className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-200 group-focus-within:text-blue-200 transition-colors" />
              </div>
            </div>

            <div className="md:col-span-4 space-y-3 group">
              <Label htmlFor="category" className="tracking-widest text-[10px] text-navy-400 font-black uppercase ml-1">Classification Hub</Label>
              <div className="relative">
                <select 
                  id="category"
                  name="category" 
                  className="w-full h-14 pl-5 pr-10 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/10 transition-all outline-none font-bold text-navy-900 appearance-none"
                  value={form.category} 
                  onChange={handleChange}
                >
                  {categories.map((c) => <option key={c} value={c}>{c.toUpperCase()}</option>)}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <ChevronRight className="h-5 w-5 text-slate-400 rotate-90" />
                </div>
              </div>
            </div>

            <div className="md:col-span-12 space-y-3 group">
              <Label htmlFor="slug" className="tracking-widest text-[10px] text-navy-400 font-black uppercase ml-1">Resource Matrix Slug</Label>
              <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-2xl border-2 border-transparent focus-within:border-blue-600 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-600/10 transition-all">
                <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest pl-4">acharya.edu/infra/</span>
                <input 
                  id="slug"
                  name="slug" 
                  className="flex-1 h-10 bg-transparent border-none outline-none font-mono text-xs font-bold text-blue-600"
                  value={form.slug} 
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* PHYSICAL DIMENSIONS */}
          <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white/70 backdrop-blur-xl rounded-[2.5rem] overflow-hidden border border-white/40">
            <CardHeader className="p-8 pb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-emerald-50 rounded-lg">
                  <Maximize className="h-5 w-5 text-emerald-600" />
                </div>
                <CardTitle className="text-xl font-black text-navy-900 tracking-tight uppercase italic">Spatial Metrics</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-8 pt-4 space-y-6">
              <div className="space-y-3 group">
                <Label htmlFor="area" className="tracking-widest text-[10px] text-navy-400 font-black uppercase ml-1">Floor Area Aggregate</Label>
                <input 
                  id="area"
                  name="area" 
                  value={form.area} 
                  onChange={handleChange} 
                  placeholder="e.g. 14,500 SQ. FT." 
                  className="w-full h-14 px-5 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none font-bold text-navy-900"
                />
              </div>
              <div className="space-y-3 group">
                <Label htmlFor="capacity" className="tracking-widest text-[10px] text-navy-400 font-black uppercase ml-1">Operational Occupancy</Label>
                <div className="relative">
                  <input 
                    id="capacity"
                    name="capacity" 
                    type="number" 
                    className="w-full h-14 pl-12 pr-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none font-bold text-navy-900"
                    value={form.capacity} 
                    onChange={handleChange} 
                  />
                  <Users className="h-5 w-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FACILITY FEATURES */}
          <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white/70 backdrop-blur-xl rounded-[2.5rem] overflow-hidden border border-white/40">
            <CardHeader className="p-8 pb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-purple-50 rounded-lg">
                  <Layout className="h-5 w-5 text-purple-600" />
                </div>
                <CardTitle className="text-xl font-black text-navy-900 tracking-tight uppercase italic">Utility Matrix</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-8 pt-4 space-y-4">
              <div className="space-y-3 group">
                <Label htmlFor="featuresText" className="tracking-widest text-[10px] text-navy-400 font-black uppercase ml-1">Asset Features (Line-by-Line)</Label>
                <textarea 
                  id="featuresText"
                  name="featuresText" 
                  className="w-full min-h-[148px] p-5 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-500/10 transition-all outline-none font-bold text-navy-900 resize-none leading-relaxed"
                  placeholder="• GIGABIT FIBER BACKBONE&#10;• BIOMETRIC ACCESS CONTROL&#10;• CLIMATE OPTIMIZED"
                  value={form.featuresText} 
                  onChange={handleChange} 
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* DETAILED NARRATIVE */}
        <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white/70 backdrop-blur-xl rounded-[2.5rem] overflow-hidden border border-white/40">
          <CardHeader className="p-8 pb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-amber-50 rounded-lg">
                <Sparkles className="h-5 w-5 text-amber-500" />
              </div>
              <CardTitle className="text-2xl font-black text-navy-900 tracking-tight uppercase italic">Asset Specification</CardTitle>
            </div>
            <CardDescription className="text-slate-500 font-medium ml-10">High-fidelity documentation for institutional review</CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-4">
            <div className="prose-editor-container border-2 border-slate-100 rounded-[2rem] overflow-hidden bg-white/50 focus-within:border-blue-600 transition-all">
              <Editor 
                value={form.description} 
                onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))} 
                containerProps={{ style: { height: '350px', border: 'none' } }}
              />
            </div>
          </CardContent>
        </Card>

        {/* VISUAL GALLERY */}
        <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white/70 backdrop-blur-xl rounded-[2.5rem] overflow-hidden border border-white/40">
          <CardHeader className="p-8 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-indigo-50 rounded-lg">
                  <ImageIcon className="h-5 w-5 text-indigo-600" />
                </div>
                <CardTitle className="text-2xl font-black text-navy-900 tracking-tight uppercase italic">Digital Assets</CardTitle>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                type="button" 
                className="h-10 px-5 rounded-xl border-slate-200 text-indigo-600 font-black tracking-widest text-[10px] uppercase hover:bg-indigo-50 transition-all"
                onClick={() => setForm(prev => ({ ...prev, imagesText: prev.imagesText ? prev.imagesText + '\n' + getRandomImageUrl() : getRandomImageUrl() }))}
              >
                <PlusCircle className="h-4 w-4 mr-2" /> Inject Placeholder
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-8 pt-4 space-y-6">
            <div className="space-y-3 group">
              <Label htmlFor="imagesText" className="tracking-widest text-[10px] text-navy-400 font-black uppercase ml-1">Asset Media URLs (Nexus Optimized)</Label>
              <textarea 
                id="imagesText"
                name="imagesText" 
                className="w-full min-h-[140px] p-5 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none font-mono text-xs font-bold text-slate-600 resize-none"
                placeholder="https://nexus-assets.storage/infra-..."
                value={form.imagesText} 
                onChange={handleChange} 
              />
            </div>
            
            <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 flex items-start gap-3">
              <ShieldCheck className="h-5 w-5 text-indigo-600 mt-0.5" />
              <p className="text-[10px] text-indigo-900/60 font-bold uppercase tracking-widest leading-relaxed">
                Visual assets are automatically distributed to the high-fidelity campus maps and institutional brochures upon commitment. Ensure high resolution URLs for premium display.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* FORM ACTIONS */}
        <div className="flex flex-col md:flex-row items-center justify-end gap-4 pt-6 border-t border-slate-200">
          <Button 
            variant="ghost" 
            type="button" 
            onClick={() => navigate('/admin/infrastructure')}
            className="w-full md:w-auto h-14 px-10 rounded-2xl text-slate-400 font-black tracking-widest text-xs uppercase hover:bg-slate-100 transition-all"
          >
            Cancel Matrix
          </Button>
          <Button 
            type="submit" 
            className="w-full md:w-auto h-14 px-12 rounded-2xl bg-navy-900 hover:bg-black text-white font-black tracking-widest text-xs uppercase shadow-2xl shadow-navy-900/30 gap-3 transition-all"
          >
            <Save className="h-5 w-5 text-blue-400" />
            {isEdit ? 'Sync Infrastructure' : 'Initialize Asset'}
          </Button>
        </div>
      </form>
    </div>
  );
}
