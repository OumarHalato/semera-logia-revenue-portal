import React, { useState } from 'react';
import { ShieldCheck, Lock, User, Loader2, ArrowLeft } from 'lucide-react';
import { Logo } from './Logo.tsx';

interface LoginPageProps {
  onLogin: (success: boolean) => void;
  onBack: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onBack }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Secure credentials as requested
    const VALID_USERNAME = 'semera_revenue_admin';
    const VALID_PASSWORD = 'Logya$City$Portal!1';

    setTimeout(() => {
      if (username === VALID_USERNAME && password === VALID_PASSWORD) {
        onLogin(true);
      } else {
        setError('የተሳሳተ ተጠቃሚ ስም ወይም የይለፍ ቃል ያስገቡ (Incorrect username or password)');
        setIsLoading(false);
      }
    }, 1200);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-20 animate-in fade-in duration-700">
      <div className="max-w-md w-full">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold mb-10 transition-colors">
          <ArrowLeft size={20} /> ተመለስ
        </button>

        <div className="bg-white dark:bg-slate-900 rounded-[3rem] border dark:border-slate-800 shadow-2xl p-10">
          <div className="text-center mb-10">
            <div className="bg-blue-600/10 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Logo size={64} />
            </div>
            <h2 className="text-3xl font-black dark:text-white mb-2">የአስተዳዳሪ መግቢያ</h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium italic text-sm">የሰመራ-ሎግያ ከተማ አስተዳደር ገቢዎች ፅህፈት ቤት</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <User size={14} className="text-blue-600" /> ተጠቃሚ ስም (Username)
              </label>
              <input 
                required 
                type="text" 
                autoComplete="username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-4 focus:ring-blue-500/20 dark:text-white font-bold transition-all" 
                placeholder="semera_..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Lock size={14} className="text-blue-600" /> የይለፍ ቃል (Password)
              </label>
              <input 
                required 
                type="password" 
                autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-4 focus:ring-blue-500/20 dark:text-white font-bold transition-all" 
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/50 rounded-2xl text-red-500 text-sm font-bold animate-in shake duration-300">
                {error}
              </div>
            )}

            <button 
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3 disabled:opacity-70 group"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  <ShieldCheck size={20} className="group-hover:scale-110 transition-transform" /> 
                  ግባ (Secure Login)
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;