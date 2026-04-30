import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { courseStore } from '@/lib/data/stores';
import type { Course, CourseLevel } from '@/types';
import Editor from 'react-simple-wysiwyg';
import { getRandomImageUrl } from '@/lib/utils/randomImage';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Save, 
  BookOpen, 
  GraduationCap, 
  Users, 
  IndianRupee, 
  Building2, 
  Globe, 
  Sparkles,
  Briefcase,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

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
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setForm(prev => ({ ...prev, [name]: checked }));
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
    <div className="max-w-5xl mx-auto space-y-12 pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-5">
          <Button variant="ghost" size="icon" asChild className="h-12 w-12 rounded-2xl bg-white shadow-sm border border-slate-100 hover:bg-slate-50 transition-all">
            <Link to="/admin/courses">
              <ArrowLeft className="h-6 w-6 text-navy-900" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-black text-navy-900 tracking-tight">
              {isEdit ? 'Update Program' : 'Register Program'}
            </h1>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-1">Academic Registry & Configuration</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" type="button" onClick={() => navigate('/admin/courses')} className="font-black text-slate-400 uppercase tracking-widest text-[10px]">
            Discard
          </Button>
          <Button type="submit" form="course-form" className="bg-navy-900 hover:bg-blue-600 text-white font-black px-8 h-12 rounded-xl shadow-xl shadow-navy-900/10 transition-all">
            <Save className="h-4 w-4 mr-2" />
            {isEdit ? 'Save Changes' : 'Initialize Program'}
          </Button>
        </div>
      </div>

      <form id="course-form" onSubmit={handleSubmit} className="space-y-8">
        <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white overflow-hidden rounded-[2.5rem]">
          <CardHeader className="px-10 py-8 border-b border-slate-50 bg-slate-50/30">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-xl font-black text-navy-900">Program Identification</CardTitle>
                <CardDescription className="text-slate-400 font-medium">Core identity and URL configuration</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-10 grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-8 space-y-3">
              <Label htmlFor="title" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Full Course Title</Label>
              <Input 
                id="title"
                name="title" 
                placeholder="e.g. Bachelor of Management Studies (BMS)"
                className="h-14 px-6 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-blue-600/20 transition-all font-bold text-navy-900 placeholder:text-slate-300"
                value={form.title}
                onChange={(e) => setForm((p) => ({ ...p, title: e.target.value, slug: isEdit ? p.slug : autoSlug(e.target.value) }))} 
                required 
              />
            </div>

            <div className="md:col-span-4 space-y-3">
              <Label htmlFor="shortTitle" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Abbreviation</Label>
              <Input 
                id="shortTitle"
                name="shortTitle" 
                placeholder="e.g. BMS"
                className="h-14 px-6 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-blue-600/20 transition-all font-black text-navy-900 placeholder:text-slate-300"
                value={form.shortTitle} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="md:col-span-12 p-6 bg-slate-50 rounded-[2rem] border border-slate-100 space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <Globe className="h-4 w-4 text-blue-600" />
                <Label htmlFor="slug" className="text-[10px] font-black uppercase tracking-[0.2em] text-navy-900">Search Engine Friendly URL</Label>
              </div>
              <div className="flex items-center gap-0 group">
                <div className="h-12 px-6 flex items-center bg-white border border-r-0 border-slate-200 rounded-l-xl text-slate-400 font-bold text-xs">
                  acharya-marathe.edu.in/courses/
                </div>
                <Input 
                  id="slug"
                  name="slug" 
                  className="h-12 rounded-l-none rounded-r-xl border-slate-200 bg-white focus:ring-blue-600/10 font-mono text-xs text-blue-600"
                  value={form.slug} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <p className="text-[10px] text-slate-400 font-bold px-2 italic">Important: Changing the slug will break existing links to this course page.</p>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white overflow-hidden rounded-[2.5rem]">
            <CardHeader className="px-10 py-8 border-b border-slate-50 bg-slate-50/30">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-600/20">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <CardTitle className="text-lg font-black text-navy-900">Academic Framework</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-10 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="level" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Study Level</Label>
                  <select 
                    id="level"
                    name="level" 
                    className="flex h-12 w-full rounded-xl border border-slate-100 bg-slate-50/50 px-4 py-2 text-sm focus:bg-white focus:ring-2 focus:ring-blue-600/20 transition-all font-black text-navy-900 outline-none"
                    value={form.level} 
                    onChange={handleChange}
                  >
                    {levels.map((l) => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
                <div className="space-y-3">
                  <Label htmlFor="duration" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Program Duration</Label>
                  <Input 
                    id="duration"
                    name="duration" 
                    placeholder="e.g. 3 Years"
                    className="h-12 rounded-xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all font-bold"
                    value={form.duration} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
              </div>
              <div className="space-y-3">
                <Label htmlFor="departmentSlug" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Hosting Department</Label>
                <div className="relative group">
                  <Input 
                    id="departmentSlug"
                    name="departmentSlug" 
                    placeholder="e.g. management-studies"
                    className="h-12 pl-12 rounded-xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all font-bold"
                    value={form.departmentSlug} 
                    onChange={handleChange} 
                    required 
                  />
                  <Building2 className="h-4 w-4 absolute left-4 top-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                </div>
              </div>
              <div className="space-y-3">
                <Label htmlFor="affiliatedTo" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Affiliation Authority</Label>
                <div className="relative group">
                  <Input 
                    id="affiliatedTo"
                    name="affiliatedTo" 
                    className="h-12 pl-12 rounded-xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all font-bold"
                    value={form.affiliatedTo} 
                    onChange={handleChange} 
                    required 
                  />
                  <Globe className="h-4 w-4 absolute left-4 top-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white overflow-hidden rounded-[2.5rem]">
            <CardHeader className="px-10 py-8 border-b border-slate-50 bg-slate-50/30">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-2xl bg-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-600/20">
                  <Users className="h-5 w-5" />
                </div>
                <CardTitle className="text-lg font-black text-navy-900">Enrollment & Fees</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-10 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="seats" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Student Intake</Label>
                  <div className="relative group">
                    <Input 
                      id="seats"
                      name="seats" 
                      type="number" 
                      className="h-12 pl-12 rounded-xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all font-black"
                      value={form.seats} 
                      onChange={handleChange} 
                      required 
                    />
                    <Users className="h-4 w-4 absolute left-4 top-4 text-slate-400 group-focus-within:text-purple-600 transition-colors" />
                  </div>
                </div>
                <div className="space-y-3">
                  <Label htmlFor="feePerYear" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Annual Fee (INR)</Label>
                  <div className="relative group">
                    <Input 
                      id="feePerYear"
                      name="feePerYear" 
                      type="number" 
                      className="h-12 pl-12 rounded-xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all font-black"
                      value={form.feePerYear} 
                      onChange={handleChange} 
                      required 
                    />
                    <IndianRupee className="h-4 w-4 absolute left-4 top-4 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
                  </div>
                </div>
              </div>
              <div className="pt-6 space-y-5 border-t border-slate-50">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50/50 border border-slate-100/50">
                  <div className="space-y-0.5">
                    <Label className="text-xs font-black text-navy-900 uppercase tracking-wider">Visibility Status</Label>
                    <p className="text-[10px] text-slate-400 font-bold">Show program in the public catalog</p>
                  </div>
                  <Switch 
                    checked={form.isActive} 
                    onCheckedChange={(checked: boolean) => handleSwitchChange('isActive', checked)} 
                  />
                </div>
                <div className="flex items-center justify-between p-4 rounded-2xl bg-amber-50/30 border border-amber-100/50">
                  <div className="space-y-0.5">
                    <Label className="text-xs font-black text-amber-900 uppercase tracking-wider">Admission Portal</Label>
                    <p className="text-[10px] text-amber-600/60 font-bold">Open applications for new session</p>
                  </div>
                  <Switch 
                    checked={form.admissionOpen} 
                    onCheckedChange={(checked: boolean) => handleSwitchChange('admissionOpen', checked)} 
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white overflow-hidden rounded-[2.5rem]">
          <CardHeader className="px-10 py-8 border-b border-slate-50 bg-slate-50/30">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-2xl bg-amber-500 flex items-center justify-center text-white shadow-lg shadow-amber-500/20">
                <AlertCircle className="h-5 w-5" />
              </div>
              <CardTitle className="text-xl font-black text-navy-900">Eligibility Criteria</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-10">
            <Input 
              id="eligibility"
              name="eligibility" 
              className="h-16 px-8 rounded-[1.5rem] border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-blue-600/20 transition-all font-bold text-navy-900 text-lg placeholder:text-slate-300 shadow-inner"
              placeholder="e.g. 10+2 with minimum 45% marks in any stream..."
              value={form.eligibility} 
              onChange={handleChange} 
              required 
            />
          </CardContent>
        </Card>

        <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white overflow-hidden rounded-[2.5rem]">
          <CardHeader className="px-10 py-8 border-b border-slate-50 bg-slate-50/30">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
                <Sparkles className="h-5 w-5" />
              </div>
              <CardTitle className="text-xl font-black text-navy-900">Program Narrative</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-10">
            <div className="prose-editor-container border border-slate-100 rounded-[2rem] overflow-hidden bg-slate-50/30 p-2">
              <Editor 
                value={form.description} 
                onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))} 
                containerProps={{ style: { height: '300px', border: 'none', borderRadius: '1.5rem', background: 'white' } }}
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white overflow-hidden rounded-[2.5rem]">
            <CardHeader className="px-10 py-8 border-b border-slate-50 bg-slate-50/30">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/20">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <CardTitle className="text-lg font-black text-navy-900">Academic Highlights</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-10">
              <Textarea 
                id="highlightsText"
                name="highlightsText" 
                className="min-h-[160px] rounded-[1.5rem] border-slate-100 bg-slate-50/50 focus:bg-white transition-all p-6 font-bold text-navy-900 resize-none"
                placeholder="Industry Focused Curriculum, Internships, Top Faculty..."
                value={form.highlightsText} 
                onChange={handleChange} 
              />
              <p className="text-[10px] text-slate-400 font-bold mt-4 uppercase tracking-widest px-2">Use commas to separate multiple highlights</p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white overflow-hidden rounded-[2.5rem]">
            <CardHeader className="px-10 py-8 border-b border-slate-50 bg-slate-50/30">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-2xl bg-pink-600 flex items-center justify-center text-white shadow-lg shadow-pink-600/20">
                  <Briefcase className="h-5 w-5" />
                </div>
                <CardTitle className="text-lg font-black text-navy-900">Career Prospects</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-10">
              <Textarea 
                id="careerText"
                name="careerText" 
                className="min-h-[160px] rounded-[1.5rem] border-slate-100 bg-slate-50/50 focus:bg-white transition-all p-6 font-bold text-navy-900 resize-none"
                placeholder="Software Engineer, Data Analyst, HR Manager..."
                value={form.careerText} 
                onChange={handleChange} 
              />
              <p className="text-[10px] text-slate-400 font-bold mt-4 uppercase tracking-widest px-2">List possible job roles and industries</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white overflow-hidden rounded-[2.5rem]">
          <CardHeader className="px-10 py-8 border-b border-slate-50 bg-slate-50/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-2xl bg-indigo-900 flex items-center justify-center text-white shadow-lg shadow-indigo-900/20">
                  <ImageIcon className="h-5 w-5" />
                </div>
                <CardTitle className="text-xl font-black text-navy-900">Program Banner</CardTitle>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                type="button" 
                className="h-10 rounded-xl border-slate-200 text-[10px] font-black uppercase tracking-widest px-4 hover:bg-navy-900 hover:text-white transition-all"
                onClick={() => setForm(prev => ({ ...prev, imageUrl: getRandomImageUrl() }))}
              >
                <Sparkles className="h-4 w-4 mr-2" /> Auto-Generate
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-10">
            <div className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="imageUrl" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Media Resource URL</Label>
                <Input 
                  id="imageUrl"
                  name="imageUrl" 
                  className="h-12 px-6 rounded-xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all font-mono text-xs text-blue-600"
                  placeholder="https://images.unsplash.com/..."
                  value={form.imageUrl} 
                  onChange={handleChange} 
                />
              </div>
              {form.imageUrl && (
                <div className="relative aspect-video w-full rounded-[2rem] overflow-hidden border border-slate-100 shadow-2xl">
                  <img src={form.imageUrl} alt="Preview" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/40 to-transparent" />
                  <div className="absolute bottom-6 left-6 flex items-center gap-2">
                    <Badge className="bg-white/20 backdrop-blur-md border-white/30 text-white font-black text-[10px] uppercase tracking-widest">Live Preview</Badge>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-end gap-4 pt-10 border-t border-slate-100">
          <Button variant="ghost" type="button" onClick={() => navigate('/admin/courses')} className="h-14 px-8 rounded-2xl font-black text-slate-400 uppercase tracking-[0.2em] text-[10px]">
            Discard Changes
          </Button>
          <Button type="submit" className="bg-navy-900 hover:bg-blue-600 text-white font-black px-12 h-14 rounded-2xl shadow-2xl shadow-navy-900/20 transition-all duration-300">
            <Save className="h-5 w-5 mr-3" />
            {isEdit ? 'Update Program Details' : 'Publish New Program'}
          </Button>
        </div>
      </form>
    </div>
  );
}
