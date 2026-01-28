import React, { useState } from 'react';
import { 
  Camera, Calendar, Clock, 
  ArrowRight, Maximize2, X, Share2, Search,
  AlertCircle
} from 'lucide-react';

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

interface NewsGalleryProps {
  news: NewsItem[];
  gallery: GalleryItem[];
}

export const NewsGallery: React.FC<NewsGalleryProps> = ({ news, gallery }) => {
  const [filter, setFilter] = useState('ሁሉም');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const categories = ['ሁሉም', 'ሪፖርት', 'ክስተት', 'ስልጠና', 'ማሳሰቢያ'];
  
  const filteredNews = news.filter(n => {
    const matchesFilter = filter === 'ሁሉም' || n.category === filter;
    const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          n.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Spotlight */}
      <section className="relative h-[500px] overflow-hidden">
        <img 
          src={news[0]?.image} 
          className="w-full h-full object-cover scale-105" 
          alt="Featured" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
          <div className="max-w-7xl mx-auto">
            <span className="inline-block px-4 py-1 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full mb-6">
              ተለይቶ የቀረበ ዜና
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 max-w-4xl leading-tight">
              {news[0]?.title}
            </h2>
            <div className="flex items-center gap-6 text-slate-300 font-bold text-sm">
              <span className="flex items-center gap-2"><Calendar size={16}/> {news[0]?.date}</span>
              <span className="flex items-center gap-2"><Clock size={16}/> {news[0]?.readTime || '5 ደቂቃ'} ንባብ</span>
            </div>
          </div>
        </div>
      </section>

      {/* Prominent News Grid with Prominent Filtering */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-5xl font-black dark:text-white mb-4">ዜና እና መረጃዎች</h3>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium">ከፅህፈት ቤታችን የሚወጡ ትኩስ መረጃዎችን፣ ሪፖርቶችን እና ስልጠናዎችን እዚህ ያገኛሉ::</p>
          </div>

          {/* Filter Bar */}
          <div className="sticky top-24 z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800 p-6 rounded-[2.5rem] mb-16 shadow-xl shadow-slate-200/50 dark:shadow-none flex flex-col lg:flex-row justify-between items-center gap-8">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest mr-2 hidden sm:inline">ምድቦች:</span>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-8 py-3 rounded-2xl text-xs font-black transition-all duration-300 ${
                    filter === cat 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full lg:w-96 group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ዜና ፈልግ..."
                className="w-full pl-16 pr-8 py-4 bg-slate-100 dark:bg-slate-900 rounded-[1.5rem] border-none focus:ring-4 focus:ring-blue-500/20 dark:text-white font-bold transition-all"
              />
            </div>
          </div>

          {filteredNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredNews.map((item) => (
                <article key={item.id} className="group flex flex-col h-full bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] border dark:border-slate-800 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={item.image} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      alt={item.title} 
                    />
                    <div className="absolute top-6 left-6 px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-white text-[10px] font-black uppercase">
                      {item.category}
                    </div>
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="flex items-center gap-4 text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-4">
                      <span className="flex items-center gap-1"><Calendar size={12}/> {item.date}</span>
                    </div>
                    <h4 className="text-xl font-black dark:text-white mb-4 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 line-clamp-3 leading-relaxed">
                      {item.excerpt}
                    </p>
                    <div className="mt-auto pt-6 border-t dark:border-slate-800 flex justify-between items-center">
                      <button className="flex items-center gap-2 text-blue-600 font-black text-sm hover:gap-4 transition-all group/btn">
                        አንብብ <ArrowRight size={16}/>
                      </button>
                      <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors"><Share2 size={18}/></button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="py-32 text-center bg-slate-50 dark:bg-slate-900 rounded-[3rem] border-2 border-dashed dark:border-slate-800 animate-in zoom-in-95">
              <AlertCircle size={64} className="text-slate-300 mx-auto mb-6" />
              <h4 className="text-2xl font-black dark:text-white mb-2">ምንም ዜና አልተገኘም</h4>
              <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">ያስገቡት ቃል ወይም የመረጡት ምድብ ውጤት አላመጣም።</p>
              <button 
                onClick={() => {setFilter('ሁሉም'); setSearchQuery('');}}
                className="mt-8 px-10 py-4 bg-blue-600 text-white rounded-2xl font-black hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
              >
                ሁሉንም አሳይ
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Dynamic Gallery Section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-black dark:text-white mb-4 flex items-center justify-center gap-4">
              <Camera className="text-blue-600" /> ምስላዊ መረጃዎች (Gallery)
            </h3>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">በከተማችን እና በፅህፈት ቤታችን የሚከናወኑ ተግባራትን በምስል ይመልከቱ::</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {gallery.map((img, i) => (
              <div 
                key={i} 
                onClick={() => setSelectedImg(img.url)}
                className={`relative group cursor-pointer overflow-hidden rounded-3xl h-64 ${
                  i % 5 === 0 ? 'md:col-span-2' : ''
                }`}
              >
                <img 
                  src={img.url} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  alt={img.title} 
                />
                <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/40 transition-colors duration-500 flex items-center justify-center">
                  <Maximize2 className="text-white opacity-0 group-hover:opacity-100 transition-opacity transform scale-50 group-hover:scale-100 duration-500" size={32} />
                </div>
                <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/60 to-transparent">
                  <p className="text-white text-xs font-black truncate">{img.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImg && (
        <div 
          className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-6 animate-in fade-in duration-300"
          onClick={() => setSelectedImg(null)}
        >
          <button className="absolute top-10 right-10 text-white/50 hover:text-white transition-colors">
            <X size={40} />
          </button>
          <img 
            src={selectedImg} 
            className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl animate-in zoom-in-95 duration-500" 
            alt="Expanded" 
          />
        </div>
      )}
    </div>
  );
};