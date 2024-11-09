import React from 'react';

interface ScoreProps {
  score: number;
}

const Score: React.FC<ScoreProps> = ({ score }) => {
  return (
    <div className="bg-black/50 px-4 py-2 rounded-full text-white font-semibold">
      Score: {score}
    </div>
  );
};

export default Score;