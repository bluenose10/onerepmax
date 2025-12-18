
import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', title }) => {
  return (
    <div className={`glass-card rounded-3xl p-6 md:p-10 ${className}`}>
      {/* Subtle top edge shine */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      
      {title && (
        <div className="mb-8 border-b border-white/5 pb-4">
          <h3 className="text-xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
            {title}
          </h3>
        </div>
      )}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default GlassCard;
