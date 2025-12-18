
import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import Calculator from './components/Calculator';
import PercentageTable from './components/PercentageTable';
import FAQ from './components/FAQ';
import ContactForm from './components/ContactForm';
import PrivacyPage from './components/PrivacyPage';
import TermsPage from './components/TermsPage';
import InstallModal from './components/InstallModal';
import { WeightUnit } from './types';

const App: React.FC = () => {
  const [oneRM, setOneRM] = useState<number>(0);
  const [unit, setUnit] = useState<WeightUnit>(WeightUnit.KG);
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);

    // Detect iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(isIOSDevice);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    } else {
      setShowInstallModal(true);
    }
  };

  const handleResultChange = useCallback((newResult: number) => {
    setOneRM(newResult);
  }, []);

  const renderContent = () => {
    switch (currentPage) {
      case 'privacy':
        return <PrivacyPage />;
      case 'terms':
        return <TermsPage />;
      case 'contact':
        return (
          <div className="max-w-4xl mx-auto space-y-16 py-12 px-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="text-center">
              <h1 className="text-5xl font-black text-white mb-4 tracking-tight">Get in Touch</h1>
              <p className="text-zinc-500 text-lg max-w-xl mx-auto font-medium">Have questions about OneRepMax? Drop us a line.</p>
            </div>
            <ContactForm />
          </div>
        );
      case 'home':
      default:
        return (
          <div className="max-w-4xl mx-auto space-y-20 py-12 px-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <Calculator 
              onResultChange={handleResultChange} 
              unit={unit}
              setUnit={setUnit}
            />
            
            <PercentageTable 
              oneRM={oneRM} 
              unit={unit} 
            />
            
            <FAQ />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen relative text-slate-100 selection:bg-[#D0FB0D]/20">
      <Header 
        onNavigate={setCurrentPage} 
        currentPage={currentPage} 
        onInstall={handleInstallClick}
        showInstallBtn={deferredPrompt !== null || isIOS}
      />
      
      <main className="min-h-[70vh] relative">
        {renderContent()}
      </main>

      <InstallModal 
        isOpen={showInstallModal} 
        onClose={() => setShowInstallModal(false)} 
        isIOS={isIOS}
      />

      <footer className="max-w-5xl mx-auto pt-24 pb-12 px-6 mt-20 border-t border-white/5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-600 mb-2 italic">OneRepMax</h2>
            <p className="text-zinc-600 text-[10px] uppercase font-bold tracking-widest">High-Performance Benchmarking</p>
          </div>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">
            <button onClick={() => setCurrentPage('privacy')} className="hover:text-[#D0FB0D] transition-colors">Privacy</button>
            <button onClick={() => setCurrentPage('terms')} className="hover:text-[#D0FB0D] transition-colors">Terms</button>
            <button onClick={() => setCurrentPage('contact')} className="hover:text-[#D0FB0D] transition-colors">Contact</button>
          </div>
        </div>
        
        <div className="text-center md:flex md:justify-between pt-8 border-t border-white/5">
          <p className="text-zinc-700 text-[9px] uppercase tracking-widest">
            &copy; {new Date().getFullYear()} OneRepMax Core. All Rights Reserved.
          </p>
          <p className="text-zinc-800 text-[9px] uppercase tracking-widest mt-2 md:mt-0 font-bold">
            Stay focused. Train hard.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
