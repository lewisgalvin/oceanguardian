import React, { useEffect, useState } from 'react';
import { Fish } from 'lucide-react';

interface MarineLifeProps {
  bounds: { width: number; height: number };
}

const MarineLife: React.FC<MarineLifeProps> = ({ bounds }) => {
  const [creatures, setCreatures] = useState<Array<{ id: number; x: number; y: number; type: string }>>([]);

  useEffect(() => {
    const spawnInterval = setInterval(() => {
      const newCreature = {
        id: Date.now(),
        x: bounds.width,
        y: Math.random() * (bounds.height - 32),
        type: 'fish'
      };
      
      setCreatures(prev => [...prev, newCreature]);
    }, 2000);

    const moveInterval = setInterval(() => {
      setCreatures(prev => 
        prev
          .map(creature => ({
            ...creature,
            x: creature.x - 2
          }))
          .filter(creature => creature.x > -32)
      );
    }, 1000/60);

    return () => {
      clearInterval(spawnInterval);
      clearInterval(moveInterval);
    };
  }, [bounds]);

  return (
    <>
      {creatures.map(creature => (
        <div
          key={creature.id}
          className="absolute transition-transform duration-75"
          style={{
            transform: `translate(${creature.x}px, ${creature.y}px)`
          }}
        >
          <Fish className="w-8 h-8 text-blue-200" />
        </div>
      ))}
    </>
  );
};

export default MarineLife;