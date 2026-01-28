import React from 'react';
import { MapPin, Phone, Mail, Clock, Send, Facebook, Twitter, Linkedin, Loader2, Globe } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('መልዕክትዎ በተሳካ ሁኔታ ተልኳል! እናመሰግናለን::');
    }, 1500);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-5 duration-700">
      <section className="bg-blue-600 py-20 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-black mb-6">ያግኙን (Contact Us)</h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto font-medium">
            ማንኛውም ጥያቄ፣ አስተያየት ወይም ቅሬታ ካለዎት ከታች ባሉ የአድራሻ አማራጮች ሊያገኙን ይችላሉ።
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Contact Info */}
        <div className="space-y-8">
          <ContactInfoCard 
            icon={MapPin} 
            title="አድራሻ (Location)" 
            desc="ሰመራ-ሎግያ፣ አፋር ክልል፣ የከተማ አስተዳደር ህንፃ 2ኛ ፎቅ" 
          />
          <ContactInfoCard 
            icon={Phone} 
            title="ስልክ (Phone)" 
            desc="+251 33 666 0101 / +251 33 666 0102" 
          />
          <ContactInfoCard 
            icon={Mail} 
            title="ኢሜል (Email)" 
            desc="info@slcrevenues.gov.et" 
          />
          <ContactInfoCard 
            icon={Clock} 
            title="የስራ ሰዓት (Office Hours)" 
            desc="ሰኞ - አርብ (2:30 - 11:30)" 
          />

          <div className="p-10 bg-slate-900 rounded-[3rem] text-white">
            <h4 className="text-xl font-black mb-8 flex items-center gap-3">
              <Globe className="text-blue-500" /> ማህበራዊ ሚዲያ
            </h4>
            <div className="flex gap-4">
              <SocialBtn icon={Facebook} />
              <SocialBtn icon={Twitter} />
              <SocialBtn icon={Linkedin} />
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-slate-900 p-12 rounded-[3.5rem] border dark:border-slate-800 shadow-2xl">
            <h3 className="text-3xl font-black dark:text-white mb-10">መልዕክት ይላኩልን</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputGroup label="ሙሉ ስም" placeholder="ስምዎን ያስገቡ" />
                <InputGroup label="ስልክ ቁጥር" placeholder="09..." />
              </div>
              <InputGroup label="ርዕስ" placeholder="ለምሳሌ፡ ስለ ግብር አከፋፈል" />
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-4">መልዕክት</label>
                <textarea 
                  required
                  rows={6}
                  className="w-full px-8 py-5 bg-slate-50 dark:bg-slate-800 rounded-3xl border-none focus:ring-4 focus:ring-blue-500/20 dark:text-white font-medium resize-none"
                  placeholder="መልዕክትዎን እዚህ ይጻፉ..."
                ></textarea>
              </div>
              <button 
                disabled={loading}
                className="w-full bg-blue-600 text-white py-6 rounded-3xl font-black text-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-500/20"
              >
                {loading ? <Loader2 className="animate-spin" /> : <><Send size={20} /> መልዕክቱን ላክ</>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactInfoCard = ({ icon: Icon, title, desc }: any) => (
  <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border dark:border-slate-800 flex items-start gap-6 shadow-sm">
    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-2xl shrink-0">
      <Icon size={24} />
    </div>
    <div>
      <h4 className="font-black dark:text-white mb-1">{title}</h4>
      <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{desc}</p>
    </div>
  </div>
);

const InputGroup = ({ label, placeholder }: any) => (
  <div className="space-y-2">
    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-4">{label}</label>
    <input 
      required
      className="w-full px-8 py-5 bg-slate-50 dark:bg-slate-800 rounded-3xl border-none focus:ring-4 focus:ring-blue-500/20 dark:text-white font-bold"
      placeholder={placeholder}
    />
  </div>
);

const SocialBtn = ({ icon: Icon }: any) => (
  <button className="p-4 bg-slate-800 hover:bg-blue-600 rounded-2xl text-slate-400 hover:text-white transition-all transform hover:scale-110">
    <Icon size={20} />
  </button>
);
