
import React, { useState } from 'react';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  onInstall: () => void;
  showInstallBtn: boolean;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage, onInstall, showInstallBtn }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { 
      id: 'home', 
      label: 'Calculator', 
      desc: '1RM Engine',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    },
    { 
      id: 'contact', 
      label: 'Contact', 
      desc: 'Support Comms',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    },
    { 
      id: 'privacy', 
      label: 'Privacy', 
      desc: 'Data Protocol',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    },
    { 
      id: 'terms', 
      label: 'Terms', 
      desc: 'Usage Rules',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    },
  ];

  const handleNavigation = (page: string) => {
    onNavigate(page);
    setIsMenuOpen(false);
  };

  return (
    <header className="relative py-8 px-4 max-w-5xl mx-auto z-50">
      <nav className="flex items-center justify-between gap-4">
        {/* Logo */}
        <button 
          onClick={() => handleNavigation('home')}
          className="text-2xl font-black flex items-center gap-3 group z-50"
        >
          <span className="w-9 h-9 bg-[#D0FB0D] rounded-xl flex items-center justify-center text-black shadow-[0_0_20px_rgba(208,251,13,0.2)]">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M21 16.5C21 16.88 20.79 17.21 20.47 17.38L12.57 21.82C12.41 21.94 12.21 22 12 22C11.79 22 11.59 21.94 11.43 21.82L3.53 17.38C3.21 17.21 3 16.88 3 16.5V7.5C3 7.12 3.21 6.79 3.53 6.62L11.43 2.18C11.59 2.06 11.79 2 12 2C12.21 2 12.41 2.06 12.57 2.18L20.47 6.62C20.79 6.79 21 7.12 21 7.5V16.5Z"/></svg>
          </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-500 group-hover:to-[#D0FB0D] transition-all italic tracking-tighter">
            OneRepMax
          </span>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10 text-[10px] font-black uppercase tracking-[0.2em]">
          {navLinks.slice(0, 2).map((link) => (
            <button 
              key={link.id}
              onClick={() => handleNavigation(link.id)}
              className={`transition-all duration-200 hover:text-[#D0FB0D] ${currentPage === link.id ? 'text-[#D0FB0D]' : 'text-zinc-600'}`}
            >
              {link.label}
            </button>
          ))}
          
          {showInstallBtn && (
            <button 
              onClick={onInstall}
              className="bg-zinc-900 border border-white/5 text-[#D0FB0D] px-4 py-2 rounded-xl hover:bg-[#D0FB0D] hover:text-black transition-all flex items-center gap-2"
            >
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"/></svg>
              Install App
            </button>
          )}
        </div>

        {/* Mobile Navbar Icons */}
        <div className="flex items-center gap-4 md:hidden z-50">
          {showInstallBtn && (
             <button 
              onClick={onInstall}
              className="bg-[#D0FB0D]/10 border border-[#D0FB0D]/20 text-[#D0FB0D] p-2.5 rounded-xl active:scale-90 transition-transform"
              aria-label="Install App"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
            </button>
          )}
          <button 
            className="p-2.5 bg-white/5 rounded-xl text-zinc-400 hover:text-[#D0FB0D] active:scale-90 transition-all border border-white/5"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay - Redesigned */}
      <div className={`fixed inset-0 bg-black/98 backdrop-blur-3xl transition-all duration-500 md:hidden z-[100] ${isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'}`}>
        <div className="h-full flex flex-col p-8 pt-24">
          <div className="mb-12">
            <h2 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em] mb-4">Command Center</h2>
            <div className="w-full h-px bg-gradient-to-r from-[#D0FB0D]/20 to-transparent"></div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {navLinks.map((link, idx) => (
              <button 
                key={link.id}
                onClick={() => handleNavigation(link.id)}
                className={`group flex items-center justify-between p-6 rounded-2xl border transition-all duration-300 animate-in fade-in slide-in-from-right-8 ${currentPage === link.id ? 'bg-[#D0FB0D]/10 border-[#D0FB0D]/30' : 'bg-white/5 border-white/5 active:bg-white/10'}`}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="flex items-center gap-6">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${currentPage === link.id ? 'bg-[#D0FB0D] text-black' : 'bg-black text-zinc-600 group-hover:text-white'}`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {link.icon}
                    </svg>
                  </div>
                  <div className="text-left">
                    <span className={`block text-xl font-black italic tracking-tighter transition-colors ${currentPage === link.id ? 'text-[#D0FB0D]' : 'text-zinc-400 group-hover:text-white'}`}>
                      {link.label}
                    </span>
                    <span className="text-[9px] font-bold text-zinc-700 uppercase tracking-widest">{link.desc}</span>
                  </div>
                </div>
                <svg className={`w-5 h-5 transition-transform ${currentPage === link.id ? 'text-[#D0FB0D] translate-x-1' : 'text-zinc-800'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ))}
          </div>

          <div className="mt-auto pt-12 text-center border-t border-white/5">
            <div className="flex justify-center gap-8 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D0FB0D] animate-pulse"></span>
              <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">System Online</span>
            </div>
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="text-zinc-700 text-xs font-black uppercase tracking-[0.2em] py-4 px-12 rounded-xl border border-white/5 hover:text-white transition-all"
            >
              Close Terminal
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section (Only on Home) */}
      {currentPage === 'home' && (
        <div className="mt-20 text-center animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-10 text-[10px] font-black tracking-[0.3em] uppercase bg-[#D0FB0D]/10 text-[#D0FB0D] rounded-full border border-[#D0FB0D]/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D0FB0D] animate-pulse"></span>
            Performance Engine v1.0
          </div>
          <h1 className="text-6xl md:text-9xl font-black mb-10 tracking-tighter leading-[0.85] text-white italic">
             Your 1 Rep <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#D0FB0D] to-[#9DC10A]">Max Calculator</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-500 leading-relaxed max-w-2xl mx-auto font-medium">
             Use this free 1 Rep Max Calculator to estimate your maximum lift for any exercise. Enter the weight you lifted and the number of repetitions performed to calculate your
            estimated one-rep max (1RM).
          </p>
        </div>
      )}
    </header>
  );
};

export default Header;
