import React, { useState } from 'react';
import { Menu, X, Search, Sun, Moon, Settings } from 'lucide-react';
import { Page } from '../types.ts';
import { Logo } from './Logo.tsx';

interface NavbarProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
  onSearchOpen: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentPage, 
  onPageChange, 
  onSearchOpen, 
  isDarkMode, 
  onToggleDarkMode 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const navLinks = [
    { label: 'መነሻ', labelEn: 'Home', page: Page.HOME },
    { label: 'ስለ እኛ', labelEn: 'About', page: Page.ABOUT },
    { label: 'ዜና', labelEn: 'News', page: Page.NEWS },
    { label: 'አገልግሎቶች', labelEn: 'Services', page: Page.SERVICES },
    { label: 'የግብር መመሪያ', labelEn: 'Tax Guide', page: Page.TAX_GUIDE },
    { label: 'ስታቲስቲክስ', labelEn: 'Statistics', page: Page.STATISTICS },
    { label: 'እኛን ለማግኘት', labelEn: 'Contact', page: Page.CONTACT },
    { label: 'አስተዳዳሪ', labelEn: 'Admin', page: Page.ADMIN, icon: Settings },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div 
            className="flex items-center gap-4 cursor-pointer group" 
            onClick={() => onPageChange(Page.HOME)}
          >
            <Logo size={48} className="group-hover:scale-110 transition-transform duration-300" />
            <div className="border-l-2 border-slate-200 dark:border-slate-700 pl-4">
              <h1 className="text-lg font-black text-slate-800 dark:text-slate-100 leading-tight">የሰመራ-ሎግያ ከተማ</h1>
              <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">ገቢዎች ፅህፈት ቤት</p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => {
              const LinkIcon = link.icon;
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.page}
                  onClick={() => onPageChange(link.page)}
                  className={`px-3 py-2 rounded-xl text-sm font-bold transition-all ${
                    isActive
                      ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400'
                      : 'text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <span className="flex items-center gap-1">
                      {LinkIcon && <LinkIcon size={12} />}
                      {link.label}
                    </span>
                    <span className="text-[10px] opacity-70 font-medium">{link.labelEn}</span>
                  </div>
                </button>
              );
            })}
            
            <div className="flex items-center ml-4 border-l border-slate-200 dark:border-slate-700 pl-4 gap-2">
              <button 
                onClick={onSearchOpen}
                className="p-2.5 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
              <button 
                onClick={onToggleDarkMode}
                className="p-2.5 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                aria-label="Toggle Theme"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <button 
              onClick={onToggleDarkMode} 
              className="p-2 text-slate-500 dark:text-slate-400" 
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="p-2 text-slate-600 dark:text-slate-400" 
              aria-label="Open Menu"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-6 px-4 space-y-2 animate-in slide-in-from-top-10">
          {navLinks.map((link) => (
            <button
              key={link.page}
              onClick={() => {
                onPageChange(link.page);
                setIsMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-6 py-4 rounded-2xl text-base font-black ${
                currentPage === link.page 
                  ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50'
              }`}
            >
              {link.label} <span className="text-xs opacity-50 ml-2 font-medium">/ {link.labelEn}</span>
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};
