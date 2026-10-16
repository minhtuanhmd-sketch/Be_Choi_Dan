import React, { useState } from 'react';
import { Plushie } from '../types';

interface VictoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  stars: string;
  title: string;
  subtitle: string;
  gradeText: string;
  isExcellent: boolean;
  onOpenChest: (x?: number, y?: number) => Plushie;
  onFireExtraFireworks?: () => void;
  onPlayAgain: () => void;
  onNextSong: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  isOpen,
  onClose,
  stars,
  title,
  subtitle,
  gradeText,
  isExcellent,
  onOpenChest,
  onFireExtraFireworks,
  onPlayAgain,
  onNextSong,
}) => {
  const [chestOpened, setChestOpened] = useState(false);
  const [rewardPlushie, setRewardPlushie] = useState<Plushie | null>(null);

  if (!isOpen) return null;

  const handleChestClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (chestOpened) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const plushie = onOpenChest(x, y);
    setRewardPlushie(plushie);
    setChestOpened(true);
  };

  const handleResetAndClose = (action: () => void) => {
    setChestOpened(false);
    setRewardPlushie(null);
    action();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 bg-black/55 backdrop-blur-sm animate-pop-in">
      <div className="relative w-full max-w-sm bg-gradient-to-b from-[#FFF0F5] to-white border-2 sm:border-4 border-[#FF80AB] rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-[0_15px_35px_rgba(255,64,129,0.35)] text-center max-h-[305px] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={() => handleResetAndClose(onClose)}
          className="absolute top-2.5 right-2.5 w-7 h-7 flex items-center justify-center rounded-full bg-[#FFE4E1] hover:bg-[#FFD1DC] text-[#C2185B] font-extrabold text-sm transition-colors cursor-pointer"
        >
          &times;
        </button>

        <h2 className="text-base sm:text-lg font-black text-[#C2185B] mt-0.5">{title}</h2>
        <p className="text-[11px] sm:text-xs text-[#880E4F] mt-0.5 leading-snug">{subtitle}</p>

        {/* Stars */}
        <div className="text-2xl sm:text-3xl my-1 tracking-widest">{stars}</div>
        <div className="font-extrabold text-xs sm:text-sm text-[#D81B60] mb-1">{gradeText}</div>

        {/* Chest section (if Xuất Sắc) */}
        {isExcellent && (
          <div className="mt-1.5 mb-1.5 p-2 bg-pink-50/80 rounded-xl border border-pink-200">
            {!chestOpened ? (
              <div>
                <p className="text-[11px] sm:text-xs font-bold text-[#E91E63]">
                  🎁 Chạm vào Rương Thần Kỳ để nhận Thú Bông nhé!
                </p>
                <button
                  type="button"
                  onClick={handleChestClick}
                  className="my-1.5 text-4xl block mx-auto cursor-pointer animate-chest-wiggle hover:scale-110 transition-transform filter drop-shadow-md"
                >
                  🧰
                </button>
                <div className="text-[10px] text-[#880E4F] italic">Bé chạm tay vào đây nào!</div>
              </div>
            ) : (
              rewardPlushie && (
                <div className="animate-pop-in bg-white border border-dashed border-[#FF4081] rounded-xl p-2 my-0.5">
                  <div className="text-4xl mb-0.5 filter drop-shadow-sm">{rewardPlushie.emoji}</div>
                  <div className="text-sm font-black text-[#E91E63]">{rewardPlushie.name}</div>
                  <div className="text-[10px] text-[#880E4F] mt-0.5">{rewardPlushie.desc}</div>
                  <p className="text-[10px] font-bold text-emerald-600 mt-1">
                    ✨ Đã lưu vào Tủ Thú Bông của bé!
                  </p>
                </div>
              )
            )}
          </div>
        )}

        {/* Firework Button */}
        {onFireExtraFireworks && (
          <div className="my-2">
            <button
              type="button"
              onClick={onFireExtraFireworks}
              className="px-4 py-1.5 rounded-full text-xs font-black bg-gradient-to-r from-amber-400 via-pink-500 to-purple-500 text-white shadow-md hover:scale-105 active:scale-95 transition-transform cursor-pointer inline-flex items-center gap-1.5 border border-white/60"
            >
              <span>🎆</span> <span>Bắn Thêm Pháo Hoa!</span> <span>✨</span>
            </button>
          </div>
        )}

        {/* Buttons */}
        <div className="mt-3 flex items-center justify-center gap-3">
          <button
            onClick={() => handleResetAndClose(onPlayAgain)}
            className="flex-1 py-2.5 px-4 rounded-full font-bold text-sm bg-gradient-to-r from-[#FF4081] to-[#FF80AB] text-white hover:from-[#F50057] hover:to-[#FF4081] shadow-md transition-transform active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>🔄</span> <span>Chơi Lại</span>
          </button>
          <button
            onClick={() => handleResetAndClose(onNextSong)}
            className="flex-1 py-2.5 px-4 rounded-full font-bold text-sm bg-white border-2 border-[#FF80AB] text-[#C2185B] hover:bg-[#FFF0F5] shadow-sm transition-transform active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>➡️</span> <span>Bài Tiếp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
