import React, { useState, useEffect } from 'react';
import { Trophy, MapPin, Star, Users, Filter } from 'lucide-react';
import { Profile } from '../types';
import { getMockMatches } from '../services/mockDataService';

const Leaderboard: React.FC = () => {
  const [leaders, setLeaders] = useState<Profile[]>([]);
  const [filter, setFilter] = useState<'global' | 'local'>('global');
  const [genderFilter, setGenderFilter] = useState<'all' | 'men' | 'women'>('all');

  useEffect(() => {
    // Fetch mock data for leaderboard
    const fetchedProfiles = getMockMatches(50);
    setLeaders(fetchedProfiles.sort((a, b) => b.hotnessScore - a.hotnessScore));
  }, []);

  const filteredLeaders = leaders.filter(profile => {
    if (genderFilter === 'all') return true;
    if (genderFilter === 'men') return profile.gender === 'male';
    if (genderFilter === 'women') return profile.gender === 'female';
    return true;
  });

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <Trophy className="mr-2 text-yellow-400" />
        Who's the Hottest?
      </h2>

      <div className="flex justify-between mb-6">
        <div>
          <label className="mr-2">Scope:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as 'global' | 'local')}
            className="border rounded-md p-1"
          >
            <option value="global">Global</option>
            <option value="local">Local</option>
          </select>
        </div>
        <div>
          <label className="mr-2">Gender:</label>
          <select
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value as 'all' | 'men' | 'women')}
            className="border rounded-md p-1"
          >
            <option value="all">All</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredLeaders.map((profile, index) => (
          <div key={profile.id} className="flex items-center bg-gray-100 p-4 rounded-lg">
            <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-yellow-400 rounded-full mr-4 font-bold text-white">
              {index + 1}
            </div>
            <img
              src={profile.photos[0]}
              alt={profile.name}
              className="w-12 h-12 rounded-full object-cover mr-4"
            />
            <div className="flex-grow">
              <h3 className="text-lg font-semibold">{profile.name}, {profile.age}</h3>
              <p className="text-sm text-gray-600 flex items-center">
                <MapPin size={14} className="mr-1" />
                {profile.location}
              </p>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center mb-1">
                <Star className="text-yellow-400 mr-1" size={18} />
                <span className="font-semibold">{profile.hotnessScore}</span>
              </div>
              <div className="text-sm text-gray-600">
                <span className="mr-2">Likes: {profile.likes}</span>
                <span>Matches: {profile.matches}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;