import React from 'react';
import { Plushie } from '../types';
import { PLUSHIES } from '../data/plushies';
import { audioEngine } from '../services/audioEngine';

interface PlushieClosetModalProps {
  isOpen: boolean;
  onClose: () => void;
  unlockedPlushieIds: string[];
}

export const PlushieClosetModal: React.FC<PlushieClosetModalProps> = ({
  isOpen,
  onClose,
  unlockedPlushieIds,
}) => {
  if (!isOpen) return null;

  const handlePlushieTap = (plushie: Plushie, isUnlocked: boolean) => {
    if (isUnlocked) {
      audioEngine.playTreasureSound();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 bg-black/55 backdrop-blur-sm animate-pop-in">
      <div className="relative w-full max-w-sm sm:max-w-md bg-gradient-to-b from-[#FFF0F5] to-white border-2 sm:border-4 border-[#FF80AB] rounded-2xl sm:rounded-3xl p-3 shadow-[0_15px_35px_rgba(255,64,129,0.35)] text-center max-h-[305px] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2.5 right-2.5 w-7 h-7 flex items-center justify-center rounded-full bg-[#FFE4E1] hover:bg-[#FFD1DC] text-[#C2185B] font-extrabold text-sm transition-colors cursor-pointer"
        >
          &times;
        </button>

        <div className="flex items-center justify-center gap-1.5 mb-0.5">
          <span className="text-xl">🧸</span>
          <h2 className="text-base sm:text-lg font-black text-[#C2185B]">Tủ Thú Nhồi Bông Của Bé</h2>
        </div>
        <p className="text-[10px] sm:text-xs text-[#880E4F] mb-1.5">
          Bé đạt 3 sao <strong>Xuất Sắc</strong> để mở rương sưu tập đủ 6 bạn thú bông nhé! ({unlockedPlushieIds.length}/6)
        </p>

        {/* 6 Plushie Grid */}
        <div className="grid grid-cols-3 gap-1.5 overflow-y-auto max-h-[180px] p-0.5 flex-1">
          {PLUSHIES.map((p) => {
            const isUnlocked = unlockedPlushieIds.includes(p.id);
            return (
              <div
                key={p.id}
                onClick={() => handlePlushieTap(p, isUnlocked)}
                className={`p-1.5 rounded-xl border transition-all text-center flex flex-col items-center justify-between cursor-pointer ${
                  isUnlocked
                    ? 'bg-white border-[#FFB6C1] hover:border-[#FF4081] shadow-xs hover:scale-[1.02]'
                    : 'bg-white/60 border-gray-200 opacity-60 grayscale'
                }`}
              >
                <div className="text-2xl sm:text-3xl my-0.5 filter drop-shadow select-none">
                  {isUnlocked ? p.emoji : '🔒'}
                </div>
                <div className="font-extrabold text-[10px] text-[#C2185B] leading-tight line-clamp-1">
                  {isUnlocked ? p.name : 'Chưa Mở Khóa'}
                </div>
                <div className="text-[8px] text-[#880E4F]/85 mt-0.5 leading-tight line-clamp-1">
                  {isUnlocked ? p.desc : 'Đạt 3 sao để mở'}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-2 pt-2 border-t border-[#FFD1DC] flex justify-center">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-full font-extrabold text-xs text-white bg-gradient-to-r from-[#FF4081] to-[#FF80AB] hover:from-[#F50057] hover:to-[#FF4081] shadow-sm transition-transform active:scale-95 cursor-pointer"
          >
            Bé Chơi Đàn Tiếp 💖
          </button>
        </div>
      </div>
    </div>
  );
};
