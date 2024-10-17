import React, { useState, useEffect } from 'react';
import { Crown, Heart, Users, Star, Zap } from 'lucide-react';
import { Profile } from '../types';
import { getMockMatches } from '../services/mockDataService';
import SuperLikeBlast from './SuperLikeBlast';
import AIDMBlast from './AIDMBlast';

const EliteHub: React.FC = () => {
  const [likes, setLikes] = useState<Profile[]>([]);
  const [matches, setMatches] = useState<Profile[]>([]);
  const [activeTab, setActiveTab] = useState<'likes' | 'matches' | 'elite'>('likes');

  useEffect(() => {
    // Fetch mock data for likes and matches
    const fetchedProfiles = getMockMatches(10);
    setLikes(fetchedProfiles.slice(0, 5));
    setMatches(fetchedProfiles.slice(5, 10));
  }, []);

  const renderProfiles = (profiles: Profile[]) => (
    <div className="space-y-4">
      {profiles.map((profile) => (
        <div key={profile.id} className="flex items-center bg-white p-4 rounded-lg shadow">
          <img
            src={profile.photos[0]}
            alt={profile.name}
            className="w-16 h-16 rounded-full object-cover mr-4"
          />
          <div className="flex-grow">
            <h3 className="text-lg font-semibold">{profile.name}, {profile.age}</h3>
            <p className="text-sm text-gray-600">{profile.location}</p>
          </div>
          <button className="bg-pink-500 text-white p-2 rounded-full hover:bg-pink-600 transition duration-300">
            <Heart size={20} />
          </button>
        </div>
      ))}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <Crown className="mr-2 text-yellow-500" />
        Elite Hub
      </h2>

      <div className="flex mb-6">
        <button
          className={`flex-1 py-2 px-4 text-center ${
            activeTab === 'likes'
              ? 'bg-pink-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          } transition duration-300 rounded-l-md`}
          onClick={() => setActiveTab('likes')}
        >
          Likes
        </button>
        <button
          className={`flex-1 py-2 px-4 text-center ${
            activeTab === 'matches'
              ? 'bg-pink-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          } transition duration-300`}
          onClick={() => setActiveTab('matches')}
        >
          Matches
        </button>
        <button
          className={`flex-1 py-2 px-4 text-center ${
            activeTab === 'elite'
              ? 'bg-pink-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          } transition duration-300 rounded-r-md`}
          onClick={() => setActiveTab('elite')}
        >
          Elite Features
        </button>
      </div>

      {activeTab === 'likes' && (
        <>
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Heart className="mr-2 text-pink-500" />
            Who Liked You
          </h3>
          {renderProfiles(likes)}
        </>
      )}

      {activeTab === 'matches' && (
        <>
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Star className="mr-2 text-yellow-500" />
            Your Matches
          </h3>
          {renderProfiles(matches)}
        </>
      )}

      {activeTab === 'elite' && (
        <>
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Zap className="mr-2 text-purple-500" />
            Elite Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <SuperLikeBlast />
            <AIDMBlast />
          </div>
        </>
      )}

      <div className="bg-yellow-100 p-6 rounded-lg mt-8">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Zap className="mr-2 text-yellow-500" />
          Elite Benefits
        </h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Unlimited Super Likes</li>
          <li>See who liked your profile</li>
          <li>Advanced matching algorithms</li>
          <li>Priority in search results</li>
          <li>Ad-free experience</li>
          <li>Exclusive access to Elite events</li>
          <li>24/7 priority customer support</li>
        </ul>
      </div>
    </div>
  );
};

export default EliteHub;