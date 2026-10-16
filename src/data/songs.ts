import { NoteName, Song } from '../types';

export const NOTE_FREQUENCIES: Record<NoteName, number> = {
  C4: 261.63,
  D4: 293.66,
  E4: 329.63,
  F4: 349.23,
  G4: 392.00,
  A4: 440.00,
  B4: 493.88,
  C5: 523.25,
};

export const SOLFEGE: Record<NoteName, string> = {
  C4: 'Đô',
  D4: 'Rê',
  E4: 'Mi',
  F4: 'Pha',
  G4: 'Son',
  A4: 'La',
  B4: 'Si',
  C5: 'Đố',
};

export const KEYBOARD_CONFIG: Array<{ note: NoteName; numKey: string; colorClass: string; textColor: string }> = [
  { note: 'C4', numKey: '1', colorClass: 'bg-[#FF85A2]', textColor: 'text-white' },
  { note: 'D4', numKey: '2', colorClass: 'bg-[#FFAAA6]', textColor: 'text-white' },
  { note: 'E4', numKey: '3', colorClass: 'bg-[#FFD3B6]', textColor: 'text-[#795548]' },
  { note: 'F4', numKey: '4', colorClass: 'bg-[#DCEDC1]', textColor: 'text-[#33691E]' },
  { note: 'G4', numKey: '5', colorClass: 'bg-[#A8E6CF]', textColor: 'text-[#004D40]' },
  { note: 'A4', numKey: '6', colorClass: 'bg-[#B3E5FC]', textColor: 'text-[#01579B]' },
  { note: 'B4', numKey: '7', colorClass: 'bg-[#D1C4E9]', textColor: 'text-[#4A148C]' },
  { note: 'C5', numKey: '8', colorClass: 'bg-[#F8BBD0]', textColor: 'text-[#880E4F]' },
];

export const SONGS: Song[] = [
  // 1. Ai yêu Bác Hồ Chí Minh hơn thiếu niên nhi đồng (Phong Nhã)
  {
    id: 'ai_yeu_bac_ho',
    title: 'Ai Yêu Bác Hồ Chí Minh',
    icon: '🌸',
    mascot: '🌸',
    notes: [
      { n: 'C4', lyric: 'Ai' }, { n: 'D4', lyric: 'yêu' }, { n: 'E4', lyric: 'Bác' }, { n: 'G4', lyric: 'Hồ' }, { n: 'A4', lyric: 'Chí' }, { n: 'G4', lyric: 'Minh' },
      { n: 'E4', lyric: 'hơn' }, { n: 'D4', lyric: 'thiếu' }, { n: 'E4', lyric: 'niên' }, { n: 'G4', lyric: 'nhi' }, { n: 'C4', lyric: 'đồng' },
      { n: 'C4', lyric: 'Ai' }, { n: 'D4', lyric: 'yêu' }, { n: 'E4', lyric: 'Bác' }, { n: 'G4', lyric: 'Hồ' }, { n: 'A4', lyric: 'Chí' }, { n: 'G4', lyric: 'Minh' },
      { n: 'E4', lyric: 'hơn' }, { n: 'D4', lyric: 'thiếu' }, { n: 'E4', lyric: 'nhi' }, { n: 'D4', lyric: 'Việt' }, { n: 'C4', lyric: 'Nam' },
      { n: 'E4', lyric: 'Bác' }, { n: 'G4', lyric: 'chúng' }, { n: 'A4', lyric: 'em' }, { n: 'C5', lyric: 'dáng' }, { n: 'A4', lyric: 'cao' }, { n: 'G4', lyric: 'cao' },
      { n: 'E4', lyric: 'người' }, { n: 'D4', lyric: 'thanh' }, { n: 'C4', lyric: 'thanh' },
      { n: 'E4', lyric: 'Bác' }, { n: 'G4', lyric: 'chúng' }, { n: 'A4', lyric: 'em' }, { n: 'C5', lyric: 'mắt' }, { n: 'A4', lyric: 'như' }, { n: 'G4', lyric: 'sao' },
      { n: 'E4', lyric: 'râu' }, { n: 'D4', lyric: 'hơi' }, { n: 'C4', lyric: 'dài' },
      { n: 'E4', lyric: 'Hồ' }, { n: 'G4', lyric: 'Chí' }, { n: 'A4', lyric: 'Minh' }, { n: 'G4', lyric: 'kính' }, { n: 'C4', lyric: 'yêu!' },
    ],
  },

  // 2. Cháu Yêu Bà (Xuân Giao)
  {
    id: 'chau_yeu_ba',
    title: 'Cháu Yêu Bà',
    icon: '👵',
    mascot: '👵',
    notes: [
      { n: 'G4', lyric: 'Bà' }, { n: 'E4', lyric: 'ơi' }, { n: 'C4', lyric: 'bà' },
      { n: 'G4', lyric: 'cháu' }, { n: 'E4', lyric: 'yêu' }, { n: 'C4', lyric: 'bà' }, { n: 'D4', lyric: 'lắm' },
      { n: 'E4', lyric: 'Tóc' }, { n: 'D4', lyric: 'bà' }, { n: 'E4', lyric: 'trắng' },
      { n: 'C4', lyric: 'màu' }, { n: 'D4', lyric: 'trắng' }, { n: 'E4', lyric: 'như' }, { n: 'C4', lyric: 'mây' },
      { n: 'G4', lyric: 'Cháu' }, { n: 'E4', lyric: 'yêu' }, { n: 'C4', lyric: 'bà' },
      { n: 'G4', lyric: 'cháu' }, { n: 'E4', lyric: 'nắm' }, { n: 'C4', lyric: 'bàn' }, { n: 'D4', lyric: 'tay' },
      { n: 'E4', lyric: 'Khi' }, { n: 'G4', lyric: 'cháu' }, { n: 'A4', lyric: 'vâng' }, { n: 'G4', lyric: 'lời' },
      { n: 'E4', lyric: 'cháu' }, { n: 'D4', lyric: 'biết' }, { n: 'E4', lyric: 'bà' }, { n: 'C4', lyric: 'vui!' },
    ],
  },

  // 3. Đoàn Tàu Nhỏ Xíu (Mộng Lân / Nguyễn Văn Tý)
  {
    id: 'doan_tau_nho_xiu',
    title: 'Đoàn Tàu Nhỏ Xíu',
    icon: '🚂',
    mascot: '🚂',
    notes: [
      { n: 'C4', lyric: 'Một' }, { n: 'D4', lyric: 'đoàn' }, { n: 'E4', lyric: 'tàu' }, { n: 'G4', lyric: 'nhỏ' }, { n: 'C5', lyric: 'xíu' },
      { n: 'C5', lyric: 'xíu' }, { n: 'C5', lyric: 'xíu' },
      { n: 'G4', lyric: 'Bước' }, { n: 'E4', lyric: 'vội' }, { n: 'G4', lyric: 'bước' }, { n: 'C4', lyric: 'mau' },
      { n: 'C4', lyric: 'Tàu' }, { n: 'D4', lyric: 'đi' }, { n: 'E4', lyric: 'sao' }, { n: 'G4', lyric: 'mau' }, { n: 'C5', lyric: 'thế' },
      { n: 'G4', lyric: 'Tu' }, { n: 'A4', lyric: 'tu' }, { n: 'G4', lyric: 'tu' }, { n: 'E4', lyric: 'tu' },
      { n: 'D4', lyric: 'Tu' }, { n: 'E4', lyric: 'tu' }, { n: 'D4', lyric: 'tu' }, { n: 'C4', lyric: 'tu!' },
    ],
  },

  // 4. Baby Shark (Pinkfong)
  {
    id: 'baby_shark',
    title: 'Baby Shark',
    icon: '🦈',
    mascot: '🦈',
    notes: [
      { n: 'D4', lyric: 'Ba-' }, { n: 'E4', lyric: 'by' }, { n: 'G4', lyric: 'shark' },
      { n: 'G4', lyric: 'doo' }, { n: 'G4', lyric: 'doo' }, { n: 'G4', lyric: 'doo' }, { n: 'G4', lyric: 'doo' }, { n: 'G4', lyric: 'doo' }, { n: 'G4', lyric: 'doo' },
      { n: 'D4', lyric: 'Ba-' }, { n: 'E4', lyric: 'by' }, { n: 'G4', lyric: 'shark' },
      { n: 'G4', lyric: 'doo' }, { n: 'G4', lyric: 'doo' }, { n: 'G4', lyric: 'doo' }, { n: 'G4', lyric: 'doo' }, { n: 'G4', lyric: 'doo' }, { n: 'G4', lyric: 'doo' },
      { n: 'D4', lyric: 'Ba-' }, { n: 'E4', lyric: 'by' }, { n: 'G4', lyric: 'shark' },
      { n: 'G4', lyric: 'doo' }, { n: 'G4', lyric: 'doo' }, { n: 'G4', lyric: 'doo' }, { n: 'G4', lyric: 'doo' }, { n: 'G4', lyric: 'doo' }, { n: 'G4', lyric: 'doo' },
      { n: 'G4', lyric: 'Ba-' }, { n: 'G4', lyric: 'by' }, { n: 'F4', lyric: 'shark!' },
    ],
  },

  // 5. Cả Nhà Thương Nhau (Phan Văn Minh)
  {
    id: 'ca_nha_thuong_nhau',
    title: 'Cả Nhà Thương Nhau',
    icon: '👨‍👩‍👧',
    mascot: '👨‍👩‍👧',
    notes: [
      { n: 'C4', lyric: 'Ba' }, { n: 'D4', lyric: 'thương' }, { n: 'E4', lyric: 'con' },
      { n: 'E4', lyric: 'vì' }, { n: 'G4', lyric: 'con' }, { n: 'E4', lyric: 'giống' }, { n: 'C4', lyric: 'mẹ' },
      { n: 'D4', lyric: 'Mẹ' }, { n: 'E4', lyric: 'thương' }, { n: 'F4', lyric: 'con' },
      { n: 'F4', lyric: 'vì' }, { n: 'A4', lyric: 'con' }, { n: 'F4', lyric: 'giống' }, { n: 'D4', lyric: 'ba' },
      { n: 'E4', lyric: 'Cả' }, { n: 'G4', lyric: 'nhà' }, { n: 'C5', lyric: 'ta' },
      { n: 'C5', lyric: 'cùng' }, { n: 'A4', lyric: 'thương' }, { n: 'G4', lyric: 'yêu' }, { n: 'E4', lyric: 'nhau' },
      { n: 'C4', lyric: 'Xa' }, { n: 'D4', lyric: 'là' }, { n: 'E4', lyric: 'nhớ' },
      { n: 'D4', lyric: 'gần' }, { n: 'E4', lyric: 'nhau' }, { n: 'D4', lyric: 'là' }, { n: 'C4', lyric: 'cười!' },
    ],
  },

  // 6. Đi Học Về (Hoàng Lân)
  {
    id: 'di_hoc_ve',
    title: 'Đi Học Về',
    icon: '🎒',
    mascot: '🎒',
    notes: [
      { n: 'C4', lyric: 'Đi' }, { n: 'D4', lyric: 'học' }, { n: 'E4', lyric: 'về' },
      { n: 'C4', lyric: 'là' }, { n: 'D4', lyric: 'đi' }, { n: 'E4', lyric: 'học' }, { n: 'G4', lyric: 'về' },
      { n: 'G4', lyric: 'Em' }, { n: 'A4', lyric: 'vào' }, { n: 'G4', lyric: 'nhà' },
      { n: 'E4', lyric: 'em' }, { n: 'D4', lyric: 'chào' }, { n: 'E4', lyric: 'cha' }, { n: 'C4', lyric: 'mẹ' },
      { n: 'C4', lyric: 'Cha' }, { n: 'D4', lyric: 'em' }, { n: 'E4', lyric: 'khen' },
      { n: 'C4', lyric: 'rằng' }, { n: 'D4', lyric: 'con' }, { n: 'E4', lyric: 'rất' }, { n: 'G4', lyric: 'ngoan' },
      { n: 'G4', lyric: 'Mẹ' }, { n: 'A4', lyric: 'âu' }, { n: 'G4', lyric: 'yếm' },
      { n: 'E4', lyric: 'hôn' }, { n: 'D4', lyric: 'đôi' }, { n: 'E4', lyric: 'má' }, { n: 'C4', lyric: 'em!' },
    ],
  },

  // 7. Kìa Con Bướm Vàng
  {
    id: 'buom_vang',
    title: 'Kìa Con Bướm Vàng',
    icon: '🦋',
    mascot: '🦋',
    notes: [
      { n: 'C4', lyric: 'Kìa' }, { n: 'D4', lyric: 'con' }, { n: 'E4', lyric: 'bướm' }, { n: 'C4', lyric: 'vàng' },
      { n: 'C4', lyric: 'Kìa' }, { n: 'D4', lyric: 'con' }, { n: 'E4', lyric: 'bướm' }, { n: 'C4', lyric: 'vàng' },
      { n: 'E4', lyric: 'Xòe' }, { n: 'F4', lyric: 'đôi' }, { n: 'G4', lyric: 'cánh' },
      { n: 'E4', lyric: 'Xòe' }, { n: 'F4', lyric: 'đôi' }, { n: 'G4', lyric: 'cánh' },
      { n: 'G4', lyric: 'Bướm' }, { n: 'A4', lyric: 'bướm' }, { n: 'G4', lyric: 'bay' }, { n: 'F4', lyric: 'đôi' }, { n: 'E4', lyric: 'ba' }, { n: 'C4', lyric: 'vòng' },
      { n: 'G4', lyric: 'Bướm' }, { n: 'A4', lyric: 'bướm' }, { n: 'G4', lyric: 'bay' }, { n: 'F4', lyric: 'đôi' }, { n: 'E4', lyric: 'ba' }, { n: 'C4', lyric: 'vòng' },
      { n: 'C4', lyric: 'Em' }, { n: 'G4', lyric: 'ngồi' }, { n: 'C4', lyric: 'xem!' },
      { n: 'C4', lyric: 'Em' }, { n: 'G4', lyric: 'ngồi' }, { n: 'C4', lyric: 'xem!' },
    ],
  },

  // 8. Một Con Vịt
  {
    id: 'mot_con_vit',
    title: 'Một Con Vịt',
    icon: '🦆',
    mascot: '🦆',
    notes: [
      { n: 'G4', lyric: 'Một' }, { n: 'C5', lyric: 'con' }, { n: 'C5', lyric: 'vịt' },
      { n: 'G4', lyric: 'xòe' }, { n: 'A4', lyric: 'ra' }, { n: 'B4', lyric: 'hai' }, { n: 'C5', lyric: 'cái' }, { n: 'G4', lyric: 'cánh' },
      { n: 'E4', lyric: 'Nó' }, { n: 'G4', lyric: 'kêu' }, { n: 'C4', lyric: 'rằng' },
      { n: 'E4', lyric: 'quáp' }, { n: 'E4', lyric: 'quáp' }, { n: 'E4', lyric: 'quáp' },
      { n: 'D4', lyric: 'quạp' }, { n: 'D4', lyric: 'quạp' }, { n: 'D4', lyric: 'quạp' },
      { n: 'C4', lyric: 'Gặp' }, { n: 'D4', lyric: 'hồ' }, { n: 'E4', lyric: 'nước' },
      { n: 'C4', lyric: 'nó' }, { n: 'D4', lyric: 'bì' }, { n: 'E4', lyric: 'bà' }, { n: 'F4', lyric: 'bì' }, { n: 'G4', lyric: 'bõm' },
      { n: 'G4', lyric: 'Lúc' }, { n: 'E4', lyric: 'lên' }, { n: 'C4', lyric: 'bờ' },
      { n: 'D4', lyric: 'vẫy' }, { n: 'E4', lyric: 'cái' }, { n: 'D4', lyric: 'cánh' }, { n: 'C4', lyric: 'cho khô!' },
    ],
  },

  // 9. Bắc Kim Thang
  {
    id: 'bac_kim_thang',
    title: 'Bắc Kim Thang',
    icon: '🎋',
    mascot: '🐸',
    notes: [
      { n: 'C4', lyric: 'Bắc' }, { n: 'D4', lyric: 'kim' }, { n: 'E4', lyric: 'thang' },
      { n: 'E4', lyric: 'cà' }, { n: 'G4', lyric: 'lang' }, { n: 'E4', lyric: 'bí' }, { n: 'D4', lyric: 'rợ' },
      { n: 'C4', lyric: 'Cột' }, { n: 'D4', lyric: 'qua' }, { n: 'E4', lyric: 'kèo' },
      { n: 'E4', lyric: 'là' }, { n: 'G4', lyric: 'kèo' }, { n: 'E4', lyric: 'qua' }, { n: 'D4', lyric: 'cột' },
      { n: 'E4', lyric: 'Chú' }, { n: 'G4', lyric: 'bán' }, { n: 'A4', lyric: 'dầu' },
      { n: 'G4', lyric: 'qua' }, { n: 'E4', lyric: 'cầu' }, { n: 'D4', lyric: 'mà' }, { n: 'E4', lyric: 'té' },
      { n: 'G4', lyric: 'Chú' }, { n: 'A4', lyric: 'bán' }, { n: 'C5', lyric: 'ếch' },
      { n: 'A4', lyric: 'ở' }, { n: 'G4', lyric: 'lại' }, { n: 'E4', lyric: 'làm' }, { n: 'G4', lyric: 'chi' },
      { n: 'C5', lyric: 'Con' }, { n: 'A4', lyric: 'leo' }, { n: 'G4', lyric: 'lẻo' },
      { n: 'E4', lyric: 'nó' }, { n: 'D4', lyric: 'thổi' }, { n: 'C4', lyric: 'tò' }, { n: 'D4', lyric: 'te' },
      { n: 'E4', lyric: 'Kèn' }, { n: 'G4', lyric: 're' }, { n: 'E4', lyric: 'kèn' }, { n: 'D4', lyric: 'rúc' },
      { n: 'C4', lyric: 'tò' }, { n: 'D4', lyric: 'te' }, { n: 'C4', lyric: 'tò te!' },
    ],
  },

  // 10. Cháu Lên Ba
  {
    id: 'chau_len_ba',
    title: 'Cháu Lên Ba',
    icon: '👶',
    mascot: '👧',
    notes: [
      { n: 'C4', lyric: 'Cháu' }, { n: 'D4', lyric: 'lên' }, { n: 'E4', lyric: 'ba' },
      { n: 'G4', lyric: 'cháu' }, { n: 'E4', lyric: 'đi' }, { n: 'G4', lyric: 'mẫu' }, { n: 'A4', lyric: 'giáo' },
      { n: 'A4', lyric: 'Cô' }, { n: 'G4', lyric: 'thương' }, { n: 'E4', lyric: 'cháu' },
      { n: 'C4', lyric: 'vì' }, { n: 'E4', lyric: 'cháu' }, { n: 'D4', lyric: 'không' }, { n: 'C4', lyric: 'khóc' }, { n: 'D4', lyric: 'nhè' },
      { n: 'E4', lyric: 'Không' }, { n: 'G4', lyric: 'khóc' }, { n: 'A4', lyric: 'nhè' },
      { n: 'G4', lyric: 'để' }, { n: 'E4', lyric: 'mẹ' }, { n: 'D4', lyric: 'trồng' }, { n: 'E4', lyric: 'cây' }, { n: 'G4', lyric: 'trái' },
      { n: 'A4', lyric: 'Ba' }, { n: 'G4', lyric: 'vào' }, { n: 'E4', lyric: 'nhà' }, { n: 'G4', lyric: 'máy' },
      { n: 'D4', lyric: 'ông' }, { n: 'C4', lyric: 'bà' }, { n: 'D4', lyric: 'vui' }, { n: 'E4', lyric: 'cấy' }, { n: 'C4', lyric: 'cày!' },
    ],
  },

  // 11. Ngôi Sao Lấp Lánh (Twinkle Star)
  {
    id: 'twinkle_star',
    title: 'Ngôi Sao Lấp Lánh',
    icon: '⭐',
    mascot: '⭐',
    notes: [
      { n: 'C4', lyric: 'Twin-' }, { n: 'C4', lyric: 'kle' }, { n: 'G4', lyric: 'twin-' }, { n: 'G4', lyric: 'kle' },
      { n: 'A4', lyric: 'lit-' }, { n: 'A4', lyric: 'tle' }, { n: 'G4', lyric: 'star' },
      { n: 'F4', lyric: 'How' }, { n: 'F4', lyric: 'I' }, { n: 'E4', lyric: 'won-' }, { n: 'E4', lyric: 'der' },
      { n: 'D4', lyric: 'what' }, { n: 'D4', lyric: 'you' }, { n: 'C4', lyric: 'are' },
      { n: 'G4', lyric: 'Up' }, { n: 'G4', lyric: 'a-' }, { n: 'F4', lyric: 'bove' }, { n: 'F4', lyric: 'the' },
      { n: 'E4', lyric: 'world' }, { n: 'E4', lyric: 'so' }, { n: 'D4', lyric: 'high' },
      { n: 'G4', lyric: 'Like' }, { n: 'G4', lyric: 'a' }, { n: 'F4', lyric: 'dia-' }, { n: 'F4', lyric: 'mond' },
      { n: 'E4', lyric: 'in' }, { n: 'E4', lyric: 'the' }, { n: 'D4', lyric: 'sky' },
      { n: 'C4', lyric: 'Twin-' }, { n: 'C4', lyric: 'kle' }, { n: 'G4', lyric: 'twin-' }, { n: 'G4', lyric: 'kle' },
      { n: 'A4', lyric: 'lit-' }, { n: 'A4', lyric: 'tle' }, { n: 'G4', lyric: 'star' },
      { n: 'F4', lyric: 'How' }, { n: 'F4', lyric: 'I' }, { n: 'E4', lyric: 'won-' }, { n: 'E4', lyric: 'der' },
      { n: 'D4', lyric: 'what' }, { n: 'D4', lyric: 'you' }, { n: 'C4', lyric: 'are!' },
    ],
  },
];
