import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell 
} from 'recharts';
import { TrendingUp, DollarSign, Users, Calendar, ArrowUpRight } from 'lucide-react';

const REVENUE_DATA = [
  { name: 'መስከረም', value: 45 },
  { name: 'ጥቅምት', value: 52 },
  { name: 'ህዳር', value: 48 },
  { name: 'ታህሳስ', value: 61 },
  { name: 'ጥር', value: 72 },
  { name: 'የካቲት', value: 85 },
];

const SECTOR_DATA = [
  { name: 'ንግድ', value: 400 },
  { name: 'አገልግሎት', value: 300 },
  { name: 'ኢንዱስትሪ', value: 200 },
  { name: 'ኮንስትራክሽን', value: 100 },
];

const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#8b5cf6'];

export const StatisticsPage: React.FC = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-5 duration-700">
      <section className="bg-slate-900 py-20 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/10 blur-[100px] rounded-full"></div>
        <div className="max-w-7xl mx-auto px-6 relative">
          <h2 className="text-5xl font-black mb-6">የገቢ ስታቲስቲክስ (Statistics)</h2>
          <p className="text-slate-400 max-w-2xl font-medium leading-relaxed">
            የሰመራ-ሎግያ ከተማ ገቢዎች ፅህፈት ቤት የገቢ አሰባሰብ ሂደቱን በዳታ በማስደገፍ ግልፅነትን ያረጋግጣል።
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 -mt-10 mb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard icon={DollarSign} label="አጠቃላይ ገቢ (2016)" value="450M+" color="text-emerald-500" trend="+12%" />
          <StatCard icon={TrendingUp} label="የእድገት ምጣኔ" value="18.5%" color="text-blue-500" trend="+2%" />
          <StatCard icon={Users} label="ንቁ ግብር ከፋዮች" value="3,450" color="text-amber-500" trend="+150" />
          <StatCard icon={Calendar} label="የቀሩ ቀናት" value="12" color="text-red-500" trend="Deadline" />
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Revenue Trend Chart */}
          <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border dark:border-slate-800 shadow-xl">
            <h3 className="text-xl font-black dark:text-white mb-10 flex items-center justify-between">
              የገቢ አሰባሰብ ወርሃዊ እድገት (በሚሊዮን)
              <span className="text-[10px] uppercase font-black text-slate-400 bg-slate-50 dark:bg-slate-800 px-3 py-1 rounded-full">Monthly Trend</span>
            </h3>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={REVENUE_DATA}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                    itemStyle={{ fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={4} fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sector Pie Chart */}
          <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border dark:border-slate-800 shadow-xl">
            <h3 className="text-xl font-black dark:text-white mb-10 flex items-center justify-between">
              የገቢ ምንጭ በዘርፍ
              <span className="text-[10px] uppercase font-black text-slate-400 bg-slate-50 dark:bg-slate-800 px-3 py-1 rounded-full">Revenue by Sector</span>
            </h3>
            <div className="h-[350px] w-full flex flex-col md:flex-row items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={SECTOR_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {SECTOR_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="w-full md:w-48 space-y-4">
                {SECTOR_DATA.map((s, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{s.name}</span>
                    </div>
                    <span className="text-sm font-black dark:text-white">{Math.round((s.value / 1000) * 100)}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value, color, trend }: any) => (
  <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border dark:border-slate-800 shadow-xl hover:-translate-y-2 transition-transform">
    <div className="flex justify-between items-start mb-6">
      <div className={`p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 ${color}`}>
        <Icon size={24} />
      </div>
      <div className="flex items-center gap-1 text-[10px] font-black bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 px-2 py-1 rounded-full">
        <ArrowUpRight size={10} /> {trend}
      </div>
    </div>
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
    <p className="text-3xl font-black dark:text-white">{value}</p>
  </div>
);
