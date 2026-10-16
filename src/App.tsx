import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GameLevel, InstrumentType, NoteName, Plushie, SavedRecording, RecordedNote } from './types';
import { SONGS, SOLFEGE, KEYBOARD_CONFIG } from './data/songs';
import { PLUSHIES } from './data/plushies';
import { audioEngine } from './services/audioEngine';
import { Keyboard } from './components/Keyboard';
import { StageCard } from './components/StageCard';
import { ConfettiCanvas, ConfettiRef } from './components/ConfettiCanvas';
import { VictoryModal } from './components/VictoryModal';
import { PlushieClosetModal } from './components/PlushieClosetModal';
import { RecordingStudioModal } from './components/RecordingStudioModal';

const SHORTCUT_MAP: Record<string, NoteName> = {
  '1': 'C4', '2': 'D4', '3': 'E4', '4': 'F4', '5': 'G4', '6': 'A4', '7': 'B4', '8': 'C5',
  'c': 'C4', 'd': 'D4', 'e': 'E4', 'f': 'F4', 'g': 'G4', 'a': 'A4', 'b': 'B4',
};

// iPhone 5 / SE (1st gen) viewport dimensions
const IPHONE_5SE_WIDTH = 568;
const IPHONE_5SE_HEIGHT = 320;

export default function App() {
  // Navigation & Game State
  const [currentLevel, setCurrentLevel] = useState<GameLevel>(1);
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);
  const [currentNoteIndex, setCurrentNoteIndex] = useState<number>(0);
  const currentInstrument: InstrumentType = 'piano';
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Scoring
  const [correctHits, setCorrectHits] = useState<number>(0);
  const [totalAttempts, setTotalAttempts] = useState<number>(0);

  // Modals
  const [isVictoryOpen, setIsVictoryOpen] = useState<boolean>(false);
  const [isClosetOpen, setIsClosetOpen] = useState<boolean>(false);
  const [isStudioOpen, setIsStudioOpen] = useState<boolean>(false);

  // Orientation & Device Fit State
  const [isPortrait, setIsPortrait] = useState<boolean>(false);
  const [forceRotateLandscape, setForceRotateLandscape] = useState<boolean>(true);
  const [scaleMode, setScaleMode] = useState<'fit' | 'exact'>('fit');
  const [viewportSize, setViewportSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  // Recording State
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const recordingStartTimeRef = useRef<number>(0);
  const currentRecordNotesRef = useRef<RecordedNote[]>([]);
  const [savedRecordings, setSavedRecordings] = useState<SavedRecording[]>(() => {
    try {
      const data = localStorage.getItem('piano_saved_recordings');
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  });
  const [playingRecordingId, setPlayingRecordingId] = useState<string | null>(null);
  const playbackTimeoutsRef = useRef<number[]>([]);

  // Plushie Storage
  const [unlockedPlushieIds, setUnlockedPlushieIds] = useState<string[]>(() => {
    try {
      const data = localStorage.getItem('piano_unlocked_plushies');
      return data ? JSON.parse(data) : ['bunny']; // First gift plushie
    } catch {
      return ['bunny'];
    }
  });

  const confettiRef = useRef<ConfettiRef | null>(null);

  const activeSong = SONGS[currentSongIndex];
  const targetNoteObj = activeSong.notes[currentNoteIndex] || null;
  const nextNoteObj = activeSong.notes[currentNoteIndex + 1] || null;
  const nextTargetNote = nextNoteObj ? nextNoteObj.n : null;
  const nextNotesPreview = activeSong.notes
    .slice(currentNoteIndex + 1, currentNoteIndex + 3)
    .map((n) => ({
      solfege: SOLFEGE[n.n],
      num: KEYBOARD_CONFIG.find((k) => k.note === n.n)?.numKey || '',
    }));
  const isSongFinished = currentNoteIndex >= activeSong.notes.length;

  // Track window resize and orientation
  useEffect(() => {
    const updateDimensions = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      setViewportSize({ width: w, height: h });
      setIsPortrait(h > w);
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    window.addEventListener('orientationchange', updateDimensions);
    return () => {
      window.removeEventListener('resize', updateDimensions);
      window.removeEventListener('orientationchange', updateDimensions);
    };
  }, []);

  // Persist plushies
  useEffect(() => {
    try {
      localStorage.setItem('piano_unlocked_plushies', JSON.stringify(unlockedPlushieIds));
    } catch (e) {
      console.error(e);
    }
  }, [unlockedPlushieIds]);

  // Persist recordings
  useEffect(() => {
    try {
      localStorage.setItem('piano_saved_recordings', JSON.stringify(savedRecordings));
    } catch (e) {
      console.error(e);
    }
  }, [savedRecordings]);

  // Audio unlock listener
  useEffect(() => {
    audioEngine.currentInstrument = 'piano';
    const handleFirstGesture = () => {
      audioEngine.init();
      window.removeEventListener('pointerdown', handleFirstGesture);
    };
    window.addEventListener('pointerdown', handleFirstGesture);
    return () => window.removeEventListener('pointerdown', handleFirstGesture);
  }, []);

  // Handle Note Pressed
  const handleNotePressed = useCallback((note: NoteName) => {
    audioEngine.init();
    audioEngine.playNote(note);

    if (isRecording) {
      const timeDelta = Date.now() - recordingStartTimeRef.current;
      currentRecordNotesRef.current.push({ note, time: timeDelta });
    }

    if (currentLevel === 3) return;
    if (!targetNoteObj || isSongFinished) return;

    setTotalAttempts((prev) => prev + 1);

    if (note === targetNoteObj.n) {
      setCorrectHits((prev) => prev + 1);
      const nextIndex = currentNoteIndex + 1;
      setCurrentNoteIndex(nextIndex);

      if (nextIndex >= activeSong.notes.length) {
        setTimeout(() => {
          triggerSongCompletion();
        }, 350);
      }
    }
  }, [isRecording, currentLevel, targetNoteObj, isSongFinished, currentNoteIndex, activeSong]);

  // Song completion handling
  const triggerSongCompletion = () => {
    const accuracy = totalAttempts === 0 ? 1 : correctHits / totalAttempts;
    if (accuracy >= 0.8) {
      audioEngine.playFanfare();
      confettiRef.current?.launchFireworksShow();
    } else {
      confettiRef.current?.fire();
    }
    setIsVictoryOpen(true);
  };

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      const key = e.key.toLowerCase();
      const mappedNote = SHORTCUT_MAP[key];
      if (mappedNote) {
        e.preventDefault();
        handleNotePressed(mappedNote);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNotePressed]);

  // Reset current song
  const resetSong = () => {
    setCurrentNoteIndex(0);
    setCorrectHits(0);
    setTotalAttempts(0);
  };

  // Switch song
  const handleSelectSong = (index: number) => {
    setCurrentSongIndex(index);
    setCurrentNoteIndex(0);
    setCorrectHits(0);
    setTotalAttempts(0);
  };

  // Switch Level
  const handleSelectLevel = (lvl: GameLevel) => {
    setCurrentLevel(lvl);
    resetSong();
  };

  // Toggle Mute
  const handleToggleMute = () => {
    const nextState = !isMuted;
    setIsMuted(nextState);
    audioEngine.setMute(nextState);
  };

  // Start / Stop Recording
  const handleToggleRecording = () => {
    if (!isRecording) {
      audioEngine.init();
      recordingStartTimeRef.current = Date.now();
      currentRecordNotesRef.current = [];
      setIsRecording(true);
    } else {
      setIsRecording(false);
      const notes = [...currentRecordNotesRef.current];
      if (notes.length > 0) {
        const newRecord: SavedRecording = {
          id: 'rec_' + Date.now(),
          title: `Giai Điệu Của Bé #${savedRecordings.length + 1}`,
          date: new Date().toLocaleDateString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
          notes,
          instrument: currentInstrument,
        };
        setSavedRecordings((prev) => [newRecord, ...prev]);
        audioEngine.playTreasureSound();
        confettiRef.current?.fire();
      }
    }
  };

  // Play a saved recording
  const handlePlayRecording = (recording: SavedRecording) => {
    if (playingRecordingId === recording.id) {
      stopPlayback();
      return;
    }

    stopPlayback();
    setPlayingRecordingId(recording.id);

    recording.notes.forEach((item, idx) => {
      const timeoutId = window.setTimeout(() => {
        audioEngine.playNote(item.note, recording.instrument);
        if (idx === recording.notes.length - 1) {
          setTimeout(() => {
            setPlayingRecordingId(null);
            audioEngine.playCheerSound();
            confettiRef.current?.fire();
          }, 400);
        }
      }, item.time);
      playbackTimeoutsRef.current.push(timeoutId);
    });
  };

  const stopPlayback = () => {
    playbackTimeoutsRef.current.forEach((t) => clearTimeout(t));
    playbackTimeoutsRef.current = [];
    setPlayingRecordingId(null);
  };

  // Delete a recording
  const handleDeleteRecording = (id: string) => {
    if (playingRecordingId === id) stopPlayback();
    setSavedRecordings((prev) => prev.filter((r) => r.id !== id));
  };

  // Open Mystery Treasure Chest
  const handleOpenChest = (x?: number, y?: number): Plushie => {
    audioEngine.playTreasureSound();
    if (x !== undefined && y !== undefined) {
      confettiRef.current?.burstAt(x, y);
    } else {
      confettiRef.current?.launchFireworksShow();
    }

    setTimeout(() => {
      confettiRef.current?.launchFireworksShow();
    }, 450);

    const locked = PLUSHIES.filter((p) => !unlockedPlushieIds.includes(p.id));
    let rewarded: Plushie;
    if (locked.length > 0) {
      rewarded = locked[Math.floor(Math.random() * locked.length)];
      setUnlockedPlushieIds((prev) => [...prev, rewarded.id]);
    } else {
      rewarded = PLUSHIES[Math.floor(Math.random() * PLUSHIES.length)];
    }
    return rewarded;
  };

  // Accuracy & Victory tier calculations
  const accuracy = totalAttempts === 0 ? 1 : correctHits / totalAttempts;
  const isExcellent = accuracy >= 0.8;
  const starsString = isExcellent ? '⭐⭐⭐' : accuracy >= 0.55 ? '⭐⭐' : '⭐';
  const victoryTitle = isExcellent
    ? 'Bé Thật Tuyệt Vời! 👑'
    : accuracy >= 0.55
    ? 'Bé Đàn Giỏi Quá! 💖'
    : 'Bé Làm Rất Tốt! 🌸';
  const victoryGrade = isExcellent
    ? 'Đạt Danh Hiệu: Xuất Sắc!'
    : accuracy >= 0.55
    ? 'Đạt Danh Hiệu: Tốt'
    : 'Đạt Danh Hiệu: Khá';
  const victorySubtitle = isExcellent
    ? 'Bé đàn rất khéo và chuẩn xác từng nốt nhạc!'
    : accuracy >= 0.55
    ? 'Bé đã thuộc giai điệu rồi đấy, thêm chút nữa là Xuất Sắc!'
    : 'Bé nghe nhạc rất say mê! Lần sau bé thử lại để nhận quà nhé!';

  const progressPercent = activeSong.notes.length === 0
    ? 0
    : Math.min(100, Math.round((currentNoteIndex / activeSong.notes.length) * 100));

  // Determine scaling & orientation transform for iPhone 5 SE
  let containerStyle: React.CSSProperties = {
    width: `${IPHONE_5SE_WIDTH}px`,
    height: `${IPHONE_5SE_HEIGHT}px`,
  };

  let scaleFactor = 1;
  const needsRotation = isPortrait && forceRotateLandscape;

  if (needsRotation) {
    // When held in portrait, rotate 90 degrees to landscape and scale to fit mobile screen
    scaleFactor = Math.min(
      viewportSize.width / IPHONE_5SE_HEIGHT,
      viewportSize.height / IPHONE_5SE_WIDTH
    );
    containerStyle = {
      ...containerStyle,
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: `translate(-50%, -50%) rotate(90deg) scale(${scaleFactor})`,
      transformOrigin: 'center center',
    };
  } else if (scaleMode === 'fit') {
    // Landscape fit mode: scale up/down to fit within current window while keeping 568x320 ratio
    scaleFactor = Math.min(
      viewportSize.width / IPHONE_5SE_WIDTH,
      viewportSize.height / IPHONE_5SE_HEIGHT
    );
    containerStyle = {
      ...containerStyle,
      transform: `scale(${scaleFactor})`,
      transformOrigin: 'center center',
    };
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-slate-900 flex flex-col items-center justify-center select-none touch-none">
      {/* Desktop Helper Toolbar */}
      {!isPortrait && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-40 hidden md:flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs border border-white/20 shadow-lg">
          <span className="font-bold text-pink-300">📱 iPhone 5 SE ({IPHONE_5SE_WIDTH} × {IPHONE_5SE_HEIGHT})</span>
          <span className="text-white/40">|</span>
          <button
            onClick={() => setScaleMode(scaleMode === 'fit' ? 'exact' : 'fit')}
            className={`px-2 py-0.5 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${
              scaleMode === 'fit' ? 'bg-pink-500 text-white' : 'bg-white/20 hover:bg-white/30 text-white'
            }`}
          >
            {scaleMode === 'fit' ? '🔍 Vừa màn hình' : '📏 Kích thước 100%'}
          </button>
        </div>
      )}

      {/* Portrait Notice / Auto-Rotate Toggle on Mobile */}
      {isPortrait && (
        <div className="absolute top-2 z-40 flex items-center justify-between w-full px-3 text-white text-xs">
          <div className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 border border-pink-400/40">
            <span>📱 Khung iPhone 5 SE (Ngang)</span>
          </div>
          <button
            onClick={() => setForceRotateLandscape(!forceRotateLandscape)}
            className="bg-pink-600 hover:bg-pink-500 text-white px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 shadow-md cursor-pointer"
          >
            <span>🔄</span> <span>{forceRotateLandscape ? 'Tắt xoay' : 'Tự động xoay'}</span>
          </button>
        </div>
      )}

      {/* Confetti Explosion Canvas */}
      <ConfettiCanvas ref={confettiRef} />

      {/* iPhone 5 SE Outer Bezel & Screen Wrapper */}
      <div
        className="relative bg-gradient-to-br from-[#FFE4E1] via-[#FFF0F5] to-[#F8BBD0] flex flex-col text-[#5D4037] select-none touch-none shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden rounded-[20px] border-4 border-slate-700/60"
        style={containerStyle}
      >
        {/* Floating Ambient Emojis */}
        <div className="absolute top-[6%] left-[3%] text-2xl opacity-50 pointer-events-none animate-float-slow">
          🌸
        </div>
        <div
          className="absolute top-[10%] right-[4%] text-2xl opacity-50 pointer-events-none animate-float-slow"
          style={{ animationDelay: '1.2s' }}
        >
          ✨
        </div>
        <div
          className="absolute bottom-[8%] left-[4%] text-2xl opacity-50 pointer-events-none animate-float-slow"
          style={{ animationDelay: '2s' }}
        >
          💖
        </div>
        <div
          className="absolute bottom-[10%] right-[3%] text-2xl opacity-50 pointer-events-none animate-float-slow"
          style={{ animationDelay: '1.6s' }}
        >
          🦄
        </div>

        {/* Main 568x320 Content Canvas */}
        <div className="relative z-10 flex flex-col h-full w-full p-1.5 justify-between">
          {/* Top Header Bar (Height ~30px) */}
          <header className="flex items-center justify-between gap-1 px-2 py-1 bg-white/90 backdrop-blur-md rounded-xl shadow-[0_4px_12px_rgba(255,105,180,0.18)] border border-[#FFD1DC] flex-shrink-0">
            <div className="flex items-center gap-1 text-xs sm:text-sm font-black text-[#E91E63] tracking-tight whitespace-nowrap">
              <span>🎹</span>
              <span className="drop-shadow-[0_1px_0_#FFF]">Grand Piano Bé Yêu</span>
              <span>🌸</span>
            </div>

            <div className="flex items-center gap-1 flex-wrap justify-end">
              {/* Level Selectors */}
              <div className="flex items-center gap-0.5 bg-[#FFF0F5] p-0.5 rounded-full border border-[#FFB6C1]">
                <button
                  onClick={() => handleSelectLevel(1)}
                  className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold transition-all cursor-pointer ${
                    currentLevel === 1
                      ? 'bg-gradient-to-r from-[#FF4081] to-[#FF80AB] text-white shadow-xs'
                      : 'text-[#C2185B] hover:bg-white'
                  }`}
                  title="Cấp 1: Linh vật dẫn lối"
                >
                  🌟 Dẫn Lối
                </button>
                <button
                  onClick={() => handleSelectLevel(2)}
                  className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold transition-all cursor-pointer ${
                    currentLevel === 2
                      ? 'bg-gradient-to-r from-[#FF4081] to-[#FF80AB] text-white shadow-xs'
                      : 'text-[#C2185B] hover:bg-white'
                  }`}
                  title="Cấp 2: Bong bóng nhịp điệu 3D"
                >
                  🎈 Bong Bóng
                </button>
                <button
                  onClick={() => handleSelectLevel(4)}
                  className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold transition-all cursor-pointer ${
                    currentLevel === 4
                      ? 'bg-gradient-to-r from-[#FF4081] to-[#FF80AB] text-white shadow-xs'
                      : 'text-[#C2185B] hover:bg-white'
                  }`}
                  title="Cấp 4: Luyện ngón phím sáng theo thứ tự nốt nhạc"
                >
                  👆 Luyện Ngón
                </button>
                <button
                  onClick={() => handleSelectLevel(3)}
                  className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold transition-all cursor-pointer ${
                    currentLevel === 3
                      ? 'bg-gradient-to-r from-[#FF4081] to-[#FF80AB] text-white shadow-xs'
                      : 'text-[#C2185B] hover:bg-white'
                  }`}
                  title="Cấp 3: Sáng tác tự do"
                >
                  🎨 Tự Do
                </button>
              </div>

              {/* Recording Controls */}
              <button
                onClick={handleToggleRecording}
                className={`px-2 py-0.5 rounded-full text-[10px] font-black flex items-center gap-1 transition-all cursor-pointer ${
                  isRecording
                    ? 'bg-rose-600 text-white animate-pulse shadow-xs ring-1 ring-rose-400'
                    : 'bg-white border border-rose-300 text-rose-700 hover:bg-rose-50'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isRecording ? 'bg-white' : 'bg-rose-600'}`} />
                <span>{isRecording ? 'Lưu' : 'Thu'}</span>
              </button>

              {/* Studio List */}
              <button
                onClick={() => setIsStudioOpen(true)}
                className="px-1.5 py-0.5 rounded-full text-[10px] font-extrabold bg-white border border-[#FF80AB] text-[#C2185B] hover:bg-[#FFF0F5] transition-all cursor-pointer flex items-center gap-0.5"
                title="Phòng thu của bé"
              >
                <span>🎙️</span>
                <span>({savedRecordings.length})</span>
              </button>

              {/* Plushie Closet */}
              <button
                onClick={() => setIsClosetOpen(true)}
                className="px-1.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#FFF0F5] border border-[#E91E63] text-[#C2185B] hover:bg-white transition-all cursor-pointer flex items-center gap-0.5"
                title="Tủ thú nhồi bông"
              >
                <span>🧸</span>
                <span>({unlockedPlushieIds.length}/6)</span>
              </button>

              {/* Mute Toggle */}
              <button
                onClick={handleToggleMute}
                className="w-6 h-6 rounded-full bg-white border border-[#FFB6C1] hover:bg-[#FFF0F5] text-xs flex items-center justify-center cursor-pointer transition-colors"
                title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
              >
                {isMuted ? '🔇' : '🔊'}
              </button>
            </div>
          </header>

          {/* 11 Song Carousel Bar (Compact Row ~30px) */}
          <div className="flex gap-1.5 overflow-x-auto py-1 px-0.5 scrollbar-none flex-shrink-0">
            {SONGS.map((song, idx) => (
              <button
                key={song.id}
                onClick={() => handleSelectSong(idx)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-xl border transition-all cursor-pointer text-left ${
                  idx === currentSongIndex
                    ? 'bg-gradient-to-r from-[#FFF0F5] to-[#FFE4E1] border-[#E91E63] shadow-xs ring-1 ring-[#FF4081]'
                    : 'bg-white/95 border-[#FFB6C1] hover:border-[#FF4081] opacity-90'
                }`}
              >
                <span className="text-base filter drop-shadow-xs">{song.icon}</span>
                <div>
                  <div className="text-[11px] font-black text-[#D81B60] leading-none whitespace-nowrap">
                    {song.title}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Stage & Karaoke Guidance Card (Compact ~40px) */}
          <div className="my-0.5 flex-shrink-0">
            <StageCard
              mascot={currentLevel === 3 ? '🎨' : activeSong.mascot}
              currentLyric={targetNoteObj ? targetNoteObj.lyric : 'Hoàn thành!'}
              targetSolfege={targetNoteObj ? SOLFEGE[targetNoteObj.n] : ''}
              targetNote={targetNoteObj ? targetNoteObj.n : ''}
              progressPercent={progressPercent}
              accuracy={accuracy}
              level={currentLevel}
              nextNotesPreview={nextNotesPreview}
            />
          </div>

          {/* Piano Keyboard (Fills remaining height ~160px) */}
          <Keyboard
            targetNote={currentLevel === 3 ? null : targetNoteObj ? targetNoteObj.n : null}
            targetMascot={activeSong.mascot}
            currentLyric={targetNoteObj ? targetNoteObj.lyric : ''}
            isLevel2={currentLevel === 2}
            isPracticeMode={currentLevel === 4}
            nextTargetNote={currentLevel === 4 ? nextTargetNote : null}
            onKeyPress={handleNotePressed}
          />
        </div>

        {/* Victory / Reward Modal */}
        <VictoryModal
          isOpen={isVictoryOpen}
          onClose={() => setIsVictoryOpen(false)}
          stars={starsString}
          title={victoryTitle}
          subtitle={victorySubtitle}
          gradeText={victoryGrade}
          isExcellent={isExcellent}
          onOpenChest={handleOpenChest}
          onFireExtraFireworks={() => confettiRef.current?.launchFireworksShow()}
          onPlayAgain={() => {
            setIsVictoryOpen(false);
            resetSong();
          }}
          onNextSong={() => {
            setIsVictoryOpen(false);
            const nextIdx = (currentSongIndex + 1) % SONGS.length;
            handleSelectSong(nextIdx);
          }}
        />

        {/* Plushie Closet Modal */}
        <PlushieClosetModal
          isOpen={isClosetOpen}
          onClose={() => setIsClosetOpen(false)}
          unlockedPlushieIds={unlockedPlushieIds}
        />

        {/* Recording Studio Modal */}
        <RecordingStudioModal
          isOpen={isStudioOpen}
          onClose={() => setIsStudioOpen(false)}
          recordings={savedRecordings}
          onDeleteRecording={handleDeleteRecording}
          onPlayRecording={handlePlayRecording}
          playingRecordingId={playingRecordingId}
        />
      </div>
    </div>
  );
}
