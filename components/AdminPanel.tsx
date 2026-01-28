import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Newspaper, MessageSquare, Plus, 
  Trash2, Loader2, Building2, Send, Image as ImageIcon, Camera, AlertCircle,
  ExternalLink, RefreshCcw
} from 'lucide-react';
import { getComplaints, getRegistrations, saveNews, getNews, getGalleryImages, saveGalleryImage, deleteGalleryImage } from '../services/dbService.ts';

interface AdminPanelProps {
  onLogout: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'complaints' | 'registrations' | 'news' | 'gallery'>('dashboard');
  const [complaints, setComplaints] = useState<any[]>([]);
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [newsList, setNewsList] = useState<any[]>([]);
  const [galleryList, setGalleryList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [isAddingNews, setIsAddingNews] = useState(false);
  const [newsForm, setNewsForm] = useState({ title: '', category: 'ሪፖርት', imageUrl: '', excerpt: '' });
  const [galleryForm, setGalleryForm] = useState({ title: '', url: '' });

  useEffect(() => { fetchData(); }, [activeTab]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [c, r, n, g] = await Promise.all([
        getComplaints(), 
        getRegistrations(), 
        getNews(), 
        getGalleryImages()
      ]);
      setComplaints(c || []); 
      setRegistrations(r || []); 
      setNewsList(n || []); 
      setGalleryList(g || []);
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Triggers the Netlify Build Hook to redeploy the site
   */
  const triggerBuildHook = async () => {
    try {
      // Official build hook provided for redeployment
      await fetch('https://api.netlify.com/build_hooks/697785584f8a039d1f1a1b18', {
        method: 'POST',
      });
      console.info('Netlify Build Hook triggered successfully.');
    } catch (error) {
      console.error('Failed to trigger Netlify Build Hook:', error);
    }
  };

  const handleSaveNews = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAddingNews(true);
    try {
      await saveNews(newsForm);
      // Trigger rebuild so news appears on live site
      await triggerBuildHook();
      
      alert('ዜናው ተለጥፏል! የድረ-ገጽ ዝመና በቅርቡ ይጠናቀቃል። (News posted! Site update in progress.)');
      setNewsForm({ title: '', category: 'ሪፖርት', imageUrl: '', excerpt: '' });
      fetchData();
    } catch (err) { 
      alert('ስህተት ተፈጥሯል። እባክዎን እንደገና ይሞክሩ።'); 
    } finally { 
      setIsAddingNews(false); 
    }
  };

  const TabButton = ({ id, label, icon: Icon }: { id: any, label: string, icon: any }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all ${
        activeTab === id ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
      }`}
    >
      <Icon size={20} /> <span>{label}</span>
    </button>
  );

  return (
    <div className="py-12 max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <div>
          <h2 className="text-4xl font-black dark:text-white mb-2">የአስተዳዳሪ ክፍል</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">የሰመራ-ሎግያ ከተማ ገቢዎች አስተዳደር ዳሽቦርድ</p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={fetchData}
            className="p-3 text-slate-500 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"
            title="Refresh Data"
          >
            <RefreshCcw size={20} className={isLoading ? 'animate-spin' : ''} />
          </button>
          <button onClick={onLogout} className="px-8 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-500/20">
            ውጣ (Logout)
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-12 bg-white dark:bg-slate-900 p-2 rounded-[2.5rem] border dark:border-slate-800 shadow-sm overflow-x-auto">
        <TabButton id="dashboard" label="ዳሽቦርድ" icon={LayoutDashboard} />
        <TabButton id="complaints" label="ቅሬታዎች" icon={MessageSquare} />
        <TabButton id="registrations" label="ምዝገባዎች" icon={Building2} />
        <TabButton id="news" label="ዜና" icon={Newspaper} />
        <TabButton id="gallery" label="ጋለሪ" icon={Camera} />
      </div>

      {isLoading ? (
        <div className="py-32 flex flex-col items-center justify-center text-slate-400">
          <Loader2 className="animate-spin mb-4" size={48} />
          <p className="font-bold">መረጃ በመጫን ላይ... (Loading Data...)</p>
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-5 duration-500">
          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <StatCard label="ቅሬታዎች" value={complaints.length} color="text-red-500" icon={AlertCircle} />
              <StatCard label="ምዝገባዎች" value={registrations.length} color="text-emerald-500" icon={Building2} />
              <StatCard label="ዜናዎች" value={newsList.length} color="text-blue-500" icon={Newspaper} />
              <StatCard label="ጋለሪ" value={galleryList.length} color="text-amber-500" icon={Camera} />
            </div>
          )}

          {activeTab === 'complaints' && (
            <div className="bg-white dark:bg-slate-900 rounded-[3rem] border dark:border-slate-800 shadow-sm overflow-hidden">
              <div className="p-8 border-b dark:border-slate-800 flex justify-between items-center">
                <h3 className="text-xl font-black dark:text-white">የቅሬታዎች ዝርዝር (Complaints)</h3>
                <span className="text-xs font-black text-slate-400 uppercase bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">{complaints.length} Total</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 dark:bg-slate-800/50 font-bold text-xs uppercase tracking-widest text-slate-400">
                    <tr>
                      <th className="p-6">ስም (Name)</th>
                      <th className="p-6">ስልክ (Phone)</th>
                      <th className="p-6">ቅሬታ (Message)</th>
                      <th className="p-6">ቀን (Date)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y dark:divide-slate-800">
                    {complaints.length > 0 ? complaints.map(c => (
                      <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                        <td className="p-6 dark:text-white font-bold">{c.name}</td>
                        <td className="p-6 text-slate-500 dark:text-slate-400">{c.phone}</td>
                        <td className="p-6 text-sm dark:text-slate-300 max-w-md">{c.message}</td>
                        <td className="p-6 text-xs text-slate-400">{new Date(c.created_at).toLocaleDateString()}</td>
                      </tr>
                    )) : (
                      <tr><td colSpan={4} className="p-12 text-center text-slate-400 italic">ምንም ቅሬታ የለም (No complaints found)</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'registrations' && (
            <div className="bg-white dark:bg-slate-900 rounded-[3rem] border dark:border-slate-800 shadow-sm overflow-hidden">
              <div className="p-8 border-b dark:border-slate-800 flex justify-between items-center">
                <h3 className="text-xl font-black dark:text-white">የንግድ ምዝገባዎች (Business Registrations)</h3>
                <span className="text-xs font-black text-slate-400 uppercase bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">{registrations.length} Total</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 dark:bg-slate-800/50 font-bold text-xs uppercase tracking-widest text-slate-400">
                    <tr>
                      <th className="p-6">ድርጅት (Business)</th>
                      <th className="p-6">ባለቤት (Owner)</th>
                      <th className="p-6">ዘርፍ (Sector)</th>
                      <th className="p-6">TIN</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y dark:divide-slate-800">
                    {registrations.length > 0 ? registrations.map(r => (
                      <tr key={r.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                        <td className="p-6 dark:text-white font-black">{r.business_name}</td>
                        <td className="p-6 text-slate-500 dark:text-slate-400">{r.owner_name} <br/><span className="text-[10px]">{r.phone}</span></td>
                        <td className="p-6">
                          <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 text-[10px] font-black uppercase rounded-full">
                            {r.sector}
                          </span>
                        </td>
                        <td className="p-6 text-xs font-mono dark:text-slate-300">{r.tin || 'N/A'}</td>
                      </tr>
                    )) : (
                      <tr><td colSpan={4} className="p-12 text-center text-slate-400 italic">ምንም ምዝገባ የለም (No registrations found)</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'news' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border dark:border-slate-800 shadow-sm h-fit">
                <h3 className="text-2xl font-black dark:text-white mb-8 flex items-center gap-2">
                  <Plus size={24} className="text-blue-600"/> አዲስ ዜና ልጠፋ
                </h3>
                <form onSubmit={handleSaveNews} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">ርዕስ (Title)</label>
                    <input 
                      required 
                      value={newsForm.title} 
                      onChange={e => setNewsForm({...newsForm, title: e.target.value})} 
                      className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-4 focus:ring-blue-500/20 dark:text-white font-bold" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">ምስል URL (Image URL)</label>
                    <input 
                      required 
                      value={newsForm.imageUrl} 
                      onChange={e => setNewsForm({...newsForm, imageUrl: e.target.value})} 
                      className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-4 focus:ring-blue-500/20 dark:text-white font-bold" 
                      placeholder="https://images.unsplash.com/..."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">አጭር መግለጫ (Excerpt)</label>
                    <textarea 
                      required 
                      rows={4}
                      value={newsForm.excerpt} 
                      onChange={e => setNewsForm({...newsForm, excerpt: e.target.value})} 
                      className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-4 focus:ring-blue-500/20 dark:text-white font-medium resize-none" 
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={isAddingNews}
                    className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-3 disabled:opacity-70 shadow-xl shadow-blue-500/20"
                  >
                    {isAddingNews ? <Loader2 className="animate-spin" /> : <><Send size={20}/> ዜናውን ልጠፍ</>}
                  </button>
                </form>
              </div>

              <div className="space-y-6">
                <div className="bg-white dark:bg-slate-900 rounded-[3rem] border dark:border-slate-800 shadow-sm overflow-hidden">
                  <div className="p-8 border-b dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                    <h3 className="text-xl font-black dark:text-white">የተለጠፉ ዜናዎች</h3>
                  </div>
                  <div className="divide-y dark:divide-slate-800 max-h-[600px] overflow-y-auto">
                    {newsList.map(n => (
                      <div key={n.id} className="p-6 flex items-center gap-6 group hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-all">
                        <img src={n.image_url || n.imageUrl} className="w-20 h-20 object-cover rounded-2xl shadow-sm" alt="" />
                        <div className="flex-1">
                          <h4 className="font-black dark:text-white text-sm line-clamp-2">{n.title}</h4>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 uppercase font-black">{n.category} • {new Date(n.created_at).toLocaleDateString()}</p>
                        </div>
                        <button className="p-3 text-slate-400 hover:text-red-500 transition-colors"><Trash2 size={18}/></button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'gallery' && (
            <div className="space-y-8">
               <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border dark:border-slate-800 shadow-sm max-w-2xl">
                <h3 className="text-2xl font-black dark:text-white mb-8 flex items-center gap-2">
                  <Camera size={24} className="text-amber-500"/> አዲስ ምስል ወደ ጋለሪ
                </h3>
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  try {
                    await saveGalleryImage(galleryForm);
                    setGalleryForm({ title: '', url: '' });
                    fetchData();
                  } catch (err) { alert('ስህተት ተፈጥሯል።'); }
                }} className="space-y-6">
                  <input required placeholder="የምስል ርዕስ" value={galleryForm.title} onChange={e => setGalleryForm({...galleryForm, title: e.target.value})} className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 rounded-xl" />
                  <input required placeholder="የምስል URL" value={galleryForm.url} onChange={e => setGalleryForm({...galleryForm, url: e.target.value})} className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 rounded-xl" />
                  <button type="submit" className="w-full bg-amber-600 text-white py-4 rounded-xl font-bold hover:bg-amber-700 transition-colors">ምስል ጨምር</button>
                </form>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {galleryList.map(img => (
                  <div key={img.id} className="relative group bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-hidden aspect-square">
                    <img src={img.url} className="w-full h-full object-cover" alt={img.title} />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4">
                      <p className="text-white text-[10px] font-black text-center mb-4 line-clamp-2">{img.title}</p>
                      <button onClick={() => deleteGalleryImage(img.id).then(fetchData)} className="p-2 bg-red-600 text-white rounded-full hover:scale-110 transition-transform"><Trash2 size={14}/></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const StatCard = ({ label, value, color, icon: Icon }: any) => (
  <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border dark:border-slate-800 shadow-sm flex items-center gap-6 hover:translate-y-[-4px] transition-transform">
    <div className={`p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 ${color}`}><Icon size={24} /></div>
    <div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
      <p className="text-3xl font-black dark:text-white">{value}</p>
    </div>
  </div>
);