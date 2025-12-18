
import React from 'react';
import GlassCard from './GlassCard';

interface InstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  isIOS: boolean;
}

const InstallModal: React.FC<InstallModalProps> = ({ isOpen, onClose, isIOS }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <GlassCard className="max-w-md w-full !bg-[#0D0D0D] border-[#D0FB0D]/20 shadow-[0_0_50px_rgba(208,251,13,0.1)]">
        <div className="text-center">
          <div className="w-16 h-16 bg-[#D0FB0D] text-black rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-3">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
            </svg>
          </div>
          
          <h2 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter italic">Install OneRepMax</h2>
          
          <div className="space-y-4 text-left mb-8">
            {isIOS ? (
              <>
                <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-zinc-800 text-[#D0FB0D] text-xs font-black flex items-center justify-center">1</span>
                  <p className="text-zinc-400 text-sm">Tap the <span className="text-white font-bold">Share</span> button in Safari (square with up arrow).</p>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-zinc-800 text-[#D0FB0D] text-xs font-black flex items-center justify-center">2</span>
                  <p className="text-zinc-400 text-sm">Scroll down and select <span className="text-white font-bold">"Add to Home Screen"</span>.</p>
                </div>
              </>
            ) : (
              <p className="text-zinc-400 text-sm text-center">Take your strength benchmarks anywhere. Fast access, offline support, and no browser bars.</p>
            )}
          </div>

          <button 
            onClick={onClose}
            className="w-full bg-[#D0FB0D] text-black font-black py-4 rounded-xl uppercase tracking-widest text-xs transition-transform active:scale-95"
          >
            Got it, Operator
          </button>
        </div>
      </GlassCard>
    </div>
  );
};

export default InstallModal;
