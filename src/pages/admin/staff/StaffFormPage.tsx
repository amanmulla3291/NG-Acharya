import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { staffStore } from '@/lib/data/stores';
import type { StaffMember } from '@/types';
import Editor from 'react-simple-wysiwyg';
import { getRandomImageUrl } from '@/lib/utils/randomImage';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  ArrowLeft, 
  Save, 
  User, 
  BookOpen, 
  Award, 
  Mail, 
  Image as ImageIcon, 
  Sparkles,
  GraduationCap,
  Briefcase,
  History,
  FileText
} from 'lucide-react';

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
    <div className="max-w-5xl mx-auto space-y-12 pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-5">
          <Button variant="ghost" size="icon" asChild className="h-12 w-12 rounded-2xl bg-white shadow-sm border border-slate-100 hover:bg-slate-50 transition-all">
            <Link to="/admin/staff">
              <ArrowLeft className="h-6 w-6 text-navy-900" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-black text-navy-900 tracking-tight">
              {isEdit ? 'Update Personnel' : 'New Personnel'}
            </h1>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-1">Faculty & Administrative Onboarding</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" type="button" onClick={() => navigate('/admin/staff')} className="font-black text-slate-400 uppercase tracking-widest text-[10px]">
            Discard
          </Button>
          <Button type="submit" form="staff-form" className="bg-navy-900 hover:bg-blue-600 text-white font-black px-8 h-12 rounded-xl shadow-xl shadow-navy-900/10 transition-all">
            <Save className="h-4 w-4 mr-2" />
            {isEdit ? 'Save Changes' : 'Initialize Profile'}
          </Button>
        </div>
      </div>

      <form id="staff-form" onSubmit={handleSubmit} className="space-y-10">
        <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white overflow-hidden rounded-[2.5rem]">
          <CardHeader className="px-10 py-8 border-b border-slate-50 bg-slate-50/30">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
                <User className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-xl font-black text-navy-900">Personal Identity</CardTitle>
                <CardDescription className="text-slate-400 font-medium">Core academic identification and contact</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-10 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-8 space-y-3">
                <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Full Academic Name</Label>
                <Input 
                  id="name"
                  name="name" 
                  placeholder="e.g. Dr. Jane Smith"
                  className="h-14 px-6 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-blue-600/20 transition-all font-bold text-navy-900 placeholder:text-slate-300"
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value, slug: isEdit ? p.slug : autoSlug(e.target.value) }))} 
                  required 
                />
              </div>

              <div className="md:col-span-4 space-y-3">
                <Label htmlFor="designation" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Current Designation</Label>
                <Input 
                  id="designation"
                  name="designation" 
                  placeholder="e.g. Associate Professor"
                  className="h-14 px-6 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-blue-600/20 transition-all font-black text-navy-900 placeholder:text-slate-300"
                  value={form.designation} 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className="md:col-span-6 space-y-3">
                <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Official Institutional Email</Label>
                <div className="relative group">
                  <Input 
                    id="email"
                    name="email" 
                    type="email" 
                    className="h-14 pl-12 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all font-bold text-navy-900 placeholder:text-slate-300"
                    placeholder="jane.smith@college.edu"
                    value={form.email} 
                    onChange={handleChange} 
                  />
                  <Mail className="absolute left-5 top-5 h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                </div>
              </div>

              <div className="md:col-span-6 space-y-3">
                <Label htmlFor="slug" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Profile Route Slug</Label>
                <div className="relative group">
                  <Input 
                    id="slug"
                    name="slug" 
                    className="h-14 pl-12 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all font-mono text-xs text-blue-600"
                    value={form.slug} 
                    onChange={handleChange} 
                    required 
                  />
                  <div className="absolute left-4 top-5 text-[10px] font-mono text-slate-300 group-focus-within:text-blue-200 transition-colors tracking-tighter">/staff/</div>
                </div>
              </div>
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
                <CardTitle className="text-xl font-black text-navy-900">Academic Placement</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-10 space-y-6">
              <div className="space-y-3">
                <Label htmlFor="department" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Assigned Department</Label>
                <Input 
                  id="department"
                  name="department" 
                  className="h-14 px-6 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all font-bold text-navy-900"
                  value={form.department} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="qualification" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Highest Qualification</Label>
                <Input 
                  id="qualification"
                  name="qualification" 
                  placeholder="e.g. Ph.D. in Computer Science"
                  className="h-14 px-6 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all font-bold text-navy-900"
                  value={form.qualification} 
                  onChange={handleChange} 
                  required 
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white overflow-hidden rounded-[2.5rem]">
            <CardHeader className="px-10 py-8 border-b border-slate-50 bg-slate-50/30">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-2xl bg-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-600/20">
                  <Briefcase className="h-5 w-5" />
                </div>
                <CardTitle className="text-xl font-black text-navy-900">Professional Experience</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-10 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="experience" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Years Active</Label>
                  <div className="relative group">
                    <Input 
                      id="experience"
                      name="experience" 
                      type="number" 
                      className="h-14 pl-12 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all font-black text-navy-900"
                      value={form.experience} 
                      onChange={handleChange} 
                      required 
                    />
                    <History className="absolute left-5 top-5 h-4 w-4 text-slate-400 group-focus-within:text-purple-600 transition-colors" />
                  </div>
                </div>
                <div className="space-y-3">
                  <Label htmlFor="publications" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Publications</Label>
                  <div className="relative group">
                    <Input 
                      id="publications"
                      name="publications" 
                      type="number" 
                      className="h-14 pl-12 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all font-black text-navy-900"
                      value={form.publications} 
                      onChange={handleChange} 
                    />
                    <FileText className="absolute left-5 top-5 h-4 w-4 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <Label htmlFor="specializationText" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Core Specializations</Label>
                <Input 
                  id="specializationText"
                  name="specializationText" 
                  placeholder="AI, Machine Learning, Data Mining"
                  className="h-14 px-6 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all font-bold text-navy-900"
                  value={form.specializationText} 
                  onChange={handleChange} 
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white overflow-hidden rounded-[2.5rem]">
          <CardHeader className="px-10 py-8 border-b border-slate-50 bg-slate-50/30">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-2xl bg-amber-600 flex items-center justify-center text-white shadow-lg shadow-amber-600/20">
                <Sparkles className="h-5 w-5" />
              </div>
              <CardTitle className="text-xl font-black text-navy-900">Professional Bio</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-10">
            <div className="border border-slate-100 rounded-[2rem] overflow-hidden bg-slate-50/30 p-2">
              <Editor 
                value={form.bio} 
                onChange={(e) => setForm(prev => ({ ...prev, bio: e.target.value }))} 
                containerProps={{ style: { height: '350px', border: 'none', borderRadius: '1.5rem', background: 'white' } }}
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white overflow-hidden rounded-[2.5rem]">
            <CardHeader className="px-10 py-8 border-b border-slate-50 bg-slate-50/30">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/20">
                  <Award className="h-5 w-5" />
                </div>
                <CardTitle className="text-xl font-black text-navy-900">Recognition & Honors</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-10">
              <Textarea 
                id="awardsText"
                name="awardsText" 
                className="min-h-[200px] rounded-[2rem] border-slate-100 bg-slate-50/50 focus:bg-white transition-all p-6 font-bold text-navy-900 resize-none shadow-inner"
                placeholder="Best Teacher Award 2023&#10;Researcher of the Year"
                value={form.awardsText} 
                onChange={handleChange} 
              />
            </CardContent>
          </Card>

          <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white overflow-hidden rounded-[2.5rem]">
            <CardHeader className="px-10 py-8 border-b border-slate-50 bg-slate-50/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-2xl bg-pink-600 flex items-center justify-center text-white shadow-lg shadow-pink-600/20">
                    <ImageIcon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-xl font-black text-navy-900">Profile Media</CardTitle>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  type="button" 
                  className="h-10 rounded-xl border-slate-200 font-black text-[10px] uppercase tracking-widest px-4"
                  onClick={() => setForm(prev => ({ ...prev, imageUrl: getRandomImageUrl() }))}
                >
                  <Sparkles className="h-3 w-3 mr-2" /> Randomize
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-10 space-y-8">
              <div className="relative group">
                <Input 
                  id="imageUrl"
                  name="imageUrl" 
                  placeholder="https://..."
                  className="h-14 px-6 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all font-mono text-xs text-blue-600"
                  value={form.imageUrl} 
                  onChange={handleChange} 
                />
                <ImageIcon className="absolute right-5 top-5 h-4 w-4 text-slate-400 group-focus-within:text-pink-600 transition-colors" />
              </div>
              {form.imageUrl && (
                <div className="flex justify-center pt-2">
                  <div className="h-32 w-32 rounded-[2rem] overflow-hidden border-4 border-slate-50 shadow-2xl shadow-navy-900/10">
                    <img src={form.imageUrl} alt="Preview" className="h-full w-full object-cover" />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center justify-end gap-4 pt-10 border-t border-slate-100">
          <Button variant="ghost" type="button" onClick={() => navigate('/admin/staff')} className="h-14 px-8 rounded-2xl font-black text-slate-400 uppercase tracking-[0.2em] text-[10px]">
            Discard Changes
          </Button>
          <Button type="submit" form="staff-form" className="bg-navy-900 hover:bg-blue-600 text-white font-black px-12 h-14 rounded-2xl shadow-2xl shadow-navy-900/20 transition-all duration-300">
            <Save className="h-5 w-5 mr-3" />
            {isEdit ? 'Update Faculty Profile' : 'Complete Onboarding'}
          </Button>
        </div>
      </form>
    </div>
  );
}
