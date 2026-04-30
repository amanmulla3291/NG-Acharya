import { Link } from 'react-router-dom';
import { noticeStore, eventStore, courseStore, departmentStore, staffStore, infraStore } from '@/lib/data/stores';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { 
  Users, 
  FileText, 
  Calendar, 
  GraduationCap, 
  Building2, 
  Plus,
  ArrowUpRight,
  LayoutDashboard,
  Activity
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
};

export default function DashboardPage() {
  // Real data from stores
  const recentNotices = noticeStore.getAll().slice(0, 4);
  const recentEvents = eventStore.getAll().slice(0, 4);

  const stats = [
    { label: 'Notices', count: noticeStore.count(), icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50', to: '/admin/notices' },
    { label: 'Events', count: eventStore.count(), icon: Calendar, color: 'text-purple-600', bg: 'bg-purple-50', to: '/admin/events' },
    { label: 'Faculty', count: staffStore.count(), icon: Users, color: 'text-green-600', bg: 'bg-green-50', to: '/admin/staff' },
    { label: 'Courses', count: courseStore.count(), icon: GraduationCap, color: 'text-orange-600', bg: 'bg-orange-50', to: '/admin/courses' },
    { label: 'Departments', count: departmentStore.count(), icon: LayoutDashboard, color: 'text-pink-600', bg: 'bg-pink-50', to: '/admin/departments' },
    { label: 'Facilities', count: infraStore.count(), icon: Building2, color: 'text-amber-600', bg: 'bg-amber-50', to: '/admin/infrastructure' },
  ];

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 pb-10"
    >
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-[10px] uppercase tracking-[0.2em] mb-1">
            <div className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
            <span>Institutional Intelligence</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-navy-900 leading-none">Admin Overview</h1>
          <p className="text-slate-500 font-medium mt-2">Manage institutional data, academic resources, and campus activities.</p>
        </div>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-100">
          <Activity className="h-4 w-4 text-green-500" />
          <span className="text-sm font-bold text-navy-900">System Status: <span className="text-green-600 uppercase tracking-wider text-[10px] ml-1">Optimal</span></span>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,48,135,0.1)] transition-all duration-500 cursor-pointer group hover:-translate-y-2 bg-white/50 backdrop-blur-sm">
            <Link to={stat.to}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-inner`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div className="h-8 w-8 rounded-full bg-slate-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <ArrowUpRight className="h-4 w-4 text-navy-900" />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 group-hover:text-navy-900 transition-colors">{stat.label}</p>
                  <p className="text-4xl font-black text-navy-900 tracking-tighter group-hover:scale-105 origin-left transition-transform duration-500">{stat.count}</p>
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-8">
          <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-6 border-b border-slate-50">
              <div className="space-y-1">
                <CardTitle className="text-xl font-black text-navy-900 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-blue-600" />
                  Institutional Notices
                </CardTitle>
                <CardDescription className="font-medium text-slate-400">Most recent communications published to the portal.</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild className="text-blue-600 font-bold hover:text-blue-700 hover:bg-blue-50 h-9 px-4 rounded-xl transition-all">
                <Link to="/admin/notices">View All</Link>
              </Button>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-2">
                {recentNotices.map((notice) => (
                  <div key={notice.id} className="flex gap-6 items-center group cursor-pointer p-4 hover:bg-slate-50 rounded-2xl transition-all duration-300">
                    <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-600 group-hover:bg-navy-900 group-hover:text-white transition-all duration-500 shadow-sm">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <Badge variant="secondary" className="text-[9px] h-5 px-2 font-black uppercase tracking-wider bg-blue-50 text-blue-700 border-none group-hover:bg-blue-100 transition-colors">{notice.category}</Badge>
                        <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                          {new Date(notice.publishedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-navy-900 group-hover:text-blue-600 transition-colors truncate">
                        {notice.title}
                      </h4>
                      <p className="text-sm text-slate-400 mt-1 line-clamp-1 font-medium italic">{notice.content}</p>
                    </div>
                    <div className="h-10 w-10 rounded-full border border-slate-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-4 group-hover:translate-x-0">
                      <ArrowUpRight className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-none shadow-[0_20px_50px_rgba(30,58,138,0.15)] bg-gradient-to-br from-blue-700 to-blue-900 text-white overflow-hidden relative group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform duration-700">
                <Users className="h-32 w-32" />
              </div>
              <CardHeader>
                <CardTitle className="text-sm font-black uppercase tracking-[0.2em] text-blue-200">Faculty Reach</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-5xl font-black mb-2 tracking-tighter">{staffStore.count()}</p>
                <p className="text-blue-100 text-sm font-bold opacity-80">Active academic members across {departmentStore.count()} departments.</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-[0_20px_50px_rgba(88,28,135,0.15)] bg-gradient-to-br from-purple-700 to-purple-900 text-white overflow-hidden relative group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform duration-700">
                <GraduationCap className="h-32 w-32" />
              </div>
              <CardHeader>
                <CardTitle className="text-sm font-black uppercase tracking-[0.2em] text-purple-200">Academic Portfolio</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-5xl font-black mb-2 tracking-tighter">{courseStore.count()}</p>
                <p className="text-purple-100 text-sm font-bold opacity-80">Undergraduate and Postgraduate programs offered.</p>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Right Sidebar panels */}
        <motion.div variants={itemVariants} className="space-y-8">
          {/* Quick Actions */}
          <Card className="border-none shadow-2xl bg-navy-900 text-white overflow-hidden relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.2),transparent_50%)]" />
            <CardHeader className="relative z-10">
              <CardTitle className="text-xl font-black tracking-tight">Quick Launch</CardTitle>
              <CardDescription className="text-slate-400 font-medium">Accelerate your workflow with common tasks.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 relative z-10">
              <Button asChild variant="secondary" className="w-full justify-start bg-white/5 hover:bg-white/10 border border-white/5 text-white transition-all h-12 rounded-xl font-bold">
                <Link to="/admin/notices/new">
                  <Plus className="mr-3 h-4 w-4 text-blue-400" /> Create New Notice
                </Link>
              </Button>
              <Button asChild variant="secondary" className="w-full justify-start bg-white/5 hover:bg-white/10 border border-white/5 text-white transition-all h-12 rounded-xl font-bold">
                <Link to="/admin/events/new">
                  <Plus className="mr-3 h-4 w-4 text-purple-400" /> Register Campus Event
                </Link>
              </Button>
              <Button asChild variant="secondary" className="w-full justify-start bg-white/5 hover:bg-white/10 border border-white/5 text-white transition-all h-12 rounded-xl font-bold">
                <Link to="/admin/staff/new">
                  <Plus className="mr-3 h-4 w-4 text-green-400" /> Onboard Faculty
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Campus Highlights Summary */}
          <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white overflow-hidden">
            <CardHeader className="pb-4 border-b border-slate-50">
              <CardTitle className="text-lg font-black text-navy-900 flex items-center gap-2">
                <div className="h-4 w-1 bg-purple-600 rounded-full" />
                Next Big Events
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-5">
                {recentEvents.slice(0, 3).map((event) => (
                  <div key={event.id} className="flex gap-4 group cursor-pointer">
                    <div className="flex flex-col items-center justify-center h-14 w-14 rounded-2xl bg-slate-50 text-navy-900 group-hover:bg-purple-600 group-hover:text-white transition-all duration-500 shadow-sm border border-slate-100">
                      <span className="text-[10px] font-black uppercase leading-none mb-1 opacity-50 group-hover:opacity-100">{new Date(event.date).toLocaleDateString('en-IN', { month: 'short' })}</span>
                      <span className="text-xl font-black leading-none tracking-tighter">{new Date(event.date).toLocaleDateString('en-IN', { day: '2-digit' })}</span>
                    </div>
                    <div className="min-w-0 flex-1 pt-1">
                      <h5 className="text-sm font-bold text-navy-900 group-hover:text-purple-600 transition-colors truncate">{event.title}</h5>
                      <div className="text-xs text-slate-400 mt-1 font-bold flex items-center gap-1.5 uppercase tracking-wider">
                        <div className="h-1.5 w-1.5 rounded-full bg-slate-200" />
                        {event.venue}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-8 border-slate-100 text-slate-400 font-bold hover:text-navy-900 hover:bg-slate-50 rounded-xl transition-all" asChild>
                <Link to="/admin/events">Manage Full Calendar</Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Events Section */}
      <motion.div variants={itemVariants} className="space-y-6 pt-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-navy-900 tracking-tight">Campus Spotlight</h2>
            <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">Monitoring upcoming institutional highlights.</p>
          </div>
          <Button variant="outline" size="sm" asChild className="rounded-xl px-6 border-slate-200 font-bold hover:bg-navy-900 hover:text-white transition-all shadow-sm">
            <Link to="/admin/events">Manage All</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {recentEvents.map((event) => (
            <Card key={event.id} className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_30px_60px_rgba(0,48,135,0.12)] transition-all duration-700 overflow-hidden group hover:-translate-y-3 bg-white">
              <CardContent className="p-0">
                <div className="h-44 bg-slate-50 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent" />
                  <Calendar className="h-20 w-20 text-slate-100 group-hover:scale-125 group-hover:text-blue-50 transition-all duration-1000 ease-out" />
                  <div className="absolute top-4 right-4">
                    <Badge className={`${event.isUpcoming ? "bg-emerald-500 shadow-emerald-500/20" : "bg-slate-400 shadow-slate-400/20"} border-none shadow-xl font-black uppercase text-[9px] tracking-widest px-3 h-6`}>
                      {event.isUpcoming ? 'Active' : 'Past'}
                    </Badge>
                  </div>
                </div>
                <div className="p-6 space-y-5">
                  <h4 className="font-black text-lg text-navy-900 line-clamp-2 min-h-[56px] group-hover:text-blue-600 transition-colors leading-tight tracking-tight">
                    {event.title}
                  </h4>
                  <div className="flex items-center gap-2.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    <div className="p-1.5 bg-slate-50 rounded-lg group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                      <Building2 className="h-3.5 w-3.5" />
                    </div>
                    <span className="truncate">{event.venue}</span>
                  </div>
                  <div className="pt-5 border-t border-slate-50 flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-1">
                        {new Date(event.date).toLocaleDateString('en-IN', { month: 'short' })}
                      </span>
                      <span className="text-3xl font-black text-navy-900 leading-none tracking-tighter">
                        {new Date(event.date).toLocaleDateString('en-IN', { day: '2-digit' })}
                      </span>
                    </div>
                    <Link 
                      to={`/admin/events/${event.id}/edit`} 
                      className="h-12 w-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-navy-900 hover:text-white hover:border-navy-900 hover:rotate-12 transition-all duration-500 group/link shadow-sm"
                    >
                      <ArrowUpRight className="h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
