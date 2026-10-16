import React from 'react';
import { GameLevel } from '../types';

interface StageCardProps {
  mascot: string;
  currentLyric: string;
  targetSolfege: string;
  targetNote: string;
  progressPercent: number;
  accuracy: number;
  level: GameLevel;
}

export const StageCard: React.FC<StageCardProps> = ({
  mascot,
  currentLyric,
  targetSolfege,
  targetNote,
  progressPercent,
  accuracy,
  level,
}) => {
  const getStars = () => {
    if (level === 3) return '✨✨✨';
    if (accuracy >= 0.8) return '⭐⭐⭐';
    if (accuracy >= 0.55) return '⭐⭐';
    return '⭐';
  };

  return (
    <div className="w-full bg-white/90 backdrop-blur-md border-2 border-[#FFC1E3] rounded-xl sm:rounded-2xl p-1.5 sm:p-2 px-2.5 sm:px-3 flex items-center justify-between gap-2 shadow-[0_3px_10px_rgba(255,105,180,0.12)] flex-shrink-0 min-h-[42px]">
      {/* Mascot & Lyric info */}
      <div className="flex items-center gap-2">
        <span className="text-2xl sm:text-3xl animate-bounce-mascot inline-block filter drop-shadow">
          {mascot}
        </span>
        <div className="text-left">
          <div className="text-xs sm:text-sm font-black text-[#C2185B] tracking-wide leading-tight truncate max-w-[240px] sm:max-w-xs">
            {level === 3 ? 'Bé Sáng Tác Tự Do 🎶' : `"${currentLyric}"`}
          </div>
          <div className="text-[10px] sm:text-xs text-[#880E4F] font-semibold mt-0.5 leading-none">
            {level === 3 ? (
              'Bé tự do gõ phím sáng tác giai điệu!'
            ) : (
              <>
                Bé gõ nốt: <strong className="text-[#D81B60] underline decoration-[#FF80AB] underline-offset-2">{targetSolfege} ({targetNote})</strong> nhé!
              </>
            )}
          </div>
        </div>
      </div>

      {/* Progress & Live Star cluster */}
      <div className="flex flex-col items-end gap-0.5 flex-shrink-0">
        <div className="text-xs sm:text-sm tracking-wider leading-none">{getStars()}</div>
        <div className="w-20 sm:w-28 h-2 bg-[#FFE4E1] rounded-full overflow-hidden border border-[#FFB6C1]">
          <div
            className="h-full bg-gradient-to-r from-[#FF80AB] to-[#FF4081] rounded-full transition-all duration-200"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
};
