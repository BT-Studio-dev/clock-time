import React, { useEffect, useRef } from "react";

type PixelBackgroundProps = {
  pixelOn: boolean;
  theme: "dark" | "light";
};

type PixelStar = {
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
  alpha: number;
  pulseSpeed: number;
};

type MousePixel = {
  x: number;
  y: number;
  size: number;
  color: string;
  life: number;
  maxLife: number;
  vx: number;
  vy: number;
};

export const PixelBackground: React.FC<PixelBackgroundProps> = ({ pixelOn, theme }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mousePixelsRef = useRef<MousePixel[]>([]);

  useEffect(() => {
    if (!pixelOn) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Color palettes for retro pixels
    const colors =
      theme === "dark"
        ? ["#ffd166", "#7eb8e8", "#34d399", "#f43f5e", "#a78bfa", "#ffffff"]
        : ["#d97706", "#0284c7", "#059669", "#e11d48", "#7c3aed", "#475569"];

    // Initialize 8-bit retro pixel stars
    const starCount = Math.floor((width * height) / 12000);
    const stars: PixelStar[] = [];
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.floor(Math.random() * width),
        y: Math.floor(Math.random() * height),
        size: Math.random() > 0.8 ? 4 : 2, // 2px or 4px square 8-bit pixels
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: 0.15 + Math.random() * 0.45,
        alpha: 0.2 + Math.random() * 0.7,
        pulseSpeed: 0.02 + Math.random() * 0.04,
      });
    }

    // Mouse movement spawns pixel dust
    const handleMouseMove = (e: MouseEvent) => {
      if (Math.random() > 0.4) return;
      // Snap to 4px grid for authentic pixel look
      const snapX = Math.floor(e.clientX / 4) * 4;
      const snapY = Math.floor(e.clientY / 4) * 4;

      mousePixelsRef.current.push({
        x: snapX,
        y: snapY,
        size: Math.random() > 0.5 ? 4 : 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 0,
        maxLife: 20 + Math.random() * 20,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5 - 0.4,
      });

      if (mousePixelsRef.current.length > 60) {
        mousePixelsRef.current.shift();
      }
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw floating 8-bit square pixels
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.y -= s.speed;
        if (s.y < -10) {
          s.y = height + 10;
          s.x = Math.floor(Math.random() * width);
        }

        s.alpha += Math.sin(Date.now() * s.pulseSpeed) * 0.01;
        const currentAlpha = Math.max(0.1, Math.min(0.9, s.alpha));

        ctx.globalAlpha = currentAlpha;
        ctx.fillStyle = s.color;
        // Draw sharp square pixel without anti-aliasing blur
        ctx.fillRect(Math.floor(s.x), Math.floor(s.y), s.size, s.size);
      }

      // Draw interactive mouse pixels
      const activePixels: MousePixel[] = [];
      for (let i = 0; i < mousePixelsRef.current.length; i++) {
        const p = mousePixelsRef.current[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;

        const progress = p.life / p.maxLife;
        if (progress < 1) {
          ctx.globalAlpha = 1 - progress;
          ctx.fillStyle = p.color;
          ctx.fillRect(Math.floor(p.x), Math.floor(p.y), p.size, p.size);
          activePixels.push(p);
        }
      }
      mousePixelsRef.current = activePixels;
      ctx.globalAlpha = 1;

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [pixelOn, theme]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Dynamic Ambient Glow Spheres (Always present behind glass) */}
      <div className="absolute -top-[20%] left-[15%] w-[650px] h-[650px] rounded-full bg-[#7eb8e8]/10 blur-[130px]" />
      <div className="absolute top-[35%] -right-[10%] w-[550px] h-[550px] rounded-full bg-[#ffd166]/10 blur-[140px]" />
      <div className="absolute -bottom-[20%] left-[10%] w-[750px] h-[750px] rounded-full bg-[#3b1c6e]/15 blur-[160px]" />

      {/* Retro Pixel Grid Layer (Active when pixelOn is true) */}
      {pixelOn && (
        <>
          <div className="absolute inset-0 pixel-grid opacity-75 transition-opacity duration-500" />
          <div className="absolute inset-0 pixel-dots opacity-40 transition-opacity duration-500" />
          <canvas ref={canvasRef} className="absolute inset-0 size-full" />
          <div className="absolute inset-0 pixel-scanlines opacity-15 pointer-events-none" />
        </>
      )}
    </div>
  );
};
