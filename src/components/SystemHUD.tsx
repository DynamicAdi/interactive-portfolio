import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Grid, Terminal, Compass, Eye } from 'lucide-react';
import { sound } from '../utils/audio';
import { CursorState } from '../types';

interface SystemHUDProps {
  setCursorState: (state: CursorState) => void;
  activeSection: string;
  gridMode: 'isometric' | 'swiss' | 'none';
  setGridMode: React.Dispatch<React.SetStateAction<'isometric' | 'swiss' | 'none'>>;
  onOpenTerminal?: () => void;
}

export const SystemHUD: React.FC<SystemHUDProps> = ({
  setCursorState,
  activeSection,
  gridMode,
  setGridMode,
  onOpenTerminal,
}) => {
  const [isMuted, setIsMuted] = useState(sound.getMuted());
  const [timeString, setTimeString] = useState('');
  const [fps, setFps] = useState(60);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Clock in UTC
    const updateTime = () => {
      const d = new Date();
      const hours = String(d.getUTCHours()).padStart(2, '0');
      const mins = String(d.getUTCMinutes()).padStart(2, '0');
      const secs = String(d.getUTCSeconds()).padStart(2, '0');
      setTimeString(`${hours}:${mins}:${secs} UTC`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);

    // Simple FPS estimator
    let frameCount = 0;
    let lastTime = performance.now();
    let animId: number;

    const calcFps = (now: number) => {
      frameCount++;
      if (now - lastTime >= 1000) {
        setFps(Math.min(60, Math.round((frameCount * 1000) / (now - lastTime))));
        frameCount = 0;
        lastTime = now;
      }
      animId = requestAnimationFrame(calcFps);
    };
    animId = requestAnimationFrame(calcFps);

    return () => {
      clearInterval(interval);
      cancelAnimationFrame(animId);
    };
  }, []);

  const toggleSound = () => {
    const next = sound.toggleMute();
    setIsMuted(next);
    if (!next) sound.playClick();
  };

  const cycleGrid = () => {
    sound.playTick(1200);
    setGridMode((prev) => {
      if (prev === 'isometric') return 'swiss';
      if (prev === 'swiss') return 'none';
      return 'isometric';
    });
  };

  const scrollToSection = (id: string) => {
    sound.playClick(900);
    setIsMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'hero-3d', label: '01 // HERO', full: '01 3D Isometric World' },
    { id: 'manifesto', label: '02 // MANIFESTO', full: '02 Digital Manifesto' },
    { id: 'identity', label: '03 // IDENTITY', full: '03 Digital Identity' },
    { id: 'matrix-globe', label: '04 // GLOBE', full: '04 Matrix Globe' },
    { id: 'skills-system', label: '05 // SKILLS', full: '05 Skills System' },
    { id: 'selected-work', label: '06 // WORK', full: '06 Selected Works' },
    { id: 'horizontal-journey', label: '07 // WORLDS', full: '07 Project Worlds' },
    { id: 'creative-playground', label: '08 // PLAY', full: '08 Creative Lab' },
    { id: 'philosophy', label: '09 // PHILOSOPHY', full: '09 Core Philosophy' },
    { id: 'process', label: '10 // PROCESS', full: '10 System Pipeline' },
    { id: 'toolbox', label: '11 // TOOLBOX', full: '11 Tech OS / CLI' },
    { id: 'contact-journey', label: '12 // CONTACT', full: '12 Contact & Singularity' },
  ];

  return (
    <>
      {/* Top Fixed Swiss Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/90 backdrop-blur-md border-b border-[#1A1A1A] px-4 md:px-6 py-2.5 flex items-center justify-between text-xs font-pixel select-none transition-all">
        {/* Left: Brand Monogram, SYS_ID & Status */}
        <div className="flex items-center space-x-3 md:space-x-4">
          <button
            onClick={() => scrollToSection('hero-3d')}
            onMouseEnter={() => {
              setCursorState('INTERACT');
              sound.playTick(1400);
            }}
            onMouseLeave={() => setCursorState('DEFAULT')}
            className="flex items-center space-x-2 text-left group focus:outline-none"
          >
            <span className="status-dot animate-pulse" />
            <span className="pixel-mono font-bold text-white tracking-wider">
              SYS_ID: <span className="text-[#FF3B00]">SP_2026</span>
            </span>
          </button>

          <span className="pixel-mono text-[#F2F2F2] border border-[#333] px-2 py-0.5 hidden sm:inline-block bg-[#0A0A0A]">
            [ BUILDING ]
          </span>

          <span className="hidden xl:inline-block text-[#444]">//</span>
          <span className="hidden xl:inline-block pixel-mono text-[#888888]">
            SAMARTH PATIL / CREATIVE DEVELOPER / 13.08N 80.27E
          </span>
        </div>

        {/* Center: Desktop Navigation Strip */}
        <nav className="hidden lg:flex items-center space-x-1.5">
          {navItems.slice(0, 6).map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              onMouseEnter={() => {
                setCursorState('INTERACT');
                sound.playTick(900);
              }}
              onMouseLeave={() => setCursorState('DEFAULT')}
              className={`px-2 py-1 text-[10px] uppercase tracking-wider transition-all border ${
                activeSection === item.id
                  ? 'border-[#FF3B00] text-[#FF3B00] bg-[#FF3B00]/10 font-bold'
                  : 'border-transparent text-[#777] hover:text-[#F2F2F2] hover:border-[#333]'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            onMouseEnter={() => {
              setCursorState('OPEN');
              sound.playTick();
            }}
            onMouseLeave={() => setCursorState('DEFAULT')}
            className="px-2 py-1 text-[10px] border border-[#444] text-[#F2F2F2] hover:border-[#FF3B00] hover:text-[#FF3B00] transition-colors uppercase tracking-wider font-bold"
          >
            {isMenuOpen ? '[ CLOSE INDEX ]' : 'INDEX: 01-12 MENU+'}
          </button>
        </nav>

        {/* Right: Telemetry Controls & Sound */}
        <div className="flex items-center space-x-2 md:space-x-3">
          {/* Latency / FPS Counter */}
          <div className="hidden sm:flex items-center space-x-1 text-[#666666] pixel-mono">
            <span>FPS:</span>
            <span className={fps < 50 ? 'text-yellow-500 font-bold' : 'text-[#FF3B00] font-bold'}>
              {fps}
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-1 text-[#666666] pixel-mono">
            <span>LATENCY:</span>
            <span className="text-[#FF3B00] font-bold">12MS</span>
          </div>

          {/* UTC Clock */}
          <span className="hidden xl:inline-block pixel-mono text-[#888888]">
            {timeString}
          </span>

          {/* Grid Toggle */}
          <button
            onClick={cycleGrid}
            onMouseEnter={() => {
              setCursorState('INTERACT');
              sound.playTick();
            }}
            onMouseLeave={() => setCursorState('DEFAULT')}
            title={`Current Grid: ${gridMode.toUpperCase()}`}
            className="p-1 border border-[#1A1A1A] hover:border-[#FF3B00] text-[#888888] hover:text-[#FF3B00] transition-colors bg-[#080808]"
          >
            <Grid className="w-3.5 h-3.5" />
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            onMouseEnter={() => {
              setCursorState('INTERACT');
              sound.playTick();
            }}
            onMouseLeave={() => setCursorState('DEFAULT')}
            title={isMuted ? 'Unmute Procedural Audio' : 'Mute Audio'}
            className={`p-1 border transition-colors ${
              isMuted
                ? 'border-[#1A1A1A] text-[#666666] hover:text-white bg-[#080808]'
                : 'border-[#FF3B00] text-[#FF3B00] bg-[#FF3B00]/10'
            }`}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>

          {/* Quick CLI Trigger */}
          {onOpenTerminal && (
            <button
              onClick={() => {
                sound.playGlitch();
                onOpenTerminal();
              }}
              onMouseEnter={() => {
                setCursorState('EXECUTE');
                sound.playTick();
              }}
              onMouseLeave={() => setCursorState('DEFAULT')}
              className="p-1 border border-[#1A1A1A] hover:border-[#FF3B00] text-[#888888] hover:text-[#FF3B00] transition-colors bg-[#080808]"
              title="Open Terminal OS"
            >
              <Terminal className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden px-2 py-1 border border-[#333] text-[#F2F2F2] hover:border-[#FF3B00] pixel-mono"
          >
            {isMenuOpen ? 'X' : 'MENU+'}
          </button>
        </div>
      </header>

      {/* Expanded System Index Drawer */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-[49px] z-40 bg-[#050505]/95 backdrop-blur-xl p-6 md:p-12 overflow-y-auto font-pixel border-b border-[#1F1F1F] animate-fadeIn">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex items-center justify-between border-b border-[#1F1F1F] pb-4">
              <div>
                <span className="text-[#FF3B00] text-xs uppercase tracking-widest">// SYSTEM INDEX MAP</span>
                <h3 className="text-2xl font-display font-black text-[#F2F2F2] mt-1">
                  DIRECT ACCESS ARCHITECTURE
                </h3>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="border border-[#FF3B00] text-[#FF3B00] px-4 py-2 text-xs hover:bg-[#FF3B00] hover:text-black transition-colors"
              >
                [ ESC / CLOSE ]
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  onMouseEnter={() => {
                    setCursorState('OPEN');
                    sound.playTick(1100);
                  }}
                  onMouseLeave={() => setCursorState('DEFAULT')}
                  className="group flex flex-col p-4 bg-[#0D0D0D] border border-[#1F1F1F] hover:border-[#FF3B00] hover:bg-[#FF3B00]/5 transition-all text-left"
                >
                  <div className="flex justify-between items-center text-xs text-[#666666] group-hover:text-[#FF3B00]">
                    <span>{item.label}</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </div>
                  <div className="text-sm font-bold text-[#F2F2F2] group-hover:text-white mt-1">
                    {item.full}
                  </div>
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-[#1F1F1F] flex flex-wrap justify-between items-center text-xs text-[#666666]">
              <div>SAMARTH PATIL // PORTFOLIO SYSTEM BUILD 2026.04</div>
              <div className="flex space-x-4 text-[#888888]">
                <span>STATUS: HIGH VELOCITY</span>
                <span className="text-[#FF3B00]">FRAMEWORK: REACT + THREE + GSAP</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
