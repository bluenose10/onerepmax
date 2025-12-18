
import React from 'react';
import GlassCard from './GlassCard';

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => (
  <div className="border-b border-white/5 py-8 last:border-0 group">
    <h4 className="text-white font-black text-lg mb-4 flex items-center gap-3 group-hover:text-[#D0FB0D] transition-colors">
      <span className="w-2 h-2 rounded-full bg-[#D0FB0D]"></span>
      {question}
    </h4>
    <p className="text-zinc-500 text-sm leading-relaxed font-medium pl-5 border-l border-[#D0FB0D]/10">
      {answer}
    </p>
  </div>
);

const FAQ: React.FC = () => {
  return (
    <section className="mt-20 mb-32">
      <GlassCard title="Information Terminal" className="!bg-[#0D0D0D] ring-1 ring-white/5">
        <div className="divide-y divide-white/5">
          <FAQItem 
            question="What is the 1-Rep Max metric?" 
            answer="A theoretical maximum representing the ultimate capacity of a muscle group for a single concentric effort. It serves as the baseline for performance-based loading." 
          />
          <FAQItem 
            question="Metric Reliability?" 
            answer="Highest precision is achieved when calculating from a 2-5 rep fatigue set. Beyond 10 reps, the formula drifts as metabolic endurance becomes the dominant limiting factor." 
          /> 
          <FAQItem 
            question="How accurate is a 1 rep max calculator?" 
            answer="A 1RM calculator provides an estimate based on mathematical models.
              Accuracy depends on repetition range, fatigue, and lifting technique." 
          />
          <FAQItem 
            question="Is it safe to test a true one-rep max?" 
            answer="Testing a true 1RM can be risky without proper experience, warm-up, and safety equipment.
              Many lifters use estimated 1RM values instead." 
          /> 
          <FAQItem 
            question="Can I use this calculator for bench press, squat, or deadlift?" 
            answer="Yes. This calculator can be used for any resistance exercise where weight and repetitions
                   are clearly defined." 
          />
          <FAQItem 
            question="Integration with Training?" 
            answer="Use the calculated intensities to prescribe exact loading for Strength (85%+), Power (75-85%), or Hypertrophy (60-75%) phases of a block periodization cycle." 
          />
          <FAQItem 
            question="Frequency of Testing?" 
            answer="Neurological fatigue from absolute max testing is significant. We recommend using this calculator to track 'Estimated 1RM' weekly, saving actual max-out sessions for the end of a 12-week block." 
          />
        </div>
      </GlassCard>
    </section>
  );
};

export default FAQ;
