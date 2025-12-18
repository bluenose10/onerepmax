
import React, { useState, useEffect } from 'react';
import GlassCard from './GlassCard';
import { WeightUnit } from '../types';
import { calculate1RM } from '../utils/math';
 

interface CalculatorProps {
  onResultChange: (oneRM: number) => void;
  unit: WeightUnit;
  setUnit: (u: WeightUnit) => void;
}

const Calculator: React.FC<CalculatorProps> = ({ onResultChange, unit, setUnit }) => {
  const [weight, setWeight] = useState<number>(100);
  const [reps, setReps] = useState<number>(5);
  const [result, setResult] = useState<number>(0);

  useEffect(() => {
  const result = calculate1RM(weight, reps);
  setResult(result.oneRepMax);
  onResultChange(result.oneRepMax);
}, [weight, reps, onResultChange]);


  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setWeight(isNaN(val) ? 0 : val);
  };

  const handleRepsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    setReps(isNaN(val) ? 0 : val);
  };

  const adjustWeight = (amount: number) => {
    setWeight(prev => Math.max(0, prev + amount));
  };

  const adjustReps = (amount: number) => {
    setReps(prev => Math.max(1, Math.min(30, prev + amount)));
  };

  return (
    <GlassCard className="max-w-3xl mx-auto border-none !bg-[#0D0D0D] ring-1 ring-white/5" title="Benchmark Parameters">
      <div className="space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* Weight Input Group */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] block">
                Resistance Load
              </label>
              <div className="flex bg-black p-1 rounded-xl border border-white/5">
                <button
                  onClick={() => setUnit(WeightUnit.KG)}
                  className={`px-3 py-1 text-[10px] font-black rounded-lg transition-all ${unit === WeightUnit.KG ? 'bg-[#D0FB0D] text-black shadow-[0_0_15px_rgba(208,251,13,0.3)]' : 'text-zinc-600 hover:text-zinc-400'}`}
                >
                  KG
                </button>
                <button
                  onClick={() => setUnit(WeightUnit.LB)}
                  className={`px-3 py-1 text-[10px] font-black rounded-lg transition-all ${unit === WeightUnit.LB ? 'bg-[#D0FB0D] text-black shadow-[0_0_15px_rgba(208,251,13,0.3)]' : 'text-zinc-600 hover:text-zinc-400'}`}
                >
                  LB
                </button>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => adjustWeight(-2.5)}
                className="w-12 h-14 bg-zinc-900 border border-white/5 rounded-xl flex items-center justify-center text-[#D0FB0D] hover:bg-[#D0FB0D] hover:text-black transition-all active:scale-90 shrink-0"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M20 12H4"/></svg>
              </button>
              
              <div className="relative flex-1">
                <input
                  type="number"
                  value={weight || ''}
                  onChange={handleWeightChange}
                  className="w-full bg-black border border-white/5 rounded-xl px-4 py-4 text-3xl font-black focus:border-[#D0FB0D] text-white transition-all text-center placeholder:text-zinc-900"
                  placeholder="000"
                  min="0"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-zinc-700 uppercase tracking-widest pointer-events-none">
                  {unit}
                </span>
              </div>

              <button 
                onClick={() => adjustWeight(2.5)}
                className="w-12 h-14 bg-zinc-900 border border-white/5 rounded-xl flex items-center justify-center text-[#D0FB0D] hover:bg-[#D0FB0D] hover:text-black transition-all active:scale-90 shrink-0"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4"/></svg>
              </button>
            </div>
          </div>

          {/* Reps Input Group */}
          <div className="space-y-4">
            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] block">
              Volume (Reps)
            </label>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => adjustReps(-1)}
                className="w-12 h-14 bg-zinc-900 border border-white/5 rounded-xl flex items-center justify-center text-[#D0FB0D] hover:bg-[#D0FB0D] hover:text-black transition-all active:scale-90 shrink-0"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M20 12H4"/></svg>
              </button>

              <div className="relative flex-1">
                <input
                  type="number"
                  value={reps || ''}
                  onChange={handleRepsChange}
                  className="w-full bg-black border border-white/5 rounded-xl px-4 py-4 text-3xl font-black focus:border-[#D0FB0D] text-white transition-all text-center placeholder:text-zinc-900"
                  placeholder="00"
                  min="1"
                  max="30"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-zinc-700 uppercase tracking-widest pointer-events-none">
                  Reps
                </span>
              </div>

              <button 
                onClick={() => adjustReps(1)}
                className="w-12 h-14 bg-zinc-900 border border-white/5 rounded-xl flex items-center justify-center text-[#D0FB0D] hover:bg-[#D0FB0D] hover:text-black transition-all active:scale-90 shrink-0"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4"/></svg>
              </button>
            </div>
            <p className="text-[9px] font-bold text-zinc-700 uppercase tracking-widest text-center">Optimized for 1-10 reps</p>
          </div>
        </div>

        {/* Big Result Display */}
        <div className="pt-12 border-t border-white/5 text-center">
          <div className="mb-4">
            <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em]">Estimated One-Rep Max (1RM)
</span>
          </div>
          
          <div className="relative inline-flex flex-col items-center">
            <span className="text-9xl md:text-[10rem] font-black text-[#D0FB0D] tracking-tighter accent-glow leading-none">
              {result.toFixed(1)}
            </span>
            <div className="mt-4 flex items-center gap-2 bg-[#D0FB0D]/10 px-4 py-1.5 rounded-full border border-[#D0FB0D]/20">
              <span className="w-2 h-2 rounded-full bg-[#D0FB0D]"></span>
              <span className="text-[10px] font-black text-[#D0FB0D] uppercase tracking-widest">Optimized for Accuracy</span>
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

export default Calculator;
