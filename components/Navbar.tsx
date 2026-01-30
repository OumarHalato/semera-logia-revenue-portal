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
                      ? 'text-blue-600 bg