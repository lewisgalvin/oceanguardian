import React, { useEffect, useRef, useState } from 'react';
import { Camera, Fish, Trash2 } from 'lucide-react';
import { useGameContext } from '../context/GameContext';
import Stats from './Stats';
import Player from './Player';
import MarineLife from './MarineLife';
import TrashItem from './TrashItem';
import OceanFact from './OceanFact';
import TouchControls from './TouchControls';

const Game: React.FC = () => {
  const { gameState, startGame, score, litterCollected } = useGameContext();
  const [showFact, setShowFact] = useState(false);
  const [playerPosition, setPlayerPosition] = useState({ x: 100, y: 200 });
  const [movement, setMovement] = useState({ dx: 0, dy: 0 });
  const gameRef = useRef<HTMLDivElement>(null);
  const [gameBounds, setGameBounds] = useState({ width: 0, height: 0 });
  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    const updateBounds = () => {
      if (gameRef.current) {
        const rect = gameRef.current.getBoundingClientRect();
        setGameBounds({ width: rect.width, height: rect.height });
      }
    };

    updateBounds();
    window.addEventListener('resize', updateBounds);
    return () => window.removeEventListener('resize', updateBounds);
  }, []);

  return (
    <div className="h-full relative">
      <div 
        ref={gameRef}
        className="w-full h-full bg-gradient-to-b from-blue-400 via-blue-600 to-blue-900 rounded-lg overflow-hidden shadow-xl border-2 sm:border-4 border-blue-300"
      >
        <div className="absolute inset-0 bg-blue-500/10"></div>
        
        {gameState === 'menu' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white p-4">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ocean Guardian</h2>
            <div className="flex gap-4 mb-8">
              <Fish className="w-6 h-6 sm:w-8 sm:h-8" />
              <Camera className="w-6 h-6 sm:w-8 sm:h-8" />
              <Trash2 className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <button
              onClick={startGame}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-full font-semibold transition-colors"
            >
              Start Game
            </button>
            <p className="mt-4 text-xs sm:text-sm opacity-75 text-center">
              {isMobile ? 'Use on-screen controls to move' : 'Use arrow keys or WASD to move'}
            </p>
          </div>
        )}

        {gameState === 'playing' && (
          <>
            <Stats score={score} litterCollected={litterCollected} />
            <MarineLife bounds={gameBounds} />
            <TrashItem 
              onCollect={() => setShowFact(true)} 
              playerPosition={playerPosition}
              bounds={gameBounds}
            />
            <Player 
              onPositionChange={setPlayerPosition} 
              bounds={gameBounds}
              movement={movement}
            />
            <OceanFact show={showFact} onComplete={() => setShowFact(false)} />
            {isMobile && gameState === 'playing' && (
              <TouchControls onMovementChange={setMovement} />
            )}
          </>
        )}

        {gameState === 'over' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white p-4">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Game Over</h2>
            <div className="text-lg sm:text-xl mb-6 text-center">
              <p>Final Score: {score}</p>
              <p className="mt-2">Litter Collected: {litterCollected}</p>
              <p className="mt-4 text-xs sm:text-sm text-blue-300">Thank you for helping clean our oceans!</p>
            </div>
            <button
              onClick={startGame}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-full font-semibold transition-colors"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Game;