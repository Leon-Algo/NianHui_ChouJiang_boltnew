import React, { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Participant } from '../types';

interface DrawAnimationProps {
  participants: Participant[];
  isDrawing: boolean;
  onComplete: (winner: Participant) => void;
}

export const DrawAnimation: React.FC<DrawAnimationProps> = ({
  participants,
  isDrawing,
  onComplete,
}) => {
  const animationRef = useRef<number>();
  const namesRef = useRef<HTMLDivElement>(null);
  const deptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isDrawing && participants.length > 0) {
      const duration = 3000;
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        if (progress < 1) {
          const randomIndex = Math.floor(Math.random() * participants.length);
          if (namesRef.current) {
            namesRef.current.textContent = participants[randomIndex].name;
          }
          if (deptRef.current) {
            deptRef.current.textContent = participants[randomIndex].department;
          }
          animationRef.current = requestAnimationFrame(animate);
        } else {
          const winner = participants[Math.floor(Math.random() * participants.length)];
          if (namesRef.current) {
            namesRef.current.textContent = winner.name;
          }
          if (deptRef.current) {
            deptRef.current.textContent = winner.department;
          }
          
          // 喜庆的红色和金色主题烟花效果
          const duration = 15 * 1000;
          const animationEnd = Date.now() + duration;
          const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

          function randomInRange(min: number, max: number) {
            return Math.random() * (max - min) + min;
          }

          const interval: any = setInterval(function() {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
              return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);

            confetti({
              ...defaults,
              particleCount,
              origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
              colors: ['#FFD700', '#FF0000', '#FF4500'],
            });
            confetti({
              ...defaults,
              particleCount,
              origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
              colors: ['#FFD700', '#FF0000', '#FF4500'],
            });
          }, 250);

          onComplete(winner);
        }
      };

      animate();
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isDrawing, participants, onComplete]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] bg-gradient-to-r from-red-600 to-red-800 rounded-xl p-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CiAgPHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIvPgogIDxwYXRoIGQ9Ik0zMCAzMG0tMjggMGEyOCwyOCAwIDEsMSA1NiwwYTI4LDI4IDAgMSwxIC01NiwwIiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmQ3MDAiIHN0cm9rZS13aWR0aD0iMiIvPgo8L3N2Zz4=')] opacity-10"></div>
      <div className="text-yellow-300 text-opacity-90 text-xl mb-4">
        {isDrawing ? "抽奖进行中..." : "请选择奖品开始抽奖"}
      </div>
      <div
        ref={namesRef}
        className="text-6xl md:text-7xl font-bold text-white text-center mb-4"
      >
        {isDrawing ? "?" : "幸运之星"}
      </div>
      <div
        ref={deptRef}
        className="text-2xl text-yellow-300 text-center"
      >
        {isDrawing ? "?" : "等待开奖"}
      </div>
    </div>
  );
}