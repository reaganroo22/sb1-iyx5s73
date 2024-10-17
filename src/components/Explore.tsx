import React, { useState, useEffect } from 'react';
import { Heart, X, Star, RotateCcw, Info, Filter } from 'lucide-react';
import { motion, useAnimation } from 'framer-motion';
import { getRandomProfile, likeProfile, superLikeProfile, rejectProfile } from '../services/mockDataService';
import { Profile } from '../types';
import UserProfileModal from './UserProfileModal';

interface ExploreProps {
  subscription: string;
}

const Explore: React.FC<ExploreProps> = ({ subscription }) => {
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    fetchNewProfile();
  }, []);

  const fetchNewProfile = () => {
    const newProfile = getRandomProfile();
    setCurrentProfile(newProfile);
  };

  const handleLike = async () => {
    if (currentProfile) {
      await likeProfile(currentProfile.id);
      await controls.start({ x: '100%', opacity: 0 });
      fetchNewProfile();
      controls.set({ x: 0, opacity: 1 });
    }
  };

  const handleSuperLike = async () => {
    if (currentProfile) {
      if (subscription !== 'free') {
        await superLikeProfile(currentProfile.id);
        await controls.start({ y: '-100%', opacity: 0 });
        fetchNewProfile();
        controls.set({ y: 0, opacity: 1 });
      } else {
        setShowUpgradeModal(true);
      }
    }
  };

  const handleDislike = async () => {
    if (currentProfile) {
      await rejectProfile(currentProfile.id);
      await controls.start({ x: '-100%', opacity: 0 });
      fetchNewProfile();
      controls.set({ x: 0, opacity: 1 });
    }
  };

  const handleRewind = () => {
    if (subscription === 'free') {
      setShowUpgradeModal(true);
    } else {
      // Implement rewind functionality
      console.log('Rewind to previous profile');
    }
  };

  const toggleFilters = () => {
    if (subscription !== 'free') {
      setShowFilters(!showFilters);
    } else {
      setShowUpgradeModal(true);
    }
  };

  if (!currentProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Explore</h2>
        <button onClick={toggleFilters} className="text-pink-500 hover:text-pink-600">
          <Filter size={24} />
        </button>
      </div>
      <motion.div
        animate={controls}
        className="relative"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.7}
        onDragEnd={(event, info) => {
          if (info.offset.x > 100) {
            handleLike();
          } else if (info.offset.x < -100) {
            handleDislike();
          }
        }}
      >
        <img
          src={currentProfile.photos[0]}
          alt={currentProfile.name}
          className="w-full h-96 object-cover cursor-pointer"
          onClick={() => setShowProfileModal(true)}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <h2 className="text-2xl font-bold text-white">{currentProfile.name}, {currentProfile.age}</h2>
          <p className="text-white">{currentProfile.location}</p>
          <div className="flex items-center mt-2">
            <Star className="text-yellow-400 mr-1" size={20} />
            <span className="text-white font-semibold">{currentProfile.hotnessScore}</span>
          </div>
          {currentProfile.premium && (
            <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold ml-2">
              Premium
            </span>
          )}
        </div>
      </motion.div>
      <div className="p-4">
        <p className="text-gray-700 mb-2">{currentProfile.bio}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {currentProfile.interests.map((interest, index) => (
            <span key={index} className="bg-pink-100 text-pink-800 text-xs font-medium px-2.5 py-0.5 rounded">
              {interest}
            </span>
          ))}
        </div>
        <div className="flex justify-between items-center mb-4">
          <button onClick={handleDislike} className="bg-red-500 text-white p-3 rounded-full">
            <X size={24} />
          </button>
          <button onClick={handleRewind} className="bg-blue-500 text-white p-3 rounded-full">
            <RotateCcw size={24} />
          </button>
          <button onClick={handleSuperLike} className="bg-purple-500 text-white p-3 rounded-full">
            <Star size={24} />
          </button>
          <button onClick={handleLike} className="bg-green-500 text-white p-3 rounded-full">
            <Heart size={24} />
          </button>
        </div>
      </div>
      {showProfileModal && (
        <UserProfileModal profile={currentProfile} onClose={() => setShowProfileModal(false)} subscription={subscription} />
      )}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm">
            <h3 className="text-xl font-semibold mb-4">Upgrade to Unlock</h3>
            <p className="mb-4">Upgrade to Premium or Elite to use this feature!</p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowUpgradeModal(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md mr-2"
              >
                Maybe Later
              </button>
              <button
                onClick={() => {
                  setShowUpgradeModal(false);
                  // Implement upgrade logic here
                }}
                className="bg-pink-500 text-white px-4 py-2 rounded-md"
              >
                Upgrade Now
              </button>
            </div>
          </div>
        </div>
      )}
      {showFilters && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm">
            <h3 className="text-xl font-semibold mb-4">Advanced Filters</h3>
            {/* Add filter options here */}
            <button
              onClick={() => setShowFilters(false)}
              className="bg-pink-500 text-white px-4 py-2 rounded-md mt-4"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Explore;