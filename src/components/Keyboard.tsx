import React, { useState, useEffect } from 'react';
import { NoteName } from '../types';
import { KEYBOARD_CONFIG, SOLFEGE } from '../data/songs';

interface BubbleItem {
  id: number;
  note: NoteName;
  lyric: string;
  leftPercent: number;
}

interface KeyboardProps {
  targetNote: NoteName | null;
  targetMascot: string;
  currentLyric: string;
  isLevel2: boolean;
  onKeyPress: (note: NoteName) => void;
}

export const Keyboard: React.FC<KeyboardProps> = ({
  targetNote,
  targetMascot,
  currentLyric,
  isLevel2,
  onKeyPress,
}) => {
  const [pressedNote, setPressedNote] = useState<NoteName | null>(null);
  const [bubbles, setBubbles] = useState<BubbleItem[]>([]);

  // Spawn falling bubble for Level 2
  useEffect(() => {
    if (!isLevel2 || !targetNote) return;

    const keyIndex = KEYBOARD_CONFIG.findIndex((k) => k.note === targetNote);
    if (keyIndex === -1) return;

    const leftPercent = ((keyIndex + 0.5) / KEYBOARD_CONFIG.length) * 100;
    const newBubble: BubbleItem = {
      id: Date.now() + Math.random(),
      note: targetNote,
      lyric: currentLyric || SOLFEGE[targetNote],
      leftPercent,
    };

    setBubbles((prev) => [...prev.slice(-4), newBubble]);

    const timer = setTimeout(() => {
      setBubbles((prev) => prev.filter((b) => b.id !== newBubble.id));
    }, 3100);

    return () => clearTimeout(timer);
  }, [targetNote, currentLyric, isLevel2]);

  const handlePointerDown = (note: NoteName, e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPressedNote(note);
    onKeyPress(note);
    createSparkles(e.clientX, e.clientY);

    setTimeout(() => {
      setPressedNote(null);
    }, 150);
  };

  const createSparkles = (x: number, y: number) => {
    const symbols = ['✨', '🌸', '💖', '⭐', '🎈'];
    for (let i = 0; i < 6; i++) {
      const spark = document.createElement('div');
      spark.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      spark.style.position = 'fixed';
      spark.style.left = `${x + (Math.random() * 40 - 20)}px`;
      spark.style.top = `${y + (Math.random() * 30 - 15)}px`;
      spark.style.fontSize = '1.3rem';
      spark.style.pointerEvents = 'none';
      spark.style.zIndex = '60';
      spark.style.transition = 'all 0.6s ease-out';
      document.body.appendChild(spark);

      requestAnimationFrame(() => {
        spark.style.transform = `translate(${(Math.random() - 0.5) * 70}px, -${40 + Math.random() * 50}px) scale(1.4)`;
        spark.style.opacity = '0';
      });

      setTimeout(() => spark.remove(), 600);
    }
  };

  return (
    <div className="relative flex-1 w-full flex gap-1 sm:gap-1.5 pt-0.5 pb-1 px-0.5 select-none touch-none min-h-[140px]">
      {/* Falling Bubbles for Level 2 */}
      {isLevel2 && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
          {bubbles.map((b) => (
            <div
              key={b.id}
              className="absolute animate-bubble-drop -translate-x-1/2 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-white via-[#FF4081] to-[#E91E63] text-white font-bold text-[10px] sm:text-xs shadow-md border-2 border-white"
              style={{ left: `${b.leftPercent}%` }}
            >
              <span className="truncate px-0.5">{b.lyric}</span>
            </div>
          ))}
        </div>
      )}

      {/* 8 Chroma-Keys */}
      {KEYBOARD_CONFIG.map((k) => {
        const isTarget = targetNote === k.note;
        const isPressed = pressedNote === k.note;

        return (
          <button
            key={k.note}
            type="button"
            data-note={k.note}
            onPointerDown={(e) => handlePointerDown(k.note, e)}
            className={`piano-key relative flex-1 flex flex-col items-center justify-end pb-1.5 sm:pb-2.5 rounded-xl sm:rounded-2xl cursor-pointer border-2 sm:border-4 border-white transition-transform duration-75 select-none touch-none shadow-[0_6px_0_rgba(0,0,0,0.08),0_8px_16px_rgba(0,0,0,0.05)] active:translate-y-1.5 active:shadow-none ${k.colorClass} ${k.textColor} ${
              isPressed ? 'translate-y-1.5 brightness-110 !shadow-[0_1px_0_rgba(0,0,0,0.1)]' : ''
            } ${isTarget ? 'animate-key-pulse !border-[#FFD700] z-10' : ''}`}
          >
            {/* Top Gloss highlight */}
            <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/70 to-white/5 rounded-t-lg sm:rounded-t-xl pointer-events-none" />

            {/* Target Mascot Badge */}
            {isTarget && (
              <div className="absolute top-[8%] text-xl sm:text-2xl animate-pop-in drop-shadow-md pointer-events-none">
                {targetMascot}
              </div>
            )}

            {/* Note Name & Solfege */}
            <div className="font-black text-base sm:text-xl drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)] leading-tight">
              {k.note.replace('4', '').replace('5', '')}
            </div>
            <div className="font-extrabold text-[11px] sm:text-xs opacity-95 leading-none">
              {SOLFEGE[k.note]}
            </div>
            <div className="mt-0.5 hidden sm:inline-block text-[9px] font-semibold opacity-75 bg-white/40 px-1 py-0.2 rounded">
              Phím {k.numKey}
            </div>
          </button>
        );
      })}
    </div>
  );
};
