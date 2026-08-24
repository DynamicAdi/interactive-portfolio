import React, { useEffect, useRef, useState } from 'react';
import { sound } from '../utils/audio';
import { CursorState } from '../types';

interface ManifestoProps {
  setCursorState: (state: CursorState) => void;
}

export const ManifestoSection: React.FC<ManifestoProps> = ({ setCursorState }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const [hoveredChar, setHoveredChar] = useState<string | null>(null);
  const lastScrollY = useRef(0);
  const lastTime = useRef(Date.now());

  useEffect(() => {
    const handleScroll = () => {
      const now = Date.now();
      const currentScrollY = window.scrollY;
      const deltaY = currentScrollY - lastScrollY.current;
      const deltaTime = Math.max(1, now - lastTime.current);
      const velocity = deltaY / deltaTime;

      setScrollVelocity(Math.min(15, Math.max(-15, velocity * 8)));
      lastScrollY.current = currentScrollY;
      lastTime.current = now;

      // Dampen velocity back to 0
      setTimeout(() => {
        setScrollVelocity((prev) => prev * 0.5);
      }, 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const line1 = "I DON'T JUST WRITE CODE.";
  const line2 = "I BUILD DIGITAL EXPERIENCES.";

  return (
    <section
      id="manifesto"
      ref={containerRef}
      className="relative w-full min-h-[90vh] bg-[#050505] text-[#F2F2F2] border-t border-b border-[#1F1F1F] py-24 md:py-36 px-6 md:px-12 flex flex-col justify-center overflow-hidden select-none"
      onMouseEnter={() => setCursorState('EXPLORE')}
      onMouseLeave={() => setCursorState('DEFAULT')}
    >
      {/* Background Subtle Coordinate Watermarks */}
      <div className="absolute top-8 left-6 md:left-12 font-pixel text-xs text-[#333333] tracking-widest flex items-center space-x-3">
        <span className="w-1.5 h-1.5 bg-[#FF3B00]" />
        <span>SECTION 02 // MANIFESTO</span>
        <span className="text-[#555]">// 002.CORE_CREED</span>
      </div>

      <div className="absolute top-8 right-6 md:right-12 font-pixel text-xs text-[#333333] hidden md:block">
        [ VELOCITY SKEW: {scrollVelocity.toFixed(1)}° ]
      </div>

      {/* Centerpiece Massive Typography */}
      <div className="max-w-7xl mx-auto w-full my-auto space-y-6 md:space-y-12">
        {/* Line 1 */}
        <div
          className="transition-transform duration-100 ease-out"
          style={{
            transform: `skewX(${scrollVelocity}deg)`,
          }}
        >
          <div className="font-display text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight text-[#666666] flex flex-wrap gap-x-3 md:gap-x-6">
            {line1.split(' ').map((word, wordIdx) => (
              <span key={wordIdx} className="inline-block whitespace-nowrap">
                {word.split('').map((char, charIdx) => (
                  <span
                    key={charIdx}
                    onMouseEnter={() => {
                      setHoveredChar(char);
                      sound.playTick(1200 + charIdx * 50);
                    }}
                    className="inline-block transition-colors duration-150 hover:text-[#F2F2F2] hover:-translate-y-1"
                  >
                    {char}
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>

        {/* Line 2 - High Accent Signal Line */}
        <div
          className="transition-transform duration-100 ease-out"
          style={{
            transform: `skewX(${-scrollVelocity * 1.2}deg)`,
          }}
        >
          <div className="font-display text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight text-[#F2F2F2] flex flex-wrap gap-x-3 md:gap-x-6">
            {line2.split(' ').map((word, wordIdx) => (
              <span
                key={wordIdx}
                className={`inline-block whitespace-nowrap ${
                  word === 'EXPERIENCES.' ? 'text-[#FF3B00] underline decoration-[#FF3B00]/40 decoration-4' : ''
                }`}
              >
                {word.split('').map((char, charIdx) => (
                  <span
                    key={charIdx}
                    onMouseEnter={() => {
                      setHoveredChar(char);
                      sound.playGlitch();
                    }}
                    className="inline-block transition-all duration-150 hover:text-[#FF3B00] hover:scale-110"
                  >
                    {char}
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>

        {/* Swiss Sub-Manifesto Editorial Block */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-12 border-t border-[#1F1F1F] font-pixel text-xs md:text-sm text-[#888888]">
          <div className="md:col-span-4 text-[#FF3B00] font-bold tracking-widest uppercase">
            // PHILOSOPHY OF INTERACTIVE ARCHITECTURE
          </div>
          <div className="md:col-span-8 space-y-4 leading-relaxed text-[#B0B0B0]">
            <p>
              I believe in the friction between mathematical Swiss grid systems and raw, chaotic pixel energy. 
              The web is not a static PDF—it is a living, kinetic dimension with gravity, inertia, and depth.
            </p>
            <p className="text-[#666666]">
              Every shader compiled, every vector transformed, and every typography block laid down is calibrated 
              to make the viewer pause and realize the digital space can evoke tangible emotion.
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Technical Grid Crosses */}
      <div className="absolute bottom-6 left-6 md:left-12 font-pixel text-[10px] text-[#333]">
        + + + + + + + + + + + + + + + + +
      </div>
      <div className="absolute bottom-6 right-6 md:right-12 font-pixel text-[10px] text-[#FF3B00]">
        [ 02 / 12 — ARCHITECTURE ]
      </div>
    </section>
  );
};
