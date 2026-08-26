import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { CursorState } from './types';
import { BootLoader } from './components/BootLoader';
import { CustomCursor } from './components/CustomCursor';
import { SystemHUD } from './components/SystemHUD';
import { HeroIsometricWorld } from './components/HeroIsometricWorld';
import { ManifestoSection } from './components/ManifestoSection';
import { DigitalIdentitySection } from './components/DigitalIdentitySection';
import { Work } from './components/SelectedWorkSection';
import { DigitalToolboxSection } from './components/DigitalToolboxSection';
import { Philosophy } from './components/Philosophy';
import { Process } from './components/Process';
import { Contact } from './components/Contact';
import { Now } from './components/Now';
import SkillsGlobePage from './components/Skills/Main';
import { SiGithub, SiX } from 'react-icons/si';
import { FaLinkedinIn } from "react-icons/fa6";

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [cursorState, setCursorState] = useState<CursorState>('DEFAULT');
  const [activeSection, setActiveSection] = useState('hero-3d');
  const [gridMode, setGridMode] = useState<'isometric' | 'swiss' | 'none'>('isometric');

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Section Observer for HUD active section state
    const sections = [
      'hero-3d',
      'manifesto',
      'identity',
      'matrix-globe',
      'skills-system',
      'selected-work',
      'horizontal-journey',
      'creative-playground',
      'philosophy',
      'process',
      'toolbox',
      'contact-journey',
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      lenis.destroy();
      observer.disconnect();
    };
  }, [isLoaded]);

  const handleOpenTerminal = () => {
    const el = document.getElementById('toolbox');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`relative min-h-screen bg-[#050505] text-[#F2F2F2] selection:bg-[#FF3B00] selection:text-black overflow-x-hidden ${
      gridMode === 'isometric' ? 'bg-grid-isometric' : gridMode === 'swiss' ? 'bg-grid-pattern' : ''
    }`}>
      <CustomCursor cursorState={cursorState} />
      {!isLoaded && <BootLoader onComplete={() => setIsLoaded(true)} />}
      {isLoaded && (
        <>
          <SystemHUD
            setCursorState={setCursorState}
            activeSection={activeSection}
            gridMode={gridMode}
            setGridMode={setGridMode}
            onOpenTerminal={handleOpenTerminal}
          />

          {/* Ambient Corner Accent Brackets */}
          <div className="fixed top-0 left-0 p-4 z-40 pointer-events-none">
            <div className="w-24 md:w-32 h-24 md:h-32 border-l border-t border-[#FF3B00] opacity-20" />
          </div>
          <div className="fixed bottom-0 right-0 p-4 z-40 pointer-events-none">
            <div className="w-24 md:w-32 h-24 md:h-32 border-r border-b border-[#FF3B00] opacity-20" />
          </div>

          {/* Left Vertical Architectural Rail */}
          <aside className="fixed top-12 bottom-0 left-0 w-12 hidden lg:flex flex-col items-center justify-center border-r border-[#1A1A1A] bg-[#050505]/80 backdrop-blur-sm z-30 pointer-events-auto select-none">
            <div className="transform -rotate-90 whitespace-nowrap flex items-center space-x-4">
              <span className="pixel-mono text-[#666]">FOLLOW</span>
              <span className="pixel-mono text-[#F2F2F2] flex space-x-3">
                <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-[#FF3B00] transition-colors">
                  <SiGithub size={16} />
                </a>
                <span>—</span>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-[#FF3B00] transition-colors">
                <SiX size={14}/>
                </a>
                <span>—</span>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-[#FF3B00] transition-colors">
                <FaLinkedinIn size={16} />
                </a>
              </span>
            </div>
          </aside>

          <main className="relative w-full overflow-hidden lg:pl-12">
            {/* SECTION 01: HERO ISOMETRIC 3D GRID WORLD */}
            <HeroIsometricWorld setCursorState={setCursorState} />

            {/* SECTION 02: MANIFESTO */}
            <ManifestoSection setCursorState={setCursorState} />

            {/* SECTION 03: ABOUT / DIGITAL IDENTITY */}
            <DigitalIdentitySection setCursorState={setCursorState} />
            <SkillsGlobePage />
          <Philosophy />
          <Work />
            <Process />
            <DigitalToolboxSection setCursorState={setCursorState} />
            <Now />
            <Contact />
          </main>
        </>
      )}
    </div>
  );
}
