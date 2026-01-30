import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Chatbot } from './components/Chatbot.tsx';
import { ScrollToTop } from './components/ScrollToTop.tsx';
import { AdminPanel } from './components/AdminPanel.tsx';
import LoginPage from './components/LoginPage.tsx';
import { GrievancePage } from './components/GrievancePage.tsx';
import { RegistrationPage } from './components/RegistrationPage.tsx';
import { CertificatePage } from './components/CertificatePage.tsx';
import { ComplaintForm } from './components/ComplaintForm.tsx';
import { BusinessRegistration } from './components/BusinessRegistration.tsx';
import { NewsGallery } from './components/NewsGallery.tsx';
import { AboutPage } from './components/AboutPage.tsx';
import { StatisticsPage } from './components/StatisticsPage.tsx';
import { ContactPage } from './components/ContactPage.tsx';
import { TaxGuidePage } from './components/TaxGuidePage.tsx';
import { Page } from './types.ts';
import { 
  ArrowRight, 
  Loader2, 
  MapPin, 
  Phone, 
  Clock, 
  Megaphone, 
  ChevronRight, 
  Lock 
} from 'lucide-react';
import { Logo } from './components/Logo.tsx';
import { getNews, getGalleryImages } from './services/dbService.ts';

interface NewsItem {
  id: number;
  title: string;
  date: string;
  category: string;
  image: string;
  excerpt: string;
  readTime: string;
}

interface GalleryItem {
  id?: number;
  url: string;
  title: string;
}

const DEFAULT_NEWS: NewsItem[] = [
  {
    id: 1,
    title: 'የ2016 በጀት ዓመት የገቢ አሰባሰብ ውጤት ይፋ ሆነ',
    date: 'የካቲት 15, 2016',
    category: 'ሪፖርት',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2011&auto=format&fit=crop',
    excerpt: 'የሰመራ-ሎግያ ከተማ አስተዳደር ገቢዎች ፅህፈት ቤት ባለፉት ስድስት ወራት ውስጥ ካቀደው በላይ መሰብሰብ መቻሉን ገለጸ።',
    readTime: '4 ደቂቃ'
  },
  {
    id: 2,
    title: 'ለታማኝ ግብር ከፋዮች የእውቅና ፕሮግራም ተካሄደ',
    date: 'ጥር 20, 2016',
    category: 'ክስተት',
    image: 'https://images.unsplash.com/photo-1531050171669-014493657d78?q=80&w=2070&auto=format&fit=crop',
    excerpt: 'በከተማ ደረጃ ከፍተኛ ግብር በመክፈል ለልማት አስተዋጽኦ ላበረከቱ ባለሀብቶች የእውቅና ሰርቲፊኬት ተሰጥቷል።',
    readTime: '6 ደቂቃ'
  }
];

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => localStorage.getItem('isStaff') === 'true');
  const [currentNews, setCurrentNews] = useState<NewsItem[]>(DEFAULT_NEWS);
  const [galleryImages, setGalleryImages] = useState<GalleryItem[]>([]);
  const [isDataLoading, setIsDataLoading] = useState<boolean>(true);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    window.scrollTo(0, 0);
  }, [isDarkMode, currentPage]);

  const fetchAppContent = useCallback(async () => {
    setIsDataLoading(true);
    try {
      const [dbNews, dbGallery] = await Promise.all([
        getNews(),
        getGalleryImages()
      ]);
      
      if (dbNews && dbNews.length > 0) {
        const mapped: NewsItem[] = dbNews.map((n: any) => ({
          id: n.id,
          title: n.title,
          category: n.category,
          image: n.image_url || n.imageUrl,
          excerpt: n.excerpt,
          date: new Date(n.created_at || n.id).toLocaleDateString(),
          readTime: '5 ደቂቃ'
        }));
        setCurrentNews([...mapped, ...DEFAULT_NEWS]);
      } else {
        setCurrentNews(DEFAULT_NEWS);
      }
      setGalleryImages(dbGallery || []);
    } catch (e) {
      console.error("Content Fetch Error:", e);
    } finally {
      setIsDataLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAppContent();
  }, [fetchAppContent]);

  const handleLogin = (success: boolean) => {
    if (success) {
      setIsAuthenticated(true);
      localStorage.setItem('isStaff', 'true');
      setCurrentPage(Page.ADMIN);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isStaff');
    setCurrentPage(Page.HOME);
  };

  const renderHomeContent = () => (
    <div className="animate-in fade-in duration-500">
      <div className="bg-red-600 text-white py-3 overflow-hidden relative border-b border-red-700">
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-4">
          <div className="flex items-center gap-2 font-black text-sm uppercase tracking-widest shrink-0 animate-pulse">
            <Megaphone size={18}/> ማሳሰቢያ፡
          </div>
          <div className="flex-1 whitespace-nowrap overflow-hidden text-sm">
            <div className="inline-block animate-[marquee_20s_linear_infinite] hover:pause font-bold">
              የደረጃ "ሐ" ግብር ከፋዮች እስከ መጋቢት 30 ቀን 2016 ዓ.ም ድረስ ግብራችሁን እንድታሳውቁ እናሳስባለን። • ማንኛውም የግብር ክፍያ በዲጂታል አማራጮች ብቻ የሚፈጸም መሆኑን እንገልጻለን:: • 
            </div>
          </div>
          <button onClick={() => setCurrentPage(Page.NEWS)} className="text-xs font-black underline shrink-0 hover:text-white/80 transition-colors">ዝርዝር እይ</button>
        </div>
      </div>

      <section className="relative h-[650px] flex items-center bg-slate-900 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1454165833767-027ffea9e78b?q=80&w=2070&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-30" alt="Hero" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-6 text-white w-full">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1 bg-blue-500/20 border border-blue-500/50 rounded-full text-blue-400 text-xs font-bold tracking-widest uppercase mb-6">
              Official Revenue Portal
            </span>
            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[1.1]">
              ለከተማችን <span className="text-blue-500 italic underline decoration-blue-500/30">ብልጽግና</span> በጋራ እንሰልፍ
            </h1>
            <p className="text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-medium">
              የሰመራ-ሎግያ ከተማ አስተዳደር ገቢዎች ፅህፈት ቤት ዘመናዊ፣ ፍትሃዊ እና ቀልጣፋ የገቢ አሰባሰብ ስርዓትን በመዘርጋት የከተማችንን እድገት ያፋጥናል።
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => setCurrentPage(Page.SERVICES)} className="bg-blue-600 px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-700 hover:scale-105 transition-all shadow-xl shadow-blue-500/20">
                አገልግሎቶችን ያግኙ <ArrowRight size={20}/>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-black dark:text-white mb-4">አዳዲስ መረጃዎች</h2>
              <p className="text-slate-500 dark:text-slate-400">ከፅህፈት ቤታችን የሚወጡ የቅርብ ጊዜ ዜናዎችና ማሳሰቢያዎች</p>
            </div>
            <button onClick={() => setCurrentPage(Page.NEWS)} className="flex items-center gap-2 text-blue-600 font-black hover:gap-4 transition-all">
              ሁሉንም እይ <ArrowRight size={20}/>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {currentNews.slice(0, 3).map((news) => (
              <div key={news.id} className="group bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] overflow-hidden border dark:border-slate-800 hover:shadow-xl transition-all duration-300">
                <div className="h-56 overflow-hidden relative">
                  <img src={news.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={news.title} />
                  <div className="absolute bottom-4 left-4 bg-white/20 backdrop-blur-md text-white text-[10px] px-3 py-1 rounded-full font-black uppercase">{news.category}</div>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-black dark:text-white mb-4 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">{news.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 line-clamp-2">{news.excerpt}</p>
                  <button onClick={() => setCurrentPage(Page.NEWS)} className="text-blue-600 font-bold text-sm flex items-center gap-2">አንብብ <ChevronRight size={16}/></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  const renderActivePage = () => {
    switch (currentPage) {
      case Page.ABOUT: return <AboutPage />;
      case Page.STATISTICS: return <StatisticsPage />;
      case Page.CONTACT: return <ContactPage />;
      case Page.TAX_GUIDE: return <TaxGuidePage />;
      case Page.NEWS: 
        return isDataLoading ? (
          <div className="py-40 flex justify-center"><Loader2 className="animate-spin text-blue-600" size={48} /></div>
        ) : (
          <NewsGallery news={currentNews} gallery={galleryImages} />
        );
      case Page.ADMIN:
        return isAuthenticated ? (
          <AdminPanel onLogout={handleLogout} />
        ) : (
          <LoginPage onLogin={handleLogin} onBack={() => setCurrentPage(Page.HOME)} />
        );
      case Page.GRIEVANCE: return <GrievancePage onBack={() => setCurrentPage(Page.SERVICES)} />;
      case Page.REGISTRATION: return <RegistrationPage onBack={() => setCurrentPage(Page.SERVICES)} />;
      case Page.CERTIFICATE: return <CertificatePage onBack={() => setCurrentPage(Page.SERVICES)} />;
      case Page.COMPLAINT_FORM: return <ComplaintForm onBack={() => setCurrentPage(Page.SERVICES)} />;
      case Page.BUSINESS_REGISTRATION: return <BusinessRegistration onBack={() => setCurrentPage(Page.SERVICES)} />;
      case Page.HOME:
      case Page.SERVICES:
      default:
        return renderHomeContent();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 flex flex-col font-sans">
      <Navbar 
        currentPage={currentPage} 
        onPageChange={setCurrentPage} 
        onSearchOpen={() => {}} 
        isDarkMode={isDarkMode} 
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)} 
      />
      
      <main className="flex-grow">
        {renderActivePage()}
      </main>

      <Chatbot />
      <ScrollToTop />
      
      <footer className="bg-white dark:bg-slate-900 border-t dark:border-slate-800 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 lg:col-span-1">
              <div className="flex items-center gap-4 mb-6 cursor-pointer" onClick={() => setCurrentPage(Page.HOME)}>
                <Logo size={40} />
                <div>
                  <h3 className="text-xl font-black dark:text-white leading-tight">የሰመራ-ሎግያ ገቢዎች</h3>
                  <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Revenues Office</p>
                </div>
              </div>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm mb-6">ዘመናዊ የገቢ አሰባሰብ ስርዓትን በመዘርጋት ለከተማችን ልማትና እድገት የላቀ አስተዋጽኦ እናበረክታለን።</p>
            </div>

            <div>
              <h4 className="font-black mb-6 dark:text-white flex items-center gap-2"><MapPin size={18} className="text-blue-600" /> አድራሻ</h4>
              <ul className="space-y-4 text-slate-500 dark:text-slate-400 text-sm font-bold">
                <li>ሰመራ-ሎግያ፣ አፋር ክልል</li>
                <li>የከተማ አስተዳደር ህንፃ</li>
              </ul>
            </div>

            <div>
              <h4 className="font-black mb-6 dark:text-white flex items-center gap-2"><Phone size={18} className="text-blue-600" /> ግንኙነት</h4>
              <ul className="space-y-4 text-slate-500 dark:text-slate-400 text-sm font-bold">
                <li>+251 33 666 0101</li>
                <li>info@slcrevenues.gov.et</li>
              </ul>
            </div>

            <div>
              <h4 className="font-black mb-6 dark:text-white flex items-center gap-2"><Lock size={18} className="text-blue-600" /> ለሰራተኞች</h4>
              <button 
                onClick={() => setCurrentPage(Page.ADMIN)}
                className="px-6 py-3 bg-slate-100 dark:bg-slate-800 rounded-xl font-bold text-slate-600 dark:text-slate-300 hover:bg-blue-600 hover:text-white transition-all flex items-center gap-2"
              >
                <Lock size={16}/> ሰራተኛ መግቢያ
              </button>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t dark:border-slate-800">
            <p className="text-slate-500 text-xs font-medium">&copy; {new Date().getFullYear()} የሰመራ-ሎግያ ከተማ አስተዳደር ገቢዎች ፅህፈት ቤት።</p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .pause:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default App;
