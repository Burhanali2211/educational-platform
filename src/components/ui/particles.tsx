"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

interface ParticleProps {
  id: string;
  x: number;
  y: number;
  radius: number;
  color: string;
  velocity: {
    x: number;
    y: number;
  };
}

export const Particles = ({
  className = "",
  quantity = 50,
  staticity = 50,
  ease = 50,
  refresh = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const particleColors = theme === "dark" 
      ? ["#3B82F6", "#6366F1", "#8B5CF6", "#A855F7"]  // Blue to purple for dark mode
      : ["#60A5FA", "#818CF8", "#A78BFA", "#C084FC"];  // Lighter colors for light mode

    let width = window.innerWidth;
    let height = window.innerHeight;
    const particles: ParticleProps[] = [];

    const updateCanvasSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    updateCanvasSize();

    const createParticles = () => {
      particles.length = 0;
      const numberOfParticles = quantity;
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push({
          id: `particle-${i}`,
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 2 + 0.5,
          color: particleColors[Math.floor(Math.random() * particleColors.length)],
          velocity: {
            x: (Math.random() - 0.5) * 0.5,
            y: (Math.random() - 0.5) * 0.5,
          },
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((particle) => {
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();

        // Update position
        particle.x += particle.velocity.x * (ease / 10);
        particle.y += particle.velocity.y * (ease / 10);

        // Bounce off edges
        if (particle.x < 0 || particle.x > width) particle.velocity.x *= -1;
        if (particle.y < 0 || particle.y > height) particle.velocity.y *= -1;

        // Add some randomness
        if (Math.random() < 0.005) {
          particle.velocity.x = (Math.random() - 0.5) * 0.5;
          particle.velocity.y = (Math.random() - 0.5) * 0.5;
        }
      });

      requestAnimationFrame(draw);
    };

    const handleResize = () => {
      updateCanvasSize();
      createParticles();
    };

    createParticles();
    draw();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [quantity, staticity, ease, refresh, theme]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none ${className}`}
    />
  );
}; 