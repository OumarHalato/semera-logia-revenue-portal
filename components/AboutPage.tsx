import React from 'react';
import { Target, Eye, Users, Award, ShieldCheck, History } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-5 duration-700">
      {/* Hero Section */}
      <section className="bg-blue-600 py-20 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-black mb-6">ስለ እኛ (About Us)</h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            የሰመራ-ሎግያ ከተማ አስተዳደር ገቢዎች ፅህፈት ቤት የከተማዋን የልማት ስራዎች ለማፋጠን የሚያስችል የገቢ አሰባሰብ ስርዓትን የሚመራ የመንግስት ተቋም ነው።
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-white dark:bg-slate-900 p-12 rounded-[3rem] border dark:border-slate-800 shadow-xl">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-2xl flex items-center justify-center mb-8">
            <Target size={32} />
          </div>
          <h3 className="text-3xl font-black dark:text-white mb-6">ተልዕኮ (Mission)</h3>
          <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
            ዘመናዊ፣ ፍትሃዊ እና ቀልጣፋ የገቢ አሰባሰብ ስርዓትን በመዘርጋት፣ የግብር ከፋዩን ግንዛቤ በማሳደግ እና ህጋዊነትን በማረጋገጥ ለከተማዋ እድገት የሚውል ገቢ በወቅቱ መሰብሰብ።
          </p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-12 rounded-[3rem] border dark:border-slate-800 shadow-xl">
          <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 text-amber-600 rounded-2xl flex items-center justify-center mb-8">
            <Eye size={32} />
          </div>
          <h3 className="text-3xl font-black dark:text-white mb-6">ራዕይ (Vision)</h3>
          <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
            በ2022 ዓ.ም በከተማ አስተዳደራችን ደረጃ የተሟላ ዲጂታል አገልግሎት የሚሰጥ እና በገቢ አሰባሰብ ውጤታማ የሆነ ተቋም ሆኖ መገኘት።
          </p>
        </div>
      </section>

      {/* History */}
      <section className="py-24 bg-slate-50 dark:bg-slate-950/50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="flex-1">
              <h3 className="text-4xl font-black dark:text-white mb-8 flex items-center gap-4">
                <History className="text-blue-600" /> የተቋሙ ታሪክ
              </h3>
              <div className="space-y-6 text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                <p>
                  የሰመራ-ሎግያ ከተማ አስተዳደር ገቢዎች ፅህፈት ቤት የተመሰረተው የሰመራ ከተማ ምስረታን ተከትሎ ሲሆን፣ ባለፉት አመታት የከተማዋን ፈጣን እድገት ታሳቢ ያደረጉ መዋቅራዊ ለውጦችን ሲያደርግ ቆይቷል።
                </p>
                <p>
                  በአሁኑ ሰዓት ከ3,000 በላይ ግብር ከፋዮችን በዲጂታል መንገድ እያስተናገደ የሚገኝ ሲሆን፣ የገቢ አሰባሰብ አቅሙንም በየአመቱ እያሳደገ ይገኛል።
                </p>
              </div>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4">
              <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border dark:border-slate-800 text-center">
                <p className="text-4xl font-black text-blue-600 mb-2">15+</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">አመታት አገልግሎት</p>
              </div>
              <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border dark:border-slate-800 text-center">
                <p className="text-4xl font-black text-emerald-500 mb-2">3K+</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">ግብር ከፋዮች</p>
              </div>
              <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border dark:border-slate-800 text-center col-span-2">
                <p className="text-4xl font-black text-purple-600 mb-2">100%</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">ታማኝነት</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 max-w-7xl mx-auto px-6 text-center">
        <h3 className="text-4xl font-black dark:text-white mb-16">የተቋሙ እሴቶች (Values)</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: ShieldCheck, title: "ታማኝነት", desc: "ለህዝብ እና ለመንግስት በታማኝነት ማገልገል።" },
            { icon: Award, title: "ፍትሃዊነት", desc: "ማንኛውም ግብር ከፋይ በእኩልነት እንዲስተናገድ ማድረግ።" },
            { icon: Users, title: "ግልፅነት", desc: "የገቢ አሰባሰብ ሂደቱን ለህዝብ ግልፅ ማድረግ።" },
            { icon: Target, title: "ውጤታማነት", desc: "አነስተኛ ወጪ በማውጣት ከፍተኛ ገቢ መሰብሰብ።" }
          ].map((v, i) => (
            <div key={i} className="group p-10 bg-white dark:bg-slate-900 rounded-[2.5rem] border dark:border-slate-800 hover:shadow-2xl transition-all">
              <div className="w-14 h-14 bg-slate-50 dark:bg-slate-800 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <v.icon size={28} />
              </div>
              <h4 className="text-xl font-black dark:text-white mb-4">{v.title}</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
