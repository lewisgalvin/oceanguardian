import React, { useState, useEffect } from 'react';
import { Info } from 'lucide-react';

const oceanFacts = [
  "Every year, 8 million metric tons of plastic enter our oceans.",
  "A single plastic bottle can take 450 years to decompose in the ocean.",
  "90% of seabirds have plastic pieces in their stomachs.",
  "There are 5.25 trillion pieces of plastic debris in the ocean.",
  "By 2050, there could be more plastic than fish in the oceans.",
  "Plastic pollution kills 100,000 marine mammals annually.",
  "The Great Pacific Garbage Patch is twice the size of Texas.",
  "Microplastics have been found in 94% of tap water samples.",
  "73% of beach litter worldwide is plastic.",
  "The deepest part of the ocean, the Mariana Trench, contains plastic waste."
];

interface OceanFactProps {
  show: boolean;
  onComplete: () => void;
}

const OceanFact: React.FC<OceanFactProps> = ({ show, onComplete }) => {
  const [fact, setFact] = useState('');
  const [usedFacts, setUsedFacts] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (show) {
      const availableIndices = Array.from(Array(oceanFacts.length).keys())
        .filter(index => !usedFacts.has(index));

      if (availableIndices.length === 0) {
        setUsedFacts(new Set());
        const randomIndex = Math.floor(Math.random() * oceanFacts.length);
        setFact(oceanFacts[randomIndex]);
        setUsedFacts(new Set([randomIndex]));
      } else {
        const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
        setFact(oceanFacts[randomIndex]);
        setUsedFacts(prev => new Set([...prev, randomIndex]));
      }

      const timer = setTimeout(onComplete, 3000);
      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!show || !fact) return null;

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/80 text-white p-3 sm:p-4 rounded-lg max-w-[90vw] sm:max-w-md z-50 animate-fade-in m-2">
      <div className="flex items-center gap-2 mb-2">
        <Info className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
        <span className="font-semibold text-sm sm:text-base">Ocean Fact</span>
      </div>
      <p className="text-xs sm:text-sm">{fact}</p>
    </div>
  );
};

export default OceanFact;