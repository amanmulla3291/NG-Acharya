import { useState, useEffect } from 'react';

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-navy-900">System Settings</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
              <h2 className="text-lg font-semibold text-navy-900">General Settings</h2>
            </div>
            
            <form onSubmit={handleSave}>
              <div className="p-6 space-y-8">
                
                {/* Admin Profile Section */}
                <section>
                  <h3 className="text-sm font-bold text-teal-600 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">
                    Admin Profile
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input 
                        name="adminName" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all" 
                        value={settings.adminName} 
                        onChange={handleChange} 
                        required 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input 
                        name="adminEmail" 
                        type="email" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all" 
                        value={settings.adminEmail} 
                        onChange={handleChange} 
                        required 
                      />
                    </div>
                  </div>
                </section>

                {/* College Info Section */}
                <section>
                  <h3 className="text-sm font-bold text-teal-600 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">
                    College Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Official Address</label>
                      <input 
                        name="collegeAddress" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all" 
                        value={settings.collegeAddress} 
                        onChange={handleChange} 
                        required 
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone</label>
                        <input 
                          name="collegePhone" 
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all" 
                          value={settings.collegePhone} 
                          onChange={handleChange} 
                          required 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Public Email</label>
                        <input 
                          name="collegeEmail" 
                          type="email" 
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all" 
                          value={settings.collegeEmail} 
                          onChange={handleChange} 
                          required 
                        />
                      </div>
                    </div>
                  </div>
                </section>

              </div>
              
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center gap-4">
                <button 
                  type="submit" 
                  className="px-6 py-2 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-colors flex items-center gap-2"
                >
                  <i className="bi bi-save" /> Save Changes
                </button>
                
                {saved && (
                  <span className="text-teal-600 font-medium flex items-center gap-1.5 animate-fade-in">
                    <i className="bi bi-check-circle-fill" /> Settings Saved!
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
