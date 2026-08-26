import React, { useRef } from 'react';
import { MiniMatrixGlobe } from './MiniGlobe';
import { SKILLS, Skill } from './array';

/**
 * Skill card with a cursor-tracking orangered spotlight + tilt.
 * No borders — depth comes from background contrast + glow only.
 */
const SkillCard: React.FC<{ skill: Skill }> = ({ skill }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = skill.icon;

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = (x / rect.width) * 100;
    const py = (y / rect.height) * 100;
    const rotateX = ((y / rect.height) - 0.5) * -10;
    const rotateY = ((x / rect.width) - 0.5) * 10;

    card.style.setProperty('--mx', `${px}%`);
    card.style.setProperty('--my', `${py}%`);
    card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  };

  const handleLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)';
  };

  return (
    <div
      ref={cardRef}
      tabIndex={0}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="
        group relative flex flex-col items-center justify-center gap-3
        aspect-square rounded-sm px-3 py-4
        cursor-default transition-[transform,background-color,box-shadow]
        duration-200 ease-out will-change-transform
        motion-reduce:transition-none motion-reduce:transform-none
        
        focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_#FF4500]
      "
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{
          background:
            'radial-gradient(120px circle at var(--mx, 50%) var(--my, 50%), rgba(255,69,0,0.18), transparent 70%)',
        }}
      />
      <Icon className="relative z-10 w-8 h-8 md:w-9 md:h-9 text-[#CCCCCC] group-hover:text-[#FF4500] transition-colors duration-200" />
      <span className="relative z-10 font-mono text-[11px] md:text-xs text-[#888888] group-hover:text-[#F2F2F2] tracking-wide text-center transition-colors duration-200">
        {skill.name}
      </span>
    </div>
  );
};


const BLEED = 43; // % oversize + shift — how aggressively the globe bleeds off the left/bottom

export const SkillsGlobePage: React.FC = () => {
  return (
    <section className="relative w-full min-h-screen bg-black text-[#F2F2F2] select-none">
      
      <div className="lg:flex relative">
        
        {/* LEFT — STICKY GLOBE */}
        <div className="hidden lg:block lg:w-1/2 self-stretch">

          <div className="sticky top-0 h-screen">

            <div
              className="absolute"
              style={{
                left: `-${BLEED}%`,
                bottom: `-56%`,
                width: `170%`,
                height: `170%`,
              }}
            >
              <MiniMatrixGlobe className="w-full h-full" />
            </div>

          </div>

        </div>

        {/* RIGHT — SCROLLING CONTENT */}
        <div className="w-full lg:w-1/2 px-6 md:px-12 lg:px-16 py-16 md:py-24">

          <div className="mb-12 md:mb-16">
            <div className="font-mono text-xs text-[#FF4500] uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 bg-[#FF4500] animate-pulse" />
              <span>// SKILLS_MATRIX.TSX</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-[#F2F2F2] mt-2">
              WHAT I BUILD WITH
            </h1>
          </div>

          {/* Mobile Globe */}
          <div className="lg:hidden relative w-full h-[340px] mb-10 bg-[#050505]">
            <MiniMatrixGlobe className="w-full h-full" />
          </div>

          <p className="font-mono text-xs text-[#666666] leading-relaxed max-w-md mb-6">
            Every icon below is pulled straight from{" "}
            <code className="text-[#888888]">
              skillsData.ts
            </code>
          </p>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 md:gap-4 pb-24">
            {SKILLS.map((skill) => (
              <SkillCard
                key={skill.name}
                skill={skill}
              />
            ))}
          </div>

        </div>

      </div>

    </section>
  );
};

export default SkillsGlobePage;