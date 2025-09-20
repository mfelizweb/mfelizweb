"use client";
import { useEffect, useRef } from "react";

let ctx!: CanvasRenderingContext2D;

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    ctx = canvas.getContext("2d")!;
    if (!ctx) throw new Error("Canvas context not found");

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const particleCount = 90;
    const particles: Particle[] = [];
    const mouse = { x: width / 2, y: height / 2 };

    class Particle {
      x: number;
      y: number;
      baseRadius: number;
      radius: number;
      color: string;
      velocityX: number;
      velocityY: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.baseRadius = Math.random() * 1.5 + 1;
        this.radius = this.baseRadius;
        this.color = "rgba(255,255,255,0.4)";
        this.velocityX = (Math.random() - 0.5) * 0.4;
        this.velocityY = (Math.random() - 0.5) * 0.4;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowColor = "#ffffff";
        ctx.shadowBlur = 15;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      update() {
        this.x += this.velocityX;
        this.y += this.velocityY;

        // Rebote
        if (this.x <= 0 || this.x >= width) this.velocityX *= -1;
        if (this.y <= 0 || this.y >= height) this.velocityY *= -1;

        // Pulso
        const pulse = Math.sin(Date.now() * 0.002 + this.x) * 0.3;
        this.radius = this.baseRadius + pulse;

        // Atracción al mouse
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          this.x += dx / dist;
          this.y += dy / dist;
        }

        this.draw();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function connectParticles() {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 90) {
            const opacity = 1 - distance / 90;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255,255,255,${opacity * 0.25})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => p.update());
      connectParticles();
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
      style={{
        filter: "blur(1px)",
        background: "transparent",
        transition: "filter 0.3s ease-out",
      }}
    />
  );
}
