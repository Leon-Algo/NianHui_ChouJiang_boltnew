import React from 'react';
import { Download } from 'lucide-react';
import { CSVLink } from 'react-csv';
import { WinnerDisplay } from '../types';

interface WinnerListProps {
  winners: WinnerDisplay[];
}

export const WinnerList: React.FC<WinnerListProps> = ({ winners }) => {
  const csvData = winners.map(winner => ({
    姓名: winner.name,
    部门: winner.department,
    奖品: winner.prize,
    中奖时间: winner.timestamp
  }));

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-red-800">中奖名单</h2>
        <CSVLink
          data={csvData}
          filename={'年会抽奖结果.csv'}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          <Download size={20} />
          导出结果
        </CSVLink>
      </div>
      <div className="space-y-4 max-h-[400px] overflow-y-auto">
        {winners.map((winner, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-red-50 rounded-lg"
          >
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-lg">{winner.name}</h3>
                <span className="text-sm text-gray-600">({winner.department})</span>
              </div>
              <p className="text-sm text-red-600 font-medium">{winner.prize}</p>
            </div>
            <span className="text-sm text-gray-500">{winner.timestamp}</span>
          </div>
        ))}
      </div>
    </div>
  );
}