# Vườn Âm Nhạc Bé Yêu (Kids Princess Music Garden)

Ứng dụng trò chơi âm nhạc tương tác và học đàn Piano đa nhạc cụ dành cho trẻ em (3–7 tuổi), thiết kế theo phong cách Vườn công chúa kẹo ngọt pastel hồng. Ứng dụng cung cấp 4 bộ nhạc cụ tổng hợp Web Audio không độ trễ, 5 bài đồng dao thiếu nhi Việt Nam đặc sắc, 3 cấp độ chơi từ dẫn lối đến tự do sáng tác, tính năng ghi âm & phát lại bản đàn của bé, cùng hệ thống thưởng rương quà và tủ thú bông sưu tập đáng yêu.

## User Review & Critical Decisions

> [!IMPORTANT]
> Các quyết định cốt lõi đã được thống nhất qua bước trao đổi ban đầu:

- **Phong cách & Chủ đề**: Vườn công chúa kẹo ngọt pastel hồng ấm áp, dịu mắt, kết hợp với các hiệu ứng hạt lấp lánh (sparkles, hoa anh đào, ngôi sao) và hoạt ảnh linh vật sinh động.
- **Tính năng Ghi âm & Phát lại**: Tích hợp bộ thu âm giai điệu bé đàn trực tiếp, lưu trữ danh sách bản thu và phát lại với hiệu ứng vỗ tay chúc mừng.
- **Đệm nhạc & Âm thanh**: Tập trung vào âm sắc mộc thuần khiết, trong trẻo của từng nốt nhạc (Grand Piano, Xylophone, Music Box, Fun Synth) để bé rèn luyện cảm âm và cao độ chuẩn xác mà không bị phân tâm bởi tiếng trống dồn dập.

---

## 1. Overview & Core Concept

- **Mục tiêu ứng dụng**: Tạo ra môi trường khám phá âm nhạc an toàn, trực quan, không có quảng cáo hay yếu tố gây xao nhãng cho trẻ nhỏ. Giúp trẻ làm quen với 8 nốt nhạc cơ bản (C4 - C5 / Đô - Đố) và lời bài hát tiếng Việt qua hình ảnh linh vật dẫn dắt.
- **Đối tượng người dùng**: Trẻ em mầm non và tiểu học (3 đến 7 tuổi) cùng phụ huynh, hỗ trợ chơi mượt mà trên iPad, tablet cảm ứng đa điểm lẫn máy tính để bàn (bàn phím số 1-8 hoặc phím chữ).
- **Giá trị mang lại**: Phát triển khả năng cảm thụ nhịp điệu, luyện ngón tay linh hoạt, ghi nhớ lời bài hát dân gian/thiếu nhi Việt Nam, và tạo niềm vui khám phá qua cơ chế thưởng thú bông tích cực (không phạt điểm khi bấm sai).

---

## 2. User Experience & Visual Design

### Key User Flows
1. **Màn hình chính / Sân khấu biểu diễn**:
   - Header tinh tế hiển thị tên thương hiệu, nút chuyển cấp độ (Dẫn lối / Bong bóng / Tự do), nút mở Tủ thú bông và cụm điều khiển Ghi âm / Phát lại.
   - Thanh chọn nhạc cụ trực quan dạng phím nổi (Grand Piano, Mộc cầm Xylophone, Hộp nhạc Cổ tích, Hoạt hình Vui nhộn).
   - Thanh trượt bài hát dạng cuộn ngang với icon minh họa lớn (Kìa con bướm vàng, Một con vịt, Bắc kim thang, Cháu lên ba, Ngôi sao lấp lánh).
   - Thẻ sân khấu biểu diễn karaoke: Linh vật mascot nhảy múa theo nhịp, hiển thị câu hát hiện tại kèm nốt cần bấm tiếp theo.
   - Bàn phím 8 phím màu pastel Chroma-notes lớn, dễ chạm đa điểm, hiển thị tên nốt (C-D-E-F-G-A-B-C), xướng âm tiếng Việt (Đô, Rê, Mi...) và phím tắt bàn phím.
2. **Luồng chơi & Hướng dẫn (3 Cấp độ)**:
   - *Cấp 1 (Dẫn lối)*: Linh vật đứng nhảy nhót trên đúng phím đàn cần bấm kèm hiệu ứng viền vàng lấp lánh.
   - *Cấp 2 (Bong bóng nhịp điệu)*: Bong bóng chữ mang âm tiết bay nhẹ xuống phím đàn tạo thử thách nhịp điệu cho bé.
   - *Cấp 3 (Tự do sáng tác)*: Bàn phím mở hoàn toàn, bé thỏa sức đàn và bật nút Thu âm (Record) để lưu lại tác phẩm.
3. **Phần thưởng & Mở rương Thần Kỳ**:
   - Khi hoàn thành bài hát, pháo hoa giấy (confetti canvas) bay rực rỡ kèm tiếng nhạc kèn hoan hô (fanfare).
   - Modal hiển thị số sao đạt được (1-3 sao) và chiếc Rương Thần Kỳ lắc lư.
   - Bé chạm vào rương để mở khóa 1 trong 6 bạn thú bông dễ thương (Rosie, Gấu Mật, Kỳ Lân, Mèo Mochi, Cún Fluffy, Cánh Cụt Pippo) và lưu vào bộ sưu tập.
4. **Bộ sưu tập Tủ Thú Bông (Plushie Closet)**:
   - Xem toàn bộ các bạn thú bông đã thu thập, có lưu lại vĩnh viễn trong `localStorage` để bé tiếp tục chơi ở các lần sau.

### Visual Identity & Theme
- **Bảng màu chủ đạo**:
  - Nền: Gradient ngọt ngào kem hồng `#FFE4E1` $\rightarrow$ `#FFF0F5` $\rightarrow$ `#F8BBD0`.
  - Phím đàn pastel dịu mắt: C4 hồng cánh sen, D4 cam đào, E4 vàng mơ, F4 xanh quả bơ, G4 xanh ngọc, A4 xanh da trời, B4 tím oải hương, C5 hồng phấn.
  - Nhấn điểm: Vàng kim `#FFD700`, hồng sen đậm `#E91E63`, trắng kem ngọc trai `#FFFDF9`.
- **Typography & Font**: Font tròn trịa vui nhộn, thân thiện với trẻ nhỏ (`Quicksand`, `Nunito`, sans-serif) với kích thước chữ lớn, tương phản rõ ràng và số dạng `tabular-nums`.
- **Giao diện đa cảm ứng (Multi-touch)**: Thiết lập `touch-action: none`, hỗ trợ gõ 2 tay hoặc nhiều ngón cùng lúc không bị giật lag hay phóng to màn hình ngoài ý muốn.

---

## 3. Key Product Decisions & Trade-Offs

- **Web Audio API thuần thay vì file MP3/WAV tĩnh**:
  - *Lựa chọn*: Tự động tổng hợp âm thanh bằng Web Audio API (Oscillator, BiquadFilter, FM Synthesis, DynamicsCompressor).
  - *Lý do*: Tải trang tức thì 0ms, không phụ thuộc đường truyền mạng, không bao giờ bị lỗi đứt file âm thanh, hỗ trợ đa âm sắc tùy biến (Piano, Xylophone, Music Box, Cartoon Synth) và kiểm soát âm lượng an toàn cho tai trẻ nhỏ.
- **Không trừng phạt khi bấm nốt sai (Gentle Guidance)**:
  - *Lựa chọn*: Khi bé bấm sai nốt, phím vẫn phát ra đúng cao độ của nốt đó để rèn luyện thính giác, linh vật chỉ khẽ nhún nhảy nhắc nhở vị trí đúng mà không phát tiếng còi báo lỗi (buzz) gây căng thẳng.
- **Lưu trữ cục bộ LocalStorage cho Thú bông & Bản ghi âm**:
  - *Lựa chọn*: Lưu trữ bộ sưu tập thú bông và lịch sử bản thu của bé ngay trên trình duyệt máy bé, không yêu cầu đăng nhập tài khoản.
- **Kiến trúc React + Tailwind CSS**:
  - *Lựa chọn*: Đóng gói thành ứng dụng React hiện đại với TypeScript, phân chia module rõ ràng (AudioEngine, SongStore, RecordingManager, ConfettiEngine) để đảm bảo hiệu năng 60fps ổn định.

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────┐
│                   App Container (React)                │
├──────────────────────────┬─────────────────────────────┤
│   Top Navigation Bar     │  Level Selector & Closet    │
│   Record / Playback Bar  │  Microphone / Tape Controls │
├──────────────────────────┴─────────────────────────────┤
│   Instrument Selector (Piano / Xylo / MusicBox / Synth)│
├────────────────────────────────────────────────────────┤
│   Song Carousel (5 Vietnamese Nursery Rhymes)          │
├────────────────────────────────────────────────────────┤
│   Stage & Karaoke Guide (Mascot + Lyric + Live Stars)  │
├────────────────────────────────────────────────────────┤
│   8-Key Diatonic Keyboard (C4 - C5 Multi-Touch Canvas) │
└──────────────────────────┬─────────────────────────────┘
                           │
             ┌─────────────┴─────────────┐
             ▼                           ▼
   ┌───────────────────┐       ┌────────────────────┐
   │  Web Audio Engine │       │  Storage & State   │
   │  - Master Limiter │       │  - Unlocked Plush  │
   │  - 4 Timbre Synths│       │  - Saved Records   │
   │  - Fanfare & Chime│       │  - Current Level   │
   └───────────────────┘       └────────────────────┘
```

### State Management & Entities
- `audioEngine`: Quản lý `AudioContext`, DynamicsCompressor, tổng hợp sóng âm theo từng nhạc cụ.
- `gameState`: Chế độ hiện tại (`level`: 1 | 2 | 3), bài hát đang chọn, vị trí nốt hiện tại (`currentNoteIndex`), số lần gõ đúng, tổng số lần gõ.
- `recordingState`: Trạng thái thu âm (`isRecording`, `recordedNotes: Array<{note, time}>`), danh sách bản thu lưu trữ.
- `closetState`: Danh sách 6 thú bông (`unlockedPlushies: string[]`) đồng bộ tự động với `localStorage`.
- `victoryModalState`: Kiểm soát hiển thị modal chiến thắng, mở rương nhận thú bông ngẫu nhiên và kích hoạt hiệu ứng Confetti.
