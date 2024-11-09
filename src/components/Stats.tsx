import React from 'react';
import { Trash2 } from 'lucide-react';

interface StatsProps {
  score: number;
  litterCollected: number;
}

const Stats: React.FC<StatsProps> = ({ score, litterCollected }) => {
  return (
    <div className="absolute top-2 sm:top-4 left-2 sm:left-4 flex gap-2 sm:gap-4">
      <div className="bg-black/50 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-white font-semibold text-sm sm:text-base">
        Score: {score}
      </div>
      <div className="bg-black/50 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-white font-semibold text-sm sm:text-base flex items-center gap-1 sm:gap-2">
        <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
        {litterCollected}
      </div>
    </div>
  );
};

export default Stats;