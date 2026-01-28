import React, { useState } from 'react';
import { Briefcase, Building2, Send, Loader2, ArrowLeft, User, MapPin, ClipboardList, ShieldCheck, Mail, FileText } from 'lucide-react';
import { saveRegistration } from '../services/dbService.ts';

export const RegistrationPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    ownerName: '',
    phone: '',
    email: '',
    tin: '',
    businessName: '',
    sector: 'ንግድ',
    capital: '',
    location: ''
  });
  const [emailError, setEmailError] = useState('');

  const validateEmail = (val: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (val && !regex.test(val)) {
      setEmailError('ትክክለኛ የኢሜል አድራሻ ያስገቡ');
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
      await saveRegistration({
        ownerName: formData.ownerName,
        phone: formData.phone,
        email: formData.email,
        tin: formData.tin,
        businessName: formData.businessName,
        sector: formData.sector,
        capital: parseFloat(formData.capital) || 0,
        location: formData.location
      });
      setIsSubmitting(false);
      setSubmitted(true);
    } catch (error) {
      setIsSubmitting(false);
      alert('ምዝገባውን ለማስኬድ ስህተት ተፈጥሯል። እባክዎን እንደገና ይሞክሩ።');
    }
  };

  if (submitted) {
    return (
      <div className="py-24 max-w-3xl mx-auto px-6 text-center animate-in zoom-in-95">
        <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-8">
          <ShieldCheck size={48} />
        </div>
        <h2 className="text-4xl font-black dark:text-white mb-4">የምዝገባ ጥያቄዎ ተቀባይነት አግኝቷል!</h2>
        <p className="text-slate-500 dark:text-slate-400 text-lg mb-10">መረጃዎ በዳታቤዛችን ውስጥ ተቀምጧል። የምዝገባ ሂደቱን ለመጨረስ በ 48 ሰዓታት ውስጥ አስፈላጊ የሆኑ ኦሪጅናል ሰነዶችን በመያዝ ቢሮ ድረስ እንዲመጡ እናሳስባለን። ዝርዝር መረጃ ወደ <span className="text-blue-600 font-bold">{formData.email}</span> ልከናል::</p>
        <button onClick={onBack} className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black hover:bg-blue-700 transition-all">ወደ አገልግሎቶች ተመለስ</button>
      </div>
    );
  }

  return (
    <div className="py-12 max-w-5xl mx-auto px-6 animate-in slide-in-from-bottom-10">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold mb-10 transition-colors">
        <ArrowLeft size={20} /> ወደ አገልግሎቶች ተመለስ
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-slate-900 rounded-[3rem] border dark:border-slate-800 shadow-xl overflow-hidden">
            <div className="bg-emerald-600 p-10 text-white">
              <h2 className="text-3xl font-black mb-4 flex items-center gap-4"><Building2 size={36} /> አዲስ የንግድ ምዝገባ</h2>
              <p className="text-emerald-100 opacity-90">አዲስ የንግድ ስራ ለመጀመር የሚረዱ ቅድመ-ሁኔታዎችን እዚህ ያጠናቅቁ። ሁሉም መረጃ በ PostgreSQL ዳታቤዝ ውስጥ ይቀመጣል።</p>
            </div>

            <form onSubmit={handleSubmit} className="p-10 space-y-8">
              <div className="space-y-6">
                <h4 className="text-xl font-black dark:text-white flex items-center gap-2 border-b dark:border-slate-800 pb-2">
                  <User size={20} className="text-emerald-600" /> የግል መረጃ
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input 
                    required 
                    placeholder="የንግድ ባለቤቱ ሙሉ ስም" 
                    value={formData.ownerName}
                    onChange={e => setFormData({...formData, ownerName: e.target.value})}
                    className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-4 focus:ring-emerald-500/20 dark:text-white font-bold" 
                  />
                  <input 
                    required 
                    type="tel" 
                    placeholder="ስልክ ቁጥር" 
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-4 focus:ring-emerald-500/20 dark:text-white font-bold" 
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input 
                    required 
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({...formData, email: e.target.value});
                      validateEmail(e.target.value);
                    }}
                    placeholder="ኢሜል አድራሻ" 
                    className={`w-full pl-14 pr-6 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-2 transition-all focus:ring-4 focus:ring-emerald-500/20 dark:text-white font-bold ${emailError ? 'border-red-500' : 'border-transparent'}`} 
                  />
                  {emailError && <p className="text-red-500 text-xs font-bold mt-1 ml-2">{emailError}</p>}
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-xl font-black dark:text-white flex items-center gap-2 border-b dark:border-slate-800 pb-2">
                  <Briefcase size={20} className="text-emerald-600" /> የንግድ ድርጅት መረጃ
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input 
                    required 
                    placeholder="የድርጅቱ ስም" 
                    value={formData.businessName}
                    onChange={e => setFormData({...formData, businessName: e.target.value})}
                    className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-4 focus:ring-emerald-500/20 dark:text-white font-bold" 
                  />
                  <div className="relative">
                    <FileText className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input 
                      required 
                      placeholder="የግብር ከፋይ መለያ ቁጥር (TIN)" 
                      value={formData.tin}
                      onChange={e => setFormData({...formData, tin: e.target.value})}
                      className="w-full pl-14 pr-6 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-4 focus:ring-emerald-500/20 dark:text-white font-bold" 
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <select 
                    value={formData.sector}
                    onChange={e => setFormData({...formData, sector: e.target.value})}
                    className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-4 focus:ring-emerald-500/20 dark:text-white font-bold"
                  >
                    <option value="ንግድ">ንግድ</option>
                    <option value="አገልግሎት">አገልግሎት</option>
                    <option value="ኢንዱስትሪ">ኢንዱስትሪ</option>
                    <option value="ኮንስትራክሽን">ኮንስትራክሽን</option>
                  </select>
                  <input 
                    required 
                    type="number" 
                    placeholder="የመጀመሪያ መነሻ ካፒታል (ETB)" 
                    value={formData.capital}
                    onChange={e => setFormData({...formData, capital: e.target.value})}
                    className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-4 focus:ring-emerald-500/20 dark:text-white font-bold" 
                  />
                </div>
                <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700">
                  <MapPin size={24} className="text-slate-400" />
                  <input 
                    required 
                    placeholder="የንግድ ስራው የሚገኝበት ቀበሌ/ቦታ" 
                    value={formData.location}
                    onChange={e => setFormData({...formData, location: e.target.value})}
                    className="flex-1 bg-transparent border-none focus:ring-0 dark:text-white font-bold" 
                  />
                </div>
              </div>

              <button disabled={isSubmitting} className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-3">
                {isSubmitting ? <><Loader2 className="animate-spin" /> በማስኬድ ላይ...</> : 'የምዝገባ ጥያቄውን ላክ'}
              </button>
            </form>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border dark:border-slate-800 shadow-sm">
            <h3 className="text-xl font-black mb-6 flex items-center gap-2 dark:text-white">
              <ClipboardList className="text-emerald-600" /> የሚያስፈልጉ ሰነዶች
            </h3>
            <ul className="space-y-4 text-sm font-bold text-slate-500 dark:text-slate-400">
              <li className="flex items-center gap-3"><div className="w-2 h-2 bg-emerald-500 rounded-full"></div> የታደሰ የቀበሌ መታወቂያ</li>
              <li className="flex items-center gap-3"><div className="w-2 h-2 bg-emerald-500 rounded-full"></div> የቤት ኪራይ ውል ወይም የባለቤትነት ማረጋገጫ</li>
              <li className="flex items-center gap-3"><div className="w-2 h-2 bg-emerald-500 rounded-full"></div> 2 የቅርብ ጊዜ ጉርድ ፎቶግራፎች</li>
              <li className="flex items-center gap-3"><div className="w-2 h-2 bg-emerald-500 rounded-full"></div> የሙያ ብቃት ማረጋገጫ (እንደ አስፈላጊነቱ)</li>
            </ul>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-[2.5rem] border border-blue-100 dark:border-blue-800">
            <h4 className="font-black text-blue-700 dark:text-blue-400 mb-2">ጠቃሚ መረጃ</h4>
            <p className="text-xs text-blue-600 dark:text-blue-500 leading-relaxed">በ PostgreSQL ዳታቤዛችን አማካኝነት የምዝገባ ሂደቱን በዲጂታል መንገድ መጀመር ሂደቱን ያፋጥንልዎታል።</p>
          </div>
        </div>
      </div>
    </div>
  );
};