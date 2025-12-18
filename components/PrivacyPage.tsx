
import React from 'react';
import GlassCard from './GlassCard';

const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <HeaderSnippet title="Privacy Policy" description="Last updated: October 2023" />
      <GlassCard className="prose prose-invert max-w-none">
        <div className="space-y-6 text-slate-300">
          <section>
            <h2 className="text-xl font-bold text-white mb-2">1. Information Collection</h2>
            <p>OneRepMax is a calculation tool. Most data you enter (weight, reps) is processed locally in your browser and is not stored on our servers. We only collect information you voluntarily provide via our contact form (Name, Email).</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-white mb-2">2. Use of Information</h2>
            <p>Email addresses provided via the contact form are used solely to respond to your inquiries. We do not sell or share your data with third parties for marketing purposes.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-white mb-2">3. Cookies</h2>
            <p>We may use basic functional cookies or local storage to remember your preferred weight unit (KG/LB) for a better user experience.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-white mb-2">4. Third-Party Services</h2>
            <p>Our website is hosted on Netlify. They may collect basic access logs (IP address, browser type) for security and performance monitoring in accordance with their privacy policy.</p>
          </section>
        </div>
      </GlassCard>
    </div>
  );
};

const HeaderSnippet: React.FC<{ title: string; description: string }> = ({ title, description }) => (
  <div className="text-center mb-12">
    <h1 className="text-4xl font-black text-white mb-2">{title}</h1>
    <p className="text-slate-400">{description}</p>
  </div>
);

export default PrivacyPage;
