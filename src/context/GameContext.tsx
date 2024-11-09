import React, { createContext, useContext, useState } from 'react';

type GameState = 'menu' | 'playing' | 'over';

interface GameContextType {
  gameState: GameState;
  score: number;
  litterCollected: number;
  startGame: () => void;
  endGame: () => void;
  collectLitter: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>('menu');
  const [score, setScore] = useState(0);
  const [litterCollected, setLitterCollected] = useState(0);

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setLitterCollected(0);
  };

  const endGame = () => {
    setGameState('over');
  };

  const collectLitter = () => {
    setScore(prev => prev + 100);
    setLitterCollected(prev => prev + 1);
  };

  return (
    <GameContext.Provider value={{
      gameState,
      score,
      litterCollected,
      startGame,
      endGame,
      collectLitter
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};