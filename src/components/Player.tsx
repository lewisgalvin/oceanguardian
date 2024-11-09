import React, { useEffect, useState } from 'react';
import { useGameContext } from '../context/GameContext';

interface PlayerProps {
  onPositionChange: (position: { x: number; y: number }) => void;
  bounds: { width: number; height: number };
  movement: { dx: number; dy: number };
}

const SubmarineSVG = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className="w-8 h-8 sm:w-12 sm:h-12"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 10h16c3 0 3 4 0 4H4c-3 0-3-4 0-4z" className="fill-yellow-400 stroke-yellow-500" />
    <path d="M8 8c0-2.2 1.8-4 4-4s4 1.8 4 4" className="stroke-yellow-500" />
    <circle cx="7" cy="12" r="1" className="fill-blue-300" />
    <path d="M11 14l2 2 2-2" className="stroke-yellow-500" />
  </svg>
);

const Player: React.FC<PlayerProps> = ({ onPositionChange, bounds, movement }) => {
  const [position, setPosition] = useState({ x: 100, y: 200 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const { gameState } = useGameContext();
  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    if (gameState !== 'playing') return;

    const keys = new Set();
    
    const handleKeyDown = (e: KeyboardEvent) => {
      keys.add(e.key.toLowerCase());
    };
    
    const handleKeyUp = (e: KeyboardEvent) => {
      keys.delete(e.key.toLowerCase());
    };

    const updatePosition = () => {
      if (gameState !== 'playing') return;

      const speed = 5;
      let dx = 0;
      let dy = 0;

      if (!isMobile) {
        if (keys.has('w') || keys.has('arrowup')) dy -= speed;
        if (keys.has('s') || keys.has('arrowdown')) dy += speed;
        if (keys.has('a') || keys.has('arrowleft')) dx -= speed;
        if (keys.has('d') || keys.has('arrowright')) dx += speed;
      } else {
        dx = movement.dx * speed;
        dy = movement.dy * speed;
      }

      setVelocity({ x: dx, y: dy });
      const newPosition = {
        x: Math.max(0, Math.min(bounds.width - 50, position.x + dx)),
        y: Math.max(0, Math.min(bounds.height - 50, position.y + dy))
      };
      setPosition(newPosition);
      onPositionChange(newPosition);
    };

    if (!isMobile) {
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);
    }
    
    const animationFrame = setInterval(updatePosition, 1000/60);

    return () => {
      if (!isMobile) {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('keyup', handleKeyUp);
      }
      clearInterval(animationFrame);
    };
  }, [gameState, position, onPositionChange, bounds, movement, isMobile]);

  return (
    <div 
      className="absolute transition-transform duration-75"
      style={{ 
        transform: `translate(${position.x}px, ${position.y}px) rotate(${velocity.x > 0 ? 0 : velocity.x < 0 ? 180 : 0}deg)`,
      }}
    >
      <SubmarineSVG />
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2">
        <div className="animate-pulse w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-300 rounded-full" />
      </div>
    </div>
  );
};

export default Player;