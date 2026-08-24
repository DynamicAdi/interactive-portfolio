import React, { useState } from 'react';
import { sound } from '../utils/audio';
import { CursorState } from '../types';
import { Cpu, Terminal, Shield, Zap, Sparkles, Activity } from 'lucide-react';

interface DigitalIdentityProps {
  setCursorState: (state: CursorState) => void;
}

export const DigitalIdentitySection: React.FC<DigitalIdentityProps> = ({ setCursorState }) => {
  const [activeTab, setActiveTab] = useState<'IDENTITY' | 'SYSTEM_SPECS' | 'TELEMETRY'>('IDENTITY');
  const [isScanning, setIsScanning] = useState(false);

  const triggerScan = () => {
    sound.playGlitch();
    setIsScanning(true);
    setTimeout(() => {
      sound.playDeepPulse();
      setIsScanning(false);
    }, 1200);
  };

  return (
    <section
      id="identity"
      className="relative w-full min-h-screen bg-[#070707] text-[#F2F2F2] border-b border-[#1F1F1F] py-24 md:py-32 px-6 md:px-12 select-none"
      onMouseEnter={() => setCursorState('EXPLORE')}
      onMouseLeave={() => setCursorState('DEFAULT')}
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between border-b border-[#1F1F1F] pb-4 gap-4">
          <div className="flex items-center space-x-3">
            <span className="w-2 h-2 bg-[#FF3B00]" />
            <span className="font-silkscreen text-xs text-[#FF3B00] uppercase tracking-widest">
              // SECTION 03: DIGITAL IDENTITY &amp; ANATOMY
            </span>
          </div>
          <div className="font-pixel text-xs text-[#666666] flex items-center space-x-4">
            <span>KERNEL: ARCHITECT_V26</span>
            <span className="text-[#FF3B00]">[ STATUS: 100% BUILDING ]</span>
          </div>
        </div>

        {/* Main Swiss Grid Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Portrait & 3D Scanning HUD */}
          <div className="lg:col-span-5 relative group">
            <div className="relative bg-[#0D0D0D] border border-[#1F1F1F] p-4 overflow-hidden">
              {/* Corner Pixel Notches */}
              <div className="absolute top-0 left-0 w-2 h-2 bg-[#FF3B00]" />
              <div className="absolute top-0 right-0 w-2 h-2 bg-[#FF3B00]" />
              <div className="absolute bottom-0 left-0 w-2 h-2 bg-[#FF3B00]" />
              <div className="absolute bottom-0 right-0 w-2 h-2 bg-[#FF3B00]" />

              {/* Portrait Visual Image / Digital Architectural Render */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-black">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop"
                  alt="Samarth Patil Digital Entity"
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover filter grayscale contrast-125 group-hover:contrast-150 transition-all duration-500 ${
                    isScanning ? 'scale-105 filter invert' : 'scale-100'
                  }`}
                />

                {/* Scanline & Glitch HUD Overlay */}
                <div className="absolute inset-0 scanlines opacity-60 pointer-events-none" />

                {/* Animated Laser Scanning Line */}
                {isScanning && (
                  <div className="absolute left-0 right-0 h-1 bg-[#FF3B00] shadow-[0_0_15px_#FF3B00] animate-bounce top-1/2" />
                )}

                {/* Realtime Floating Image Annotations */}
                <div className="absolute top-3 left-3 bg-black/80 border border-[#FF3B00]/60 px-2 py-1 font-pixel text-[10px] text-[#FF3B00] backdrop-blur-sm">
                  NODE: SAMARTH_01
                </div>

                <div className="absolute bottom-3 right-3 bg-black/80 border border-white/20 px-2 py-1 font-pixel text-[10px] text-[#F2F2F2] backdrop-blur-sm">
                  13.0844° N // LAT
                </div>
              </div>

              {/* Scan Trigger Button */}
              <div className="mt-4 flex items-center justify-between font-pixel text-xs">
                <button
                  onClick={triggerScan}
                  onMouseEnter={() => {
                    setCursorState('INTERACT');
                    sound.playTick();
                  }}
                  onMouseLeave={() => setCursorState('DEFAULT')}
                  className="px-3 py-1.5 border border-[#FF3B00] text-[#FF3B00] hover:bg-[#FF3B00] hover:text-black font-bold transition-all flex items-center space-x-2"
                >
                  <Activity className="w-3.5 h-3.5" />
                  <span>{isScanning ? '[ SCANNING... ]' : '[ DIAGNOSTIC SCAN ]'}</span>
                </button>

                <span className="text-[#666666]">FRAME: 480 × 600px</span>
              </div>
            </div>

            {/* Quick Micro-Stats under portrait */}
            <div className="grid grid-cols-2 gap-3 mt-4 font-pixel text-xs">
              <div className="bg-[#0D0D0D] border border-[#1F1F1F] p-3">
                <div className="text-[#666666]">PRIMARY ENGINE</div>
                <div className="text-[#F2F2F2] font-bold mt-1">THREE.JS / GLSL</div>
              </div>
              <div className="bg-[#0D0D0D] border border-[#1F1F1F] p-3">
                <div className="text-[#666666]">SPATIAL ACCURACY</div>
                <div className="text-[#FF3B00] font-bold mt-1">99.98% REALTIME</div>
              </div>
            </div>
          </div>

          {/* Right Column: Swiss Typography & Diagnostic Telemetry Tabs */}
          <div className="lg:col-span-7 space-y-8">
            {/* Massive Heading */}
            <div>
              <div className="font-silkscreen text-xs text-[#FF3B00] tracking-wider uppercase">
                // DIGITAL CREATIVE ARCHITECT
              </div>
              <h2 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-[#F2F2F2] mt-1">
                SAMARTH <span className="text-[#FF3B00]">PATIL</span>
              </h2>
              <p className="font-pixel text-xs text-[#888888] mt-2 tracking-widest uppercase">
                DISCIPLINE: GRAPHICS CODING × SWISS DESIGN SYSTEMS × FULL-STACK LOGIC
              </p>
            </div>

            {/* Tab Selectors */}
            <div className="flex border-b border-[#1F1F1F] font-pixel text-xs">
              {(['IDENTITY', 'SYSTEM_SPECS', 'TELEMETRY'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    sound.playTick(1300);
                    setActiveTab(tab);
                  }}
                  onMouseEnter={() => {
                    setCursorState('INTERACT');
                    sound.playTick();
                  }}
                  onMouseLeave={() => setCursorState('DEFAULT')}
                  className={`px-4 py-2.5 border-b-2 font-bold transition-colors ${
                    activeTab === tab
                      ? 'border-[#FF3B00] text-[#FF3B00] bg-[#FF3B00]/5'
                      : 'border-transparent text-[#666666] hover:text-[#F2F2F2]'
                  }`}
                >
                  [ {tab} ]
                </button>
              ))}
            </div>

            {/* Tab Contents */}
            {activeTab === 'IDENTITY' && (
              <div className="space-y-6 font-pixel text-xs md:text-sm text-[#CCCCCC]">
                <div className="bg-[#0D0D0D] border border-[#1F1F1F] p-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-[#1F1F1F] pb-4">
                    <div>
                      <span className="text-[#666666] block">NAME_STRING:</span>
                      <span className="text-[#F2F2F2] font-bold text-base">SAMARTH PATIL</span>
                    </div>
                    <div>
                      <span className="text-[#666666] block">OPERATIONAL_ROLE:</span>
                      <span className="text-[#FF3B00] font-bold text-base">CREATIVE DEVELOPER</span>
                    </div>
                    <div>
                      <span className="text-[#666666] block">BASE_LOCATION:</span>
                      <span className="text-[#F2F2F2]">BENGALURU, INDIA / GLOBAL DIGITAL VOID</span>
                    </div>
                    <div>
                      <span className="text-[#666666] block">SYSTEM_STATUS:</span>
                      <span className="text-[#FF3B00] font-bold">● ACTIVE &amp; BUILDING</span>
                    </div>
                  </div>

                  <p className="leading-relaxed text-[#B0B0B0] font-sans text-sm md:text-base">
                    I operate at the convergence point between architectural rigor and creative digital engineering. 
                    I transform complex browser APIs, WebGL compute buffers, and typography systems into visceral, 
                    unforgettable experiences that feel tactile, physical, and alive.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'SYSTEM_SPECS' && (
              <div className="space-y-3 font-pixel text-xs">
                {[
                  { label: 'RENDER_ENGINE', val: 'Three.js 0.170 + Custom GLSL Fragment Passes' },
                  { label: 'ANIMATION_BACKBONE', val: 'GSAP 3.12 + ScrollTrigger Scrub + Lenis' },
                  { label: 'TYPE_FOUNDRY', val: 'Space Grotesk (Body) + Syne (Display) + JetBrains (Code)' },
                  { label: 'GRID_SPECIFICATION', val: '12-Column Swiss Modular Matrix with 8px Sub-Units' },
                  { label: 'AUDIO_SYNTH', val: 'Direct Web Audio API procedural oscillator engine' },
                ].map((spec, i) => (
                  <div key={i} className="flex justify-between items-center bg-[#0D0D0D] border border-[#1F1F1F] p-3 hover:border-[#333]">
                    <span className="text-[#666666]">{spec.label}</span>
                    <span className="text-[#F2F2F2] font-bold text-right">{spec.val}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'TELEMETRY' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-pixel text-xs">
                <div className="bg-[#0D0D0D] border border-[#1F1F1F] p-4 space-y-2">
                  <div className="text-[#666666]">COMMITS / PRODUCTION</div>
                  <div className="text-2xl font-bold text-[#FF3B00]">2,840+</div>
                  <div className="text-[10px] text-[#555]">Zero dropped frames in main loop</div>
                </div>
                <div className="bg-[#0D0D0D] border border-[#1F1F1F] p-4 space-y-2">
                  <div className="text-[#666666]">SHADER PASSES WRITTEN</div>
                  <div className="text-2xl font-bold text-[#F2F2F2]">140+</div>
                  <div className="text-[10px] text-[#555]">Volumetric, Raymarched, Voronoi</div>
                </div>
                <div className="bg-[#0D0D0D] border border-[#1F1F1F] p-4 space-y-2">
                  <div className="text-[#666666]">TYPOGRAPHIC RATIO</div>
                  <div className="text-2xl font-bold text-[#F2F2F2]">1.333</div>
                  <div className="text-[10px] text-[#555]">Perfect Fourth Scale Hierarchy</div>
                </div>
                <div className="bg-[#0D0D0D] border border-[#1F1F1F] p-4 space-y-2">
                  <div className="text-[#666666]">GLOBAL PING DELTA</div>
                  <div className="text-2xl font-bold text-[#FF3B00]">&lt; 16.6ms</div>
                  <div className="text-[10px] text-[#555]">60.0 FPS constant refresh cycle</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
