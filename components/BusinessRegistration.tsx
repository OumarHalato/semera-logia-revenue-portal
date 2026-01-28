import React, { useState } from 'react';
import { Building2, User, Phone, Briefcase, Send, Loader2, ArrowLeft, CheckCircle2, FileText } from 'lucide-react';
import { saveRegistration } from '../services/dbService.ts';

interface BusinessRegistrationProps {
  onBack: () => void;
}

export const BusinessRegistration: React.FC<BusinessRegistrationProps> = ({ onBack }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    ownerName: '',
    phone: '',
    tin: '',
    businessName: '',
    sector: 'ንግድ',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await saveRegistration({
        ownerName: form.ownerName,
        phone: form.phone,
        tin: form.tin,
        businessName: form.businessName,
        sector: form.sector,
      });
      setSuccess(true);
    } catch (err) {
      alert('ምዝገባው አልተሳካም። እባክዎ እንደገና ይሞክሩ።');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-2xl mx-auto py-20 px-6 text-center animate-in zoom-in-95">
        <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 size={48} />
        </div>
        <h2 className="text-4xl font-black dark:text-white mb-4 text-emerald-600">በተሳካ ሁኔታ ተልኳል!</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-10 text-lg">የምዝገባ ጥያቄዎ በስርዓታችን ተመዝግቧል። በቅርቡ እናገኝዎታለን።</p>
        <button onClick={onBack} className="bg-emerald-600 text-white px-10 py-4 rounded-2xl font-black hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-500/20">ወደ አገልግሎቶች ተመለስ</button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 animate-in slide-in-from-bottom-10">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 font-bold mb-8 transition-colors">
        <ArrowLeft size={20} /> ተመለስ
      </button>

      <div className="bg-white dark:bg-slate-900 rounded-[3rem] border dark:border-slate-800 shadow-2xl overflow-hidden">
        <div className="bg-emerald-600 p-10 text-white">
          <h2 className="text-3xl font-black mb-4 flex items-center gap-4"><Building2 size={32} /> አዲስ የንግድ ምዝገባ</h2>
          <p className="text-emerald-100 opacity-90 font-medium">አዲስ የንግድ ስራ ለመጀመር የሚያስፈልጉ መረጃዎችን እዚህ ይሙሉ::</p>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><User size={14} className="text-emerald-600"/> ሙሉ ስም (Name)</label>
              <input 
                required 
                value={form.ownerName}
                onChange={e => setForm({...form, ownerName: e.target.value})}
                className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-4 focus:ring-emerald-500/20 dark:text-white font-bold" 
                placeholder="ስምዎን ያስገቡ"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Phone size={14} className="text-emerald-600"/> ስልክ ቁጥር (Phone)</label>
              <input 
                required 
                value={form.phone}
                onChange={e => setForm({...form, phone: e.target.value})}
                className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-4 focus:ring-emerald-500/20 dark:text-white font-bold" 
                placeholder="09..."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><FileText size={14} className="text-emerald-600"/> የግብር ከፋይ መለያ ቁጥር (TIN)</label>
              <input 
                required 
                value={form.tin}
                onChange={e => setForm({...form, tin: e.target.value})}
                className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-4 focus:ring-emerald-500/20 dark:text-white font-bold" 
                placeholder="TIN ቁጥር ያስገቡ"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Briefcase size={14} className="text-emerald-600"/> የንግድ ዘርፍ (Sector)</label>
              <select 
                value={form.sector}
                onChange={e => setForm({...form, sector: e.target.value})}
                className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-4 focus:ring-emerald-500/20 dark:text-white font-bold"
              >
                <option>ንግድ</option>
                <option>አገልግሎት</option>
                <option>ኢንዱስትሪ</option>
                <option>ኮንስትራክሽን</option>
                <option>ሌላ</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Building2 size={14} className="text-emerald-600"/> የንግድ ድርጅቱ ስም (Business Name)</label>
            <input 
              required 
              value={form.businessName}
              onChange={e => setForm({...form, businessName: e.target.value})}
              className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-4 focus:ring-emerald-500/20 dark:text-white font-bold" 
              placeholder="የድርጅቱን ስም ያስገቡ"
            />
          </div>

          <button 
            disabled={loading}
            className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-3 disabled:opacity-70"
          >
            {loading ? <Loader2 className="animate-spin" /> : <><Send size={20} /> ምዝገባውን ላክ</>}
          </button>
        </form>
      </div>
    </div>
  );
};