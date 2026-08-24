import React, { useEffect, useState, useRef } from 'react';
import { PHILOSOPHY_STATEMENTS } from '../data/portfolioData';
import { sound } from '../utils/audio';
import { CursorState } from '../types';

interface PhilosophyProps {
  setCursorState: (state: CursorState) => void;
}

export const PhilosophySection: React.FC<PhilosophyProps> = ({ setCursorState }) => {
  const [skewDeg, setSkewDeg] = useState(0);
  const lastScrollY = useRef(0);
  const lastTime = useRef(Date.now());

  useEffect(() => {
    const handleScroll = () => {
      const now = Date.now();
      const currentScrollY = window.scrollY;
      const deltaY = currentScrollY - lastScrollY.current;
      const deltaTime = Math.max(1, now - lastTime.current);
      const velocity = deltaY / deltaTime;

      setSkewDeg(Math.min(22, Math.max(-22, velocity * 12)));
      lastScrollY.current = currentScrollY;
      lastTime.current = now;

      setTimeout(() => {
        setSkewDeg((prev) => prev * 0.4);
      }, 60);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="philosophy"
      className="relative w-full min-h-screen bg-[#050505] text-[#F2F2F2] border-b border-[#1F1F1F] py-24 md:py-36 px-6 md:px-12 flex flex-col justify-center select-none overflow-hidden"
      onMouseEnter={() => setCursorState('EXPLORE')}
      onMouseLeave={() => setCursorState('DEFAULT')}
    >
      <div className="max-w-7xl mx-auto w-full space-y-16">
        {/* Section Tag */}
        <div className="flex justify-between items-center border-b border-[#1F1F1F] pb-4">
          <div className="flex items-center space-x-3">
            <span className="w-2 h-2 bg-[#FF3B00]" />
            <span className="font-silkscreen text-xs text-[#FF3B00] uppercase tracking-widest">
              // SECTION 09: CORE DEVELOPMENT PHILOSOPHY
            </span>
          </div>
          <div className="font-pixel text-xs text-[#666666]">
            [ VELOCITY SKEW DYNAMICS: {skewDeg.toFixed(1)}° ]
          </div>
        </div>

        {/* 3 Core Statements with Dynamic Scroll Skew */}
        <div className="space-y-12">
          {PHILOSOPHY_STATEMENTS.map((item, idx) => (
            <div
              key={idx}
              className="border-b border-[#1F1F1F] pb-10 transition-transform duration-75 ease-out group"
              style={{
                transform: `skewX(${idx % 2 === 0 ? skewDeg : -skewDeg}deg)`,
              }}
              onMouseEnter={() => {
                setCursorState('INTERACT');
                sound.playTick(900 + idx * 200);
              }}
              onMouseLeave={() => setCursorState('DEFAULT')}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-baseline">
                {/* Massive Typography */}
                <div className="lg:col-span-8">
                  <h3 className="font-display font-black text-4xl sm:text-6xl md:text-8xl tracking-tighter text-[#F2F2F2] group-hover:text-white transition-colors">
                    {item.lead} <span className="text-[#FF3B00]">{item.highlight}</span>
                  </h3>
                </div>

                {/* Sub Description */}
                <div className="lg:col-span-4 font-pixel text-xs md:text-sm text-[#888888] leading-relaxed group-hover:text-[#CCCCCC] transition-colors">
                  <span className="text-[#FF3B00] mr-2">&gt;</span>
                  {item.sub}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Technical Seal */}
        <div className="flex flex-wrap justify-between items-center font-pixel text-xs text-[#666666] pt-4">
          <div>PRINCIPLE: CRAFT BEYOND TEMPLATES &amp; CONVENTIONS</div>
          <div className="text-[#FF3B00]">SAMARTH PATIL // 2026 CODEX</div>
        </div>
      </div>
    </section>
  );
};
