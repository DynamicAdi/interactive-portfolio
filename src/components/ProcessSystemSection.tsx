import React, { useState } from 'react';
import { PROCESS_STEPS } from '../data/portfolioData';
import { ProcessStep, CursorState } from '../types';
import { sound } from '../utils/audio';
import { Terminal, Cpu, Check, Activity, ChevronRight } from 'lucide-react';

interface ProcessSystemProps {
  setCursorState: (state: CursorState) => void;
}

export const ProcessSystemSection: React.FC<ProcessSystemProps> = ({ setCursorState }) => {
  const [activeStep, setActiveStep] = useState<ProcessStep>(PROCESS_STEPS[0]);

  const handleSelect = (step: ProcessStep) => {
    sound.playClick(1200);
    setActiveStep(step);
  };

  return (
    <section
      id="process"
      className="relative w-full min-h-screen bg-[#070707] text-[#F2F2F2] border-b border-[#1F1F1F] py-24 md:py-36 px-6 md:px-12 select-none"
      onMouseEnter={() => setCursorState('EXPLORE')}
      onMouseLeave={() => setCursorState('DEFAULT')}
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between border-b border-[#1F1F1F] pb-4 gap-4">
          <div>
            <div className="font-silkscreen text-xs text-[#FF3B00] uppercase tracking-widest flex items-center space-x-2">
              <span className="w-2 h-2 bg-[#FF3B00]" />
              <span>// SECTION 10: INTERACTIVE PROCESS PIPELINE</span>
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-black tracking-tight text-[#F2F2F2] mt-1">
              THE 6-STAGE ENGINE
            </h2>
          </div>
          <div className="font-pixel text-xs text-[#666666]">
            STAGE: [{activeStep.num} / 06] // {activeStep.name}
          </div>
        </div>

        {/* Process Stages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 6-Stage Selector Grid */}
          <div className="lg:col-span-6 space-y-3">
            {PROCESS_STEPS.map((step) => {
              const isActive = activeStep.id === step.id;
              return (
                <div
                  key={step.id}
                  onClick={() => handleSelect(step)}
                  onMouseEnter={() => {
                    setCursorState('INTERACT');
                    sound.playTick(1000 + parseInt(step.num) * 100);
                  }}
                  onMouseLeave={() => setCursorState('DEFAULT')}
                  className={`p-5 border transition-all cursor-pointer flex items-center justify-between group ${
                    isActive
                      ? 'bg-[#FF3B00]/10 border-[#FF3B00] shadow-[0_0_20px_rgba(255,59,0,0.15)]'
                      : 'bg-[#0D0D0D] border-[#1F1F1F] hover:border-[#444] hover:bg-[#121212]'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <span className={`font-pixel text-sm font-bold ${
                      isActive ? 'text-[#FF3B00]' : 'text-[#555] group-hover:text-white'
                    }`}>
                      {step.num}
                    </span>
                    <div>
                      <h3 className="font-display font-black text-xl text-[#F2F2F2] group-hover:text-[#FF3B00] transition-colors">
                        {step.name}
                      </h3>
                      <span className="font-pixel text-[11px] text-[#777]">
                        {step.subtitle}
                      </span>
                    </div>
                  </div>

                  <ChevronRight className={`w-5 h-5 transition-transform ${
                    isActive ? 'text-[#FF3B00] translate-x-1' : 'text-[#444] group-hover:text-white'
                  }`} />
                </div>
              );
            })}
          </div>

          {/* Right Stage Inspector Deck */}
          <div className="lg:col-span-6 bg-[#0D0D0D] border-2 border-[#FF3B00] p-6 md:p-8 font-pixel text-xs space-y-6 shadow-[0_0_30px_rgba(255,59,0,0.1)]">
            <div className="border-b border-[#1F1F1F] pb-4">
              <span className="text-[#FF3B00] text-[10px] uppercase tracking-widest block">
                // ACTIVE PIPELINE DIAGNOSTIC — STAGE {activeStep.num}
              </span>
              <h4 className="font-display text-3xl font-black text-[#F2F2F2] mt-1">
                {activeStep.name} // <span className="text-[#FF3B00]">{activeStep.subtitle}</span>
              </h4>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-[#666666] block">METHODOLOGY:</span>
                <p className="font-sans text-sm md:text-base text-[#CCCCCC] mt-1 leading-relaxed">
                  {activeStep.description}
                </p>
              </div>

              <div>
                <span className="text-[#666666] block">GOLDEN MANDATE:</span>
                <p className="text-[#FF3B00] font-bold mt-1 text-xs md:text-sm">
                  "{activeStep.rule}"
                </p>
              </div>

              {/* Code Snippet */}
              <div>
                <span className="text-[#666666] block">PIPELINE PSEUDOCODE:</span>
                <div className="bg-black border border-[#222] p-4 text-[#F2F2F2] mt-1 font-pixel text-[11px] overflow-x-auto whitespace-pre leading-normal">
                  {activeStep.codeSnippet}
                </div>
              </div>

              {/* Stage Telemetry Grid */}
              <div className="grid grid-cols-3 gap-2 pt-2">
                <div className="bg-black border border-[#1F1F1F] p-2.5">
                  <span className="text-[#666] block text-[9px]">FRICTION</span>
                  <span className="text-[#F2F2F2] font-bold text-xs">{activeStep.telemetry.friction}</span>
                </div>
                <div className="bg-black border border-[#1F1F1F] p-2.5">
                  <span className="text-[#666] block text-[9px]">ENERGY</span>
                  <span className="text-[#FF3B00] font-bold text-xs">{activeStep.telemetry.energy}</span>
                </div>
                <div className="bg-black border border-[#1F1F1F] p-2.5">
                  <span className="text-[#666] block text-[9px]">OUTPUT</span>
                  <span className="text-[#F2F2F2] font-bold text-[10px]">{activeStep.telemetry.output}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#1F1F1F] flex justify-between text-[#666666]">
              <span>STATUS: EXECUTING IN LOOP</span>
              <span className="text-[#FF3B00]">100% REPEATABLE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
