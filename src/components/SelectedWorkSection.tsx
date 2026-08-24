import React, { useState } from 'react';
import { PROJECTS } from '../data/portfolioData';
import { Project, CursorState } from '../types';
import { sound } from '../utils/audio';
import { ArrowUpRight, Github, ExternalLink, Activity, Layers, Code, Sparkles, X } from 'lucide-react';

interface SelectedWorkProps {
  setCursorState: (state: CursorState) => void;
}

export const SelectedWorkSection: React.FC<SelectedWorkProps> = ({ setCursorState }) => {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [tilt, setTilt] = useState<{ [key: string]: { x: number; y: number } }>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    setTilt((prev) => ({ ...prev, [id]: { x, y } }));
  };

  const handleMouseLeave = (id: string) => {
    setTilt((prev) => ({ ...prev, [id]: { x: 0, y: 0 } }));
    setCursorState('DEFAULT');
  };

  const openProjectModal = (proj: Project) => {
    sound.playGlitch();
    setActiveProject(proj);
  };

  return (
    <section
      id="selected-work"
      className="relative w-full min-h-screen bg-[#050505] text-[#F2F2F2] border-b border-[#1F1F1F] py-24 md:py-36 px-6 md:px-12 select-none"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-wrap items-end justify-between border-b border-[#1F1F1F] pb-6 gap-4">
          <div>
            <div className="font-silkscreen text-xs text-[#FF3B00] uppercase tracking-widest flex items-center space-x-2">
              <span className="w-2 h-2 bg-[#FF3B00]" />
              <span>// SECTION 06: SELECTED ARCHITECTURAL WORKS</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-[#F2F2F2] mt-2">
              FEATURED <span className="text-[#FF3B00]">SYSTEMS</span>
            </h2>
          </div>
          <div className="font-pixel text-xs text-[#666666] text-right">
            <div>5 SELECTED PRODUCTION ARCHITECTURES</div>
            <div className="text-[#FF3B00]">100% REALTIME SHADERS &amp; CODE</div>
          </div>
        </div>

        {/* Project List / Cards with Layered Masked Compositions */}
        <div className="space-y-24">
          {PROJECTS.map((project, idx) => {
            const currentTilt = tilt[project.id] || { x: 0, y: 0 };

            return (
              <div
                key={project.id}
                onMouseMove={(e) => handleMouseMove(e, project.id)}
                onMouseEnter={() => {
                  setCursorState('VIEW_PROJECT');
                  sound.playTick(1000 + idx * 100);
                }}
                onMouseLeave={() => handleMouseLeave(project.id)}
                className="group relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#090909] border border-[#1F1F1F] p-6 md:p-10 hover:border-[#FF3B00] transition-colors"
                style={{
                  perspective: '1000px',
                }}
              >
                {/* Visual Image Container with 3D Tilt & Scanlines */}
                <div
                  className="lg:col-span-7 relative aspect-[16/10] overflow-hidden bg-black border border-[#222] transition-transform duration-200 ease-out cursor-pointer"
                  style={{
                    transform: `rotateY(${currentTilt.x}deg) rotateX(${currentTilt.y}deg) scale3d(1.02, 1.02, 1.02)`,
                  }}
                  onClick={() => openProjectModal(project)}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 scanlines opacity-40 pointer-events-none" />

                  {/* Corner Index Tag */}
                  <div className="absolute top-4 left-4 bg-black/90 border border-[#FF3B00] px-3 py-1 font-pixel text-xs text-[#FF3B00] backdrop-blur-sm">
                    PRJ_NO: {project.number}
                  </div>

                  {/* Specs Pill */}
                  <div className="absolute bottom-4 left-4 bg-black/90 border border-white/20 px-3 py-1 font-pixel text-[11px] text-[#F2F2F2] backdrop-blur-sm hidden sm:block">
                    {project.specs.fps} // {project.specs.shaders}
                  </div>

                  <div className="absolute bottom-4 right-4 bg-[#FF3B00] text-black font-pixel font-bold text-xs px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    [ CLICK TO INSPECT ]
                  </div>
                </div>

                {/* Typography & Editorial Specs */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="space-y-1">
                    <div className="font-pixel text-xs text-[#FF3B00] tracking-wider uppercase">
                      {project.category} // {project.year}
                    </div>
                    <h3
                      onClick={() => openProjectModal(project)}
                      className="font-display font-black text-3xl sm:text-4xl text-[#F2F2F2] group-hover:text-[#FF3B00] transition-colors cursor-pointer flex items-center justify-between"
                    >
                      <span>{project.title}</span>
                      <ArrowUpRight className="w-6 h-6 text-[#FF3B00] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </h3>
                    <p className="font-pixel text-xs text-[#888888]">
                      {project.tagline}
                    </p>
                  </div>

                  <p className="font-sans text-sm md:text-base text-[#B0B0B0] leading-relaxed">
                    {project.description}
                  </p>

                  {/* Metrics bullet tags */}
                  <div className="space-y-1.5 font-pixel text-xs text-[#CCCCCC]">
                    {project.metrics.map((m, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <span className="text-[#FF3B00]">&gt;</span>
                        <span>{m}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="pt-4 border-t border-[#1F1F1F] flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="bg-[#121212] border border-[#222] px-2.5 py-1 font-pixel text-xs text-[#888888] hover:text-[#F2F2F2] hover:border-[#444] transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Project Inspector Detail Modal */}
      {activeProject && (
        <div className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-10 select-none animate-fadeIn">
          <div className="bg-[#0D0D0D] border-2 border-[#FF3B00] max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-10 font-pixel relative space-y-8 shadow-[0_0_50px_rgba(255,59,0,0.3)]">
            {/* Modal Header */}
            <div className="flex justify-between items-start border-b border-[#1F1F1F] pb-4">
              <div>
                <span className="text-[#FF3B00] text-xs uppercase tracking-widest">
                  // DEEP ARCHITECTURE TELEMETRY — {activeProject.number}
                </span>
                <h2 className="text-2xl md:text-4xl font-display font-black text-[#F2F2F2] mt-1">
                  {activeProject.title}
                </h2>
                <p className="text-xs text-[#888888]">{activeProject.category} | {activeProject.year}</p>
              </div>
              <button
                onClick={() => setActiveProject(null)}
                className="p-2 border border-[#333] hover:border-[#FF3B00] text-[#888888] hover:text-[#FF3B00] transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Image */}
            <div className="relative aspect-video w-full overflow-hidden border border-[#222]">
              <img
                src={activeProject.image}
                alt={activeProject.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 scanlines opacity-50 pointer-events-none" />
            </div>

            {/* Modal Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-black border border-[#1F1F1F] p-3 text-xs">
                <span className="text-[#666] block">FRAME BUDGET</span>
                <span className="text-[#FF3B00] font-bold text-sm">{activeProject.specs.fps}</span>
              </div>
              <div className="bg-black border border-[#1F1F1F] p-3 text-xs">
                <span className="text-[#666] block">SHADERS</span>
                <span className="text-[#F2F2F2] font-bold text-sm">{activeProject.specs.shaders}</span>
              </div>
              <div className="bg-black border border-[#1F1F1F] p-3 text-xs">
                <span className="text-[#666] block">DRAW CALLS</span>
                <span className="text-[#F2F2F2] font-bold text-sm">{activeProject.specs.drawCalls}</span>
              </div>
              <div className="bg-black border border-[#1F1F1F] p-3 text-xs">
                <span className="text-[#666] block">BUNDLE SIZE</span>
                <span className="text-[#FF3B00] font-bold text-sm">{activeProject.specs.compression}</span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3 text-xs md:text-sm text-[#CCCCCC]">
              <h4 className="text-[#FF3B00] font-bold uppercase">// SYSTEM OBJECTIVE &amp; EXECUTION:</h4>
              <p className="leading-relaxed font-sans text-sm md:text-base text-[#B0B0B0]">
                {activeProject.description}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-between pt-6 border-t border-[#1F1F1F] gap-4">
              <div className="flex space-x-3">
                <a
                  href={activeProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-black border border-[#333] hover:border-[#FF3B00] text-xs text-[#F2F2F2] flex items-center space-x-2"
                >
                  <Github className="w-4 h-4 text-[#FF3B00]" />
                  <span>[ REPOSITORY ]</span>
                </a>
                <a
                  href={activeProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#FF3B00] text-black font-bold text-xs flex items-center space-x-2 hover:bg-[#ff5522]"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>[ LAUNCH LIVE PROTOCOL ]</span>
                </a>
              </div>
              <button
                onClick={() => setActiveProject(null)}
                className="text-xs text-[#666] hover:text-[#FF3B00]"
              >
                [ ESC / CLOSE MODAL ]
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
