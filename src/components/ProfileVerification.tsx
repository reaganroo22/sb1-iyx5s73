import React, { useState } from 'react';
import { Upload, Camera, Check, Star } from 'lucide-react';

interface ProfileVerificationProps {
  onVerified: (score: number) => void;
}

const ProfileVerification: React.FC<ProfileVerificationProps> = ({ onVerified }) => {
  const [step, setStep] = useState(1);
  const [photos, setPhotos] = useState<File[]>([]);
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    birthdate: '',
    gender: '',
    interests: '',
    bio: '',
  });
  const [aiScore, setAiScore] = useState(0);
  const [communityRatings, setCommunityRatings] = useState<number[]>([]);
  const [finalScore, setFinalScore] = useState(0);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setPhotos([...photos, ...Array.from(event.target.files)]);
    }
  };

  const handleInfoChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setPersonalInfo((prev) => ({ ...prev, [name]: value }));
  };

  const simulateAIRating = () => {
    // Simulate AI rating based on photos and personal info
    const score = Math.floor(Math.random() * 3) + 7; // Random score between 7 and 9
    setAiScore(score);
  };

  const simulateCommunityRating = () => {
    // Simulate community ratings
    const ratings = Array.from({ length: 5 }, () => Math.floor(Math.random() * 3) + 7);
    setCommunityRatings(ratings);
  };

  const calculateFinalScore = () => {
    const avgCommunityRating = communityRatings.reduce((a, b) => a + b, 0) / communityRatings.length;
    const score = Math.round((aiScore + avgCommunityRating) / 2);
    setFinalScore(score);
    return score;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      simulateAIRating();
      simulateCommunityRating();
      const score = calculateFinalScore();
      if (score >= 8) {
        onVerified(score);
      } else {
        alert("We're sorry, but your profile doesn't meet our current standards. Please try again later.");
      }
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Profile Verification & Hotness Test</h2>
      <div className="mb-6">
        <div className="flex justify-between items-center">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                i <= step ? 'bg-pink-500 text-white' : 'bg-gray-200 text-gray-500'
              }`}
            >
              {i < step ? <Check size={16} /> : i}
            </div>
          ))}
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Upload Your Best Photos</h3>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="photos">
                Profile Photos (3-5)
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="photo-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-pink-600 hover:text-pink-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-pink-500"
                    >
                      <span>Upload photos</span>
                      <input id="photo-upload" name="photo-upload" type="file" multiple accept="image/*" className="sr-only" onChange={handlePhotoUpload} />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {step === 2 && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={personalInfo.name}
                  onChange={handleInfoChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="birthdate">
                  Birthdate
                </label>
                <input
                  type="date"
                  id="birthdate"
                  name="birthdate"
                  value={personalInfo.birthdate}
                  onChange={handleInfoChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
                  Gender
                </label>
                <input
                  type="text"
                  id="gender"
                  name="gender"
                  value={personalInfo.gender}
                  onChange={handleInfoChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="interests">
                  Interests (comma-separated)
                </label>
                <input
                  type="text"
                  id="interests"
                  name="interests"
                  value={personalInfo.interests}
                  onChange={handleInfoChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bio">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={personalInfo.bio}
                  onChange={handleInfoChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  rows={4}
                  required
                ></textarea>
              </div>
            </div>
          </div>
        )}
        {step === 3 && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Review and Submit</h3>
            <p className="text-gray-600 mb-4">
              Please review your information before submitting. Our AI will analyze your profile to determine your Hotness Score and verify your account.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {photos.map((photo, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt={`Uploaded photo ${index + 1}`}
                    className="w-full h-40 object-cover rounded-md"
                  />
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <p><strong>Name:</strong> {personalInfo.name}</p>
              <p><strong>Birthdate:</strong> {personalInfo.birthdate}</p>
              <p><strong>Gender:</strong> {personalInfo.gender}</p>
              <p><strong>Interests:</strong> {personalInfo.interests}</p>
              <p><strong>Bio:</strong> {personalInfo.bio}</p>
            </div>
          </div>
        )}
        {finalScore > 0 ? (
          <div className="mt-6 text-center">
            <h3 className="text-xl font-semibold mb-2">Your Hotness Score</h3>
            <div className="flex items-center justify-center">
              <Star className="text-yellow-400 mr-2" size={24} />
              <span className="text-3xl font-bold">{finalScore}</span>
            </div>
            {finalScore >= 8 ? (
              <p className="text-green-500 mt-2">Congratulations! You've been verified and can access the app.</p>
            ) : (
              <p className="text-red-500 mt-2">We're sorry, but your score doesn't meet our current threshold. Please try again later.</p>
            )}
          </div>
        ) : (
          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 transition duration-300 mt-6"
          >
            {step < 3 ? 'Next' : 'Submit for Verification'}
          </button>
        )}
      </form>
    </div>
  );
};

export default ProfileVerification;