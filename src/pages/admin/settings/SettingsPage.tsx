import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Save, 
  User, 
  Mail, 
  MapPin, 
  Phone, 
  Building2, 
  ShieldCheck, 
  Globe,
  Settings,
  Info,
  RefreshCcw,
  KeyRound,
  History,
  Lock
} from 'lucide-react';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    adminName: 'Super Admin',
    adminEmail: 'admin@ngacharya.edu.in',
    collegeAddress: 'N. G. Acharya Marg, Subhash Nagar, Chembur, Mumbai, Maharashtra 400071',
    collegePhone: '+91 22 2520 2744',
    collegeEmail: 'principal@ngacharya.edu.in'
  });

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('admin_settings');
    if (stored) {
      setSettings(JSON.parse(stored));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSettings(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setSaved(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('admin_settings', JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
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
                <Settings className="h-8 w-8 text-blue-400" />
              </div>
              <div>
                <h1 className="text-4xl font-black tracking-tight uppercase italic">SYSTEM CONFIG</h1>
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 font-bold tracking-widest text-[10px] uppercase">Portal v2.5</Badge>
                  <span className="text-navy-300 text-sm font-medium">Global infrastructure management</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="outline" className="bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white rounded-2xl h-12 px-6 font-bold gap-2 backdrop-blur-md">
              <History className="h-4 w-4 text-blue-400" /> Audit Logs
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl h-12 px-8 font-black tracking-widest text-xs uppercase shadow-xl shadow-blue-600/20 gap-2">
              <RefreshCcw className="h-4 w-4" /> Sync Now
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <form onSubmit={handleSave} className="space-y-8">
            {/* ADMINISTRATIVE PROFILE */}
            <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white/70 backdrop-blur-xl rounded-[2.5rem] overflow-hidden border border-white/40">
              <CardHeader className="p-8 pb-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <User className="h-5 w-5 text-blue-600" />
                      </div>
                      <CardTitle className="text-2xl font-black text-navy-900 tracking-tight uppercase italic">Admin Identity</CardTitle>
                    </div>
                    <CardDescription className="text-slate-500 font-medium ml-10">Personal management and access coordinates</CardDescription>
                  </div>
                  <Badge variant="outline" className="border-slate-200 text-slate-400 font-bold">L3 CLEARANCE</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-8 pt-4 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3 group">
                    <Label className="tracking-widest text-[10px] text-navy-400 font-black uppercase ml-1">Root Administrator Name</Label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                      <input 
                        name="adminName"
                        value={settings.adminName}
                        onChange={handleChange}
                        className="w-full h-14 pl-12 pr-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/10 transition-all outline-none font-bold text-navy-900"
                        required
                        placeholder="Enter full administrative name"
                      />
                    </div>
                  </div>
                  <div className="space-y-3 group">
                    <Label className="tracking-widest text-[10px] text-navy-400 font-black uppercase ml-1">Primary Access Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                      <input 
                        name="adminEmail"
                        type="email"
                        value={settings.adminEmail}
                        onChange={handleChange}
                        className="w-full h-14 pl-12 pr-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/10 transition-all outline-none font-bold text-navy-900"
                        required
                        placeholder="admin@institution.edu"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* INSTITUTIONAL INFORMATION */}
            <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white/70 backdrop-blur-xl rounded-[2.5rem] overflow-hidden border border-white/40">
              <CardHeader className="p-8 pb-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <Building2 className="h-5 w-5 text-blue-600" />
                      </div>
                      <CardTitle className="text-2xl font-black text-navy-900 tracking-tight uppercase italic">Campus Nexus</CardTitle>
                    </div>
                    <CardDescription className="text-slate-500 font-medium ml-10">Institutional parameters and contact architecture</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8 pt-4 space-y-8">
                <div className="space-y-3 group">
                  <Label className="tracking-widest text-[10px] text-navy-400 font-black uppercase ml-1">Institutional Physical Address</Label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-5 h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                    <textarea 
                      name="collegeAddress"
                      value={settings.collegeAddress}
                      onChange={handleChange}
                      className="w-full min-h-[100px] pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/10 transition-all outline-none font-bold text-navy-900 resize-none"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3 group">
                    <Label className="tracking-widest text-[10px] text-navy-400 font-black uppercase ml-1">Official Helpline</Label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                      <input 
                        name="collegePhone"
                        value={settings.collegePhone}
                        onChange={handleChange}
                        className="w-full h-14 pl-12 pr-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/10 transition-all outline-none font-bold text-navy-900"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-3 group">
                    <Label className="tracking-widest text-[10px] text-navy-400 font-black uppercase ml-1">Public Relations Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                      <input 
                        name="collegeEmail"
                        type="email"
                        value={settings.collegeEmail}
                        onChange={handleChange}
                        className="w-full h-14 pl-12 pr-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/10 transition-all outline-none font-bold text-navy-900"
                        required
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-slate-50/50 p-8 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-slate-100/50">
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                  <Button type="submit" className="w-full md:w-auto bg-navy-900 hover:bg-black text-white px-10 h-14 rounded-2xl font-black tracking-widest text-xs uppercase shadow-2xl shadow-navy-900/30 gap-3">
                    <Save className="h-5 w-5 text-blue-400" /> Commit Configurations
                  </Button>
                  {saved && (
                    <div className="flex items-center gap-2 text-blue-600 font-black text-[10px] tracking-widest uppercase animate-in zoom-in duration-300">
                      <div className="h-2 w-2 rounded-full bg-blue-600 animate-pulse"></div>
                      Changes Synchronized
                    </div>
                  )}
                </div>
                <Button variant="ghost" type="button" className="text-slate-400 hover:text-red-500 font-black tracking-widest text-[10px] uppercase hover:bg-red-50 rounded-xl px-4">
                  Factory Reset Matrix
                </Button>
              </CardFooter>
            </Card>
          </form>
        </div>

        <div className="lg:col-span-4 space-y-8">
          {/* SECURITY STATUS */}
          <Card className="border-none shadow-2xl bg-navy-900 text-white rounded-[2.5rem] overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform duration-700">
              <ShieldCheck className="h-32 w-32 text-blue-400" />
            </div>
            <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
            
            <CardHeader className="p-8">
              <CardTitle className="text-blue-400 text-[10px] font-black uppercase tracking-[0.2em]">Security Overview</CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-0 space-y-8">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="h-20 w-20 rounded-[2rem] bg-gradient-to-br from-blue-600 to-navy-700 flex items-center justify-center text-3xl font-black border-4 border-navy-800 shadow-2xl overflow-hidden">
                    <span className="relative z-10">{settings.adminName.charAt(0)}</span>
                    <div className="absolute inset-0 bg-blue-400/20 blur-xl"></div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-green-500 border-4 border-navy-900 flex items-center justify-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-white animate-pulse"></div>
                  </div>
                </div>
                <div>
                  <h3 className="font-black text-xl tracking-tight leading-none italic">{settings.adminName}</h3>
                  <Badge className="bg-blue-500/20 text-blue-300 border-none mt-2 font-bold tracking-widest text-[9px] uppercase">Super Root Access</Badge>
                </div>
              </div>
              
              <div className="space-y-5 pt-8 border-t border-white/5">
                <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                  <div className="h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center">
                    <Mail className="h-4 w-4 text-blue-500" />
                  </div>
                  <span className="truncate">{settings.adminEmail}</span>
                </div>
                <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                  <div className="h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center">
                    <KeyRound className="h-4 w-4 text-blue-500" />
                  </div>
                  <span>MFA Shield: ACTIVE</span>
                </div>
                <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                  <div className="h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center">
                    <Globe className="h-4 w-4 text-blue-500" />
                  </div>
                  <span>Region: MUMBAI (IN)</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-black/20 p-6">
              <div className="flex items-center gap-2">
                <Info className="h-3.5 w-3.5 text-blue-500" />
                <p className="text-[9px] text-slate-500 font-black tracking-widest uppercase">System Encrypted & Secured</p>
              </div>
            </CardFooter>
          </Card>

          {/* SYSTEM TELEMETRY */}
          <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white/70 backdrop-blur-xl rounded-[2.5rem] border border-white/40 overflow-hidden">
            <CardHeader className="p-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Info className="h-5 w-5 text-blue-600" />
                </div>
                <CardTitle className="text-xl font-black text-navy-900 tracking-tight uppercase italic">Telemetry</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-8 pt-0 space-y-1">
              {[
                { label: 'Environment', value: 'Production', badge: true },
                { label: 'Portal Version', value: 'v2.5.0-gold' },
                { label: 'Database Node', value: 'DB-MUM-01' },
                { label: 'Latency', value: '14ms', status: 'Optimal' },
                { label: 'Uptime', value: '99.98%' }
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center py-4 border-b border-slate-100 last:border-0 group cursor-default">
                  <span className="text-slate-400 text-[10px] font-black tracking-widest uppercase group-hover:text-navy-900 transition-colors">{item.label}</span>
                  <div className="flex items-center gap-2">
                    {item.badge ? (
                      <Badge className="bg-blue-600 text-white border-none font-black tracking-widest text-[9px] px-2 uppercase italic">{item.value}</Badge>
                    ) : item.status ? (
                      <div className="flex items-center gap-2">
                        <span className="text-navy-900 font-black text-xs">{item.value}</span>
                        <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                      </div>
                    ) : (
                      <span className="text-navy-900 font-black text-xs">{item.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Button className="w-full h-14 rounded-2xl bg-white border-2 border-slate-200 text-navy-900 hover:bg-slate-50 hover:border-navy-200 font-black tracking-widest text-xs uppercase shadow-sm gap-2">
            <Lock className="h-4 w-4 text-blue-600" /> Maintenance Mode
          </Button>
        </div>
      </div>
    </div>
  );
}
