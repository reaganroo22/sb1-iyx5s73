import React, { useState, useEffect } from 'react';
import { Heart, X, Star, Info, Phone, Video } from 'lucide-react';
import { motion, useAnimation } from 'framer-motion';
import { getRandomProfile, likeProfile, superLikeProfile, rejectProfile } from '../services/mockDataService';
import { Profile } from '../types';
import UserProfileModal from './UserProfileModal';

interface MatchingProps {
  subscription: string;
}

const Matching: React.FC<MatchingProps> = ({ subscription }) => {
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
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
    if (currentProfile && subscription !== 'free') {
      await superLikeProfile(currentProfile.id);
      await controls.start({ y: '-100%', opacity: 0 });
      fetchNewProfile();
      controls.set({ y: 0, opacity: 1 });
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

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const openProfileModal = () => {
    setShowProfileModal(true);
  };

  if (!currentProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
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
          onClick={openProfileModal}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <h2 className="text-2xl font-bold text-white">{currentProfile.name}, {currentProfile.age}</h2>
          <p className="text-white">{currentProfile.location}</p>
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
          <button onClick={toggleDetails} className="bg-blue-500 text-white p-3 rounded-full">
            <Info size={24} />
          </button>
          <button onClick={handleSuperLike} className="bg-purple-500 text-white p-3 rounded-full" disabled={subscription === 'free'}>
            <Star size={24} />
          </button>
          <button onClick={handleLike} className="bg-green-500 text-white p-3 rounded-full">
            <Heart size={24} />
          </button>
        </div>
        {showDetails && (
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-2">Values</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {currentProfile.values.map((value, index) => (
                <span key={index} className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {value}
                </span>
              ))}
            </div>
            <div className="flex items-center mb-2">
              <Star className="text-yellow-400 mr-2" />
              <span>Hotness Score: {currentProfile.hotnessScore}%</span>
            </div>
          </div>
        )}
      </div>
      {showProfileModal && (
        <UserProfileModal profile={currentProfile} onClose={() => setShowProfileModal(false)} subscription={subscription} />
      )}
    </div>
  );
};

export default Matching;