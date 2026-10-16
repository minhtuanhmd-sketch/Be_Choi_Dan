import React, { useState, useEffect } from 'react';
import { NoteName } from '../types';
import { KEYBOARD_CONFIG, SOLFEGE } from '../data/songs';
import { audioEngine } from '../services/audioEngine';

interface BubbleItem {
  id: number;
  note: NoteName;
  lyric: string;
  leftPercent: number;
  popping?: boolean;
}

interface KeyboardProps {
  targetNote: NoteName | null;
  targetMascot: string;
  currentLyric: string;
  isLevel2: boolean;
  isPracticeMode?: boolean;
  nextTargetNote?: NoteName | null;
  onKeyPress: (note: NoteName) => void;
}

export const Keyboard: React.FC<KeyboardProps> = ({
  targetNote,
  targetMascot,
  currentLyric,
  isLevel2,
  isPracticeMode,
  nextTargetNote,
  onKeyPress,
}) => {
  const [pressedNote, setPressedNote] = useState<NoteName | null>(null);
  const [bubbles, setBubbles] = useState<BubbleItem[]>([]);

  // Spawn falling 3D bubble for Level 2
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
      popping: false,
    };

    setBubbles((prev) => [...prev.slice(-3), newBubble]);

    const timer = setTimeout(() => {
      setBubbles((prev) => prev.filter((b) => b.id !== newBubble.id));
    }, 3200);

    return () => clearTimeout(timer);
  }, [targetNote, currentLyric, isLevel2]);

  const handlePointerDown = (note: NoteName, e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPressedNote(note);
    onKeyPress(note);
    createSparkles(e.clientX, e.clientY);

    // Pop bubble if matching note in Level 2
    if (isLevel2) {
      setBubbles((prev) =>
        prev.map((b) => {
          if (b.note === note && !b.popping) {
            audioEngine.playBubblePopSound();
            return { ...b, popping: true };
          }
          return b;
        })
      );

      setTimeout(() => {
        setBubbles((prev) => prev.filter((b) => !b.popping));
      }, 260);
    }

    setTimeout(() => {
      setPressedNote(null);
    }, 150);
  };

  const createSparkles = (x: number, y: number) => {
    const symbols = ['✨', '🌸', '💖', '⭐', '🎈', '🫧'];
    for (let i = 0; i < 6; i++) {
      const spark = document.createElement('div');
      spark.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      spark.style.position = 'fixed';
      spark.style.left = `${x + (Math.random() * 36 - 18)}px`;
      spark.style.top = `${y + (Math.random() * 26 - 13)}px`;
      spark.style.fontSize = '1.2rem';
      spark.style.pointerEvents = 'none';
      spark.style.zIndex = '60';
      spark.style.transition = 'all 0.55s ease-out';
      document.body.appendChild(spark);

      requestAnimationFrame(() => {
        spark.style.transform = `translate(${(Math.random() - 0.5) * 60}px, -${35 + Math.random() * 45}px) scale(1.35)`;
        spark.style.opacity = '0';
      });

      setTimeout(() => spark.remove(), 550);
    }
  };

  return (
    <div className="relative flex-1 w-full flex gap-1 sm:gap-1.5 pt-0.5 pb-1 px-0.5 select-none touch-none min-h-[145px]">
      {/* Falling 3D Soap Bubbles for Level 2 */}
      {isLevel2 && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
          {bubbles.map((b) => (
            <div
              key={b.id}
              className={`absolute -translate-x-1/2 ${
                b.popping ? 'animate-bubble-burst' : 'animate-bubble-drop-smooth'
              }`}
              style={{ left: `${b.leftPercent}%` }}
            >
              {!b.popping ? (
                /* 3D Iridescent Soap Bubble */
                <div className="relative animate-bubble-sway flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-full bubble-3d-sphere text-[#880E4F] font-black text-[11px] sm:text-xs">
                  <span className="relative z-10 px-0.5 truncate drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)] max-w-[34px] sm:max-w-[42px]">
                    {b.lyric}
                  </span>
                </div>
              ) : (
                /* Pop Burst Droplets */
                <div className="relative flex items-center justify-center w-10 h-10">
                  <div className="w-8 h-8 rounded-full border-2 border-white/90 bg-white/40 scale-125 opacity-70" />
                  <span className="absolute -top-1 -left-1 text-[8px]">🫧</span>
                  <span className="absolute -top-1 -right-1 text-[8px]">✨</span>
                  <span className="absolute -bottom-1 -left-1 text-[8px]">💧</span>
                  <span className="absolute -bottom-1 -right-1 text-[8px]">🫧</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* 8 Diatonic Chroma-Keys */}
      {KEYBOARD_CONFIG.map((k) => {
        const isTarget = targetNote === k.note;
        const isPressed = pressedNote === k.note;
        const isPracticeTarget = isPracticeMode && isTarget;
        const isPracticeNext = isPracticeMode && k.note === nextTargetNote && !isTarget;

        return (
          <button
            key={k.note}
            type="button"
            data-note={k.note}
            onPointerDown={(e) => handlePointerDown(k.note, e)}
            className={`piano-key relative flex-1 flex flex-col items-center justify-end pb-1.5 sm:pb-2.5 rounded-xl sm:rounded-2xl cursor-pointer border-2 sm:border-4 border-white transition-transform duration-75 select-none touch-none shadow-[0_6px_0_rgba(0,0,0,0.08),0_8px_16px_rgba(0,0,0,0.05)] active:translate-y-1.5 active:shadow-none ${k.colorClass} ${k.textColor} ${
              isPressed ? 'translate-y-1.5 brightness-110 !shadow-[0_1px_0_rgba(0,0,0,0.1)]' : ''
            } ${
              isPracticeTarget
                ? 'animate-key-pulse !border-[#FFD700] ring-4 ring-[#FFD700] shadow-[0_0_24px_rgba(255,215,0,0.9)] z-20 scale-[1.03]'
                : isPracticeNext
                ? 'border-dashed !border-pink-300 ring-2 ring-pink-300/60 z-10'
                : isTarget
                ? 'animate-key-pulse !border-[#FFD700] z-10'
                : ''
            }`}
          >
            {/* Top Gloss highlight */}
            <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/70 to-white/5 rounded-t-lg sm:rounded-t-xl pointer-events-none" />

            {/* Target Badge / Practice Hand Indicator */}
            {isPracticeTarget ? (
              <div className="absolute top-[5%] flex flex-col items-center animate-bounce-mascot drop-shadow-md pointer-events-none z-30">
                <span className="text-xl sm:text-2xl">👆</span>
                <span className="bg-[#FFD700] text-[#795548] text-[8px] font-black px-1 rounded-full border border-white leading-none whitespace-nowrap shadow-xs">
                  Bé chạm đây
                </span>
              </div>
            ) : isPracticeNext ? (
              <div className="absolute top-[8%] flex flex-col items-center opacity-75 pointer-events-none z-10">
                <span className="text-xs">👉</span>
                <span className="bg-white/80 text-[#880E4F] text-[7px] font-bold px-1 rounded-full leading-none whitespace-nowrap">
                  Kế tiếp
                </span>
              </div>
            ) : isTarget ? (
              <div className="absolute top-[8%] text-xl sm:text-2xl animate-pop-in drop-shadow-md pointer-events-none">
                {targetMascot}
              </div>
            ) : null}

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
