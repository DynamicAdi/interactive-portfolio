import React, { useEffect, useRef, useState } from 'react';

import { sound } from '../utils/audio';
import { CursorState } from '../types';

interface DigitalToolboxProps {
  setCursorState: (state: CursorState) => void;
}

type HistoryLine = {
  content: string;
  type?:
    | 'default'
    | 'command'
    | 'success'
    | 'error'
    | 'highlight'
    | 'muted'
    | 'system';
};

const AVAILABLE_COMMANDS = [
  'help',
  'whoami',
  'skills',
  'manifesto',
  'contact',
  'neofetch',
  'clear',
];

export const DigitalToolboxSection: React.FC<DigitalToolboxProps> = ({
  setCursorState,
}) => {
  const [terminalInput, setTerminalInput] = useState('');

  const [commandHistory, setCommandHistory] = useState<string[]>([]);

  const [historyIndex, setHistoryIndex] = useState(-1);

  const [terminalHistory, setTerminalHistory] = useState<HistoryLine[]>([
    {
      content: 'SAMARTH_PATIL OS [Version 2026.04.1]',
      type: 'system',
    },
    {
      content: 'Copyright (c) 2026 Samarth Patil.',
      type: 'muted',
    },
    {
      content: '',
    },
    {
      content: 'Welcome to the interactive portfolio terminal.',
      type: 'default',
    },
    {
      content: 'Type "help" to see available commands.',
      type: 'highlight',
    },
    {
      content: '',
    },
  ]);

  const terminalRef = useRef<HTMLDivElement>(null);

  const executeCommand = () => {
    const rawCommand = terminalInput.trim();
    const cmd = rawCommand.toLowerCase();

    if (!cmd) {
      setTerminalHistory((prev) => [
        ...prev,
        {
          content: '',
          type: 'default',
        },
      ]);

      setTerminalInput('');
      return;
    }

    sound.playClick(1400);

    setCommandHistory((prev) => [...prev, rawCommand]);

    setHistoryIndex(-1);

    const newHistory: HistoryLine[] = [
      ...terminalHistory,

      {
        content: `SAMARTH@PORTFOLIO:~$ ${rawCommand}`,
        type: 'command',
      },
    ];

    switch (cmd) {
      case 'help':
        newHistory.push(
          {
            content: '',
          },
          {
            content: 'AVAILABLE COMMANDS',
            type: 'highlight',
          },
          {
            content: '────────────────────────────────────────────',
            type: 'muted',
          },
          {
            content: 'whoami',
            type: 'success',
          },
          {
            content: '  Print developer identity',
            type: 'muted',
          },
          {
            content: 'skills',
            type: 'success',
          },
          {
            content: '  List technical capabilities',
            type: 'muted',
          },
          {
            content: 'manifesto',
            type: 'success',
          },
          {
            content: '  Display engineering philosophy',
            type: 'muted',
          },
          {
            content: 'contact',
            type: 'success',
          },
          {
            content: '  Retrieve communication channels',
            type: 'muted',
          },
          {
            content: 'neofetch',
            type: 'success',
          },
          {
            content: '  Display system information',
            type: 'muted',
          },
          {
            content: 'clear',
            type: 'success',
          },
          {
            content: '  Clear terminal screen',
            type: 'muted',
          },
          {
            content: '',
          },
        );
        break;

      case 'whoami':
        newHistory.push(
          {
            content: '',
          },
          {
            content: 'SAMARTH PATIL',
            type: 'highlight',
          },
          {
            content: 'Creative Developer & 3D Digital Architect',
            type: 'success',
          },
          {
            content: '',
          },
          {
            content: 'STATUS    → BUILDING',
            type: 'default',
          },
          {
            content: 'LOCATION  → 13.0844° N, 80.2707° E',
            type: 'default',
          },
          {
            content: 'MISSION   → BUILD DIGITAL EXPERIENCES',
            type: 'default',
          },
          {
            content: '',
          },
        );
        break;

      case 'skills':
        newHistory.push(
          {
            content: '',
          },
          {
            content: '[ CORE DEVELOPMENT ]',
            type: 'highlight',
          },
          {
            content:
              'Next.js • React • TypeScript • Node.js',
            type: 'default',
          },
          {
            content: '',
          },
          {
            content: '[ CREATIVE TECHNOLOGY ]',
            type: 'highlight',
          },
          {
            content:
              'Three.js • WebGL • GLSL • GSAP',
            type: 'default',
          },
          {
            content:
              'Web Audio API • Motion • Interactive Systems',
            type: 'default',
          },
          {
            content: '',
          },
        );
        break;

      case 'manifesto':
        newHistory.push(
          {
            content: '',
          },
          {
            content:
              '"I DON’T JUST WRITE CODE. I BUILD DIGITAL EXPERIENCES."',
            type: 'highlight',
          },
          {
            content: '',
          },
        );
        break;

      case 'contact':
        newHistory.push(
          {
            content: '',
          },
          {
            content:
              'EMAIL     → samarth@samarthpatil.dev',
            type: 'success',
          },
          {
            content:
              'GITHUB    → github.com/samarthpatil',
            type: 'success',
          },
          {
            content:
              'LINKEDIN  → linkedin.com/in/samarthpatil',
            type: 'success',
          },
          {
            content: '',
          },
        );
        break;

      case 'neofetch':
        newHistory.push(
          {
            content: '',
          },
          {
            content: '       ███████╗   SAMARTH_PATIL',
            type: 'highlight',
          },
          {
            content: '       ██╔════╝   ─────────────────────────',
            type: 'highlight',
          },
          {
            content: '       ███████╗   OS: ARCHITECT_OS x86_64',
            type: 'default',
          },
          {
            content: '       ╚════██║   Kernel: 6.12.0-creative',
            type: 'default',
          },
          {
            content: '       ███████║   Uptime: 24/7/365 building',
            type: 'default',
          },
          {
            content: '       ╚══════╝   WM: Swiss Grid 12-Col',
            type: 'default',
          },
          {
            content: '                  Shell: Custom WebGL Bash',
            type: 'default',
          },
          {
            content: '                  GPU: Creative Engine v2.0',
            type: 'default',
          },
          {
            content: '',
          },
        );
        break;

      case 'clear':
        setTerminalHistory([]);
        setTerminalInput('');
        setHistoryIndex(-1);

        requestAnimationFrame(() => {
          terminalRef.current?.focus();
        });

        return;

      default:
        newHistory.push(
          {
            content: `bash: ${cmd}: command not found`,
            type: 'error',
          },
          {
            content:
              'Type "help" to view the command index.',
            type: 'muted',
          },
          {
            content: '',
          },
        );
        break;
    }

    setTerminalHistory(newHistory);

    setTerminalInput('');

    requestAnimationFrame(() => {
      terminalRef.current?.focus();
    });
  };

  useEffect(() => {
    const terminal = terminalRef.current;

    if (!terminal) return;

    terminal.scrollTo({
      top: terminal.scrollHeight,
      behavior: 'smooth',
    });
  }, [terminalHistory]);

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      executeCommand();
      return;
    }

    if (e.key === 'Backspace') {
      e.preventDefault();

      setTerminalInput((prev) => prev.slice(0, -1));

      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();

      if (!commandHistory.length) return;

      const nextIndex =
        historyIndex === -1
          ? commandHistory.length - 1
          : Math.max(0, historyIndex - 1);

      setHistoryIndex(nextIndex);

      setTerminalInput(commandHistory[nextIndex]);

      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();

      if (historyIndex === -1) return;

      const nextIndex = historyIndex + 1;

      if (nextIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setTerminalInput('');
      } else {
        setHistoryIndex(nextIndex);
        setTerminalInput(commandHistory[nextIndex]);
      }

      return;
    }

    if (e.key === 'Tab') {
      e.preventDefault();

      if (!terminalInput.trim()) return;

      const matches = AVAILABLE_COMMANDS.filter((command) =>
        command.startsWith(terminalInput.toLowerCase()),
      );

      if (matches.length === 1) {
        setTerminalInput(matches[0]);
      }

      return;
    }

    if (
      e.ctrlKey ||
      e.metaKey ||
      e.altKey ||
      e.key.length !== 1
    ) {
      return;
    }

    setTerminalInput((prev) => prev + e.key);

    setHistoryIndex(-1);
  };

  const getLineClassName = (type?: HistoryLine['type']) => {
    switch (type) {
      case 'command':
        return 'text-[#FF3B00]';

      case 'success':
        return 'text-[#F2F2F2]';

      case 'error':
        return 'text-red-400';

      case 'highlight':
        return 'text-[#FF3B00] font-bold';

      case 'muted':
        return 'text-[#666666]';

      case 'system':
        return 'text-[#F2F2F2] font-bold';

      default:
        return 'text-[#9A9A9A]';
    }
  };

  return (
    <section
      id="toolbox"
      className="relative w-full min-h-screen bg-[#050505] text-[#F2F2F2] border-b border-[#1F1F1F] py-12 md:py-20 px-4 md:px-12 select-none"
      onMouseEnter={() => setCursorState('EXPLORE')}
      onMouseLeave={() => setCursorState('DEFAULT')}
    >
      <div className="max-w-7xl mx-auto flex flex-col">

        {/* SECTION HEADER */}

        <div className="flex flex-wrap items-end justify-between border-b border-[#1F1F1F] pb-5 mb-6 gap-4">

          <div>
            <div className="font-silkscreen text-xs text-[#FF3B00] uppercase tracking-widest flex items-center space-x-2">

              <span className="w-2 h-2 bg-[#FF3B00]" />

              <span>
                // DIGITAL TOOLBOX OS
              </span>

            </div>

            <h2 className="font-display text-3xl md:text-5xl font-black tracking-tight text-[#F2F2F2] mt-2">

              SYSTEM OPERATING ENVIRONMENT

            </h2>
          </div>

          <div className="font-pixel text-[10px] text-[#555555]">

            [ INTERACTIVE CLI // ONLINE ]

          </div>

        </div>


        {/* TERMINAL */}

        <div
          className="
            w-full
            h-[calc(100vh-220px)]
            min-h-[520px]
            border
            border-[#242424]
            bg-[#030303]
            flex
            flex-col
            shadow-2xl
          "
        >

          {/* TERMINAL TITLEBAR */}

          <div className="shrink-0 h-12 flex items-center justify-between border-b border-[#1F1F1F] px-4 md:px-5">

            <div className="flex items-center gap-3">

              <div className="flex items-center gap-1.5">

                <span className="w-2.5 h-2.5 bg-[#FF3B00]" />

                <span className="w-2.5 h-2.5 bg-[#333333]" />

                <span className="w-2.5 h-2.5 bg-[#333333]" />

              </div>

              <span className="font-pixel text-[10px] text-[#EAEAEA]">

                SAMARTH_PATIL_CLI — bash

              </span>

            </div>


            <div className="flex items-center gap-3 font-pixel text-[9px]">

              <span className="hidden sm:inline text-[#555555]">
                UTF-8
              </span>

              <span className="hidden sm:inline text-[#555555]">
                TTY1
              </span>

              <span className="text-[#FF3B00]">
                ● ONLINE
              </span>

            </div>

          </div>


          {/* TERMINAL SCREEN */}

          <div
            ref={terminalRef}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onClick={() => terminalRef.current?.focus()}
            className="
              flex-1
              min-h-0
              overflow-y-auto
              overflow-x-hidden
              p-5
              md:p-7
              font-mono
              text-xs
              md:text-sm
              leading-6
              outline-none
              cursor-text
              terminal-scroll
            "
          >

            {/* OUTPUT */}

            <div className="space-y-0">

              {terminalHistory.map((line, index) => (
                <div
                  key={`${index}-${line.content}`}
                  className={`
                    min-h-[24px]
                    whitespace-pre-wrap
                    break-words
                    ${getLineClassName(line.type)}
                  `}
                >
                  {line.content || '\u00A0'}
                </div>
              ))}

            </div>


            {/* ACTIVE COMMAND LINE */}

            <div className="flex items-center min-h-[24px] whitespace-pre-wrap break-all">

              <span className="text-[#FF3B00] font-bold">
                SAMARTH
              </span>

              <span className="text-[#777777]">
                @
              </span>

              <span className="text-[#F2F2F2]">
                PORTFOLIO
              </span>

              <span className="text-[#777777]">
                :
              </span>

              <span className="text-[#F2F2F2]">
                ~
              </span>

              <span className="text-[#777777] mr-2">
                $
              </span>

              <span className="text-[#F2F2F2]">
                {terminalInput}
              </span>

              <span
                className="terminal-cursor"
                aria-hidden="true"
              />

            </div>

          </div>


          {/* TERMINAL STATUS BAR */}

          <div className="shrink-0 h-10 border-t border-[#1F1F1F] px-4 md:px-5 flex items-center justify-between font-pixel text-[9px] text-[#555555]">

            <span>
              CLICK TERMINAL TO FOCUS
            </span>

            <div className="hidden md:flex items-center gap-4">

              <span>
                ↑↓ HISTORY
              </span>

              <span>
                TAB COMPLETE
              </span>

              <span className="text-[#FF3B00]">
                ENTER EXECUTE
              </span>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};