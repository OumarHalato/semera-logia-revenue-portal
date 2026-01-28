import React, { useState } from 'react';
import { ShieldCheck, FileText, Send, Loader2, ArrowLeft, Search, Calendar, Download, CheckCircle2, Mail, RefreshCw as RefreshIcon } from 'lucide-react';

export const CertificatePage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [isSearching, setIsSearching] = useState(false);
  const [tin, setTin] = useState('');
  const [taxPayerData, setTaxPayerData] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isEmailing, setIsEmailing] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isRenewing, setIsRenewing] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const validateEmail = (val: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (val && !regex.test(val)) {
      setEmailError('ትክክለኛ የኢሜል አድራሻ ያስገቡ');
      return false;
    }
    setEmailError('');
    return true;
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tin) return;
    setIsSearching(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSearching(false);
    // Mock found data
    setTaxPayerData({
      name: "አቶ ካሳሁን በቀለ",
      tin: tin,
      type: "ደረጃ 'ለ'",
      lastPaid: "2015-12-30",
      status: "Active"
    });
  };

  const handleEmailCertificate = async () => {
    if (!validateEmail(email)) return;
    setIsEmailing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsEmailing(false);
    setEmailSent(true);
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsDownloading(false);
    alert('ሰርቲፊኬቱ በመውረድ ላይ ነው... (Certificate download started)');
  };

  const handleRenew = async () => {
    setIsRenewing(true);
    await new Promise(resolve => setTimeout(resolve, 2500));
    setIsRenewing(false);
    alert('የእድሳት ጥያቄዎ በተሳካ ሁኔታ ቀርቧል። (Renewal request submitted)');
  };

  return (
    <div className="py-12 max-w-4xl mx-auto px-6 animate-in slide-in-from-bottom-10">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold mb-10 transition-colors">
        <ArrowLeft size={20} /> ወደ አገልግሎቶች ተመለስ
      </button>

      <div className="bg-white dark:bg-slate-900 rounded-[3rem] border dark:border-slate-800 shadow-xl overflow-hidden">
        <div className="bg-purple-600 p-10 text-white text-center">
          <h2 className="text-3xl font-black mb-4 flex items-center justify-center gap-4"><ShieldCheck size={36} /> የግብር ሰርቲፊኬት አገልግሎት</h2>
          <p className="text-purple-100 opacity-90 max-w-xl mx-auto">የግብር ከፋይነት መታወቂያዎን ለማደስ ወይም ሰርቲፊኬት ለማውጣት መለያ ቁጥርዎን ያስገቡ።</p>
        </div>

        <div className="p-10">
          {!taxPayerData ? (
            <form onSubmit={handleSearch} className="flex gap-4 mb-12">
              <div className="flex-1 relative">
                <FileText className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  required 
                  value={tin}
                  onChange={e => setTin(e.target.value)}
                  placeholder="የግብር ከፋይ መለያ ቁጥር (TIN) ያስገቡ" 
                  className="w-full pl-14 pr-6 py-5 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-4 focus:ring-purple-500/20 dark:text-white font-black text-lg" 
                />
              </div>
              <button disabled={isSearching} className="px-10 bg-purple-600 text-white rounded-2xl font-black hover:bg-purple-700 transition-all flex items-center gap-2 disabled:opacity-70 min-w-[140px] justify-center">
                {isSearching ? <Loader2 className="animate-spin" /> : <><Search size={20} /> ፈልግ</>}
              </button>
            </form>
          ) : (
            <div className="animate-in fade-in zoom-in-95 space-y-10">
              <div className="flex justify-between items-center border-b dark:border-slate-800 pb-6">
                <h3 className="text-2xl font-black dark:text-white">የተገኘ መረጃ</h3>
                <button onClick={() => {setTaxPayerData(null); setEmailSent(false);}} className="text-slate-400 font-bold hover:text-purple-600">እንደገና ፈልግ</button>
              </div>

              <div className="p-8 bg-slate-50 dark:bg-slate-800 rounded-3xl border dark:border-slate-700 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-1">ግብር ከፋይ ስም</label>
                  <p className="text-xl font-black dark:text-white">{taxPayerData.name}</p>
                </div>
                <div>
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-1">የግብር ደረጃ</label>
                  <p className="text-xl font-black text-purple-600">{taxPayerData.type}</p>
                </div>
                <div>
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-1">ለመጨረሻ ጊዜ የተከፈለበት ቀን</label>
                  <p className="text-xl font-black dark:text-white flex items-center gap-2"><Calendar size={18} className="text-slate-400"/> {taxPayerData.lastPaid}</p>
                </div>
                <div>
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-1">ሁኔታ (Status)</label>
                  <p className="text-xl font-black text-emerald-500 flex items-center gap-2"><CheckCircle2 size={18}/> {taxPayerData.status}</p>
                </div>
              </div>

              <div className="space-y-6 bg-slate-50 dark:bg-slate-800/50 p-8 rounded-3xl border-2 border-dashed dark:border-slate-700">
                <h4 className="font-black dark:text-white flex items-center gap-2">
                  <Mail size={18} className="text-purple-600"/> ሰርቲፊኬቱን በኢሜል ይላኩ
                </h4>
                <div className="flex gap-4">
                  <div className="flex-1 relative">
                    <input 
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onBlur={(e) => validateEmail(e.target.value)}
                      placeholder="ኢሜልዎን እዚህ ያስገቡ"
                      className={`w-full px-6 py-4 bg-white dark:bg-slate-900 rounded-2xl border-2 focus:ring-4 focus:ring-purple-500/20 dark:text-white font-bold transition-all ${emailError ? 'border-red-500' : 'border-transparent'}`}
                    />
                    {emailError && <p className="text-red-500 text-xs font-bold mt-1 ml-2">{emailError}</p>}
                  </div>
                  <button 
                    onClick={handleEmailCertificate}
                    disabled={isEmailing || emailSent}
                    className={`px-8 rounded-2xl font-black text-white transition-all flex items-center gap-2 shadow-lg min-w-[120px] justify-center ${emailSent ? 'bg-emerald-500' : 'bg-purple-600 hover:bg-purple-700 shadow-purple-500/20'}`}
                  >
                    {isEmailing ? <Loader2 className="animate-spin" /> : emailSent ? <><CheckCircle2 size={18}/> ተልኳል</> : 'ላክ'}
                  </button>
                </div>
                {emailSent && <p className="text-emerald-500 text-sm font-bold">ሰርቲፊኬቱ በተሳካ ሁኔታ ወደ {email} ተልኳል!</p>}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button 
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="flex-1 bg-emerald-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-3 disabled:opacity-70"
                >
                  {isDownloading ? <Loader2 className="animate-spin" /> : <><Download size={20} /> ሰርቲፊኬት አውርድ</>}
                </button>
                <button 
                  onClick={handleRenew}
                  disabled={isRenewing}
                  className="flex-1 bg-blue-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-3 disabled:opacity-70"
                >
                  {isRenewing ? <Loader2 className="animate-spin" /> : <><RefreshIcon size={20} /> መታወቂያ አድስ</>}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};