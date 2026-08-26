import React, { useEffect, useRef, useState } from 'react';
import { sound } from '../utils/audio';

interface BootLoaderProps {
  onComplete: () => void;
}

export const BootLoader: React.FC<BootLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const completedRef = useRef(false);

  /* ----------------------------------------
     OPENING ANIMATION
  ---------------------------------------- */

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setIsMounted(true);
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  /* ----------------------------------------
     LOADING PROGRESS
  ---------------------------------------- */

  useEffect(() => {
    const interval = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          window.clearInterval(interval);
          return 100;
        }

        const increment =
          prev < 65
            ? Math.floor(Math.random() * 8) + 3
            : prev < 90
              ? Math.floor(Math.random() * 5) + 2
              : Math.floor(Math.random() * 3) + 1;

        const next = Math.min(prev + increment, 100);

        if (next > prev) {
          sound.playTick?.(700 + next * 5);
        }

        return next;
      });
    }, 110);

    return () => window.clearInterval(interval);
  }, []);

  /* ----------------------------------------
     EXIT SEQUENCE
  ---------------------------------------- */

  useEffect(() => {
    if (progress !== 100 || completedRef.current) return;

    completedRef.current = true;

    // Let the user see 100%
    const exitTimer = window.setTimeout(() => {
      sound.playDeepPulse?.();
      sound.playGlitch?.();

      setIsExiting(true);
    }, 450);

    // Wait until text + background panels finish
    const completeTimer = window.setTimeout(() => {
      onComplete();
    }, 1750);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(completeTimer);
    };
  }, [progress, onComplete]);

  return (
    <div
      className={`
        fixed
        inset-0
        z-[99999]
        overflow-hidden
        bg-transparent
        text-[#f5f5f5]
        select-none
        ${isExiting ? 'pointer-events-none' : ''}
      `}
    >
      {/* =====================================
          BACKGROUND — TOP HALF
      ====================================== */}

      <div
        className={`
          absolute
          left-0
          top-0
          z-20
          h-[50vh]
          w-full
          bg-[#050505]

          transition-transform
          duration-[1200ms]
          ease-[cubic-bezier(.76,0,.24,1)]

          ${
            isExiting
              ? '-translate-y-full'
              : 'translate-y-0'
          }
        `}
      />

      {/* =====================================
          BACKGROUND — BOTTOM HALF
      ====================================== */}

      <div
        className={`
          absolute
          bottom-0
          left-0
          z-20
          h-[50vh]
          w-full
          bg-[#050505]

          transition-transform
          duration-[1200ms]
          ease-[cubic-bezier(.76,0,.24,1)]

          ${
            isExiting
              ? 'translate-y-full'
              : 'translate-y-0'
          }
        `}
      />

      {/* =====================================
          LOADER CONTENT
      ====================================== */}

      <div className="relative z-30 h-full w-full">
        {/* TOP STATUS */}

        <div
          className={`
            absolute
            left-6
            top-6
            md:left-10
            md:top-10

            transition-all
            duration-500

            ${
              isExiting
                ? '-translate-y-8 opacity-0'
                : isMounted
                  ? 'translate-y-0 opacity-100'
                  : '-translate-y-8 opacity-0'
            }
          `}
        >
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 animate-pulse bg-white" />

            <p className="font-pixel text-[9px] uppercase tracking-[0.3em] text-white/40 md:text-xs">
              Preparing something interesting
            </p>
          </div>
        </div>

        {/* =====================================
            MAIN TYPOGRAPHY
        ====================================== */}

        <div className="absolute inset-0 flex items-center justify-center overflow-hidden px-4 md:px-8">
          <h1
            className="
              w-full
              font-display
              font-black
              uppercase
              tracking-[-0.08em]
              leading-[0.72]
              text-center
            "
            style={{
              fontSize: 'clamp(4.5rem, 15vw, 19rem)',
            }}
          >
            {/* MAKING */}

            <span
              className={`
                block
                transition-all
                duration-[1000ms]
                ease-[cubic-bezier(.76,0,.24,1)]

                ${
                  isExiting
                    ? '-translate-x-[120%] opacity-0'
                    : isMounted
                      ? 'translate-x-0 opacity-100'
                      : '-translate-x-[45%] opacity-0'
                }
              `}
            >
              SHARPING
            </span>

            {/* SENSE */}

            <span
              className={`
                block
                text-transparent
                [-webkit-text-stroke:2px_#f5f5f5]

                transition-all
                duration-[1000ms]
                delay-[120ms]
                ease-[cubic-bezier(.76,0,.24,1)]

                ${
                  isExiting
                    ? 'translate-x-[120%] opacity-0'
                    : isMounted
                      ? 'translate-x-0 opacity-100'
                      : 'translate-x-[45%] opacity-0'
                }
              `}
            >
              IDEAS
            </span>
          </h1>
        </div>

        {/* =====================================
            PERCENTAGE
        ====================================== */}

        <div
          className={`
            absolute
            bottom-6
            right-6
            md:bottom-10
            md:right-10

            transition-all
            duration-[900ms]
            delay-[250ms]
            ease-[cubic-bezier(.76,0,.24,1)]

            ${
              isExiting
                ? 'translate-y-[150%] opacity-0'
                : isMounted
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-[60%] opacity-0'
            }
          `}
        >
          <div className="overflow-hidden">
            <span
              key={progress}
              className="
                block
                animate-[percentageIn_.35s_cubic-bezier(.16,1,.3,1)]
                font-display
                font-black
                leading-none
                tracking-[-0.09em]
              "
              style={{
                fontSize: 'clamp(5rem, 12vw, 15rem)',
              }}
            >
              {String(progress).padStart(3, '0')}
            </span>
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-white/20 pt-2">
            <span className="font-pixel text-[9px] uppercase tracking-[0.25em] text-white/40 md:text-[10px]">
              Loading
            </span>

            <span className="font-pixel text-[10px] text-white/50">
              %
            </span>
          </div>
        </div>

        {/* =====================================
            PROGRESS LINE
        ====================================== */}

        <div
          className={`
            absolute
            bottom-0
            left-0
            h-[2px]
            w-full
            bg-white/10

            transition-opacity
            duration-300

            ${isExiting ? 'opacity-0' : 'opacity-100'}
          `}
        >
          <div
            className="h-full bg-white transition-all duration-150 ease-out"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
};