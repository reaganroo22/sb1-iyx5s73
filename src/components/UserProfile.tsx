import React, { useState } from 'react';
import { User, MapPin, Heart, Book, Camera, Edit2 } from 'lucide-react';

interface UserProfileProps {
  user: {
    id: string;
    name: string;
    premium: boolean;
    hotnessScore: number;
    photo: string;
    invites: number;
  };
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const [profile, setProfile] = useState({
    name: user.name,
    age: 28,
    location: 'New York, NY',
    gender: 'Non-binary',
    occupation: 'Software Engineer',
    bio: 'Passionate about technology, sustainability, and personal growth. Looking for meaningful connections and shared experiences.',
    interests: ['Coding', 'Hiking', 'Photography', 'Meditation'],
    values: ['Honesty', 'Empathy', 'Growth Mindset'],
    relationshipGoals: 'Long-term partnership',
    photos: [
      user.photo,
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1505503693641-1926193e8d57?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    ],
    compatibilityScore: user.hotnessScore,
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically send the updated profile to your backend
    console.log('Updated profile:', profile);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Your Profile</h2>
        {!isEditing && (
          <button
            onClick={handleEdit}
            className="bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 transition duration-300 flex items-center"
          >
            <Edit2 size={18} className="mr-2" />
            Edit Profile
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            {isEditing ? (
              <input
                type="text"
                id="name"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            ) : (
              <p className="text-gray-800">{profile.name}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">
              Age
            </label>
            {isEditing ? (
              <input
                type="number"
                id="age"
                name="age"
                value={profile.age}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            ) : (
              <p className="text-gray-800">{profile.age}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
              <MapPin size={18} className="inline mr-2" />
              Location
            </label>
            {isEditing ? (
              <input
                type="text"
                id="location"
                name="location"
                value={profile.location}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            ) : (
              <p className="text-gray-800">{profile.location}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
              <User size={18} className="inline mr-2" />
              Gender
            </label>
            {isEditing ? (
              <input
                type="text"
                id="gender"
                name="gender"
                value={profile.gender}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            ) : (
              <p className="text-gray-800">{profile.gender}</p>
            )}
          </div>
        </div>
        <div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="occupation">
              Occupation
            </label>
            {isEditing ? (
              <input
                type="text"
                id="occupation"
                name="occupation"
                value={profile.occupation}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            ) : (
              <p className="text-gray-800">{profile.occupation}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bio">
              Bio
            </label>
            {isEditing ? (
              <textarea
                id="bio"
                name="bio"
                value={profile.bio}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows={4}
              />
            ) : (
              <p className="text-gray-800">{profile.bio}</p>
            )}
          </div>
          <div className="mb-4">
            <h4 className="font-semibold mb-2">Interests</h4>
            <div className="flex flex-wrap gap-2">
              {profile.interests.map((interest, index) => (
                <span key={index} className="bg-pink-100 text-pink-800 text-sm font-medium px-2.5 py-0.5 rounded">
                  {interest}
                </span>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <h4 className="font-semibold mb-2">Values</h4>
            <div className="flex flex-wrap gap-2">
              {profile.values.map((value, index) => (
                <span key={index} className="bg-purple-100 text-purple-800 text-sm font-medium px-2.5 py-0.5 rounded">
                  {value}
                </span>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="relationshipGoals">
              <Heart size={18} className="inline mr-2" />
              Relationship Goals
            </label>
            {isEditing ? (
              <input
                type="text"
                id="relationshipGoals"
                name="relationshipGoals"
                value={profile.relationshipGoals}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            ) : (
              <p className="text-gray-800">{profile.relationshipGoals}</p>
            )}
          </div>
        </div>
      </div>
      <div className="mt-6">
        <h4 className="font-semibold mb-2">Photos</h4>
        <div className="grid grid-cols-3 gap-4">
          {profile.photos.map((photo, index) => (
            <div key={index} className="relative">
              <img src={photo} alt={`Profile photo ${index + 1}`} className="w-full h-40 object-cover rounded-md" />
              {index === 0 && (
                <span className="absolute top-2 left-2 bg-pink-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  Primary
                </span>
              )}
            </div>
          ))}
          {isEditing && (
            <div className="flex items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-md">
              <button className="flex flex-col items-center">
                <Camera size={24} className="text-gray-400 mb-2" />
                <span className="text-sm text-gray-500">Add Photo</span>
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="mt-6">
        <h4 className="font-semibold mb-2">Hotness Score</h4>
        <div className="bg-gray-200 rounded-full h-4 w-full">
          <div
            className="bg-pink-500 rounded-full h-4"
            style={{ width: `${profile.compatibilityScore}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-1">{profile.compatibilityScore}/100</p>
      </div>
      {isEditing && (
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => setIsEditing(false)}
            className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-300 mr-4"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 transition duration-300"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;