import React, { useEffect, useState } from 'react';
import { sound } from '../utils/audio';

interface BootLoaderProps {
  onComplete: () => void;
}

const BOOT_LOGS = [
  'INITIALIZING SYSTEM ARCHITECTURE...',
  'ALLOCATING ISOMETRIC 3D VOXEL BUFFERS...',
  'CALCULATING SWISS MODULAR GRID (8PT BASELINE)...',
  'LOADING DIGITAL SPACE & TOPOLOGY...',
  'CONNECTING GLOBAL MATRIX TELEMETRY NODES...',
  'COMPILING IDEAS & SHADERS (14 PASSES)...',
  'BOOTING SAMARTH PATIL IDENTITY KERNEL...',
  'RENDERING EXPERIENCE...',
  'READY FOR EXPLORATION.'
];

export const BootLoader: React.FC<BootLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentLogIndex, setCurrentLogIndex] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Sound & progress interval
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const next = Math.min(100, prev + Math.floor(Math.random() * 15) + 6);
        if (next % 20 === 0) {
          sound.playTick(1000 + next * 8);
        }
        return next;
      });
    }, 110);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Advance logs based on progress
    const idx = Math.min(
      BOOT_LOGS.length - 1,
      Math.floor((progress / 100) * BOOT_LOGS.length)
    );
    if (idx !== currentLogIndex) {
      setCurrentLogIndex(idx);
      if (idx % 2 === 0) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 120);
      }
    }
  }, [progress, currentLogIndex]);

  useEffect(() => {
    if (progress === 100) {
      sound.playDeepPulse();
      const exitTimer = setTimeout(() => {
        setIsExiting(true);
        sound.playGlitch();
        const finishTimer = setTimeout(() => {
          onComplete();
        }, 600);
        return () => clearTimeout(finishTimer);
      }, 500);
      return () => clearTimeout(exitTimer);
    }
  }, [progress, onComplete]);

  // Construct pixel block representation: e.g. [██████░░░░]
  const filledBlocks = Math.floor(progress / 10);
  const emptyBlocks = 10 - filledBlocks;
  const blockBar = '█'.repeat(filledBlocks) + '░'.repeat(emptyBlocks);

  return (
    <div
      className={`fixed inset-0 z-[99999] bg-[#050505] text-[#F2F2F2] flex flex-col justify-between p-6 md:p-12 overflow-hidden transition-all duration-700 select-none ${
        isExiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Matrix/Grid & Scanlines */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute inset-0 scanlines opacity-50 pointer-events-none" />

      {/* Top Bar: System Coordinates & Header */}
      <div className="relative z-10 flex items-center justify-between font-pixel text-xs text-[#666666] border-b border-[#1F1F1F] pb-4">
        <div className="flex items-center space-x-3">
          <span className="w-2 h-2 bg-[#FF3B00] animate-ping inline-block" />
          <span className="text-[#F2F2F2] font-bold">BOOT SEQUENCE // V.2026.4</span>
        </div>
        <div className="hidden sm:flex items-center space-x-6">
          <span>LAT: 13.0844° N</span>
          <span>LNG: 80.2707° E</span>
          <span className="text-[#FF3B00]">AUTH: SAMARTH_PATIL</span>
        </div>
      </div>

      {/* Center Digital Terminal Stage */}
      <div className="relative z-10 max-w-2xl mx-auto w-full my-auto space-y-8">
        {/* Massive Identity Monogram Preview */}
        <div className="flex items-center space-x-4 border-l-2 border-[#FF3B00] pl-4">
          <div>
            <div className="font-silkscreen text-xs text-[#FF3B00] tracking-widest uppercase">
              // ARCHITECTURAL IDENTITY SYSTEM
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-extrabold tracking-tighter text-[#F2F2F2]">
              SAMARTH <span className="text-[#FF3B00]">PATIL</span>
            </h1>
            <p className="font-pixel text-xs text-[#666666] mt-1">
              CREATIVE DEVELOPER × SWISS ISOMETRIC ARCHITECTURE
            </p>
          </div>
        </div>

        {/* Live Terminal Log Stream */}
        <div className="bg-[#0D0D0D] border border-[#1F1F1F] p-4 font-pixel text-xs space-y-2 h-36 flex flex-col justify-end shadow-2xl">
          {BOOT_LOGS.slice(0, currentLogIndex + 1).slice(-4).map((log, i, arr) => (
            <div
              key={i}
              className={`flex items-center space-x-2 ${
                i === arr.length - 1 ? 'text-[#FF3B00] font-bold' : 'text-[#666666]'
              }`}
            >
              <span>&gt;</span>
              <span className={i === arr.length - 1 && isGlitching ? 'animate-glitch' : ''}>
                {log}
              </span>
            </div>
          ))}
        </div>

        {/* Progress Bar & Numeric Readout */}
        <div className="space-y-3">
          <div className="flex justify-between items-baseline font-pixel text-xs">
            <span className="text-[#F2F2F2] tracking-wider">
              SYSTEM_LOAD: <span className="text-[#FF3B00]">[{blockBar}]</span>
            </span>
            <span className="text-xl font-bold font-pixel text-[#FF3B00]">
              {progress}%
            </span>
          </div>

          <div className="w-full h-1.5 bg-[#1A1A1A] overflow-hidden border border-[#222]">
            <div
              className="h-full bg-[#FF3B00] transition-all duration-100 shadow-[0_0_12px_#FF3B00]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Footer Diagnostic Metadata */}
      <div className="relative z-10 flex flex-wrap items-center justify-between font-pixel text-[11px] text-[#666666] border-t border-[#1F1F1F] pt-4 gap-2">
        <div>CORE ENGINE: THREE.JS + GSAP + LENIS + WEB AUDIO</div>
        <div className="flex items-center space-x-4">
          <span>MEM: 128MB</span>
          <span>GPU: ACCELERATED</span>
          <span className="text-[#FF3B00]">SWISS × PIXEL × 3D</span>
        </div>
      </div>
    </div>
  );
};
