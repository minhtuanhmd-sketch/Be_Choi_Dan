import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { audioEngine } from '../services/audioEngine';

export interface FireworksRef {
  fire: () => void;
  launchFireworksShow: () => void;
  burstAt: (x: number, y: number) => void;
}

export type ConfettiRef = FireworksRef;

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
  gravity: number;
  friction: number;
  flicker: boolean;
}

interface Rocket {
  x: number;
  y: number;
  targetY: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  trail: Array<{ x: number; y: number; alpha: number }>;
}

interface ConfettiPiece {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  spin: number;
  life: number;
}

interface EmojiBurst {
  x: number;
  y: number;
  vx: number;
  vy: number;
  emoji: string;
  size: number;
  alpha: number;
  rotation: number;
  spin: number;
}

const PALETTES = [
  ['#FF1493', '#FF69B4', '#FFD700', '#FFF', '#FF4081'], // Princess Pink & Gold
  ['#00E5FF', '#76FF03', '#FFD600', '#FF3D00', '#D500F9'], // Rainbow Neon
  ['#FF80AB', '#B388FF', '#80D8FF', '#FFE57F', '#B9F6CA'], // Pastel Dream
  ['#FF3366', '#FF66B2', '#FFCC00', '#FFFFFF', '#FF99CC'], // Sakura Glitz
];

const EMOJIS = ['🌸', '✨', '💖', '⭐', '🦄', '🎈', '🍭', '👑', '🎉', '🦋'];

export const ConfettiCanvas = forwardRef<FireworksRef>((_, ref) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const rocketsRef = useRef<Rocket[]>([]);
  const sparksRef = useRef<Spark[]>([]);
  const confettiRef = useRef<ConfettiPiece[]>([]);
  const emojisRef = useRef<EmojiBurst[]>([]);

  // Explode at coordinates with sparks and emojis
  const createExplosion = (x: number, y: number, customPalette?: string[]) => {
    const palette = customPalette || PALETTES[Math.floor(Math.random() * PALETTES.length)];
    const sparkCount = 65;

    // Sparks
    for (let i = 0; i < sparkCount; i++) {
      const angle = (Math.PI * 2 * i) / sparkCount + (Math.random() - 0.5) * 0.4;
      const speed = 2.5 + Math.random() * 8.5;
      sparksRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 2.5 + Math.random() * 3,
        color: palette[Math.floor(Math.random() * palette.length)],
        alpha: 1,
        decay: 0.012 + Math.random() * 0.015,
        gravity: 0.12,
        friction: 0.96,
        flicker: Math.random() > 0.4,
      });
    }

    // A few cute celebratory emojis flying outwards
    for (let i = 0; i < 5; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.5 + Math.random() * 4.5;
      emojisRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
        size: 18 + Math.random() * 12,
        alpha: 1,
        rotation: Math.random() * 360,
        spin: (Math.random() - 0.5) * 12,
      });
    }

    startLoop();
  };

  // Launch a single rocket towards target
  const launchRocket = (startX: number, targetX: number, targetY: number) => {
    const palette = PALETTES[Math.floor(Math.random() * PALETTES.length)];
    const color = palette[0];
    const dy = targetY - (canvasRef.current?.height || window.innerHeight);
    const vy = -Math.sqrt(2 * 0.15 * Math.abs(dy)) * 0.95;
    const frames = Math.abs(vy / 0.15);
    const vx = (targetX - startX) / (frames || 1);

    rocketsRef.current.push({
      x: startX,
      y: canvasRef.current?.height || window.innerHeight,
      targetY,
      vx,
      vy,
      color,
      size: 3.5,
      trail: [],
    });

    audioEngine.playFireworkSound();
    startLoop();
  };

  // Launch a multi-rocket grand fireworks show
  const launchFireworksShow = () => {
    const canvas = canvasRef.current;
    const w = canvas?.width || window.innerWidth;
    const h = canvas?.height || window.innerHeight;

    // Launch 4 staggered rockets across the screen
    const launches = [
      { startX: w * 0.25, targetX: w * 0.3, targetY: h * 0.28, delay: 0 },
      { startX: w * 0.75, targetX: w * 0.7, targetY: h * 0.24, delay: 350 },
      { startX: w * 0.5, targetX: w * 0.5, targetY: h * 0.2, delay: 750 },
      { startX: w * 0.35, targetX: w * 0.4, targetY: h * 0.32, delay: 1150 },
      { startX: w * 0.65, targetX: w * 0.6, targetY: h * 0.26, delay: 1550 },
    ];

    launches.forEach((l) => {
      setTimeout(() => {
        launchRocket(l.startX, l.targetX, l.targetY);
      }, l.delay);
    });

    // Also trigger gentle confetti rain
    fireConfetti();
  };

  // Burst at exact location (e.g. from the treasure chest)
  const burstAt = (x: number, y: number) => {
    createExplosion(x, y, ['#FFD700', '#FF4081', '#FF80AB', '#FFF', '#00E5FF']);
    audioEngine.playFireworkSound();
    fireConfetti();
  };

  // Classic flutter confetti
  const fireConfetti = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const colors = ['#FF4081', '#FF80AB', '#FFD700', '#B388FF', '#80D8FF', '#FF6E40', '#69F0AE'];
    const newConfetti: ConfettiPiece[] = [];

    for (let i = 0; i < 90; i++) {
      newConfetti.push({
        x: canvas.width * 0.2 + Math.random() * canvas.width * 0.6,
        y: canvas.height * 0.2,
        vx: (Math.random() - 0.5) * 14,
        vy: (Math.random() - 0.6) * 16,
        size: 7 + Math.random() * 9,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        spin: (Math.random() - 0.5) * 12,
        life: 1,
      });
    }

    confettiRef.current = [...confettiRef.current, ...newConfetti];
    startLoop();
  };

  const startLoop = () => {
    if (!animFrameRef.current) {
      animFrameRef.current = requestAnimationFrame(loop);
    }
  };

  const loop = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let hasActive = false;

    // 1. Update & Render Rockets
    for (let i = rocketsRef.current.length - 1; i >= 0; i--) {
      const r = rocketsRef.current[i];
      hasActive = true;

      // Add to trail
      r.trail.push({ x: r.x, y: r.y, alpha: 1 });
      if (r.trail.length > 8) r.trail.shift();

      // Draw trail
      ctx.save();
      r.trail.forEach((t) => {
        t.alpha -= 0.12;
        ctx.fillStyle = r.color;
        ctx.globalAlpha = Math.max(0, t.alpha * 0.7);
        ctx.beginPath();
        ctx.arc(t.x, t.y, r.size * 0.7, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();

      // Draw rocket head
      ctx.save();
      ctx.fillStyle = '#FFF';
      ctx.shadowColor = r.color;
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(r.x, r.y, r.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Physics
      r.x += r.vx;
      r.y += r.vy;
      r.vy += 0.15; // gravity decelerating ascent

      // Check detonation
      if (r.y <= r.targetY || r.vy >= 0) {
        createExplosion(r.x, r.y);
        rocketsRef.current.splice(i, 1);
      }
    }

    // 2. Update & Render Sparks
    for (let i = sparksRef.current.length - 1; i >= 0; i--) {
      const s = sparksRef.current[i];
      hasActive = true;

      s.x += s.vx;
      s.y += s.vy;
      s.vx *= s.friction;
      s.vy *= s.friction;
      s.vy += s.gravity;
      s.alpha -= s.decay;

      if (s.alpha <= 0) {
        sparksRef.current.splice(i, 1);
        continue;
      }

      ctx.save();
      const drawAlpha = s.flicker && Math.random() > 0.5 ? s.alpha * 0.4 : s.alpha;
      ctx.globalAlpha = Math.max(0, drawAlpha);
      ctx.fillStyle = s.color;
      ctx.shadowColor = s.color;
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size * Math.max(0.3, s.alpha), 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // 3. Update & Render Confetti
    for (let i = confettiRef.current.length - 1; i >= 0; i--) {
      const p = confettiRef.current[i];
      hasActive = true;

      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.4;
      p.rotation += p.spin;
      p.life -= 0.011;

      if (p.life <= 0 || p.y > canvas.height + 20) {
        confettiRef.current.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      ctx.restore();
    }

    // 4. Update & Render Celebratory Emojis
    for (let i = emojisRef.current.length - 1; i >= 0; i--) {
      const em = emojisRef.current[i];
      hasActive = true;

      em.x += em.vx;
      em.y += em.vy;
      em.vy += 0.12;
      em.rotation += em.spin;
      em.alpha -= 0.014;

      if (em.alpha <= 0 || em.y > canvas.height + 30) {
        emojisRef.current.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.translate(em.x, em.y);
      ctx.rotate((em.rotation * Math.PI) / 180);
      ctx.globalAlpha = Math.max(0, em.alpha);
      ctx.font = `${em.size}px 'Apple Color Emoji', 'Segoe UI Emoji', sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(em.emoji, 0, 0);
      ctx.restore();
    }

    if (hasActive) {
      animFrameRef.current = requestAnimationFrame(loop);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      animFrameRef.current = null;
    }
  };

  useImperativeHandle(ref, () => ({
    fire: fireConfetti,
    launchFireworksShow,
    burstAt,
  }));

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 w-screen h-screen"
    />
  );
});

ConfettiCanvas.displayName = 'ConfettiCanvas';
