import React, { useState, useEffect } from 'react';
import { Gift, Users, Trophy } from 'lucide-react';
import { PrizeCard } from './components/PrizeCard';
import { DrawAnimation } from './components/DrawAnimation';
import { WinnerList } from './components/WinnerList';
import { Prize, Participant, WinnerDisplay } from './types';

const SAMPLE_PRIZES: Prize[] = [
  {
    id: '1',
    name: '特等奖 - iPhone 15 Pro Max',
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?w=400',
    winners: []
  },
  {
    id: '2',
    name: '一等奖 - iPad Pro',
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400',
    winners: []
  },
  {
    id: '3',
    name: '二等奖 - AirPods Pro',
    quantity: 5,
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400',
    winners: []
  },
  {
    id: '4',
    name: '三等奖 - 小米手环',
    quantity: 8,
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400',
    winners: []
  }
];

const SAMPLE_PARTICIPANTS: Participant[] = [
  { id: '1', name: '张伟', department: '技术部' },
  { id: '2', name: '李娜', department: '市场部' },
  { id: '3', name: '王芳', department: '设计部' },
  { id: '4', name: '刘洋', department: '产品部' },
  { id: '5', name: '陈明', department: '运营部' },
  { id: '6', name: '赵静', department: '人力资源部' },
  { id: '7', name: '杨波', department: '技术部' },
  { id: '8', name: '周婷', department: '财务部' },
  // 可以根据需要添加更多参与者
];

function App() {
  const [prizes, setPrizes] = useState<Prize[]>(SAMPLE_PRIZES);
  const [selectedPrize, setSelectedPrize] = useState<Prize | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [winners, setWinners] = useState<WinnerDisplay[]>([]);
  const [participants, setParticipants] = useState<Participant[]>(SAMPLE_PARTICIPANTS);

  const handleDraw = () => {
    if (!selectedPrize || !participants.length) return;
    
    const remainingQuantity = selectedPrize.quantity - selectedPrize.winners.length;
    if (remainingQuantity <= 0) return;

    setIsDrawing(true);
  };

  const handleDrawComplete = (winner: Participant) => {
    setIsDrawing(false);
    
    if (selectedPrize) {
      const updatedPrizes = prizes.map(prize => 
        prize.id === selectedPrize.id
          ? { ...prize, winners: [...prize.winners, winner.id] }
          : prize
      );
      setPrizes(updatedPrizes);

      const newWinner: WinnerDisplay = {
        name: winner.name,
        department: winner.department,
        prize: selectedPrize.name,
        timestamp: new Date().toLocaleString('zh-CN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        })
      };
      setWinners(prev => [newWinner, ...prev]);

      setParticipants(prev => prev.filter(p => p.id !== winner.id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-red-100">
      <header className="bg-red-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8 text-yellow-300" />
            <h1 className="text-3xl font-bold text-white">年会幸运抽奖</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Gift className="w-6 h-6 text-red-600" />
              <h2 className="text-xl font-semibold text-red-800">奖品列表</h2>
            </div>
            <div className="grid gap-4">
              {prizes.map(prize => (
                <PrizeCard
                  key={prize.id}
                  prize={prize}
                  onSelect={setSelectedPrize}
                  isSelected={selectedPrize?.id === prize.id}
                />
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-6 h-6 text-red-600" />
                <h2 className="text-xl font-semibold text-red-800">
                  待抽奖人数：{participants.length}
                </h2>
              </div>
              <button
                onClick={handleDraw}
                disabled={!selectedPrize || isDrawing}
                className={`px-8 py-3 rounded-lg font-semibold text-lg ${
                  !selectedPrize || isDrawing
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-red-600 hover:bg-red-700 text-white'
                } transition-colors`}
              >
                {isDrawing ? '抽奖中...' : '开始抽奖'}
              </button>
            </div>

            <DrawAnimation
              participants={participants}
              isDrawing={isDrawing}
              onComplete={handleDrawComplete}
            />

            <WinnerList winners={winners} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;