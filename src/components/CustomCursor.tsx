import React, { useEffect, useState, useRef } from 'react';
import { CursorState } from '../types';

interface CustomCursorProps {
  cursorState: CursorState;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ cursorState }) => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const requestRef = useRef<number>(0);

  useEffect(() => {
    // Only show custom cursor on fine pointer devices (desktop)
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const onMouseDown = () => setIsMouseDown(true);
    const onMouseUp = () => setIsMouseDown(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Smooth trailing animation loop
    const animate = () => {
      setTrail((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.2,
        y: prev.y + (pos.y - prev.y) * 0.2,
      }));
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(requestRef.current);
    };
  }, [pos.x, pos.y, isVisible]);

  if (!isVisible) return null;

  const getLabel = () => {
    switch (cursorState) {
      case 'VIEW':
        return '[ VIEW ]';
      case 'OPEN':
        return '[ OPEN ]';
      case 'DRAG':
        return '[ DRAG 3D ]';
      case 'EXPLORE':
        return '[ EXPLORE ]';
      case 'INTERACT':
        return '[ INTERACT ]';
      case 'VIEW_PROJECT':
        return '[ VIEW PROJECT ]';
      case 'EXECUTE':
        return '[ EXECUTE ]';
      default:
        return null;
    }
  };

  const label = getLabel();
  const isSpecial = label !== null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none">
      {/* Precision Center Crosshair Point */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          transform: `translate(-50%, -50%) scale(${isMouseDown ? 0.75 : 1})`,
        }}
      >
        <div className="w-1.5 h-1.5 bg-[#FF3B00] shadow-[0_0_8px_#FF3B00]" />
      </div>

      {/* Trailing Crosshair Frame */}
      <div
        className={`absolute -translate-x-1/2 -translate-y-1/2 transition-[width,height,border-color,background-color] duration-200 flex items-center justify-center ${
          isSpecial
            ? 'w-24 h-10 border border-[#FF3B00] bg-black/90 backdrop-blur-sm shadow-[0_0_15px_rgba(255,59,0,0.3)]'
            : isMouseDown
            ? 'w-6 h-6 border border-[#FF3B00]'
            : 'w-8 h-8 border border-white/30'
        }`}
        style={{
          left: `${trail.x}px`,
          top: `${trail.y}px`,
        }}
      >
        {/* Pixel Corner Brackets */}
        <span className="absolute -top-[2px] -left-[2px] w-1 h-1 bg-[#FF3B00]" />
        <span className="absolute -top-[2px] -right-[2px] w-1 h-1 bg-[#FF3B00]" />
        <span className="absolute -bottom-[2px] -left-[2px] w-1 h-1 bg-[#FF3B00]" />
        <span className="absolute -bottom-[2px] -right-[2px] w-1 h-1 bg-[#FF3B00]" />

        {isSpecial ? (
          <span className="font-pixel text-[10px] font-bold text-[#FF3B00] tracking-wider whitespace-nowrap animate-pulse px-1">
            {label}
          </span>
        ) : (
          <div className="w-1 h-1 bg-white/40" />
        )}
      </div>

      {/* Tiny Coordinate Readout */}
      {!isSpecial && (
        <div
          className="absolute font-pixel text-[9px] text-[#666666] tracking-tighter"
          style={{
            left: `${trail.x + 18}px`,
            top: `${trail.y + 18}px`,
          }}
        >
          {Math.round(pos.x)},{Math.round(pos.y)}
        </div>
      )}
    </div>
  );
};
