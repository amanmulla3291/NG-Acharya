import { useState } from 'react';
import { Link } from 'react-router-dom';
import { infraStore } from '@/lib/data/stores';
import type { InfrastructureItem } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Building2, 
  Maximize, 
  Users, 
  HardHat,
  ChevronRight,
  MapPin,
  Sparkles
} from 'lucide-react';

export default function InfraListPage() {
  const [items, setItems] = useState<InfrastructureItem[]>(() => infraStore.getAll());

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this infrastructure asset?')) {
      infraStore.delete(id);
      setItems(infraStore.getAll());
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* HEADER SECTION */}
      <div className="relative p-8 rounded-[2.5rem] bg-gradient-to-r from-navy-900 via-navy-800 to-blue-900 text-white overflow-hidden shadow-2xl shadow-navy-900/20">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-navy-400/10 rounded-full -ml-10 -mb-10 blur-2xl"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                <Building2 className="h-8 w-8 text-blue-400" />
              </div>
              <div>
                <h1 className="text-4xl font-black tracking-tight uppercase italic">CAMPUS ASSETS</h1>
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 font-bold tracking-widest text-[10px] uppercase">Infrastructure Log</Badge>
                  <span className="text-navy-300 text-sm font-medium">Institutional facilities and physical labs</span>
                </div>
              </div>
            </div>
          </div>
          
          <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl h-14 px-8 font-black tracking-widest text-xs uppercase shadow-xl shadow-blue-600/20 gap-3 border-none group">
            <Link to="/admin/infrastructure/new">
              <Plus className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" /> Register Facility
            </Link>
          </Button>
        </div>
      </div>

      {/* STATS OVERVIEW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Facilities', value: items.length, icon: Building2, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Operational Capacity', value: items.reduce((acc, item) => acc + (item.capacity || 0), 0), icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Active Zones', value: new Set(items.map(i => i.category)).size, icon: MapPin, color: 'text-orange-600', bg: 'bg-orange-50' }
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white/70 backdrop-blur-xl rounded-[2rem] border border-white/40 group hover:shadow-xl transition-all duration-500">
            <CardContent className="p-6 flex items-center gap-5">
              <div className={`h-14 w-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500`}>
                <stat.icon className="h-7 w-7" />
              </div>
              <div>
                <p className="tracking-widest text-[10px] text-slate-400 font-black uppercase">{stat.label}</p>
                <p className="text-3xl font-black text-navy-900 italic tracking-tight">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* LIST TABLE */}
      <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white/70 backdrop-blur-xl rounded-[2.5rem] overflow-hidden border border-white/40">
        <CardHeader className="p-8 pb-4 flex flex-row items-center justify-between space-y-0">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-blue-600" />
              <CardTitle className="text-2xl font-black text-navy-900 tracking-tight uppercase italic">Institutional Facilities Log</CardTitle>
            </div>
            <p className="text-slate-500 font-medium text-sm mt-1">Audit of physical campus assets and operational units</p>
          </div>
          <Badge variant="outline" className="h-8 px-4 rounded-xl border-slate-200 text-navy-600 font-black tracking-widest text-[10px] uppercase">
            {items.length} Entries Detected
          </Badge>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-8 py-5 tracking-widest text-[10px] text-navy-400 font-black uppercase">Facility / Code</th>
                  <th className="px-8 py-5 tracking-widest text-[10px] text-navy-400 font-black uppercase">Classification</th>
                  <th className="px-8 py-5 tracking-widest text-[10px] text-navy-400 font-black uppercase text-center">Area (Sq.Ft)</th>
                  <th className="px-8 py-5 tracking-widest text-[10px] text-navy-400 font-black uppercase text-center">Occupancy</th>
                  <th className="px-8 py-5 tracking-widest text-[10px] text-navy-400 font-black uppercase text-right">Operations</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/50">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-blue-50/30 transition-all duration-300 group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-slate-50 to-white border border-slate-100 flex items-center justify-center text-blue-600 shadow-sm group-hover:scale-110 transition-transform duration-300">
                          <Building2 className="h-6 w-6" />
                        </div>
                        <div>
                          <div className="font-black text-navy-900 tracking-tight text-base group-hover:text-blue-600 transition-colors uppercase italic">{item.name}</div>
                          <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-0.5">Asset Ref: #INF-{item.id.toString().padStart(3, '0')}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <Badge className="bg-navy-50 text-navy-600 hover:bg-navy-100 border-none font-black text-[9px] px-3 py-1 uppercase tracking-[0.1em] italic">
                        {item.category}
                      </Badge>
                    </td>
                    <td className="px-8 py-5 text-center">
                      <div className="inline-flex items-center gap-2 text-sm font-bold text-navy-900 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100/50">
                        <Maximize className="h-3.5 w-3.5 text-blue-500" /> {item.area || 'N/A'}
                      </div>
                    </td>
                    <td className="px-8 py-5 text-center">
                      <div className="inline-flex items-center gap-2 text-sm font-bold text-navy-900 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100/50">
                        <Users className="h-3.5 w-3.5 text-emerald-500" /> {item.capacity || 'N/A'} Pax
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" asChild className="h-10 w-10 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 border border-transparent hover:border-blue-100 transition-all">
                          <Link to={`/admin/infrastructure/${item.id}/edit`}>
                            <Pencil className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleDelete(item.id)}
                          className="h-10 w-10 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-100 transition-all"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <div className="h-8 w-[1px] bg-slate-100 mx-1"></div>
                        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl text-slate-300 hover:text-navy-900 transition-colors">
                          <ChevronRight className="h-5 w-5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {items.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-8 py-20 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <div className="h-20 w-20 rounded-full bg-slate-50 flex items-center justify-center text-slate-200">
                          <HardHat className="h-10 w-10" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-navy-900 font-black text-lg tracking-tight uppercase">No Institutional Assets Found</p>
                          <p className="text-slate-400 font-medium text-sm">Register a new facility to populate the management registry.</p>
                        </div>
                        <Button asChild className="mt-4 bg-navy-900 hover:bg-black text-white h-12 px-8 rounded-xl font-bold uppercase tracking-widest text-[10px]">
                          <Link to="/admin/infrastructure/new">Initialize Registration</Link>
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
