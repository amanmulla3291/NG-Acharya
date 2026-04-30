import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { departmentStore } from '@/lib/data/stores';
import type { Department } from '@/types';
import Editor from 'react-simple-wysiwyg';
import { getRandomImageUrl } from '@/lib/utils/randomImage';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  ChevronLeft, 
  Save, 
  X, 
  Building2, 
  User, 
  Globe, 
  Award, 
  Settings, 
  BookOpen, 
  Image as ImageIcon,
  History,
  Target,
  Compass
} from 'lucide-react';

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
      faculty: isEdit && id ? departmentStore.getById(Number(id))?.faculty || [] : [],
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
    <div className="max-w-5xl mx-auto space-y-12 pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-5">
          <Button variant="ghost" size="icon" asChild className="h-12 w-12 rounded-2xl bg-white shadow-sm border border-slate-100 hover:bg-slate-50 transition-all">
            <Link to="/admin/departments">
              <ChevronLeft className="h-6 w-6 text-navy-900" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-black text-navy-900 tracking-tight">
              {isEdit ? 'Update Unit' : 'New Unit'}
            </h1>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-1">Institutional Profile Management</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" type="button" onClick={() => navigate('/admin/departments')} className="font-black text-slate-400 uppercase tracking-widest text-[10px]">
            Discard
          </Button>
          <Button type="submit" form="dept-form" className="bg-navy-900 hover:bg-blue-600 text-white font-black px-8 h-12 rounded-xl shadow-xl shadow-navy-900/10 transition-all">
            <Save className="h-4 w-4 mr-2" />
            {isEdit ? 'Save Changes' : 'Initialize Unit'}
          </Button>
        </div>
      </div>

      <form id="dept-form" onSubmit={handleSubmit} className="space-y-10">
        <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white overflow-hidden rounded-[2.5rem]">
          <CardHeader className="px-10 py-8 border-b border-slate-50 bg-slate-50/30">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-xl font-black text-navy-900">Basic Profile</CardTitle>
                <CardDescription className="text-slate-400 font-medium">Core unit identification and history</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-10 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-8 space-y-3">
                <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Department Full Name</Label>
                <Input 
                  id="name"
                  name="name" 
                  placeholder="e.g. Department of Computer Science"
                  className="h-14 px-6 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-blue-600/20 transition-all font-bold text-navy-900 placeholder:text-slate-300"
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value, slug: isEdit ? p.slug : autoSlug(e.target.value) }))} 
                  required 
                />
              </div>

              <div className="md:col-span-4 space-y-3">
                <Label htmlFor="shortName" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Abbreviation</Label>
                <Input 
                  id="shortName"
                  name="shortName" 
                  placeholder="e.g. CS"
                  className="h-14 px-6 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-blue-600/20 transition-all font-black text-navy-900 placeholder:text-slate-300"
                  value={form.shortName} 
                  onChange={handleChange} 
                />
              </div>

              <div className="md:col-span-6 space-y-3">
                <Label htmlFor="slug" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">URL Route Slug</Label>
                <div className="relative group">
                  <Input 
                    id="slug"
                    name="slug" 
                    className="h-14 pl-12 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all font-mono text-xs text-blue-600"
                    value={form.slug} 
                    onChange={handleChange} 
                    required 
                    readOnly={!isEdit}
                  />
                  <Globe className="absolute left-5 top-5 h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                </div>
              </div>

              <div className="md:col-span-6 space-y-3">
                <Label htmlFor="established" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Establishment Year</Label>
                <div className="relative group">
                  <Input 
                    id="established"
                    name="established" 
                    type="number" 
                    className="h-14 pl-12 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all font-black text-navy-900"
                    value={form.established} 
                    onChange={handleChange} 
                    required 
                  />
                  <History className="absolute left-5 top-5 h-4 w-4 text-slate-400 group-focus-within:text-navy-900 transition-colors" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white overflow-hidden rounded-[2.5rem]">
          <CardHeader className="px-10 py-8 border-b border-slate-50 bg-slate-50/30">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/20">
                <User className="h-5 w-5" />
              </div>
              <CardTitle className="text-xl font-black text-navy-900">Leadership & Management</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label htmlFor="headName" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Head of Department (HoD)</Label>
                <Input 
                  id="headName"
                  name="headName" 
                  placeholder="Enter full name with title"
                  className="h-14 px-6 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all font-bold text-navy-900"
                  value={form.headName} 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="headDesignation" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">HoD Designation</Label>
                <Input 
                  id="headDesignation"
                  name="headDesignation" 
                  placeholder="e.g. Associate Professor"
                  className="h-14 px-6 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all font-bold text-navy-900"
                  value={form.headDesignation} 
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-indigo-600 overflow-hidden rounded-[2.5rem]">
            <CardHeader className="px-10 py-8 border-b border-white/10 bg-white/10">
              <div className="flex items-center gap-4 text-white">
                <Target className="h-5 w-5" />
                <CardTitle className="text-lg font-black tracking-tight">Institutional Vision</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <Textarea 
                name="vision" 
                placeholder="Define the future roadmap..."
                className="min-h-[160px] rounded-[1.5rem] bg-white/10 border-white/20 text-white placeholder:text-white/40 font-bold p-6 focus:ring-white/20 resize-none shadow-inner"
                value={form.vision} 
                onChange={handleChange} 
                required 
              />
            </CardContent>
          </Card>

          <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-blue-600 overflow-hidden rounded-[2.5rem]">
            <CardHeader className="px-10 py-8 border-b border-white/10 bg-white/10">
              <div className="flex items-center gap-4 text-white">
                <Compass className="h-5 w-5" />
                <CardTitle className="text-lg font-black tracking-tight">Departmental Mission</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <Textarea 
                name="mission" 
                placeholder="Core purpose and commitment..."
                className="min-h-[160px] rounded-[1.5rem] bg-white/10 border-white/20 text-white placeholder:text-white/40 font-bold p-6 focus:ring-white/20 resize-none shadow-inner"
                value={form.mission} 
                onChange={handleChange} 
                required 
              />
            </CardContent>
          </Card>
        </div>

        <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white overflow-hidden rounded-[2.5rem]">
          <CardHeader className="px-10 py-8 border-b border-slate-50 bg-slate-50/30">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-600/20">
                <BookOpen className="h-5 w-5" />
              </div>
              <CardTitle className="text-xl font-black text-navy-900">Academic Narrative & Assets</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-10 space-y-10">
            <div className="space-y-3">
              <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">About Department (Overview)</Label>
              <div className="border border-slate-100 rounded-[2rem] overflow-hidden bg-slate-50/30 p-2">
                <Editor 
                  value={form.description} 
                  onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))} 
                  containerProps={{ style: { height: '350px', border: 'none', borderRadius: '1.5rem', background: 'white' } }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label htmlFor="coursesText" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Programs Offered</Label>
                <div className="relative group">
                  <Input 
                    id="coursesText"
                    name="coursesText" 
                    placeholder="e.g. BSc CS, MSc CS, PhD"
                    className="h-14 pl-12 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all font-bold text-navy-900"
                    value={form.coursesText} 
                    onChange={handleChange} 
                  />
                  <BookOpen className="h-4 w-4 absolute left-5 top-5 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
                </div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest px-2">Comma separated program list</p>
              </div>

              <div className="space-y-3">
                <Label htmlFor="imageUrl" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Department Banner</Label>
                <div className="flex gap-3">
                  <div className="relative flex-1 group">
                    <Input 
                      id="imageUrl"
                      name="imageUrl" 
                      className="h-14 pl-12 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all font-mono text-xs text-blue-600"
                      value={form.imageUrl} 
                      onChange={handleChange} 
                      placeholder="https://images.unsplash.com/..."
                    />
                    <ImageIcon className="absolute left-5 top-5 h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                  </div>
                  <Button 
                    variant="outline" 
                    type="button" 
                    onClick={() => setForm(prev => ({ ...prev, imageUrl: getRandomImageUrl() }))}
                    className="h-14 px-6 rounded-2xl border-slate-200 font-black text-[10px] uppercase tracking-widest hover:bg-navy-900 hover:text-white transition-all"
                  >
                    Auto-Gen
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="achievementsText" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1 flex items-center gap-2">
                  <Award className="h-4 w-4 text-amber-500" /> Key Achievements
                </Label>
                <Textarea 
                  id="achievementsText"
                  name="achievementsText" 
                  placeholder="One achievement per line..."
                  className="min-h-[200px] rounded-[2rem] border-slate-100 bg-slate-50/50 focus:bg-white transition-all p-6 font-bold text-navy-900 resize-none shadow-inner"
                  value={form.achievementsText} 
                  onChange={handleChange} 
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="facilitiesText" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1 flex items-center gap-2">
                  <Settings className="h-4 w-4 text-slate-500" /> Infrastructure
                </Label>
                <Textarea 
                  id="facilitiesText"
                  name="facilitiesText" 
                  placeholder="One facility per line..."
                  className="min-h-[200px] rounded-[2rem] border-slate-100 bg-slate-50/50 focus:bg-white transition-all p-6 font-bold text-navy-900 resize-none shadow-inner"
                  value={form.facilitiesText} 
                  onChange={handleChange} 
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-end gap-4 pt-10 border-t border-slate-100">
          <Button variant="ghost" type="button" onClick={() => navigate('/admin/departments')} className="h-14 px-8 rounded-2xl font-black text-slate-400 uppercase tracking-[0.2em] text-[10px]">
            Discard Changes
          </Button>
          <Button type="submit" form="dept-form" className="bg-navy-900 hover:bg-blue-600 text-white font-black px-12 h-14 rounded-2xl shadow-2xl shadow-navy-900/20 transition-all duration-300">
            <Save className="h-5 w-5 mr-3" />
            {isEdit ? 'Update Unit Profile' : 'Publish Unit Registry'}
          </Button>
        </div>
      </form>
    </div>
  );
}
