import React, { useState, useEffect } from 'react';
import { Heart, Users, MessageSquare } from 'lucide-react';
import { Profile } from '../types';
import { getMockMatches } from '../services/mockDataService';

const LikesAndMatches: React.FC = () => {
  const [likes, setLikes] = useState<Profile[]>([]);
  const [matches, setMatches] = useState<Profile[]>([]);
  const [activeTab, setActiveTab] = useState<'likes' | 'matches'>('likes');

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
            <MessageSquare size={20} />
          </button>
        </div>
      ))}
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto bg-gray-100 rounded-xl shadow-md overflow-hidden p-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <Heart className="mr-2 text-pink-500" />
        Likes & Matches
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
          Who Liked You
        </button>
        <button
          className={`flex-1 py-2 px-4 text-center ${
            activeTab === 'matches'
              ? 'bg-pink-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          } transition duration-300 rounded-r-md`}
          onClick={() => setActiveTab('matches')}
        >
          Your Matches
        </button>
      </div>

      {activeTab === 'likes' ? renderProfiles(likes) : renderProfiles(matches)}

      <div className="mt-6 text-center text-sm text-gray-600">
        <p>{activeTab === 'likes' ? 'These people have liked your profile.' : 'You\'ve matched with these people.'}</p>
        <p>Start a conversation to get to know them better!</p>
      </div>
    </div>
  );
};

export default LikesAndMatches;