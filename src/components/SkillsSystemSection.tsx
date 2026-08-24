import React, { useState } from 'react';
import { SKILL_NODES } from '../data/portfolioData';
import { SkillNode, CursorState } from '../types';
import { sound } from '../utils/audio';
import { Network, Terminal, Cpu, ArrowUpRight, Zap, CheckCircle2 } from 'lucide-react';

interface SkillsSystemProps {
  setCursorState: (state: CursorState) => void;
}

export const SkillsSystemSection: React.FC<SkillsSystemProps> = ({ setCursorState }) => {
  const [selectedSkill, setSelectedSkill] = useState<SkillNode>(SKILL_NODES[0]);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  const handleSelect = (skill: SkillNode) => {
    sound.playClick(1100);
    setSelectedSkill(skill);
  };

  return (
    <section
      id="skills-system"
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
              <span>// SECTION 05: SKILLS AS AN INTERACTIVE SYSTEM</span>
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-black tracking-tight text-[#F2F2F2] mt-1">
              DIGITAL MODULE MATRIX
            </h2>
          </div>
          <div className="font-pixel text-xs text-[#666666]">
            <span>NO PROGRESS BARS // PURE ARCHITECTURAL MASTERY</span>
          </div>
        </div>

        {/* Modular Grid of Skill Nodes */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 8 Cols: Interactive Grid Nodes */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SKILL_NODES.map((node) => {
              const isSelected = selectedSkill.id === node.id;
              const isHovered = hoveredNodeId === node.id;

              return (
                <div
                  key={node.id}
                  onClick={() => handleSelect(node)}
                  onMouseEnter={() => {
                    setHoveredNodeId(node.id);
                    setCursorState('INTERACT');
                    sound.playTick(1300);
                  }}
                  onMouseLeave={() => {
                    setHoveredNodeId(null);
                    setCursorState('DEFAULT');
                  }}
                  className={`relative p-5 bg-[#0D0D0D] border transition-all duration-200 cursor-pointer group ${
                    isSelected
                      ? 'border-[#FF3B00] bg-[#FF3B00]/5 shadow-[0_0_20px_rgba(255,59,0,0.15)]'
                      : 'border-[#1F1F1F] hover:border-[#555] hover:bg-[#121212]'
                  }`}
                >
                  {/* Top Edge Indicator */}
                  <div className="flex justify-between items-start font-pixel text-xs">
                    <span className={`px-2 py-0.5 text-[10px] font-bold ${
                      isSelected ? 'bg-[#FF3B00] text-black' : 'bg-[#1A1A1A] text-[#888]'
                    }`}>
                      {node.category}
                    </span>
                    <span className="text-[#666] group-hover:text-[#FF3B00] transition-colors">
                      {node.experience}
                    </span>
                  </div>

                  {/* Skill Title */}
                  <div className="mt-4">
                    <h3 className="font-display font-black text-xl text-[#F2F2F2] group-hover:text-white flex items-center justify-between">
                      <span>{node.name}</span>
                      <ArrowUpRight className={`w-4 h-4 transition-transform ${
                        isSelected ? 'text-[#FF3B00] translate-x-1 -translate-y-1' : 'text-[#444] group-hover:text-white'
                      }`} />
                    </h3>
                    <p className="font-pixel text-xs text-[#777] mt-2 line-clamp-2 leading-relaxed">
                      {node.description}
                    </p>
                  </div>

                  {/* Bottom Connection Tags */}
                  <div className="mt-4 pt-3 border-t border-[#1A1A1A] flex items-center justify-between font-pixel text-[11px]">
                    <span className="text-[#555]">CONNECTED:</span>
                    <div className="flex space-x-1">
                      {node.connections.map((c) => (
                        <span key={c} className="text-[#999] bg-[#141414] px-1.5 py-0.5 border border-[#222]">
                          #{c}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Corner Accent */}
                  {isSelected && (
                    <div className="absolute -top-[1px] -right-[1px] w-2 h-2 bg-[#FF3B00]" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Right 4 Cols: Active Node Architecture Inspector HUD */}
          <div className="lg:col-span-4 bg-[#0D0D0D] border-2 border-[#FF3B00] p-6 font-pixel text-xs space-y-6 shadow-[0_0_30px_rgba(255,59,0,0.1)] sticky top-24">
            <div className="border-b border-[#1F1F1F] pb-4">
              <span className="text-[#FF3B00] text-[10px] uppercase tracking-widest block">
                // SYSTEM ARCHITECTURE INSPECTOR
              </span>
              <h4 className="font-display text-2xl font-black text-[#F2F2F2] mt-1">
                {selectedSkill.name}
              </h4>
              <span className="text-[#888888] block mt-0.5">
                CLASS: {selectedSkill.category} MODULE
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-[#666666] block">CAPABILITY SUMMARY:</span>
                <p className="text-[#CCCCCC] mt-1 leading-relaxed text-xs md:text-sm">
                  {selectedSkill.description}
                </p>
              </div>

              <div>
                <span className="text-[#666666] block">SYSTEM TEST COMMAND:</span>
                <div className="bg-black border border-[#222] p-2.5 text-[#FF3B00] mt-1 font-pixel text-[11px] overflow-x-auto">
                  $ {selectedSkill.command}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-black/60 border border-[#1F1F1F] p-3">
                  <span className="text-[#666666] block text-[10px]">PRODUCTION EXP</span>
                  <span className="text-[#F2F2F2] font-bold text-sm">{selectedSkill.experience}</span>
                </div>
                <div className="bg-black/60 border border-[#1F1F1F] p-3">
                  <span className="text-[#666666] block text-[10px]">RELIABILITY</span>
                  <span className="text-[#FF3B00] font-bold text-sm">99.9% ZERO JANK</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#1F1F1F] flex items-center justify-between text-[#666666]">
              <span>STATUS: COMPILED &amp; ACTIVE</span>
              <span className="text-[#FF3B00] font-bold">READY</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
