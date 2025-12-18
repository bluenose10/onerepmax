
import React, { useState, useMemo } from 'react';
import GlassCard from './GlassCard';
import { WeightUnit } from '../types';

interface PercentageTableProps {
  oneRM: number;
  unit: WeightUnit;
}

const PercentageTable: React.FC<PercentageTableProps> = ({ oneRM, unit }) => {
  const [targetWeight, setTargetWeight] = useState<number>(0);

  const steps = [
    { p: 100, reps: 1, type: 'Absolute Max' },
    { p: 95, reps: 2, type: 'Strength' },
    { p: 90, reps: 4, type: 'Strength' },
    { p: 85, reps: 6, type: 'Hypertrophy/Power' },
    { p: 80, reps: 8, type: 'Hypertrophy' },
    { p: 75, reps: 10, type: 'Hypertrophy' },
    { p: 70, reps: 12, type: 'Endurance' },
    { p: 65, reps: 15, type: 'Endurance' },
    { p: 60, reps: 20, type: 'Endurance' },
  ];

  const analysis = useMemo(() => {
    if (oneRM <= 0 || targetWeight <= 0) return null;
    
    const percentage = (targetWeight / oneRM) * 100;
    
    // Reverse Epley: R = 30 * (1RM/W - 1)
    const epleyReps = 30 * (oneRM / targetWeight - 1);
    // Reverse Brzycki: R = (1.0278 - W/1RM) / 0.0278
    const brzyckiReps = (1.0278 - (targetWeight / oneRM)) / 0.0278;
    
    const avgReps = Math.max(1, Math.round((epleyReps + brzyckiReps) / 2));

    let focus = "General Training";
    if (percentage > 100) focus = "Beyond Current Max";
    else if (percentage >= 90) focus = "Max Strength";
    else if (percentage >= 80) focus = "Power / Hypertrophy";
    else if (percentage >= 70) focus = "Hypertrophy / Endurance";
    else focus = "Muscle Endurance";

    return {
      percentage: percentage.toFixed(1),
      reps: avgReps,
      focus
    };
  }, [oneRM, targetWeight]);

  if (oneRM <= 0) {
    return (
      <GlassCard className="mt-12 text-center py-20 border-dashed border-zinc-800 bg-transparent">
        <p className="text-zinc-600 font-bold uppercase text-xs tracking-widest italic">Input benchmark data to initialize analysis</p>
      </GlassCard>
    );
  }

  return (
    <div className="space-y-10 mt-12">
      {/* Target Weight Analyzer */}
      <GlassCard title="Target Analysis" className="!bg-[#0D0D0D] ring-1 ring-white/5">
        <div className="flex flex-col lg:flex-row gap-10 items-start lg:items-center">
          <div className="w-full lg:w-1/3 space-y-4">
            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] block">
              Analyze Specific Load
            </label>
            <div className="relative">
              <input
                type="number"
                value={targetWeight || ''}
                onChange={(e) => setTargetWeight(parseFloat(e.target.value) || 0)}
                className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-2xl font-black focus-ring text-white transition-all appearance-none"
                placeholder="0"
              />
              <span className="absolute right-6 top-1/2 -translate-y-1/2 text-[#D0FB0D] font-black">
                {unit}
              </span>
            </div>
          </div>

          <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-black border border-white/5">
              <span className="text-[10px] uppercase font-black tracking-widest text-zinc-600 block mb-2">Intensity</span>
              <span className={`text-3xl font-black ${analysis && parseFloat(analysis.percentage) > 100 ? 'text-rose-500' : 'text-[#D0FB0D]'}`}>
                {analysis ? `${analysis.percentage}%` : '—'}
              </span>
            </div>
            <div className="p-6 rounded-2xl bg-black border border-white/5">
              <span className="text-[10px] uppercase font-black tracking-widest text-zinc-600 block mb-2">Exp. Volume</span>
              <span className="text-3xl font-black text-white">
                {analysis ? `${analysis.reps}` : '—'}
              </span>
            </div>
            <div className="p-6 rounded-2xl bg-black border border-white/5">
              <span className="text-[10px] uppercase font-black tracking-widest text-zinc-600 block mb-2">Training Zone</span>
              <span className="text-sm font-black text-zinc-400 leading-tight block mt-1 uppercase tracking-tight">
                {analysis ? analysis.focus : '—'}
              </span>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Main Percentage Table */}
      <GlassCard title="Training Protocol Map" className="!bg-[#0D0D0D] ring-1 ring-white/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 text-zinc-600 text-[10px] uppercase font-black tracking-[0.2em]">
                <th className="pb-6 px-4">Intensity</th>
                <th className="pb-6 px-4">Threshold Load</th>
                <th className="pb-6 px-4 hidden sm:table-cell">Vol. Limit</th>
                <th className="pb-6 px-4 text-right">Zone</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {steps.map((step) => (
                <tr key={step.p} className="group hover:bg-[#D0FB0D]/5 transition-all">
                  <td className="py-6 px-4">
                    <span className="text-[#D0FB0D] font-black text-lg">{step.p}%</span>
                  </td>
                  <td className="py-6 px-4">
                    <span className="text-white font-black text-xl">
                      {(oneRM * (step.p / 100)).toFixed(1)}
                    </span>
                    <span className="text-zinc-600 text-[10px] font-black ml-2 uppercase tracking-widest">{unit}</span>
                  </td>
                  <td className="py-6 px-4 hidden sm:table-cell">
                    <span className="px-3 py-1.5 rounded-lg bg-black text-zinc-400 text-[10px] font-black uppercase tracking-widest border border-white/5">
                      {step.reps} REP CAP
                    </span>
                  </td>
                  <td className="py-6 px-4 text-right">
                    <span className="text-zinc-500 text-xs font-bold uppercase tracking-tight group-hover:text-white transition-colors">{step.type}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-8 flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/5">
          <svg className="w-5 h-5 text-[#D0FB0D] shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
          <p className="text-zinc-500 text-[10px] font-medium leading-relaxed uppercase tracking-widest">
            Protocol calculations are based on generalized strength coefficients. Metabolic conditioning and neurological fatigue will influence actual realized volume.
          </p>
        </div>
      </GlassCard>
    </div>
  );
};

export default PercentageTable;
