import React, { useState, useEffect, useRef } from 'react';
import { sound } from '../utils/audio';
import { CursorState } from '../types';
import { Play, Sparkles, Volume2, Move, RefreshCw, Terminal, Layers, Radio } from 'lucide-react';

interface CreativePlaygroundProps {
  setCursorState: (state: CursorState) => void;
}

export const CreativePlaygroundSection: React.FC<CreativePlaygroundProps> = ({ setCursorState }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeExp, setActiveExp] = useState<'PARTICLES' | 'SYNTH' | 'ASCII'>('PARTICLES');
  const [asciiInput, setAsciiInput] = useState('SAMARTH');
  const [asciiOutput, setAsciiOutput] = useState('');
  const [synthStep, setSynthStep] = useState(0);
  const [isPlayingSynth, setIsPlayingSynth] = useState(false);

  // 1. Particle Attractor Simulation Canvas
  useEffect(() => {
    if (activeExp !== 'PARTICLES') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.clientWidth);
    let height = (canvas.height = canvas.clientHeight);

    const numParticles = 300;
    const particles = Array.from({ length: numParticles }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: Math.random() * 2 + 1,
      color: Math.random() > 0.8 ? '#FF3B00' : Math.random() > 0.5 ? '#FFFFFF' : '#555555',
    }));

    let mouseX = width / 2;
    let mouseY = height / 2;
    let isHovering = false;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      isHovering = true;
    };

    const handleMouseLeave = () => {
      isHovering = false;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      animId = requestAnimationFrame(render);
      ctx.fillStyle = 'rgba(5, 5, 5, 0.25)';
      ctx.fillRect(0, 0, width, height);

      // Draw and update particles
      particles.forEach((p) => {
        if (isHovering) {
          const dx = mouseX - p.x;
          const dy = mouseY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180 && dist > 5) {
            p.vx += (dx / dist) * 0.4;
            p.vy += (dy / dist) * 0.4;
          }
        }

        p.x += p.vx;
        p.y += p.vy;

        // Friction
        p.vx *= 0.96;
        p.vy *= 0.96;

        // Boundary bounce
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      });
    };

    render();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.clientWidth;
      height = canvas.height = canvas.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [activeExp]);

  // 2. ASCII generator
  useEffect(() => {
    const chars = ['█', '▓', '▒', '░', ' ', '+', '#', '*', ':'];
    const lines = [];
    const text = asciiInput.toUpperCase() || 'SAMARTH';

    for (let row = 0; row < 5; row++) {
      let line = '';
      for (let i = 0; i < text.length; i++) {
        const c = text[i];
        line += ` [${c}${c}] `;
      }
      lines.push(line);
    }
    setAsciiOutput(lines.join('\n'));
  }, [asciiInput]);

  // 3. Audio Synth Step Sequencer
  const synthNotes = [220, 277.18, 329.63, 440, 554.37, 659.25, 880, 1108.73];
  const [activeGrid, setActiveGrid] = useState<boolean[][]>(
    Array(8).fill(false).map(() => Array(8).fill(false))
  );

  const toggleSynthCell = (row: number, col: number) => {
    sound.playSynthNote(synthNotes[7 - row], 0.15, 'square');
    setActiveGrid((prev) => {
      const next = prev.map((r) => [...r]);
      next[row][col] = !next[row][col];
      return next;
    });
  };

  useEffect(() => {
    if (!isPlayingSynth) return;
    const interval = setInterval(() => {
      setSynthStep((prev) => {
        const nextStep = (prev + 1) % 8;
        // Trigger active notes
        activeGrid.forEach((row, rowIdx) => {
          if (row[nextStep]) {
            sound.playSynthNote(synthNotes[7 - rowIdx], 0.18, 'sawtooth');
          }
        });
        return nextStep;
      });
    }, 180);

    return () => clearInterval(interval);
  }, [isPlayingSynth, activeGrid, synthNotes]);

  return (
    <section
      id="creative-playground"
      className="relative w-full min-h-screen bg-[#070707] text-[#F2F2F2] border-b border-[#1F1F1F] py-24 md:py-32 px-6 md:px-12 select-none"
      onMouseEnter={() => setCursorState('EXPLORE')}
      onMouseLeave={() => setCursorState('DEFAULT')}
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between border-b border-[#1F1F1F] pb-4 gap-4">
          <div>
            <div className="font-silkscreen text-xs text-[#FF3B00] uppercase tracking-widest flex items-center space-x-2">
              <span className="w-2 h-2 bg-[#FF3B00]" />
              <span>// SECTION 08: CREATIVE PLAYGROUND &amp; CHAOS LAB</span>
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-black tracking-tight text-[#F2F2F2] mt-1">
              EXPERIMENTAL SANDBOX
            </h2>
          </div>

          {/* Experiment Switchers */}
          <div className="flex font-pixel text-xs border border-[#1F1F1F] bg-[#0D0D0D]">
            {(['PARTICLES', 'SYNTH', 'ASCII'] as const).map((exp) => (
              <button
                key={exp}
                onClick={() => {
                  sound.playClick(1300);
                  setActiveExp(exp);
                }}
                onMouseEnter={() => {
                  setCursorState('INTERACT');
                  sound.playTick();
                }}
                onMouseLeave={() => setCursorState('DEFAULT')}
                className={`px-3 py-1.5 transition-colors ${
                  activeExp === exp
                    ? 'bg-[#FF3B00] text-black font-bold'
                    : 'text-[#888888] hover:text-[#F2F2F2]'
                }`}
              >
                {exp === 'PARTICLES' && '01 // PARTICLE ATTRACTOR'}
                {exp === 'SYNTH' && '02 // 8-BIT SEQUENCER'}
                {exp === 'ASCII' && '03 // MONOSPACE SCRAMBLER'}
              </button>
            ))}
          </div>
        </div>

        {/* Experiment Stage Container */}
        <div className="bg-[#0D0D0D] border-2 border-[#1F1F1F] p-6 md:p-10 relative">
          {/* Top Bar Notch */}
          <div className="flex justify-between items-center font-pixel text-xs border-b border-[#1F1F1F] pb-4 mb-6">
            <div className="flex items-center space-x-2 text-[#FF3B00]">
              <span className="w-2 h-2 bg-[#FF3B00]" />
              <span>EXPERIMENT ACTIVE: {activeExp}</span>
            </div>
            <div className="text-[#666]">
              STATUS: REALTIME PROCEDURAL
            </div>
          </div>

          {/* Experiment 1: Particle Attractor */}
          {activeExp === 'PARTICLES' && (
            <div className="space-y-4">
              <div className="relative aspect-[16/9] w-full bg-black border border-[#222] overflow-hidden cursor-crosshair">
                <canvas ref={canvasRef} className="w-full h-full" />
                <div className="absolute top-3 left-3 bg-black/80 border border-[#FF3B00] px-3 py-1 font-pixel text-[11px] text-[#FF3B00] pointer-events-none">
                  MOVE MOUSE TO ATTRACT 300+ GRAVITY PARTICLES
                </div>
              </div>
              <div className="flex justify-between font-pixel text-xs text-[#666]">
                <span>GRAVITATIONAL CONSTANT: G = 0.4</span>
                <span className="text-[#FF3B00]">PRACTICE: NON-EUCLIDEAN FLUID SIMULATION</span>
              </div>
            </div>
          )}

          {/* Experiment 2: Audio Synth Step Sequencer */}
          {activeExp === 'SYNTH' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <button
                  onClick={() => {
                    sound.playClick(1400);
                    setIsPlayingSynth(!isPlayingSynth);
                  }}
                  className={`px-4 py-2 font-pixel text-xs font-bold border transition-colors flex items-center space-x-2 ${
                    isPlayingSynth
                      ? 'bg-[#FF3B00] text-black border-[#FF3B00]'
                      : 'bg-black text-[#F2F2F2] border-[#333] hover:border-[#FF3B00]'
                  }`}
                >
                  <Play className="w-4 h-4" />
                  <span>[ {isPlayingSynth ? 'PAUSE SEQUENCER' : 'PLAY SEQUENCER'} ]</span>
                </button>
                <div className="font-pixel text-xs text-[#888]">
                  PENTATONIC STEP: <span className="text-[#FF3B00] font-bold">{synthStep + 1} / 8</span>
                </div>
              </div>

              {/* 8x8 Matrix Step Grid */}
              <div className="grid grid-rows-8 gap-1.5 bg-black p-4 border border-[#222]">
                {activeGrid.map((row, rIdx) => (
                  <div key={rIdx} className="grid grid-cols-8 gap-1.5">
                    {row.map((active, cIdx) => {
                      const isCurrentStep = synthStep === cIdx;
                      return (
                        <button
                          key={cIdx}
                          onClick={() => toggleSynthCell(rIdx, cIdx)}
                          className={`aspect-square transition-all border ${
                            active
                              ? isCurrentStep
                                ? 'bg-[#FF3B00] border-white shadow-[0_0_12px_#FF3B00]'
                                : 'bg-[#FF3B00]/70 border-[#FF3B00]'
                              : isCurrentStep
                              ? 'bg-[#1A1A1A] border-white/40'
                              : 'bg-[#0E0E0E] border-[#1C1C1C] hover:border-[#444]'
                          }`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>

              <div className="flex justify-between font-pixel text-xs text-[#666]">
                <span>CLICK BLOCKS TO COMPOSE PROCEDURAL CHIPTUNE PATTERNS</span>
                <span className="text-[#FF3B00]">SYNTH: WEB AUDIO PROCEDURAL OSCILLATOR</span>
              </div>
            </div>
          )}

          {/* Experiment 3: Monospace ASCII Scrambler */}
          {activeExp === 'ASCII' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  value={asciiInput}
                  onChange={(e) => {
                    sound.playTick(1200);
                    setAsciiInput(e.target.value);
                  }}
                  maxLength={16}
                  placeholder="TYPE ANY WORD..."
                  className="bg-black border border-[#FF3B00] px-4 py-2 font-pixel text-xs text-[#F2F2F2] uppercase focus:outline-none focus:ring-1 focus:ring-[#FF3B00]"
                />
                <button
                  onClick={() => {
                    sound.playGlitch();
                    setAsciiInput('SAMARTH');
                  }}
                  className="px-4 py-2 bg-[#121212] border border-[#333] hover:border-[#FF3B00] font-pixel text-xs text-[#888] hover:text-[#F2F2F2]"
                >
                  [ RESET TO 'SAMARTH' ]
                </button>
              </div>

              <div className="bg-black border border-[#222] p-6 font-pixel text-xs md:text-sm text-[#FF3B00] overflow-x-auto whitespace-pre leading-tight shadow-inner">
                {asciiOutput}
              </div>

              <div className="font-pixel text-xs text-[#666]">
                PROCEDURAL GLYPH ENCODING PIPELINE
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
