import React, { useState } from 'react';
import { Send, User, Phone, Mail, FileText, AlertCircle, Loader2, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { saveComplaint } from '../services/dbService.ts';

interface ComplaintFormProps {
  onBack: () => void;
}

export const ComplaintForm: React.FC<ComplaintFormProps> = ({ onBack }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    tin: '',
    type: 'የግብር ግምት ቅሬታ',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await saveComplaint({
        name: form.name,
        phone: form.phone,
        email: form.email,
        tin: form.tin,
        complaintType: form.type,
        message: form.message
      });
      setSuccess(true);
    } catch (err) {
      setError('ያስገቡት መረጃ አልተሳካም። እባክዎ እንደገና ይሞክሩ።');
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
        <p className="text-slate-500 dark:text-slate-400 mb-10 text-lg">ቅሬታዎ በስርዓታችን ተመዝግቧል። በቅርቡ በ {form.phone} ምላሽ እንሰጥዎታለን።</p>
        <button onClick={onBack} className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20">ወደ አገልግሎቶች ተመለስ</button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 animate-in slide-in-from-bottom-10">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold mb-8 transition-colors">
        <ArrowLeft size={20} /> ተመለስ
      </button>

      <div className="bg-white dark:bg-slate-900 rounded-[3rem] border dark:border-slate-800 shadow-2xl overflow-hidden">
        <div className="bg-blue-600 p-10 text-white">
          <h2 className="text-3xl font-black mb-4 flex items-center gap-4"><AlertCircle size={32} /> የቅሬታ ማቅረቢያ ቅጽ</h2>
          <p className="text-blue-100 opacity-90 font-medium">በግብር አወሳሰን ወይም በአገልግሎት አሰጣጥ ላይ ያለዎትን ቅሬታ እዚህ ያቅርቡ።</p>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><User size={14} className="text-blue-600"/> ሙሉ ስም</label>
              <input 
                required 
                value={form.name}
                onChange={e => setForm({...form, name: e.target.value})}
                className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-4 focus:ring-blue-500/20 dark:text-white font-bold" 
                placeholder="ስምዎን ያስገቡ"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Phone size={14} className="text-blue-600"/> ስልክ ቁጥር</label>
              <input 
                required 
                value={form.phone}
                onChange={e => setForm({...form, phone: e.target.value})}
                className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-4 focus:ring-blue-500/20 dark:text-white font-bold" 
                placeholder="09..."
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Mail size={14} className="text-blue-600"/> ኢሜል</label>
            <input 
              required 
              type="email"
              value={form.email}
              onChange={e => setForm({...form, email: e.target.value})}
              className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-4 focus:ring-blue-500/20 dark:text-white font-bold" 
              placeholder="example@mail.com"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><FileText size={14} className="text-blue-600"/> የግብር ከፋይ መለያ ቁጥር (TIN)</label>
            <input 
              value={form.tin}
              onChange={e => setForm({...form, tin: e.target.value})}
              className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-4 focus:ring-blue-500/20 dark:text-white font-bold" 
              placeholder="ካለዎት ያስገቡ"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><AlertCircle size={14} className="text-blue-600"/> የቅሬታው አይነት</label>
            <select 
              value={form.type}
              onChange={e => setForm({...form, type: e.target.value})}
              className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-4 focus:ring-blue-500/20 dark:text-white font-bold"
            >
              <option>የግብር ግምት ቅሬታ</option>
              <option>የአገልግሎት መዘግየት</option>
              <option>የባለሙያ ስነ-ምግባር</option>
              <option>ሌላ</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">ዝርዝር መግለጫ</label>
            <textarea 
              required 
              rows={5}
              value={form.message}
              onChange={e => setForm({...form, message: e.target.value})}
              className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-4 focus:ring-blue-500/20 dark:text-white font-medium resize-none" 
              placeholder="ቅሬታዎን እዚህ ይግለጹ..."
            />
          </div>

          {error && <p className="text-red-500 text-sm font-bold">{error}</p>}

          <button 
            disabled={loading}
            className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3 disabled:opacity-70"
          >
            {loading ? <Loader2 className="animate-spin" /> : <><Send size={20} /> ቅሬታውን ላክ</>}
          </button>
        </form>
      </div>
    </div>
  );
};