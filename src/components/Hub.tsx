import React, { useState, useEffect } from 'react';
import { Heart, Users, Star, Crown, Zap, Calendar } from 'lucide-react';
import { Profile } from '../types';
import { getMockMatches } from '../services/mockDataService';
import Dates from './Dates';

interface HubProps {
  subscription: string;
}

const Hub: React.FC<HubProps> = ({ subscription }) => {
  const [likes, setLikes] = useState<Profile[]>([]);
  const [matches, setMatches] = useState<Profile[]>([]);
  const [activeTab, setActiveTab] = useState<'likes' | 'matches' | 'dates'>('likes');

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
        <Zap className="mr-2 text-pink-500" />
        Hub
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
            activeTab === 'dates'
              ? 'bg-pink-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          } transition duration-300 rounded-r-md`}
          onClick={() => setActiveTab('dates')}
        >
          Dates
        </button>
      </div>

      {activeTab === 'likes' && (
        <>
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Heart className="mr-2 text-pink-500" />
            Who Liked You
          </h3>
          {subscription === 'free' ? (
            <div className="bg-yellow-100 p-4 rounded-lg">
              <p className="text-sm text-gray-700">
                Upgrade to Basic or higher to see who liked you!
              </p>
              <button className="mt-2 bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 transition duration-300">
                Upgrade to Basic
              </button>
            </div>
          ) : (
            renderProfiles(likes)
          )}
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
      {activeTab === 'dates' && (
        <Dates subscription={subscription} />
      )}

      {subscription !== 'elite' && (
        <div className="mt-8 bg-yellow-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <Crown className="mr-2 text-yellow-500" />
            Upgrade to Elite
          </h3>
          <p className="text-sm text-gray-700 mb-2">
            Unlock exclusive features and maximize your dating experience with our Elite subscription!
          </p>
          <button className="bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 transition duration-300">
            Upgrade to Elite
          </button>
        </div>
      )}
    </div>
  );
};

export default Hub;