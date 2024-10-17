import React, { useState, useEffect } from 'react';
import { Users, Calendar, Trophy, Zap, MessageSquare, Crown, User, Settings as SettingsIcon } from 'lucide-react';
import ProfileVerification from './components/ProfileVerification';
import Explore from './components/Explore';
import Hub from './components/Hub';
import Leaderboard from './components/Leaderboard';
import Engage from './components/Engage';
import Messaging from './components/Messaging';
import EliteHub from './components/EliteHub';
import Settings from './components/Settings';
import UserProfile from './components/UserProfile';
import SubscriptionManager from './components/SubscriptionManager';

function App() {
  const [currentPage, setCurrentPage] = useState('explore');
  const [isVerified, setIsVerified] = useState(false);
  const [subscription, setSubscription] = useState('free');
  const [showSubscriptionManager, setShowSubscriptionManager] = useState(false);
  const [user, setUser] = useState({
    id: '1',
    name: 'John Doe',
    premium: false,
    hotnessScore: 0,
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    invites: 0,
  });

  const handleUpgrade = (tier: string) => {
    setSubscription(tier);
    setUser(prevUser => ({
      ...prevUser,
      premium: tier !== 'free',
      invites: tier === 'basic' ? 1 : tier === 'premium' ? 3 : tier === 'elite' ? 25 : 0,
    }));
    setShowSubscriptionManager(false);
  };

  const handleVerification = (score: number) => {
    if (score >= 8) {
      setIsVerified(true);
      setUser(prevUser => ({ ...prevUser, hotnessScore: score }));
    } else {
      alert("We're sorry, but your profile doesn't meet our current standards. Please try again later.");
    }
  };

  const renderPage = () => {
    if (!isVerified) {
      return <ProfileVerification onVerified={handleVerification} />;
    }

    switch (currentPage) {
      case 'explore':
        return <Explore subscription={subscription} />;
      case 'engage':
        return <Engage subscription={subscription} />;
      case 'messages':
        return <Messaging subscription={subscription} />;
      case 'hub':
        return subscription === 'elite' ? <EliteHub /> : <Hub subscription={subscription} />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'profile':
        return <UserProfile user={user} />;
      case 'settings':
        return <Settings subscription={subscription} onUpgrade={handleUpgrade} />;
      default:
        return <Explore subscription={subscription} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Exclusive Dating App</h1>
        <div className="flex items-center">
          <select
            value={subscription}
            onChange={(e) => handleUpgrade(e.target.value)}
            className="mr-4 bg-pink-500 text-white py-1 px-2 rounded-md text-sm"
          >
            <option value="free">Free</option>
            <option value="basic">Basic</option>
            <option value="premium">Premium</option>
            <option value="elite">Elite</option>
          </select>
          <button
            onClick={() => setCurrentPage('profile')}
            className="bg-gray-200 p-2 rounded-full mr-2"
          >
            <User size={20} />
          </button>
          <button
            onClick={() => setCurrentPage('settings')}
            className="bg-gray-200 p-2 rounded-full"
          >
            <SettingsIcon size={20} />
          </button>
        </div>
      </header>
      <main className="container mx-auto mt-8 p-4 pb-24">
        {renderPage()}
        {isVerified && (
          <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-md p-4">
            <ul className="flex justify-around">
              <li>
                <button onClick={() => setCurrentPage('engage')} className="text-gray-600 hover:text-pink-500">
                  <Zap size={24} />
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('messages')} className="text-pink-500 hover:text-pink-600">
                  <MessageSquare size={24} />
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('explore')} className="text-gray-600 hover:text-pink-500">
                  <Users size={24} />
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('hub')} className="text-gray-600 hover:text-pink-500">
                  {subscription === 'elite' ? <Crown size={24} /> : <Calendar size={24} />}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('leaderboard')} className="text-gray-600 hover:text-pink-500">
                  <Trophy size={24} />
                </button>
              </li>
            </ul>
          </nav>
        )}
      </main>
      {showSubscriptionManager && (
        <SubscriptionManager onUpgrade={handleUpgrade} onClose={() => setShowSubscriptionManager(false)} />
      )}
    </div>
  );
}

export default App;