import React, { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import { useGameContext } from '../context/GameContext';

interface TrashItemProps {
  onCollect: () => void;
  playerPosition: { x: number; y: number };
  bounds: { width: number; height: number };
}

interface TrashPiece {
  id: number;
  x: number;
  y: number;
}

const TrashItem: React.FC<TrashItemProps> = ({ onCollect, playerPosition, bounds }) => {
  const { collectLitter } = useGameContext();
  const [trashPieces, setTrashPieces] = useState<TrashPiece[]>([]);
  const trashSize = 24;
  const collectionDistance = trashSize;

  useEffect(() => {
    const spawnInterval = setInterval(() => {
      if (trashPieces.length < 5) {
        const newTrash: TrashPiece = {
          id: Date.now(),
          x: bounds.width - trashSize,
          y: Math.random() * (bounds.height - trashSize),
        };
        setTrashPieces(prev => [...prev, newTrash]);
      }
    }, 2000);

    return () => clearInterval(spawnInterval);
  }, [bounds, trashPieces.length]);

  useEffect(() => {
    const moveInterval = setInterval(() => {
      setTrashPieces(prev => prev.map(trash => ({
        ...trash,
        x: trash.x - 2,
      })).filter(trash => trash.x + trashSize > 0));
    }, 50);

    return () => clearInterval(moveInterval);
  }, []);

  useEffect(() => {
    setTrashPieces(prev => {
      const newTrashPieces = prev.filter(trash => {
        const distance = Math.sqrt(
          Math.pow(trash.x - playerPosition.x, 2) +
          Math.pow(trash.y - playerPosition.y, 2)
        );

        if (distance < collectionDistance) {
          collectLitter();
          onCollect();
          return false;
        }
        return true;
      });

      return newTrashPieces;
    });
  }, [playerPosition, collectLitter, onCollect]);

  return (
    <>
      {trashPieces.map(trash => (
        <div
          key={trash.id}
          className="absolute transition-transform"
          style={{
            transform: `translate(${trash.x}px, ${trash.y}px)`,
            width: `${trashSize}px`,
            height: `${trashSize}px`,
          }}
        >
          <Trash2 className="w-full h-full text-gray-400" />
        </div>
      ))}
    </>
  );
};

export default TrashItem;