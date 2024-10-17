import React, { useState } from 'react';
import { Bell, Lock, CreditCard, User, MapPin } from 'lucide-react';

interface SettingsProps {
  subscription: string;
  onUpgrade: (tier: string) => void;
}

const Settings: React.FC<SettingsProps> = ({ subscription, onUpgrade }) => {
  const [notificationSettings, setNotificationSettings] = useState({
    messages: true,
    matches: true,
    likes: false,
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public',
    showDistance: true,
    showAge: true,
  });

  const [preferences, setPreferences] = useState({
    ageRange: [18, 35],
    distance: 50,
    gender: 'all',
  });

  const handleNotificationChange = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings((prev) => ({ ...prev, [setting]: !prev[setting] }));
  };

  const handlePrivacyChange = (setting: keyof typeof privacySettings, value: any) => {
    setPrivacySettings((prev) => ({ ...prev, [setting]: value }));
  };

  const handlePreferenceChange = (setting: keyof typeof preferences, value: any) => {
    setPreferences((prev) => ({ ...prev, [setting]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Settings</h2>

        <section className="mb-8">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Bell className="mr-2" size={20} />
            Notifications
          </h3>
          <div className="space-y-2">
            {Object.entries(notificationSettings).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-gray-700 capitalize">{key}</span>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={() => handleNotificationChange(key as keyof typeof notificationSettings)}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Lock className="mr-2" size={20} />
            Privacy
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Profile Visibility</label>
              <select
                value={privacySettings.profileVisibility}
                onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50"
              >
                <option value="public">Public</option>
                <option value="matches">Matches Only</option>
                <option value="private">Private</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Show Distance</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={privacySettings.showDistance}
                  onChange={(e) => handlePrivacyChange('showDistance', e.target.checked)}
                />
                <span className="slider round"></span>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Show Age</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={privacySettings.showAge}
                  onChange={(e) => handlePrivacyChange('showAge', e.target.checked)}
                />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <User className="mr-2" size={20} />
            Preferences
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Age Range</label>
              <div className="flex items-center space-x-4">
                <input
                  type="number"
                  value={preferences.ageRange[0]}
                  onChange={(e) => handlePreferenceChange('ageRange', [parseInt(e.target.value), preferences.ageRange[1]])}
                  className="block w-20 rounded-md border-gray-300 shadow-sm focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50"
                />
                <span>to</span>
                <input
                  type="number"
                  value={preferences.ageRange[1]}
                  onChange={(e) => handlePreferenceChange('ageRange', [preferences.ageRange[0], parseInt(e.target.value)])}
                  className="block w-20 rounded-md border-gray-300 shadow-sm focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Maximum Distance (miles)</label>
              <input
                type="range"
                min="1"
                max="100"
                value={preferences.distance}
                onChange={(e) => handlePreferenceChange('distance', parseInt(e.target.value))}
                className="w-full"
              />
              <span className="text-gray-600">{preferences.distance} miles</span>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Interested In</label>
              <select
                value={preferences.gender}
                onChange={(e) => handlePreferenceChange('gender', e.target.value)}
                className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50"
              >
                <option value="all">Everyone</option>
                <option value="male">Men</option>
                <option value="female">Women</option>
                <option value="other">Non-binary</option>
              </select>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <CreditCard className="mr-2" size={20} />
            Subscription
          </h3>
          <p className="text-sm text-gray-600 mb-2">Current Plan: {subscription === 'free' ? 'Free' : subscription}</p>
          {subscription === 'free' && (
            <button
              onClick={() => onUpgrade('premium')}
              className="bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 transition duration-300"
            >
              Upgrade to Premium
            </button>
          )}
          {subscription !== 'free' && (
            <ul className="list-disc list-inside text-sm text-gray-700">
              <li>Unlimited likes</li>
              <li>See who likes you</li>
              <li>Advanced filters</li>
              <li>Boost your profile once a month</li>
              <li>Access to exclusive events</li>
              <li>Smart icebreakers</li>
            </ul>
          )}
        </section>
      </div>
    </div>
  );
};

export default Settings;