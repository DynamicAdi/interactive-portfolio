import React, { useState } from 'react';
import { sound } from '../utils/audio';
import { CursorState } from '../types';
import { Terminal, Cpu, HardDrive, CpuIcon, Command, Play, Sparkles } from 'lucide-react';

interface DigitalToolboxProps {
  setCursorState: (state: CursorState) => void;
}

const TOOLBOX_MODULES = [
  { name: 'NEXT.JS 15 APP ROUTER', type: 'CORE FRAMEWORK', status: 'ACTIVE', desc: 'Zero-waterfall streaming, server actions, dynamic edge middleware.' },
  { name: 'THREE.JS / WEBGL 2.0', type: 'GRAPHICS ENGINE', status: 'ACCELERATED', desc: 'Hardware-accelerated geometry, instanced draw batches, post-processing.' },
  { name: 'GLSL SHADERS (FRAG/VERT)', type: 'RENDER PIPELINE', status: 'COMPILED', desc: 'Custom procedural raymarching, fractional Brownian motion, voronoi noise.' },
  { name: 'GSAP 3 + SCROLLTRIGGER', type: 'KINETIC ENGINE', status: '60 FPS', desc: 'Sub-pixel tweening, velocity-reactive skew, custom timeline scrubbing.' },
  { name: 'LENIS SMOOTH SCROLL', type: 'PHYSICS SYSTEM', status: 'SYNCHRONIZED', desc: 'Momentum-preserved scrolling, zero layout thrashing, delta dampening.' },
  { name: 'TAILWIND CSS 4.0', type: 'SWISS DESIGN SYSTEM', status: 'OPTIMIZED', desc: 'Strict dark optic tokens, 8pt modular grid, responsive typography hierarchy.' },
  { name: 'WEB AUDIO API', type: 'PROCEDURAL SOUND', status: 'LOW LATENCY', desc: 'Direct algorithmic oscillator synthesis, dynamic biquad filters, zero MP3 assets.' },
  { name: 'TYPESCRIPT 5.8', type: 'STRICT TYPE SYSTEM', status: 'VERIFIED', desc: '100% strictly typed codebase, zero any escape hatches, complete integrity.' },
];

export const DigitalToolboxSection: React.FC<DigitalToolboxProps> = ({ setCursorState }) => {
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    'SAMARTH_PATIL OS [Version 2026.04.1]',
    'Type "help" for a list of valid terminal commands.',
    'System ready.'
  ]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    sound.playClick(1400);
    const newHist = [...terminalHistory, `$ ${terminalInput}`];

    if (cmd === 'help') {
      newHist.push('AVAILABLE COMMANDS:');
      newHist.push('  whoami     - Print developer digital identity');
      newHist.push('  skills     - List verified technical modules');
      newHist.push('  manifesto  - Output core engineering creed');
      newHist.push('  contact    - Retrieve direct transmission channels');
      newHist.push('  neofetch   - Display system hardware & architecture specs');
      newHist.push('  clear      - Reset terminal view');
    } else if (cmd === 'whoami') {
      newHist.push('SAMARTH PATIL // CREATIVE DEVELOPER & 3D DIGITAL ARCHITECT');
      newHist.push('Location: 13.0844° N, 80.2707° E | Status: BUILDING');
    } else if (cmd === 'skills') {
      newHist.push('CORE: Next.js, React, TypeScript, Node.js');
      newHist.push('GRAPHICS: Three.js, WebGL, GLSL, GSAP, Web Audio API');
    } else if (cmd === 'manifesto') {
      newHist.push("I DON'T JUST WRITE CODE. I BUILD DIGITAL EXPERIENCES.");
    } else if (cmd === 'contact') {
      newHist.push('EMAIL: samarth@samarthpatil.dev');
      newHist.push('GITHUB: github.com/samarthpatil');
      newHist.push('LINKEDIN: linkedin.com/in/samarthpatil');
    } else if (cmd === 'neofetch') {
      newHist.push('OS: SAMARTH_ARCHITECT_OS x86_64');
      newHist.push('KERNEL: 6.12.0-creative-glsl');
      newHist.push('UPTIME: 24/7/365 building');
      newHist.push('WM: Swiss Grid 12-Col');
      newHist.push('TERMINAL: WebGL Custom Shell');
      newHist.push('GPU: Apple M-Series / NVIDIA RTX / WebGL 2.0');
    } else if (cmd === 'clear') {
      setTerminalHistory([]);
      setTerminalInput('');
      return;
    } else {
      newHist.push(`bash: command not found: ${cmd}. Type "help" for command index.`);
    }

    setTerminalHistory(newHist);
    setTerminalInput('');
  };

  return (
    <section
      id="toolbox"
      className="relative w-full min-h-screen bg-[#050505] text-[#F2F2F2] border-b border-[#1F1F1F] py-24 md:py-36 px-6 md:px-12 select-none"
      onMouseEnter={() => setCursorState('EXPLORE')}
      onMouseLeave={() => setCursorState('DEFAULT')}
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between border-b border-[#1F1F1F] pb-4 gap-4">
          <div>
            <div className="font-silkscreen text-xs text-[#FF3B00] uppercase tracking-widest flex items-center space-x-2">
              <span className="w-2 h-2 bg-[#FF3B00]" />
              <span>// SECTION 11: TECH STACK &amp; DIGITAL TOOLBOX OS</span>
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-black tracking-tight text-[#F2F2F2] mt-1">
              SYSTEM OPERATING ENVIRONMENT
            </h2>
          </div>
          <div className="font-pixel text-xs text-[#666666]">
            [ CLI COMMAND RUNNER + MODULE MATRIX ]
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Terminal CLI Shell */}
          <div className="lg:col-span-6 bg-[#0D0D0D] border-2 border-[#1F1F1F] p-6 font-pixel text-xs space-y-4">
            {/* Terminal Titlebar */}
            <div className="flex justify-between items-center border-b border-[#1F1F1F] pb-3 text-[#666]">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 bg-[#FF3B00]" />
                <span className="text-[#F2F2F2] font-bold">SAMARTH_PATIL_CLI // BASH</span>
              </div>
              <span>UTF-8 // TTY1</span>
            </div>

            {/* Terminal Output */}
            <div className="h-64 overflow-y-auto space-y-1 text-[#CCCCCC] bg-black p-4 border border-[#222] font-pixel text-[11px] leading-relaxed">
              {terminalHistory.map((line, i) => (
                <div
                  key={i}
                  className={
                    line.startsWith('$')
                      ? 'text-[#FF3B00] font-bold'
                      : line.includes('SAMARTH')
                      ? 'text-white font-bold'
                      : 'text-[#888888]'
                  }
                >
                  {line}
                </div>
              ))}
            </div>

            {/* Terminal Form Input */}
            <form onSubmit={handleCommand} className="flex space-x-2 pt-2">
              <span className="text-[#FF3B00] font-bold">&gt;</span>
              <input
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                placeholder="type command (e.g. 'help', 'whoami', 'neofetch')..."
                className="w-full bg-black border border-[#333] px-3 py-1.5 font-pixel text-xs text-[#F2F2F2] focus:outline-none focus:border-[#FF3B00]"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-[#FF3B00] text-black font-bold text-xs hover:bg-[#ff5522]"
              >
                [ RUN ]
              </button>
            </form>
          </div>

          {/* Right Column: Hardware & Engine Modules */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3 font-pixel text-xs">
            {TOOLBOX_MODULES.map((mod, idx) => (
              <div
                key={mod.name}
                onMouseEnter={() => {
                  setCursorState('INTERACT');
                  sound.playTick(1200 + idx * 50);
                }}
                onMouseLeave={() => setCursorState('DEFAULT')}
                className="bg-[#0D0D0D] border border-[#1F1F1F] hover:border-[#FF3B00] p-4 space-y-2 group transition-all"
              >
                <div className="flex justify-between items-start">
                  <span className="text-[#666] text-[10px]">{mod.type}</span>
                  <span className="text-[#FF3B00] text-[10px] font-bold">{mod.status}</span>
                </div>
                <h4 className="font-display font-black text-base text-[#F2F2F2] group-hover:text-white">
                  {mod.name}
                </h4>
                <p className="text-[#777] text-[11px] leading-relaxed">
                  {mod.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
