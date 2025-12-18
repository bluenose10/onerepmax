
import React, { useState } from 'react';
import GlassCard from './GlassCard';

const ContactForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const encode = (data: any) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data: any = {};
    formData.forEach((value, key) => (data[key] = value));

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contact", ...data })
    })
      .then(() => {
        setSubmitted(true);
        setIsSubmitting(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Network error. Please try again.");
        setIsSubmitting(false);
      });
  };

  if (submitted) {
    return (
      <GlassCard className="max-w-2xl mx-auto text-center py-20 !bg-[#0D0D0D] border-[#D0FB0D]/30 animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 bg-[#D0FB0D] text-black rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(208,251,13,0.2)] rotate-3">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h3 className="text-4xl font-black text-white mb-4 tracking-tighter italic uppercase">Mission Successful</h3>
        <p className="text-zinc-500 max-w-sm mx-auto leading-relaxed font-medium">
          Your transmission has been logged into our strength database. Stand by for response.
        </p>
        <button 
          onClick={() => setSubmitted(false)}
          className="mt-10 px-10 py-4 bg-zinc-900 hover:bg-zinc-800 text-[#D0FB0D] rounded-2xl transition-all text-xs font-black uppercase tracking-[0.2em] border border-white/5"
        >
          Reset Terminal
        </button>
      </GlassCard>
    );
  }

  return (
    <section className="mb-20">
      <GlassCard className="max-w-3xl mx-auto !bg-[#0D0D0D] ring-1 ring-white/5">
        <form 
          name="contact" 
          method="POST" 
          data-netlify="true" 
          className="space-y-10"
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="form-name" value="contact" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] block">Operator Name</label>
              <input 
                type="text" 
                name="name" 
                required 
                className="w-full bg-black border border-white/5 rounded-2xl px-6 py-5 text-white focus-ring transition-all placeholder:text-zinc-800 font-bold"
                placeholder="LIFTER NAME"
              />
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] block">Comms Channel (Email)</label>
              <input 
                type="email" 
                name="email" 
                required 
                className="w-full bg-black border border-white/5 rounded-2xl px-6 py-5 text-white focus-ring transition-all placeholder:text-zinc-800 font-bold"
                placeholder="E-MAIL"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] block">Transmission Body</label>
            <textarea 
              name="message" 
              rows={5} 
              required
              className="w-full bg-black border border-white/5 rounded-2xl px-6 py-5 text-white focus-ring transition-all resize-none placeholder:text-zinc-800 font-bold"
              placeholder="MESSAGE DETAILS..."
            ></textarea>
          </div>

          {error && <p className="text-rose-500 text-xs font-black uppercase tracking-widest text-center">{error}</p>}
          
          <button 
            type="submit" 
            disabled={isSubmitting}
            className={`w-full bg-[#D0FB0D] text-black font-black py-6 rounded-2xl shadow-[0_20px_40px_rgba(208,251,13,0.15)] transition-all flex items-center justify-center gap-4 uppercase tracking-[0.3em] text-sm active:scale-[0.98] ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-[0_20px_50px_rgba(208,251,13,0.25)] hover:-translate-y-1'}`}
          >
            {isSubmitting ? 'Transmitting...' : 'Initiate Transmission'}
            {!isSubmitting && (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            )}
          </button>
        </form>
      </GlassCard>
    </section>
  );
};

export default ContactForm;
