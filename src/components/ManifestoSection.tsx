import React, { useCallback, useEffect, useRef, useState } from 'react';
import { sound } from '../utils/audio';
import { CursorState } from '../types';

interface ManifestoProps {
  setCursorState: (state: CursorState) => void;
}

const SCRAMBLE_CHARS = '!<>-_\\/[]{}=+*^?#01';
const randomGlyph = () => SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];

interface GlyphProps {
  char: string;
  revealDelay: number;
  inView: boolean;
  glitchTick: number;
  className?: string;
  onHover?: () => void;
}

/** A single animated character: scrambles through random glyphs, then settles. */
const Glyph: React.FC<GlyphProps> = ({
  char,
  revealDelay,
  inView,
  glitchTick,
  className,
  onHover,
}) => {
  // Detect normal spaces, non-breaking spaces, tabs, newlines, etc.
  const isSpace = /^\s$/.test(char);

  // Preserve whitespace visually
  const displayChar = isSpace ? '\u00A0' : char;

  const [display, setDisplay] = useState(displayChar);
  const [revealed, setRevealed] = useState(isSpace);

  const intervalRef = useRef<number | null>(null);

  const timeoutRef = useRef<number | null>(null);

  const initialTimeoutRef =
    useRef<number | null>(null);

  const scramble = useCallback(
    (durationMs: number, onDone?: () => void) => {
      if (isSpace) return;

      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }

      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }

      intervalRef.current = window.setInterval(() => {
        setDisplay(randomGlyph());
      }, 40);

      timeoutRef.current = window.setTimeout(() => {
        if (intervalRef.current) {
          window.clearInterval(intervalRef.current);
        }

        setDisplay(char);

        onDone?.();
      }, durationMs);
    },
    [char, isSpace]
  );

  // Decode-in reveal
  useEffect(() => {
    if (isSpace || !inView || revealed) return;

    setDisplay(randomGlyph());

    initialTimeoutRef.current = window.setTimeout(() => {
      scramble(200, () => {
        setRevealed(true);
      });
    }, revealDelay);

    return () => {
      if (initialTimeoutRef.current) {
        window.clearTimeout(initialTimeoutRef.current);
      }
    };
  }, [inView, isSpace, revealed, revealDelay, scramble]);

  // Scroll glitch effect
  useEffect(() => {
    if (glitchTick === 0 || !revealed || isSpace) return;

    if (Math.random() > 0.3) return;

    scramble(150);
  }, [glitchTick, revealed, isSpace, scramble]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }

      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }

      if (initialTimeoutRef.current) {
        window.clearTimeout(initialTimeoutRef.current);
      }
    };
  }, []);

  return (
    <span
      className={`${className ?? ''} ${isSpace ? 'inline-block' : ''}`}
      onMouseEnter={() => {
        if (isSpace) return;

        onHover?.();

        scramble(240);
      }}
    >
      {isSpace ? '\u00A0' : display}
    </span>
  );
};

export const ManifestoSection: React.FC<ManifestoProps> = ({ setCursorState }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [glitchTick, setGlitchTick] = useState(0);
  const [parallax, setParallax] = useState({ a: 0, b: 0 });

  const lastScrollY = useRef(0);
  const lastTime = useRef(Date.now());
  const lastGlitch = useRef(0);
  const ticking = useRef(false);

  // Trigger the decode-in reveal once the section is on screen
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Subtle parallax drift + fast-scroll glitch trigger (replaces the old skew)
  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const el = containerRef.current;
        if (el) {
          const rect = el.getBoundingClientRect();
          const center = rect.top + rect.height / 2 - window.innerHeight / 2;
          const progress = Math.max(-1, Math.min(1, center / (window.innerHeight * 0.8)));
          setParallax({ a: progress * -14, b: progress * 10 });
        }

        const now = Date.now();
        const currentY = window.scrollY;
        const velocity = Math.abs((currentY - lastScrollY.current) / Math.max(1, now - lastTime.current));
        lastScrollY.current = currentY;
        lastTime.current = now;

        if (velocity > 1.1 && now - lastGlitch.current > 700) {
          lastGlitch.current = now;
          setGlitchTick((t) => t + 1);
        }
        ticking.current = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const line1 = "I DON'T JUST WRITE CODE.";
  const line2 = "I BUILD DIGITAL EXPERIENCES.";

const renderLine = (
  text: string,
  baseClass: string,
  onHoverSound?: () => void,
  wordClass?: (word: string) => string
) => {
  let flatIndex = -1;

  const words = text.split(' ');

  return words.map((word, wordIdx) => (
    <React.Fragment key={`${word}-${wordIdx}`}>
      {/* WORD */}
      <span
        className={`inline-block whitespace-nowrap ${
          wordClass ? wordClass(word) : ''
        }`}
      >
        {word.split('').map((char, charIdx) => {
          flatIndex += 1;

          return (
            <Glyph
              key={`${char}-${charIdx}`}
              char={char}
              revealDelay={flatIndex * 28}
              inView={inView}
              glitchTick={glitchTick}
              onHover={onHoverSound}
              className={baseClass}
            />
          );
        })}
      </span>

      {/* SPACE BETWEEN WORDS */}
      {wordIdx < words.length - 1 && (
        <Glyph
          key={`space-${wordIdx}`}
          char=" "
          revealDelay={0}
          inView={inView}
          glitchTick={glitchTick}
          onHover={onHoverSound}
          className={baseClass}
        />
      )}
    </React.Fragment>
  ));
};
  return (
    <section
      id="manifesto"
      ref={containerRef}
      className="relative w-full min-h-[90vh] bg-[#050505] text-[#F2F2F2] border-t border-b border-[#1F1F1F] py-24 md:py-36 px-6 md:px-12 flex flex-col justify-center overflow-hidden select-none"
      onMouseEnter={() => setCursorState('EXPLORE')}
      onMouseLeave={() => setCursorState('DEFAULT')}
    >
      {/* Minimal label */}
      <div className="absolute top-8 left-6 md:left-12 font-pixel text-[10px] text-[#444] tracking-[0.25em] flex items-center gap-2">
        <span className="w-1 h-1 bg-[#FF3B00]" />
        02 // MANIFESTO
      </div>

      {/* Centerpiece Typography */}
      <div className="max-w-7xl mx-auto w-full my-auto space-y-8 md:space-y-14">
        <div className="transition-transform duration-300 ease-out will-change-transform" style={{ transform: `translateY(${parallax.a}px)` }}>
          <div className="font-display text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight text-[#5C5C5C] flex flex-wrap">
            {renderLine(line1, 'inline-block transition-colors duration-150 hover:text-[#F2F2F2]', () => sound.playTick(1200))}
          </div>
        </div>

        <div className="transition-transform duration-300 ease-out will-change-transform" style={{ transform: `translateY(${parallax.b}px)` }}>
          <div className="font-display text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight text-[#F2F2F2] flex flex-wrap">
            {renderLine(
              line2,
              'inline-block transition-colors duration-150 hover:text-[#FF3B00]',
              () => sound.playTick(),
              (word) => (word === 'EXPERIENCES.' ? 'text-[#FF3B00]' : '')
            )}
          </div>
        </div>

        {/* Sub-manifesto — fades/rises in once the section is in view */}
        <div
          className={`grid grid-cols-1 md:grid-cols-12 gap-6 pt-10 border-t border-[#1F1F1F] font-pixel text-xs md:text-sm transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
        >
          <div className="md:col-span-4 text-[#FF3B00] font-bold tracking-widest uppercase">
            // PHILOSOPHY
          </div>
          <div className="md:col-span-8 leading-relaxed text-[#989898]">
            <p className='font-display md:text-2xl text-sm'>
              I believe in the friction between mathematical grid systems and raw, chaotic pixel energy —
              the web isn&apos;t a static page, it&apos;s a living, kinetic space.
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 right-6 md:right-12 font-pixel text-[10px] text-[#FF3B00] tracking-widest">
        02 / 12
      </div>
    </section>
  );
};