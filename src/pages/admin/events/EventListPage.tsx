import { useState } from 'react';
import { Link } from 'react-router-dom';
import { eventStore } from '@/lib/data/stores';
import type { CollegeEvent } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Calendar, 
  MapPin, 
  Tag, 
  Clock, 
  Search,
  CalendarDays,
  History
} from 'lucide-react';

export default function EventListPage() {
  const [items, setItems] = useState<CollegeEvent[]>(() => eventStore.getAll());

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this event? This action is permanent.')) {
      eventStore.delete(id);
      setItems(eventStore.getAll());
    }
  };

  return (
    <div className="space-y-10 pb-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-navy-900 tracking-tight">Institutional Events</h1>
          <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">Registry of seminars, cultural fests & academic meets</p>
        </div>
        <Button asChild className="bg-navy-900 hover:bg-blue-600 text-white shadow-2xl shadow-navy-900/10 font-black px-8 h-14 rounded-2xl transition-all duration-300">
          <Link to="/admin/events/new" className="flex items-center gap-3">
            <Plus className="h-5 w-5" /> Schedule New Event
          </Link>
        </Button>
      </div>

      <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white overflow-hidden rounded-[2.5rem]">
        <CardHeader className="px-10 py-8 border-b border-slate-50 bg-slate-50/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
                <CalendarDays className="h-5 w-5" />
              </div>
              <CardTitle className="text-xl font-black text-navy-900">Event Registry</CardTitle>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-none font-black px-4 py-1.5 rounded-xl text-[10px] uppercase tracking-widest">
                {items.filter(i => i.isUpcoming).length} ACTIVE
              </Badge>
              <Badge variant="outline" className="bg-white border-slate-100 text-slate-400 font-black px-4 py-1.5 rounded-xl text-[10px] uppercase tracking-widest">
                {items.length} TOTAL
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap">
              <thead>
                <tr className="border-b border-slate-50">
                  <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Primary Details</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Classification</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Schedule</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Venue</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Lifecycle</th>
                  <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Operations</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50/50">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-all duration-300 group cursor-default">
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-4">
                        <div className={`h-14 w-14 rounded-2xl flex items-center justify-center font-black shrink-0 transition-all duration-500 group-hover:scale-110 shadow-sm ${
                          item.isUpcoming 
                            ? 'bg-blue-600 text-white shadow-blue-600/10' 
                            : 'bg-slate-100 text-slate-400 shadow-slate-100/10'
                        }`}>
                          <Calendar className="h-6 w-6" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-black text-navy-900 group-hover:text-blue-600 transition-colors truncate text-base mb-0.5">{item.title}</div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded-md">ID: EVT-{item.id.toString().padStart(3, '0')}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <Badge variant="outline" className="text-blue-600 border-blue-100 bg-blue-50/30 font-black text-[10px] uppercase tracking-widest px-3 py-1 rounded-lg">
                        {item.category}
                      </Badge>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5 text-xs text-navy-900 font-black">
                          <Clock className="h-3.5 w-3.5 text-blue-600" /> 
                          {new Date(item.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase mt-1 ml-5">Scheduled Start</span>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-1.5 text-xs text-slate-600 font-bold max-w-[180px] truncate">
                        <MapPin className="h-3.5 w-3.5 text-slate-400 group-hover:text-blue-600 transition-colors" /> {item.venue}
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      {item.isUpcoming ? (
                        <div className="flex items-center gap-2 text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full w-fit shadow-sm shadow-blue-600/5">
                          <div className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" /> Live / Upcoming
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-full w-fit">
                          Concluded
                        </div>
                      )}
                    </td>
                    <td className="px-10 py-6 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                        <Button variant="ghost" size="icon" asChild className="h-10 w-10 rounded-xl bg-white shadow-sm border border-slate-100 text-slate-400 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-100 transition-all">
                          <Link to={`/admin/events/${item.id}/edit`}>
                            <Pencil className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleDelete(item.id)}
                          className="h-10 w-10 rounded-xl bg-white shadow-sm border border-slate-100 text-slate-400 hover:text-red-600 hover:bg-red-50 hover:border-red-100 transition-all"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {items.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-10 py-20 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <div className="h-20 w-20 rounded-3xl bg-slate-50 flex items-center justify-center">
                          <History className="h-10 w-10 text-slate-200" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-navy-900 font-black text-lg">No records found</p>
                          <p className="text-slate-400 text-sm font-medium">Schedule your first event to populate this registry.</p>
                        </div>
                        <Button variant="outline" size="lg" asChild className="mt-4 rounded-2xl border-slate-200 font-black hover:bg-navy-900 hover:text-white transition-all">
                          <Link to="/admin/events/new">Initialize First Event</Link>
                        </Button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
