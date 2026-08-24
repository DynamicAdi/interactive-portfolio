import React, { useRef, useEffect, useState } from 'react';
import { PROJECTS } from '../data/portfolioData';
import { CursorState } from '../types';
import { sound } from '../utils/audio';
import { ChevronLeft, ChevronRight, Compass, Sparkles, Box, ArrowRight } from 'lucide-react';

interface HorizontalJourneyProps {
  setCursorState: (state: CursorState) => void;
}

export const HorizontalJourneySection: React.FC<HorizontalJourneyProps> = ({ setCursorState }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      sound.playClick(1000);
      scrollContainerRef.current.scrollBy({ left: -450, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      sound.playClick(1200);
      scrollContainerRef.current.scrollBy({ left: 450, behavior: 'smooth' });
    }
  };

  const onScroll = () => {
    if (scrollContainerRef.current) {
      const el = scrollContainerRef.current;
      const total = el.scrollWidth - el.clientWidth;
      if (total > 0) {
        setScrollProgress(Math.round((el.scrollLeft / total) * 100));
      }
    }
  };

  return (
    <section
      id="horizontal-journey"
      className="relative w-full min-h-screen bg-[#060606] text-[#F2F2F2] border-b border-[#1F1F1F] py-24 md:py-32 px-6 md:px-12 flex flex-col justify-between overflow-hidden select-none"
      onMouseEnter={() => setCursorState('DRAG')}
      onMouseLeave={() => setCursorState('DEFAULT')}
    >
      {/* Top Swiss Header */}
      <div className="max-w-7xl mx-auto w-full z-10 flex flex-wrap items-center justify-between border-b border-[#1F1F1F] pb-4 gap-4">
        <div>
          <div className="font-silkscreen text-xs text-[#FF3B00] uppercase tracking-widest flex items-center space-x-2">
            <span className="w-2 h-2 bg-[#FF3B00]" />
            <span>// SECTION 07: HORIZONTAL PROJECT JOURNEY WORLDS</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-black tracking-tight text-[#F2F2F2] mt-1">
            EXPLORE THE WORLDS
          </h2>
        </div>

        {/* Scroll Controls & Progress Indicator */}
        <div className="flex items-center space-x-4 font-pixel text-xs">
          <div className="hidden sm:flex items-center space-x-2 text-[#888888]">
            <span>AXIS X_POS:</span>
            <span className="text-[#FF3B00] font-bold">{scrollProgress}%</span>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={handleScrollLeft}
              onMouseEnter={() => {
                setCursorState('INTERACT');
                sound.playTick();
              }}
              onMouseLeave={() => setCursorState('DEFAULT')}
              className="p-2 border border-[#1F1F1F] bg-[#0D0D0D] hover:border-[#FF3B00] text-[#888888] hover:text-[#FF3B00] transition-colors"
              title="Scroll Left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleScrollRight}
              onMouseEnter={() => {
                setCursorState('INTERACT');
                sound.playTick();
              }}
              onMouseLeave={() => setCursorState('DEFAULT')}
              className="p-2 border border-[#1F1F1F] bg-[#0D0D0D] hover:border-[#FF3B00] text-[#888888] hover:text-[#FF3B00] transition-colors"
              title="Scroll Right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Track */}
      <div
        ref={scrollContainerRef}
        onScroll={onScroll}
        className="w-full flex space-x-8 overflow-x-auto py-10 scrollbar-none snap-x snap-mandatory cursor-grab active:cursor-grabbing my-auto"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {PROJECTS.map((p, idx) => (
          <div
            key={p.id}
            className="flex-shrink-0 w-[85vw] sm:w-[480px] md:w-[560px] snap-center bg-[#0D0D0D] border border-[#1F1F1F] hover:border-[#FF3B00] transition-all p-6 md:p-8 flex flex-col justify-between group"
            onMouseEnter={() => {
              setCursorState('EXPLORE');
              sound.playTick(1100 + idx * 80);
            }}
            onMouseLeave={() => setCursorState('DEFAULT')}
          >
            {/* World Top Header */}
            <div className="flex justify-between items-start font-pixel text-xs border-b border-[#1A1A1A] pb-4">
              <span className="text-[#FF3B00] font-bold">WORLD_0{idx + 1} // {p.category}</span>
              <span className="text-[#666]">{p.year}</span>
            </div>

            {/* Visual Image with Crop & Scanline */}
            <div className="relative aspect-[16/9] w-full my-6 overflow-hidden bg-black border border-[#222]">
              <img
                src={p.image}
                alt={p.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter grayscale contrast-125 group-hover:filter-none group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 scanlines opacity-40 pointer-events-none" />
              <div className="absolute top-3 left-3 bg-black/80 border border-[#FF3B00] px-2 py-0.5 font-pixel text-[10px] text-[#FF3B00]">
                LATENCY: {p.specs.fps}
              </div>
            </div>

            {/* Typography */}
            <div className="space-y-2">
              <h3 className="font-display font-black text-2xl md:text-3xl text-[#F2F2F2] group-hover:text-[#FF3B00] transition-colors">
                {p.title}
              </h3>
              <p className="font-pixel text-xs text-[#888888]">
                {p.tagline}
              </p>
              <p className="font-sans text-xs md:text-sm text-[#AAAAAA] line-clamp-3 leading-relaxed mt-2">
                {p.description}
              </p>
            </div>

            {/* Bottom Footer Stack */}
            <div className="mt-6 pt-4 border-t border-[#1A1A1A] flex flex-wrap items-center justify-between font-pixel text-xs gap-2">
              <div className="flex space-x-1.5">
                {p.techStack.slice(0, 3).map((t) => (
                  <span key={t} className="bg-[#141414] border border-[#222] px-2 py-0.5 text-[11px] text-[#888]">
                    {t}
                  </span>
                ))}
              </div>
              <span className="text-[#FF3B00] group-hover:translate-x-1 transition-transform flex items-center space-x-1 font-bold">
                <span>EXPLORE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Track Meta */}
      <div className="max-w-7xl mx-auto w-full z-10 flex flex-wrap items-center justify-between border-t border-[#1F1F1F] pt-4 font-pixel text-xs text-[#666666]">
        <div>SWISS KINETIC PANORAMA // 5 DISTINCT COMPUTATIONAL DOMAINS</div>
        <div className="flex space-x-4 text-[#888888]">
          <span>DRAG HORIZONTALLY</span>
          <span className="text-[#FF3B00]">MOMENTUM PINNING</span>
        </div>
      </div>
    </section>
  );
};
