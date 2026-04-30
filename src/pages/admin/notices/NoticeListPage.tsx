import { useState } from 'react';
import { Link } from 'react-router-dom';
import { noticeStore } from '@/lib/data/stores';
import type { Notice } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Pencil, Trash2, Megaphone, Calendar, AlertCircle, FileText } from 'lucide-react';

export default function NoticeListPage() {
  const [items, setItems] = useState<Notice[]>(() => noticeStore.getAll());

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this notice? This action cannot be undone.')) {
      noticeStore.delete(id);
      setItems(noticeStore.getAll());
    }
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-navy-900 tracking-tight">Institutional Notices</h1>
          <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">Communication Registry & Management</p>
        </div>
        <Button asChild className="bg-navy-900 hover:bg-blue-600 text-white shadow-2xl shadow-navy-900/10 h-12 px-6 rounded-2xl transition-all duration-300 font-black">
          <Link to="/admin/notices/new" className="flex items-center gap-2">
            <Plus className="h-5 w-5" /> Publish New Notice
          </Link>
        </Button>
      </div>

      <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white overflow-hidden rounded-[2rem]">
        <CardHeader className="px-8 py-6 border-b border-slate-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-blue-600" />
              <CardTitle className="text-xl font-black text-navy-900">Archive Directory</CardTitle>
            </div>
            <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-none font-black px-4 py-1.5 rounded-full text-[11px] uppercase tracking-wider">
              {items.length} Communications
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-50">
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Communication Details</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Category</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Priority Status</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Operational Tools</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-all duration-500 group">
                    <td className="px-8 py-6 max-w-md">
                      <div className="flex gap-5 items-center">
                        <div className={`h-14 w-14 rounded-2xl flex items-center justify-center font-bold shrink-0 transition-all duration-500 group-hover:scale-110 shadow-sm ${item.isImportant ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                          <Megaphone className="h-6 w-6" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-black text-navy-900 text-lg group-hover:text-blue-600 transition-colors truncate tracking-tight">{item.title}</div>
                          <div className="text-[10px] text-slate-400 font-black flex items-center gap-2 mt-1 uppercase tracking-wider">
                            <Calendar className="h-3.5 w-3.5" /> 
                            {new Date(item.publishedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <Badge variant="secondary" className="bg-slate-50 text-slate-500 border-slate-100 font-black text-[9px] uppercase tracking-[0.15em] px-3 py-1 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all">
                        {item.category}
                      </Badge>
                    </td>
                    <td className="px-8 py-6">
                      {item.isImportant ? (
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
                          <span className="text-[10px] font-black text-red-600 uppercase tracking-widest">High Priority</span>
                        </div>
                      ) : (
                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Standard</span>
                      )}
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-3 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                        <Button variant="ghost" size="icon" asChild className="h-11 w-11 rounded-2xl bg-white shadow-sm border border-slate-100 text-slate-400 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-100 hover:rotate-6 transition-all duration-300">
                          <Link to={`/admin/notices/${item.id}/edit`}>
                            <Pencil className="h-5 w-5" />
                          </Link>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleDelete(item.id)}
                          className="h-11 w-11 rounded-2xl bg-white shadow-sm border border-slate-100 text-slate-400 hover:text-red-600 hover:bg-red-50 hover:border-red-100 hover:-rotate-6 transition-all duration-300"
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {items.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-8 py-20 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <div className="h-20 w-20 rounded-3xl bg-slate-50 flex items-center justify-center text-slate-200">
                          <FileText className="h-10 w-10" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-xl font-black text-navy-900">Registry is Empty</p>
                          <p className="text-sm text-slate-400 font-medium italic">No notices have been published to the archive yet.</p>
                        </div>
                        <Button variant="outline" size="sm" asChild className="mt-4 rounded-xl px-8 border-slate-200 font-black h-11 hover:bg-navy-900 hover:text-white transition-all">
                          <Link to="/admin/notices/new">Initiate First Communication</Link>
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
