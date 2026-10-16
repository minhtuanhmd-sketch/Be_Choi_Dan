export type NoteName = 'C4' | 'D4' | 'E4' | 'F4' | 'G4' | 'A4' | 'B4' | 'C5';

export interface SongNote {
  n: NoteName;
  lyric: string;
}

export interface Song {
  id: string;
  title: string;
  icon: string;
  mascot: string;
  notes: SongNote[];
}

export type InstrumentType = 'piano' | 'xylophone' | 'musicbox' | 'funsynth';

export interface Plushie {
  id: string;
  name: string;
  emoji: string;
  desc: string;
}

export interface RecordedNote {
  note: NoteName;
  time: number; // millisecond timestamp relative to start
}

export interface SavedRecording {
  id: string;
  title: string;
  date: string;
  notes: RecordedNote[];
  instrument: InstrumentType;
}

export type GameLevel = 1 | 2 | 3 | 4; // 1: Dẫn lối, 2: Bong bóng, 3: Tự do, 4: Luyện ngón (Finger Practice)
