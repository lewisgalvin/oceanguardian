import React from 'react';
import Game from './components/Game';
import { GameProvider } from './context/GameContext';

const App: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-b from-blue-900 to-blue-950 flex items-center justify-center">
      <GameProvider>
        <div className="w-full h-full max-w-3xl px-2 sm:px-4 flex flex-col">
          <h1 className="text-2xl sm:text-4xl font-bold text-center text-white py-2 sm:py-4">Ocean Guardian</h1>
          <div className="flex-1 min-h-0">
            <Game />
          </div>
        </div>
      </GameProvider>
    </div>
  );
};

export default App;