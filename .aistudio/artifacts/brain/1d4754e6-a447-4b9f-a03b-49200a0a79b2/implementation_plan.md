# Kế Hoạch Nâng Cấp Vườn Âm Nhạc Bé Yêu (iPhone 5 SE Piano)

Kế hoạch mở rộng kho bài hát thiếu nhi lên 11 bài đặc sắc, tinh gọn bộ máy âm thanh chuyên sâu vào Grand Piano chuẩn acoustic, và cách tân toàn diện tính năng Cấp 2 với Bong Bóng 3D xà phòng đa sắc bồng bềnh có hiệu ứng nổ bụp sống động.

## User Review & Critical Decisions

> [!IMPORTANT]
> Các quyết định cốt lõi đã được thống nhất:

- **Danh mục bài hát (11 bài)**: Giữ trọn vẹn 5 bài hát cũ (*Kìa Con Bướm Vàng, Một Con Vịt, Bắc Kim Thang, Cháu Lên Ba, Ngôi Sao Lấp Lánh*) và bổ sung 6 bài hát mới theo yêu cầu:
  1. *Ai yêu Bác Hồ Chí Minh hơn thiếu niên nhi đồng* (Nhạc sĩ Phong Nhã)
  2. *Cháu Yêu Bà* (Nhạc sĩ Xuân Giao)
  3. *Đoàn tàu nhỏ xíu* (Nhạc sĩ Mộng Lân / Nguyễn Văn Tý)
  4. *Baby Shark* (Pinkfong)
  5. *Cả nhà thương nhau* (Nhạc sĩ Phan Văn Minh)
  6. *Đi Học Về* (Nhạc sĩ Hoàng Lân)
- **Chỉ giữ lại duy nhất Grand Piano**: Loại bỏ các nhạc cụ Xylophone, Music Box, Cartoon Synth. Loại bỏ thanh chọn nhạc cụ giúp tiết kiệm không gian màn hình 320px của iPhone 5 SE, tăng chiều cao phím đàn thêm ~24px cho bé gõ thoải mái hơn.
- **Bong bóng 3D xà phòng sinh động (Cấp 2)**:
  - Thiết kế đồ họa bong bóng 3D thủy tinh với lớp phản chiếu ánh sáng (glass specular highlight), viền lấp lánh cầu vồng (iridescent gradient), độ trong suốt bán mờ và màu sắc biến đổi theo từng nốt nhạc.
  - Quỹ đạo rơi tự nhiên: Có độ lắc lư võng sóng sin (wobble / sway) nhẹ nhàng thay vì rơi thẳng đứng cứng nhắc.
  - Khi gõ đúng nốt: Bong bóng nổ tung (*pop burst*) thành 6–8 giọt xà phòng li ti kèm âm thanh "bụp" (*bubble pop synth*) nhẹ nhàng, phấn khích.

---

## 1. Overview & Core Concept

- **Mục tiêu**: Tối ưu hóa trải nghiệm học và chơi đàn piano cho bé gái trên màn hình iPhone 5 SE (568 × 320 px).
- **Trải nghiệm âm nhạc**: Âm thanh Grand Piano ấm áp, ngân dài chuẩn xác, không bị lẫn tạp âm từ các nhạc cụ khác.
- **Tập trung thị giác**: Bong bóng 3D bóng bẩy mang theo âm tiết bài hát, rơi nhịp nhàng xuống đúng phím đàn để bé vừa luyện mắt bắt nhịp vừa luyện phản xạ ngón tay.

---

## 2. User Experience & Visual Design

### Key User Flows
1. **Duyệt bài hát mở rộng (11 bài hát)**:
   - Thanh chọn bài hát dạng cuộn ngang mượt mà, phân loại rõ ràng với biểu tượng ngộ nghĩnh cho từng bài hát (🚂 Đoàn tàu, 🦈 Cá mập, 👵 Bà kính yêu, 🎒 Đi học về, 👨‍👩‍👧 Cả nhà thương nhau, 🌸 Bác Hồ kính yêu).
   - Hiển thị tên bài và tác giả ngắn gọn, dễ thương.
2. **Giao diện tinh giản & tối đa hóa phím đàn**:
   - Do bỏ thanh chọn nhạc cụ, toàn bộ chiều cao 320px của iPhone 5 SE được phân bổ lại: Phím đàn tăng từ 140px lên ~170px, giúp bé bấm chuẩn xác hơn trên màn hình cảm ứng nhỏ.
3. **Hiệu ứng Bong bóng 3D & Nổ xà phòng**:
   - Bong bóng 3D có bóng mờ radial gradient, vệt sáng cong viền trên và ánh khúc xạ cầu vồng dịu dàng.
   - Khi rơi, bong bóng dao động ngang $x = x_0 + \sin(t) \times 8\text{px}$ tạo cảm giác bồng bềnh trong không khí.
   - Khi bé gõ đúng nốt, bong bóng nổ bung thành các bọt khí nhỏ bung tỏa bán kính 30px rồi biến mất trong 250ms cùng âm thanh "pop" vui nhộn.

---

## 3. Technical Architecture & Modifications

```
┌────────────────────────────────────────────────────────┐
│             App Shell (iPhone 5 SE 568x320)            │
├────────────────────────────────────────────────────────┤
│   Top Header: Vườn Âm Nhạc · Cấp 1/2/3 · Thu Âm · Tủ   │
├────────────────────────────────────────────────────────┤
│   Song Carousel: 11 Bài Hát Thiếu Nhi (Icons + Titles) │
├────────────────────────────────────────────────────────┤
│   Stage & Karaoke Guide: Linh vật + Lời ca + Tiến độ   │
├────────────────────────────────────────────────────────┤
│   Keyboard + 3D Bubble Drop Canvas (Pop FX & Particles)│
└────────────────────────────────────────────────────────┘
```

### Chi tiết thay đổi Codebase:
1. **`src/types.ts`**:
   - Chuyển `InstrumentType` về `'piano'` duy nhất.
2. **`src/data/songs.ts`**:
   - Chuyển soạn nốt nhạc chính xác (diatonic C4 - C5) cho 6 bài hát mới:
     - *Ai yêu Bác Hồ Chí Minh hơn thiếu niên nhi đồng* (Phong Nhã)
     - *Cháu Yêu Bà* (Xuân Giao)
     - *Đoàn tàu nhỏ xíu* (Nguyễn Văn Tý / Mộng Lân)
     - *Baby Shark* (Pinkfong)
     - *Cả nhà thương nhau* (Phan Văn Minh)
     - *Đi Học Về* (Hoàng Lân)
3. **`src/services/audioEngine.ts`**:
   - Bổ sung hàm `playBubblePopSound()` tổng hợp âm thanh bóng nước/xà phòng nổ bụp bằng sóng sin biến thiên tần số nhanh (400Hz $\rightarrow$ 800Hz trong 60ms).
   - Tối ưu bộ gõ Grand Piano duy nhất.
4. **`src/components/Keyboard.tsx`**:
   - Nâng cấp render bong bóng 3D CSS: Lớp phản quang đa tầng (multi-layer radial & specular gradient, box-shadow dạng glow xà phòng, backdrop-filter tinh tế).
   - Hoạt ảnh lắc lư bồng bềnh `animate-bubble-float` và hệ thống hạt nổ `bubble-pop-droplets`.
5. **`src/App.tsx`**:
   - Loại bỏ thanh `instrument-bar`, tái cấu trúc layout màn hình iPhone 5 SE (568 × 320 px) cho không gian bàn phím tối ưu nhất.
