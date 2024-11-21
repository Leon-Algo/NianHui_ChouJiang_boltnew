import React from 'react';
import { Trophy } from 'lucide-react';
import { Prize } from '../types';

interface PrizeCardProps {
  prize: Prize;
  onSelect: (prize: Prize) => void;
  isSelected: boolean;
}

export const PrizeCard: React.FC<PrizeCardProps> = ({ prize, onSelect, isSelected }) => {
  const remaining = prize.quantity - prize.winners.length;
  
  return (
    <div
      onClick={() => remaining > 0 && onSelect(prize)}
      className={`${
        isSelected ? 'ring-4 ring-red-500' : ''
      } ${
        remaining > 0 ? 'cursor-pointer hover:scale-105' : 'opacity-50 cursor-not-allowed'
      } transform transition-all duration-300 bg-white rounded-xl shadow-lg p-6 flex flex-col items-center space-y-4`}
    >
      {prize.image ? (
        <img src={prize.image} alt={prize.name} className="w-32 h-32 object-contain" />
      ) : (
        <Trophy className="w-16 h-16 text-yellow-500" />
      )}
      <h3 className="text-xl font-bold text-gray-800">{prize.name}</h3>
      <div className="text-sm text-gray-600">
        剩余数量：{remaining} / {prize.quantity}
      </div>
    </div>
  );
}