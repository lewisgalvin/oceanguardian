import React from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from 'lucide-react';

interface TouchControlsProps {
  onMovementChange: (movement: { dx: number; dy: number }) => void;
}

const TouchControls: React.FC<TouchControlsProps> = ({ onMovementChange }) => {
  const handleTouchStart = (dx: number, dy: number) => (e: React.TouchEvent) => {
    e.preventDefault();
    onMovementChange({ dx, dy });
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    onMovementChange({ dx: 0, dy: 0 });
  };

  const controls = [
    { dx: 0, dy: -1, icon: ArrowUp, label: 'Up', className: 'col-start-2' },
    { dx: 0, dy: 1, icon: ArrowDown, label: 'Down', className: 'col-start-2' },
    { dx: -1, dy: 0, icon: ArrowLeft, label: 'Left', className: 'col-start-1' },
    { dx: 1, dy: 0, icon: ArrowRight, label: 'Right', className: 'col-start-3' },
  ];

  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 grid grid-cols-3 gap-2 touch-none">
      {controls.map(({ dx, dy, icon: Icon, label, className }) => (
        <button
          key={label}
          className={`w-12 h-12 bg-black/50 rounded-full flex items-center justify-center text-white active:bg-blue-500/50 transition-colors ${className}`}
          onTouchStart={handleTouchStart(dx, dy)}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
          aria-label={label}
        >
          <Icon className="w-6 h-6" />
        </button>
      ))}
    </div>
  );
};

export default TouchControls;