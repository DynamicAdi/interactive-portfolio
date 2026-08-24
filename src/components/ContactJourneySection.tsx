import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { TIMELINE_EXPERIENCE } from '../data/portfolioData';
import { sound } from '../utils/audio';
import { CursorState } from '../types';
import { Mail, Github, Linkedin, Twitter, Sparkles, Send, Copy, Check, ArrowUpRight } from 'lucide-react';

interface ContactJourneyProps {
  setCursorState: (state: CursorState) => void;
}

export const ContactJourneySection: React.FC<ContactJourneyProps> = ({ setCursorState }) => {
  const [copied, setCopied] = useState(false);
  const [isSingularity, setIsSingularity] = useState(false);

  const copyEmail = () => {
    sound.playClick(1500);
    navigator.clipboard.writeText('samarth@samarthpatil.dev');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const triggerSingularity = () => {
    sound.playDeepPulse();
    sound.playGlitch();
    setIsSingularity(true);

    try {
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.8 },
        colors: ['#FF3B00', '#FFFFFF', '#050505', '#666666']
      });
    } catch {
      // Confetti fallback
    }

    setTimeout(() => {
      setIsSingularity(false);
    }, 2500);
  };

  return (
    <section
      id="contact-journey"
      className={`relative w-full min-h-screen bg-[#050505] text-[#F2F2F2] py-24 md:py-36 px-6 md:px-12 select-none transition-all duration-700 ${
        isSingularity ? 'filter invert scale-95' : ''
      }`}
      onMouseEnter={() => setCursorState('EXPLORE')}
      onMouseLeave={() => setCursorState('DEFAULT')}
    >
      <div className="max-w-7xl mx-auto space-y-24">
        {/* Section 12A: Terminal Experience Timeline */}
        <div className="space-y-8">
          <div className="flex justify-between items-center border-b border-[#1F1F1F] pb-4">
            <div className="flex items-center space-x-3">
              <span className="w-2 h-2 bg-[#FF3B00]" />
              <span className="font-silkscreen text-xs text-[#FF3B00] uppercase tracking-widest">
                // SECTION 12: THE JOURNEY &amp; TIMELINE
              </span>
            </div>
            <div className="font-pixel text-xs text-[#666666]">
              2022 — 2026+ // PERSISTENCE LOG
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {TIMELINE_EXPERIENCE.map((t, idx) => (
              <div
                key={t.year}
                onMouseEnter={() => {
                  setCursorState('INTERACT');
                  sound.playTick(1000 + idx * 100);
                }}
                onMouseLeave={() => setCursorState('DEFAULT')}
                className="bg-[#0D0D0D] border border-[#1F1F1F] hover:border-[#FF3B00] p-5 font-pixel text-xs flex flex-col justify-between group transition-all"
              >
                <div>
                  <div className="flex justify-between items-center text-[#FF3B00] font-bold text-sm">
                    <span>{t.year}</span>
                    <span className="text-[10px] bg-[#1A1A1A] px-1.5 py-0.5 text-[#AAA] border border-[#222]">
                      {t.status}
                    </span>
                  </div>
                  <h4 className="font-display font-black text-sm text-[#F2F2F2] mt-3 group-hover:text-white">
                    {t.title}
                  </h4>
                  <p className="font-sans text-xs text-[#777777] mt-2 leading-relaxed">
                    {t.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 12B: Massive Final Statement */}
        <div className="text-center py-12 space-y-6">
          <div className="font-silkscreen text-xs text-[#FF3B00] tracking-widest uppercase">
            // READY FOR THE UNCONVENTIONAL?
          </div>
          <h2 className="font-display text-5xl sm:text-7xl md:text-9xl font-black uppercase tracking-tight text-[#F2F2F2] leading-none">
            LET'S BUILD<br />
            SOMETHING<br />
            <span className="text-[#FF3B00] underline decoration-[#FF3B00]/40 decoration-8">
              WEIRD.
            </span>
          </h2>
          <p className="font-pixel text-xs md:text-sm text-[#888888] max-w-xl mx-auto mt-4">
            Open for high-impact creative engineering roles, bespoke spatial web projects, 
            and non-standard digital architecture collaborations.
          </p>
        </div>

        {/* Section 12C: High Impact Magnetic CTAs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 font-pixel text-xs">
          {/* Email Copy Box */}
          <div
            onClick={copyEmail}
            onMouseEnter={() => {
              setCursorState('INTERACT');
              sound.playTick();
            }}
            onMouseLeave={() => setCursorState('DEFAULT')}
            className="bg-[#0D0D0D] border border-[#1F1F1F] hover:border-[#FF3B00] p-6 flex flex-col justify-between cursor-pointer group transition-all"
          >
            <div className="flex justify-between items-center text-[#666]">
              <span>ELECTRONIC TRANSMISSION</span>
              <Mail className="w-4 h-4 text-[#FF3B00]" />
            </div>
            <div className="my-4">
              <span className="text-[#888] text-[10px] block">PRIMARY INBOX:</span>
              <span className="text-[#F2F2F2] font-bold text-sm group-hover:text-[#FF3B00] transition-colors">
                samarth@samarthpatil.dev
              </span>
            </div>
            <div className="flex items-center space-x-2 text-[#FF3B00]">
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="font-bold">{copied ? 'COPIED TO CLIPBOARD!' : '[ CLICK TO COPY ]'}</span>
            </div>
          </div>

          {/* GitHub Channel */}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => {
              setCursorState('OPEN');
              sound.playTick();
            }}
            onMouseLeave={() => setCursorState('DEFAULT')}
            className="bg-[#0D0D0D] border border-[#1F1F1F] hover:border-[#FF3B00] p-6 flex flex-col justify-between group transition-all"
          >
            <div className="flex justify-between items-center text-[#666]">
              <span>OPEN SOURCE REPOSITORY</span>
              <Github className="w-4 h-4 text-[#FF3B00]" />
            </div>
            <div className="my-4">
              <span className="text-[#888] text-[10px] block">OCTOCAT:</span>
              <span className="text-[#F2F2F2] font-bold text-sm group-hover:text-white">
                github.com/samarthpatil
              </span>
            </div>
            <div className="text-[#888] group-hover:text-[#FF3B00] flex items-center space-x-1">
              <span>[ EXPLORE COMMITS ]</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </a>

          {/* LinkedIn Channel */}
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => {
              setCursorState('OPEN');
              sound.playTick();
            }}
            onMouseLeave={() => setCursorState('DEFAULT')}
            className="bg-[#0D0D0D] border border-[#1F1F1F] hover:border-[#FF3B00] p-6 flex flex-col justify-between group transition-all"
          >
            <div className="flex justify-between items-center text-[#666]">
              <span>NETWORK GRAPH</span>
              <Linkedin className="w-4 h-4 text-[#FF3B00]" />
            </div>
            <div className="my-4">
              <span className="text-[#888] text-[10px] block">PROFESSIONAL IDENTITY:</span>
              <span className="text-[#F2F2F2] font-bold text-sm group-hover:text-white">
                linkedin.com/in/samarthpatil
              </span>
            </div>
            <div className="text-[#888] group-hover:text-[#FF3B00] flex items-center space-x-1">
              <span>[ CONNECT NETWORK ]</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </a>

          {/* Singularity Collapse Interaction */}
          <div
            onClick={triggerSingularity}
            onMouseEnter={() => {
              setCursorState('EXECUTE');
              sound.playTick(1600);
            }}
            onMouseLeave={() => setCursorState('DEFAULT')}
            className="bg-[#FF3B00] text-black p-6 flex flex-col justify-between cursor-pointer hover:bg-[#ff5522] transition-all shadow-[0_0_30px_rgba(255,59,0,0.3)]"
          >
            <div className="flex justify-between items-center font-bold">
              <span>QUANTUM REALITY COLLAPSE</span>
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="my-4 font-display font-black text-lg">
              COLLAPSE INTO SINGULARITY
            </div>
            <div className="font-bold text-[10px] uppercase tracking-wider">
              [ CLICK TO DETONATE ]
            </div>
          </div>
        </div>

        {/* Editorial Footer Bottom Bar */}
        <div className="border-t border-[#1F1F1F] pt-8 flex flex-wrap items-center justify-between font-pixel text-xs text-[#666666] gap-4">
          <div>
            © 2026 SAMARTH PATIL // ALL RIGHTS RESERVED. SWISS INTERNATIONAL PIXEL SYSTEM.
          </div>
          <div className="flex items-center space-x-6 text-[#888]">
            <span>DESIGNED WITH RAW CODE</span>
            <span className="text-[#FF3B00]">ZERO AI SLOP</span>
          </div>
        </div>
      </div>
    </section>
  );
};
