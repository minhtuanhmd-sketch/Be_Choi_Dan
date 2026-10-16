import React, { useState } from 'react';
import { SavedRecording } from '../types';
import { audioEngine } from '../services/audioEngine';

interface RecordingStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  recordings: SavedRecording[];
  onDeleteRecording: (id: string) => void;
  onPlayRecording: (recording: SavedRecording) => void;
  playingRecordingId: string | null;
}

export const RecordingStudioModal: React.FC<RecordingStudioModalProps> = ({
  isOpen,
  onClose,
  recordings,
  onDeleteRecording,
  onPlayRecording,
  playingRecordingId,
}) => {
  const [activeTab, setActiveTab] = useState<'recordings' | 'tips'>('recordings');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 bg-black/50 backdrop-blur-sm animate-pop-in">
      <div className="relative w-full max-w-sm sm:max-w-md bg-gradient-to-b from-[#FFF0F5] to-white border-2 sm:border-4 border-[#FF80AB] rounded-2xl sm:rounded-3xl p-3 shadow-[0_15px_35px_rgba(255,64,129,0.35)] text-center max-h-[305px] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2.5 right-2.5 w-7 h-7 flex items-center justify-center rounded-full bg-[#FFE4E1] hover:bg-[#FFD1DC] text-[#C2185B] font-extrabold text-sm transition-colors cursor-pointer"
        >
          &times;
        </button>

        <div className="flex items-center justify-center gap-1.5 mb-0.5">
          <span className="text-xl">🎙️</span>
          <h2 className="text-base sm:text-lg font-black text-[#C2185B]">Phòng Thu Âm Bé Yêu</h2>
          <span className="text-xl">🎶</span>
        </div>
        <p className="text-[10px] sm:text-xs text-[#880E4F] mb-2 leading-none">
          Nghe lại những giai điệu tuyệt vời do chính đôi bàn tay bé gõ nên!
        </p>

        {/* Tab Switcher */}
        <div className="flex justify-center gap-1.5 mb-2">
          <button
            onClick={() => setActiveTab('recordings')}
            className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all ${
              activeTab === 'recordings'
                ? 'bg-gradient-to-r from-[#FF4081] to-[#FF80AB] text-white shadow-xs'
                : 'bg-white border border-[#FFB6C1] text-[#880E4F]'
            }`}
          >
            Bản Thu Của Bé ({recordings.length})
          </button>
          <button
            onClick={() => setActiveTab('tips')}
            className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all ${
              activeTab === 'tips'
                ? 'bg-gradient-to-r from-[#FF4081] to-[#FF80AB] text-white shadow-xs'
                : 'bg-white border border-[#FFB6C1] text-[#880E4F]'
            }`}
          >
            Mẹo Thu Âm 💡
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto pr-0.5 text-left max-h-[160px]">
          {activeTab === 'recordings' ? (
            recordings.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-44 text-center text-[#880E4F]/70">
                <span className="text-4xl mb-2">📼</span>
                <p className="font-bold text-sm">Bé chưa có bản thu âm nào!</p>
                <p className="text-xs mt-1 max-w-xs">
                  Bé hãy bấm vào nút tròn đỏ <strong>"Bắt Đầu Thu"</strong> ở góc trên màn hình, sau đó đàn một đoạn nhạc rồi bấm Lưu nhé!
                </p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {recordings.map((rec) => {
                  const isPlaying = playingRecordingId === rec.id;
                  return (
                    <div
                      key={rec.id}
                      className={`p-3 rounded-2xl border-2 transition-all flex items-center justify-between gap-3 ${
                        isPlaying
                          ? 'bg-[#FFF0F5] border-[#FF4081] shadow-md scale-[1.01]'
                          : 'bg-white border-[#FFD1DC] hover:border-[#FF80AB]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#FFE4E1] flex items-center justify-center text-xl flex-shrink-0">
                          {isPlaying ? '🎵' : '🎼'}
                        </div>
                        <div>
                          <div className="font-extrabold text-[#D81B60] text-sm">
                            {rec.title}
                          </div>
                          <div className="text-[11px] text-[#880E4F]/80 flex items-center gap-2 mt-0.5">
                            <span>{rec.notes.length} nốt</span>
                            <span>•</span>
                            <span>{rec.date}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => {
                            audioEngine.init();
                            onPlayRecording(rec);
                          }}
                          className={`px-3 py-1.5 rounded-full text-xs font-extrabold flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer ${
                            isPlaying
                              ? 'bg-[#FF4081] text-white shadow'
                              : 'bg-white border-2 border-[#FF80AB] text-[#C2185B] hover:bg-[#FFF0F5]'
                          }`}
                        >
                          <span>{isPlaying ? '⏹️ Dừng' : '▶️ Nghe'}</span>
                        </button>
                        <button
                          onClick={() => onDeleteRecording(rec.id)}
                          title="Xóa bản thu"
                          className="w-8 h-8 rounded-full bg-[#FFF0F5] hover:bg-rose-100 text-[#C2185B] flex items-center justify-center text-xs transition-colors cursor-pointer"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )
          ) : (
            <div className="bg-white/80 border border-[#FFD1DC] rounded-2xl p-4 text-xs sm:text-sm text-[#5D4037] space-y-2">
              <p className="font-bold text-[#C2185B]">✨ Cách để có bản nhạc hay:</p>
              <ul className="list-disc pl-4 space-y-1.5 text-xs text-[#880E4F]">
                <li>Chuyển sang chế độ <strong>"Tự Do"</strong> để thoải mái gõ nốt theo cảm hứng.</li>
                <li>Thử đổi sang các nhạc cụ khác nhau như <strong>Xylophone</strong> hoặc <strong>Hộp Nhạc Cổ Tích</strong> để giai điệu thêm thần tiên!</li>
                <li>Đàn từ tốn từng nốt để âm thanh ngân vang tròn trịa nhất.</li>
              </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-[#FFD1DC] flex justify-center">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full font-extrabold text-sm text-white bg-gradient-to-r from-[#FF4081] to-[#FF80AB] hover:from-[#F50057] hover:to-[#FF4081] shadow-[0_4px_10px_rgba(245,0,87,0.3)] transition-transform active:scale-95 cursor-pointer"
          >
            Quay Lại Vườn Âm Nhạc 🌸
          </button>
        </div>
      </div>
    </div>
  );
};
