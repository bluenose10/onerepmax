
import React from 'react';
import GlassCard from './GlassCard';

const TermsPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black text-white mb-2">Terms of Service</h1>
        <p className="text-slate-400">Rules for using OneRepMax</p>
      </div>
      <GlassCard className="text-slate-300 space-y-6">
        <section>
          <h2 className="text-xl font-bold text-white mb-2">1. Acceptance of Terms</h2>
          <p>By accessing OneRepMax, you agree to be bound by these terms. If you do not agree, please do not use the service.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-white mb-2">2. Fitness Disclaimer</h2>
          <p className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl text-amber-200 italic">
            <strong>Warning:</strong> Weightlifting and strength testing involve inherent risks. The calculations provided are estimations. Always consult with a qualified medical professional or certified coach before attempting maximum effort lifts.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-white mb-2">3. Accuracy</h2>
          <p>The results provided are mathematical estimations based on peer-reviewed formulas (Epley, Brzycki). We make no guarantee regarding the absolute accuracy of these predictions for any specific individual.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-white mb-2">4. Limitations of Liability</h2>
          <p>OneRepMax and its creators are not liable for any injuries or damages resulting from the use or misuse of the information provided by this tool.</p>
        </section>
      </GlassCard>
    </div>
  );
};

export default TermsPage;
