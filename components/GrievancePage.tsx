import React, { useState } from 'react';
import { AlertCircle, Send, Loader2, ArrowLeft, FileText, User, Phone, Mail } from 'lucide-react';
import { saveComplaint } from '../services/dbService.ts';

export const GrievancePage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    tin: '',
    type: 'የግብር መጠን ግምት ቅሬታ',
    message: ''
  });
  const [emailError, setEmailError] = useState('');

  const validateEmail = (val: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (val && !regex.test(val)) {
      setEmailError('ትክክለኛ የኢሜል አድራሻ ያስገቡ (Invalid email format)');
      return false;
    }
    setEmailError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) return;
    
    setIsSubmitting(true);
    try {
      await saveComplaint({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        tin: formData.tin,
        complaintType: formData.type,
        message: formData.message
      });
      setIsSubmitting(false);
      setSubmitted(true);
    } catch (error) {
      setIsSubmitting(false);
      alert('ቅሬታውን ለማስገባት ስህተት ተፈጥሯል። እባክዎን እንደገና ይሞክሩ።');
    }
  };

  if (submitted) {
    return (
      <div className="py-24 max-w-3xl mx-auto px-6 text-center animate-in zoom-in-95">
        <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
          <Send size={48} />
        </div>
        <h2 className="text-4xl font-black dark:text-white mb-4">ቅሬታዎ በተሳካ ሁኔታ ቀርቧል!</h2>
        <p className="text-slate-500 dark:text-slate-400 text-lg mb-10">የእርሶ ቅሬታ በዳታቤዛችን ውስጥ ተመዝግቧል። በ 3 የስራ ቀናት ውስጥ በኢሜል ወይም በስልክ ምላሽ እንሰጥዎታለን።</p>
        <button onClick={onBack} className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20">ወደ አገልግሎቶች ተመለስ</button>
      </div>
    );
  }

  return (
    <div className="py-12 max-w-4xl mx-auto px-6 animate-in slide-in-from-bottom-10">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold mb-10 transition-colors">
        <ArrowLeft size={20} /> ወደ አገልግሎቶች ተመለስ
      </button>

      <div className="bg-white dark:bg-slate-900 rounded-[3rem] border dark:border-slate-800 shadow-xl overflow-hidden">
        <div className="bg-blue-600 p-10 text-white">
          <h2 className="text-3xl font-black mb-4 flex items-center gap-4"><AlertCircle size={36} /> የቅሬታ ማቅረቢያ ቅጽ</h2>
          <p className="text-blue-100 opacity-90">በግብር አወሳሰን ላይ ያለዎትን ቅሬታ እዚህ ያቅርቡ። መረጃዎ በዲጂታል ዳታቤዛችን ውስጥ በደህንነት ይቀመጣል።</p>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-sm font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <User size={14} /> ሙሉ ስም
              </label>
              <input 
                required 
                type="text" 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-4 focus:ring-blue-500/20 dark:text-white font-bold" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Phone size={14} /> ስልክ ቁጥር
              </label>
              <input 
                required 
                type="tel" 
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
                className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-4 focus:ring-blue-500/20 dark:text-white font-bold" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Mail size={14} /> ኢሜል (Email)
            </label>
            <input 
              required 
              type="email" 
              value={formData.email}
              onChange={(e) => {
                setFormData({...formData, email: e.target.value});
                validateEmail(e.target.value);
              }}
              className={`w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-2 transition-all focus:ring-4 focus:ring-blue-500/20 dark:text-white font-bold ${emailError ? 'border-red-500 bg-red-50 dark:bg-red-900/10' : 'border-transparent'}`} 
            />
            {emailError && <p className="text-red-500 text-xs font-bold mt-1">{emailError}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <FileText size={14} /> የግብር ከፋይ መለያ ቁጥር (TIN) - ካለዎት
            </label>
            <input 
              type="text" 
              value={formData.tin}
              onChange={e => setFormData({...formData, tin: e.target.value})}
              className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-4 focus:ring-blue-500/20 dark:text-white font-bold" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <AlertCircle size={14} /> የቅሬታው አይነት
            </label>
            <select 
              value={formData.type}
              onChange={e => setFormData({...formData, type: e.target.value})}
              className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-4 focus:ring-blue-500/20 dark:text-white font-bold"
            >
              <option>የግብር መጠን ግምት ቅሬታ</option>
              <option>የአገልግሎት መዘግየት</option>
              <option>የባለሙያ ስነ-ምግባር</option>
              <option>ሌላ</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">ዝርዝር መግለጫ</label>
            <textarea 
              required 
              rows={6} 
              value={formData.message}
              onChange={e => setFormData({...formData, message: e.target.value})}
              className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-4 focus:ring-blue-500/20 dark:text-white font-medium resize-none" 
              placeholder="እባክዎን ቅሬታዎን በዝርዝር እዚህ ይግለጹ..."
            ></textarea>
          </div>

          <button disabled={isSubmitting} className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3 disabled:opacity-70">
            {isSubmitting ? <><Loader2 className="animate-spin" /> በማስገባት ላይ...</> : <><Send size={20} /> ቅሬታውን አቅርብ</>}
          </button>
        </form>
      </div>
    </div>
  );
};