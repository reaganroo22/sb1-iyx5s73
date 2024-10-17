import React, { useState } from 'react';
import { Zap, Book, TrendingUp, Award } from 'lucide-react';
import IcebreakerGames from './IcebreakerGames';
import PersonalGrowth from './PersonalGrowth';

interface EngageProps {
  subscription: string;
}

const Engage: React.FC<EngageProps> = ({ subscription }) => {
  const [activeTab, setActiveTab] = useState<'icebreakers' | 'growth'>('icebreakers');

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <Zap className="mr-2 text-yellow-500" />
        Engage
      </h2>

      <div className="flex mb-6">
        <button
          className={`flex-1 py-2 px-4 text-center ${
            activeTab === 'icebreakers'
              ? 'bg-pink-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          } transition duration-300 rounded-l-md`}
          onClick={() => setActiveTab('icebreakers')}
        >
          <Book size={18} className="inline-block mr-2" />
          Icebreakers
        </button>
        <button
          className={`flex-1 py-2 px-4 text-center ${
            activeTab === 'growth'
              ? 'bg-pink-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          } transition duration-300 rounded-r-md`}
          onClick={() => setActiveTab('growth')}
        >
          <TrendingUp size={18} className="inline-block mr-2" />
          Personal Growth
        </button>
      </div>

      {activeTab === 'icebreakers' ? (
        <IcebreakerGames subscription={subscription} />
      ) : (
        <PersonalGrowth subscription={subscription} />
      )}

      <div className="mt-8 bg-yellow-100 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 flex items-center">
          <Award className="mr-2 text-yellow-500" />
          Rewards
        </h3>
        <p className="text-sm text-gray-700">
          Earn badges and boost your profile visibility by participating in Icebreaker Games and completing Personal Growth goals regularly. 
          The more you engage, the higher you'll rank on the Leaderboard!
        </p>
      </div>
    </div>
  );
};

export default Engage;