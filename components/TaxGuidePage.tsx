import React from 'react';
import { BookOpen, CheckCircle2, FileText, Info, HelpCircle, ChevronDown } from 'lucide-react';

export const TaxGuidePage: React.FC = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-5 duration-700">
      <section className="bg-emerald-600 py-20 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-black mb-6">የግብር መመሪያ (Tax Guide)</h2>
          <p className="text-xl text-emerald-100 max-w-3xl mx-auto font-medium">
            ማንኛውም ግብር ከፋይ ሊያውቃቸው የሚገቡ የግብር አይነቶች፣ የክፍያ ጊዜያት እና ቅድመ-ሁኔታዎች::
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          <GuideSection 
            title="የደረጃ 'ሀ' ግብር ከፋዮች" 
            desc="አመታዊ ጠቅላላ ገቢያቸው 1,000,000 (አንድ ሚሊዮን) ብር እና ከዚያ በላይ የሆኑ ግብር ከፋዮች ናቸው።"
            points={[
              "የሂሳብ መዝገብ የመያዝ ግዴታ አለባቸው",
              "በየአመቱ ከሐምሌ 1 - ነሐሴ 30 ባለው ጊዜ ማሳወቅ አለባቸው",
              "ተጨማሪ እሴት ታክስ (VAT) የመሰብሰብ ግዴታ አለባቸው"
            ]}
          />
          <GuideSection 
            title="የደረጃ 'ለ' ግብር ከፋዮች" 
            desc="አመታዊ ጠቅላላ ገቢያቸው ከ500,000 ብር እስከ 1,000,000 ብር የሆኑ ግብር ከፋዮች ናቸው።"
            points={[
              "የሂሳብ መዝገብ የመያዝ ግዴታ አለባቸው",
              "በየአመቱ ከሐምሌ 1 - መስከረም 30 ባለው ጊዜ ማሳወቅ አለባቸው",
              "የተርን ኦቨር ታክስ (TOT) የመሰብሰብ ግዴታ አለባቸው"
            ]}
          />
          <GuideSection 
            title="የደረጃ 'ሐ' ግብር ከፋዮች" 
            desc="አመታዊ ጠቅላላ ገቢያቸው ከ500,000 ብር በታች የሆኑ ግብር ከፋዮች ናቸው።"
            points={[
              "የሂሳብ መዝገብ የመያዝ ግዴታ የለባቸውም (ግምት)",
              "በየአመቱ ከሐምሌ 1 - ሐምሌ 30 ባለው ጊዜ መክፈል አለባቸው",
              "ግብር በግምት (Presumptive Tax) የሚወሰንላቸው ናቸው"
            ]}
          />
        </div>

        <div className="space-y-8">
          <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border dark:border-slate-800 shadow-sm">
            <h3 className="text-xl font-black dark:text-white mb-8 flex items-center gap-3">
              <Info className="text-emerald-600" /> ተደጋጋሚ ጥያቄዎች
            </h3>
            <div className="space-y-6">
              <FaqItem q="ግብር ለመክፈል ምን ሰነዶች ያስፈልጋሉ?" a="የታደሰ የንግድ ፍቃድ፣ የTIN ቁጥር እና የሂሳብ ሪፖርት (ለደረጃ ሀ እና ለ)::" />
              <FaqItem q="የመክፈያ ጊዜ ሲያልፍ ምን ይሆናል?" a="እንደ መዘግየቱ ሁኔታ መቀጮ እና ወለድ ይታሰባል::" />
              <FaqItem q="TIN ቁጥር እንዴት ማውጣት ይቻላል?" a="የቀበሌ መታወቂያ እና 2 ጉርድ ፎቶግራፍ በመያዝ ቢሮ ድረስ በመምጣት ማውጣት ይቻላል::" />
            </div>
          </div>
          
          <div className="bg-emerald-50 dark:bg-emerald-900/20 p-10 rounded-[3rem] border border-emerald-100 dark:border-emerald-800">
            <h4 className="font-black text-emerald-700 dark:text-emerald-400 mb-4 flex items-center gap-2">
              <HelpCircle size={20} /> እርዳታ ይፈልጋሉ?
            </h4>
            <p className="text-sm text-emerald-600 dark:text-emerald-500 leading-relaxed font-bold">
              የበለጠ ዝርዝር መረጃ ለማግኘት በስራ ሰዓት በ +251 33 666 0101 ይደውሉ ወይም ቢሮ ድረስ ይምጡ።
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const GuideSection = ({ title, desc, points }: any) => (
  <div className="bg-white dark:bg-slate-900 p-12 rounded-[3.5rem] border dark:border-slate-800 shadow-xl overflow-hidden group">
    <h3 className="text-2xl font-black dark:text-white mb-4 group-hover:text-emerald-600 transition-colors">{title}</h3>
    <p className="text-slate-500 dark:text-slate-400 mb-8 font-medium">{desc}</p>
    <ul className="space-y-4">
      {points.map((p: string, i: number) => (
        <li key={i} className="flex items-start gap-4 text-sm font-bold text-slate-600 dark:text-slate-300">
          <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
          {p}
        </li>
      ))}
    </ul>
  </div>
);

const FaqItem = ({ q, a }: any) => (
  <div className="space-y-2 border-b dark:border-slate-800 pb-4 last:border-0">
    <p className="font-black dark:text-white text-sm">{q}</p>
    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{a}</p>
  </div>
);
