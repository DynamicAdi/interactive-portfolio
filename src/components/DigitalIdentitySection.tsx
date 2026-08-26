import React, { useState } from 'react';
import { ArrowUpRight, Plus, X } from 'lucide-react';
import { CursorState } from '../types';

interface DigitalIdentityProps {
  setCursorState: (state: CursorState) => void;
}

type IdentityMode = 'DESIGN' | 'BUILD' | 'EXPERIMENT';

const identityContent = {
  DESIGN: {
    title: 'I design how it feels.',
    description:
      'I care about hierarchy, rhythm, typography, and the tiny details that make an interface feel effortless.',
  },
  BUILD: {
    title: 'I build how it works.',
    description:
      'I turn ideas into fast, functional, and interactive digital products using modern frontend technologies.',
  },
  EXPERIMENT: {
    title: 'I explore what is possible.',
    description:
      'I enjoy pushing the browser beyond conventional layouts through motion, interaction, and creative technology.',
  },
};

const expertise = [
  {
    number: '01',
    title: 'Creative Development',
    description:
      'Interactive websites, immersive experiences, motion systems, and interfaces that respond to people.',
  },
  {
    number: '02',
    title: 'Digital Experiences',
    description:
      'Designing and building products that combine strong visual direction with clear usability.',
  },
  {
    number: '03',
    title: 'Creative Technology',
    description:
      'Exploring WebGL, animation, browser APIs, and new ways to make the web feel more alive.',
  },
];

export const DigitalIdentitySection: React.FC<DigitalIdentityProps> = ({
  setCursorState,
}) => {
  const [activeMode, setActiveMode] =
    useState<IdentityMode>('DESIGN');

  const [isDecoded, setIsDecoded] = useState(false);

  const [expandedItem, setExpandedItem] =
    useState<number | null>(null);

  const [mousePosition, setMousePosition] = useState({
    x: 50,
    y: 50,
  });

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();

    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    setMousePosition({ x, y });
  };

  const currentContent = identityContent[activeMode];

  return (
    <section
      id="identity"
      className="relative overflow-hidden bg-[#070707] px-6 py-24 text-[#F2F2F2] md:px-12 md:py-32"
      onMouseEnter={() => setCursorState('EXPLORE')}
      onMouseLeave={() => setCursorState('DEFAULT')}
    >
      {/* Background Grid */}

      <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, #ffffff 1px, transparent 1px),
              linear-gradient(to bottom, #ffffff 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Section Header */}

        <div className="mb-16 flex items-center justify-between border-b border-white/10 pb-5">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[#FF3B00]" />

            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
              About / Identity
            </span>
          </div>

          <span className="font-mono text-[10px] tracking-[0.2em] text-white/25">
            01 — 03
          </span>
        </div>

        {/* Main Introduction */}

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-10">
          {/* Left Side */}

          <div className="lg:col-span-5">
            <div
              className="group relative aspect-[4/5] cursor-none overflow-hidden bg-[#111]"
              onMouseMove={handleMouseMove}
              onMouseEnter={() =>
                setCursorState('INTERACT')
              }
              onMouseLeave={() =>
                setCursorState('EXPLORE')
              }
            >
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop"
                alt="Samarth Patil"
                referrerPolicy="no-referrer"
                className="h-full w-full scale-110 object-cover grayscale transition-[transform,filter] duration-700 ease-out"
                style={{
                  transform: `scale(1.1) translate(
                    ${(mousePosition.x - 50) * -0.08}px,
                    ${(mousePosition.y - 50) * -0.08}px
                  )`,
                }}
              />

              {/* Interactive Reveal */}

              <div
                className="pointer-events-none absolute inset-0 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(
                    circle 180px at ${mousePosition.x}% ${mousePosition.y}%,
                    transparent 0%,
                    transparent 35%,
                    rgba(0,0,0,0.55) 100%
                  )`,
                }}
              />

              {/* Image Overlay */}

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

              {/* Decode Button */}

              <div className="absolute bottom-5 left-5">
                <button
                  onClick={() => setIsDecoded(!isDecoded)}
                  className="group/button flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white"
                >
                  <span className="flex h-8 w-8 items-center justify-center border border-white/20 transition-colors group-hover/button:border-[#FF3B00] group-hover/button:text-[#FF3B00]">
                    {isDecoded ? (
                      <X className="h-3.5 w-3.5 text-white relative z-9999" />
                    ) : (
                      <Plus className="h-3.5 w-3.5" />
                    )}
                  </span>

                  {isDecoded
                    ? 'Hide Identity'
                    : 'Decode Identity'}
                </button>
              </div>

              {/* Decoded Layer */}

              <div
                className={`absolute inset-0 flex items-center justify-center bg-[#FF3B00] p-8 transition-all duration-500 ${
                  isDecoded
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-full opacity-0'
                }`}
              >
                <div className="text-center">
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white">
                    Identity Decoded
                  </span>

                  <h3 className="mt-5 text-4xl font-semibold leading-none tracking-[-0.05em] text-white md:text-5xl">
                    Creative
                    <br />
                    Developer.
                  </h3>

                  <p className="mx-auto mt-6 max-w-xs text-sm leading-relaxed text-white">
                    Somewhere between design,
                    technology, and curiosity.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-between font-mono text-[9px] uppercase tracking-widest text-white/30">
              <span>Samarth Patil</span>

              <span>Creative Developer</span>
            </div>
          </div>

          {/* Right Side */}

          <div className="flex flex-col justify-center lg:col-span-7">
            <span className="mb-6 font-mono text-[10px] uppercase tracking-[0.25em] text-[#FF3B00]">
              Select an idea
            </span>

            {/* Interactive Headline */}

            <h2 className="max-w-4xl text-5xl font-semibold leading-[0.9] tracking-[-0.06em] md:text-7xl lg:text-8xl">
              I{' '}
              {(['DESIGN', 'BUILD', 'EXPERIMENT'] as IdentityMode[]).map(
                (item, index) => (
                  <React.Fragment key={item}>
                    <button
                      onClick={() =>
                        setActiveMode(item)
                      }
                      onMouseEnter={() => {
                        setActiveMode(item);
                        setCursorState('INTERACT');
                      }}
                      onMouseLeave={() =>
                        setCursorState('EXPLORE')
                      }
                      className={`relative inline-block transition-all duration-300 ${
                        activeMode === item
                          ? 'text-[#FF3B00]'
                          : 'text-white/25 hover:text-white/60'
                      }`}
                    >
                      {item}
                    </button>

                    {index < 2 && <br />}
                  </React.Fragment>
                )
              )}
              .
            </h2>

            {/* Dynamic Content */}

            <div className="mt-12 min-h-[180px] border-l border-[#FF3B00] pl-6">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
                {activeMode} / 0
                {(['DESIGN', 'BUILD', 'EXPERIMENT'] as IdentityMode[]).indexOf(
                  activeMode
                ) + 1}
              </span>

              <h3 className="mt-4 text-2xl tracking-[-0.03em] md:text-3xl">
                {currentContent.title}
              </h3>

              <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/50 md:text-base">
                {currentContent.description}
              </p>
            </div>

            {/* Personal Introduction */}

            <div className="mt-14 max-w-2xl border-t border-white/10 pt-8">
              <p className="text-base font-display leading-relaxed text-white/50 md:text-xl">
                I&apos;m Samarth, a creative developer focused
                on designing and building digital experiences
                that feel intuitive, expressive, and memorable.
                I enjoy working at the intersection of visual
                design, motion, and technology.
              </p>
            </div>
          </div>
        </div>

        {/* Expertise */}

        <div className="mt-32">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#FF3B00]">
                What I Do
              </span>

              <h3 className="mt-4 text-3xl tracking-[-0.04em]  md:text-5xl">
                A few things I&apos;m good at.
              </h3>
            </div>

            <span className="hidden font-mono text-[9px] uppercase tracking-widest text-white/25 md:block">
              Click to explore
            </span>
          </div>

          <div className="border-t border-white/10">
            {expertise.map((item, index) => {
              const isExpanded =
                expandedItem === index;

              return (
                <div
                  key={item.number}
                  className="border-b border-white/10"
                >
                  <button
                    onClick={() =>
                      setExpandedItem(
                        isExpanded ? null : index
                      )
                    }
                    onMouseEnter={() =>
                      setCursorState('INTERACT')
                    }
                    onMouseLeave={() =>
                      setCursorState('EXPLORE')
                    }
                    className="group flex w-full items-center justify-between py-7 text-left md:py-9"
                  >
                    <div className="flex items-center gap-6 md:gap-12">
                      <span className="font-mono text-[10px] text-[#FF3B00]">
                        {item.number}
                      </span>

                      <span
                        className={`text-xl tracking-[-0.03em] transition-transform duration-300 md:text-3xl font-display ${
                          isExpanded
                            ? 'translate-x-3'
                            : ''
                        }`}
                      >
                        {item.title}
                      </span>
                    </div>

                    <div
                      className={`flex h-8 w-8 items-center justify-center border transition-all duration-300 ${
                        isExpanded
                          ? 'border-[#FF3B00] bg-[#FF3B00] text-black'
                          : 'border-white/15 text-white/50 group-hover:border-white/40'
                      }`}
                    >
                      {isExpanded ? (
                        <X className="h-4 w-4" />
                      ) : (
                        <Plus className="h-4 w-4" />
                      )}
                    </div>
                  </button>

                  <div
                    className={`grid transition-all duration-500 ${
                      isExpanded
                        ? 'grid-rows-[1fr]'
                        : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="max-w-2xl pb-8 pl-10 text-sm leading-relaxed text-white/45 md:pl-20 md:text-base">
                        {item.description}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Closing Statement */}

        <div className="mt-32 border-t border-white/10 pt-10">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="max-w-4xl text-3xl leading-[1.05] tracking-[-0.04em] text-white/70 md:text-5xl lg:text-6xl">
                Good digital experiences shouldn&apos;t just
                <span className="text-white"> look good.</span>
                <br />
                They should feel{' '}
                <span className="text-[#FF3B00]">
                  impossible to ignore.
                </span>
              </p>
            </div>

            <div className="flex items-end lg:col-span-4 lg:justify-end">
              <button
                onMouseEnter={() =>
                  setCursorState('INTERACT')
                }
                onMouseLeave={() =>
                  setCursorState('EXPLORE')
                }
                className="group flex items-center gap-4 font-mono text-xs uppercase tracking-[0.18em] text-white"
              >
                <span className="border-b border-[#FF3B00] pb-2">
                  Let&apos;s create something
                </span>

                <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};