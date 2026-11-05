import React, { useState } from 'react';
import {
  Compass,
  Sparkles,
  BookOpen,
  Info,
  Menu,
  X,
  Layers,
  Search,
} from 'lucide-react';

export type NavTab = 'home' | 'collection' | 'ai-chat' | 'archives' | 'about';

interface NavbarProps {
  currentTab: NavTab;
  onNavigate: (tab: NavTab) => void;
  onOpenQuickSearch?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  onOpenQuickSearch,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: Array<{ id: NavTab; label: string; icon: React.ReactNode }> = [
    { id: 'home', label: 'Trang Chủ', icon: <Compass className="w-4 h-4" /> },
    { id: 'collection', label: 'Bộ Sưu Tập', icon: <Layers className="w-4 h-4" /> },
    { id: 'ai-chat', label: 'Trợ Lý AI Gemini', icon: <Sparkles className="w-4 h-4 text-[#e5c158]" /> },
    { id: 'archives', label: 'Nguồn Tư Liệu', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'about', label: 'Giới Thiệu', icon: <Info className="w-4 h-4" /> },
  ];

  const handleNavClick = (tab: NavTab) => {
    onNavigate(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0c0907]/90 backdrop-blur-md border-b border-[#362718]">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        {/* Brand Logo with Bronze Drum Medallion */}
        <div
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3.5 cursor-pointer group select-none"
        >
          {/* Bronze Drum Mini Icon */}
          <div className="relative w-11 h-11 rounded-full bg-gradient-to-br from-[#dfb743] via-[#c59b27] to-[#805e16] p-0.5 shadow-lg shadow-[#c59b27]/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full rounded-full bg-[#18130e] flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[#c59b27]/10" />
              {/* Bronze Drum stylized star center */}
              <svg viewBox="0 0 40 40" className="w-7 h-7 text-[#dfb743]">
                <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
                <circle cx="20" cy="20" r="14" fill="none" stroke="currentColor" strokeWidth="1" />
                <polygon points="20,4 23,16 35,16 25,23 29,35 20,27 11,35 15,23 5,16 17,16" fill="currentColor" opacity="0.9" />
                <circle cx="20" cy="20" r="3" fill="#18130e" stroke="currentColor" strokeWidth="1" />
              </svg>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#dfb743]">
              Bảo Tàng Số
            </span>
            <span className="font-serif text-lg md:text-xl font-black tracking-tight text-[#fbf6ee] group-hover:text-[#ffd866] transition-colors">
              VĂN HÓA ĐÔNG SƠN
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#2e2114] to-[#22180e] text-[#ffd866] border border-[#c59b27]/60 shadow-md'
                    : 'text-[#c2b4a5] hover:text-[#f3ede4] hover:bg-[#1a140e]'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Action: Quick AI trigger & Mobile Hamburger */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNavClick('ai-chat')}
            className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#c59b27] to-[#dfb743] hover:brightness-110 text-black text-xs font-bold transition-all shadow-md shadow-[#c59b27]/20 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Hỏi Trợ Lý AI</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-[#1b150f] border border-[#362718] text-[#c9bcae] hover:text-white"
            aria-label="Mở trình đơn"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#110e0a] border-b border-[#362718] px-4 py-4 space-y-2">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#291e14] text-[#ffd866] font-bold border border-[#c59b27]/60'
                    : 'text-[#baa998] hover:bg-[#1c1610] hover:text-white'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
