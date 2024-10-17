import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2, Minimize2, Camera, MessageSquare, Heart, Star, Phone, Video, ThumbsDown } from 'lucide-react';
import { Profile } from '../types';
import { likeProfile, superLikeProfile, rejectProfile } from '../services/mockDataService';

interface UserProfileModalProps {
  profile: Profile;
  onClose: () => void;
  subscription: string;
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({ profile, onClose, subscription }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showMorePhotos, setShowMorePhotos] = useState(false);

  const nextPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % profile.photos.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex - 1 + profile.photos.length) % profile.photos.length);
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const handleRequestMorePhotos = () => {
    setShowMorePhotos(true);
    // In a real application, you would send a notification to the user to upload more photos
    console.log('Requesting more photos from', profile.name);
  };

  const handleLike = async () => {
    await likeProfile(profile.id);
    alert(`You liked ${profile.name}'s profile!`);
    onClose();
  };

  const handleSuperLike = async () => {
    if (subscription !== 'free') {
      await superLikeProfile(profile.id);
      alert(`You super liked ${profile.name}'s profile!`);
      onClose();
    } else {
      alert('Super likes are available for premium users only.');
    }
  };

  const handleReject = async () => {
    await rejectProfile(profile.id);
    alert(`You rejected ${profile.name}'s profile.`);
    onClose();
  };

  const handleMessage = () => {
    if (subscription !== 'free') {
      // Implement messaging functionality
      alert(`Redirecting to message ${profile.name}`);
    } else {
      alert('Messaging is available for premium users only.');
    }
  };

  const handlePhoneCall = () => {
    if (subscription === 'elite') {
      alert(`Initiating phone call with ${profile.name}`);
      // Implement actual phone call functionality here
    } else {
      alert('Phone calls are available for Elite users only.');
    }
  };

  const handleVideoCall = () => {
    if (subscription === 'elite') {
      alert(`Initiating video call with ${profile.name}`);
      // Implement actual video call functionality here
    } else {
      alert('Video calls are available for Elite users only.');
    }
  };

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${isFullScreen ? 'p-0' : 'p-4'}`}>
      <div className={`bg-white rounded-lg overflow-hidden ${isFullScreen ? 'w-full h-full' : 'max-w-2xl w-full max-h-[90vh]'}`}>
        <div className="relative">
          <img
            src={profile.photos[currentPhotoIndex]}
            alt={`${profile.name}'s photo`}
            className={`w-full ${isFullScreen ? 'h-screen object-contain' : 'h-96 object-cover'}`}
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white rounded-full p-2 z-10"
          >
            <X size={24} />
          </button>
          <button
            onClick={toggleFullScreen}
            className="absolute top-4 left-4 bg-white rounded-full p-2 z-10"
          >
            {isFullScreen ? <Minimize2 size={24} /> : <Maximize2 size={24} />}
          </button>
          <button
            onClick={prevPhoto}
            className="absolute top-1/2 left-4 bg-white rounded-full p-2 transform -translate-y-1/2"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextPhoto}
            className="absolute top-1/2 right-4 bg-white rounded-full p-2 transform -translate-y-1/2"
          >
            <ChevronRight size={24} />
          </button>
        </div>
        <div className={`p-6 ${isFullScreen ? 'overflow-y-auto h-[calc(100vh-24rem)]' : 'overflow-y-auto max-h-[calc(90vh-24rem)]'}`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{profile.name}, {profile.age}</h2>
            <div className="flex items-center">
              <Star className="text-yellow-400 mr-1" size={20} />
              <span className="font-semibold">{profile.hotnessScore}</span>
            </div>
          </div>
          <p className="text-gray-600 mb-4">{profile.location}</p>
          <p className="text-gray-800 mb-4">{profile.bio}</p>
          
          <h3 className="font-semibold mb-2">Interests</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {profile.interests.map((interest, index) => (
              <span key={index} className="bg-pink-100 text-pink-800 text-xs font-medium px-2.5 py-0.5 rounded">
                {interest}
              </span>
            ))}
          </div>
          
          <h3 className="font-semibold mb-2">Values</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {profile.values.map((value, index) => (
              <span key={index} className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
                {value}
              </span>
            ))}
          </div>
          
          <h3 className="font-semibold mb-2">Icebreaker Answers</h3>
          <div className="space-y-2 mb-4">
            {profile.icebreakerAnswers.map((answer, index) => (
              <div key={index}>
                <p className="font-medium">{answer.question}</p>
                <p className="text-gray-600">{answer.answer}</p>
              </div>
            ))}
          </div>
          
          {subscription !== 'free' && profile.growthGoals && (
            <>
              <h3 className="font-semibold mb-2">Personal Growth Goals</h3>
              <div className="space-y-2 mb-4">
                {profile.growthGoals.map((goal, index) => (
                  <div key={index}>
                    <p className="font-medium">{goal.title}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-pink-500 h-2.5 rounded-full"
                        style={{ width: `${goal.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          <div className="flex justify-between items-center mt-6">
            <button
              onClick={handleReject}
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300 flex items-center"
            >
              <ThumbsDown size={20} className="mr-2" />
              Reject
            </button>
            <button
              onClick={handleLike}
              className="bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 transition duration-300 flex items-center"
            >
              <Heart size={20} className="mr-2" />
              Like
            </button>
            <button
              onClick={handleSuperLike}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 flex items-center"
              disabled={subscription === 'free'}
            >
              <Star size={20} className="mr-2" />
              Super Like
            </button>
            <button
              onClick={handleMessage}
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300 flex items-center"
              disabled={subscription === 'free'}
            >
              <MessageSquare size={20} className="mr-2" />
              Message
            </button>
          </div>

          {subscription === 'elite' && (
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={handlePhoneCall}
                className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300 flex items-center"
              >
                <Phone size={20} className="mr-2" />
                Phone Call
              </button>
              <button
                onClick={handleVideoCall}
                className="bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 transition duration-300 flex items-center"
              >
                <Video size={20} className="mr-2" />
                Video Call
              </button>
            </div>
          )}

          {subscription !== 'free' && (
            <button
              onClick={handleRequestMorePhotos}
              className="w-full bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 transition duration-300 flex items-center justify-center mt-4"
            >
              <Camera size={18} className="mr-2" />
              Request More Photos
            </button>
          )}

          {showMorePhotos && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Additional Photos</h3>
              <div className="grid grid-cols-3 gap-2">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="bg-gray-200 h-24 rounded-md flex items-center justify-center">
                    <Camera size={24} className="text-gray-400" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;