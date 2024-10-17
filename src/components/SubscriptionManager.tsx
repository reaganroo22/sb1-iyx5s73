import React from 'react';
import { CreditCard, Star, Zap, TrendingUp, Video, Calendar, MessageCircle, Radio } from 'lucide-react';

interface SubscriptionManagerProps {
  onUpgrade: (tier: string) => void;
}

const SubscriptionManager: React.FC<SubscriptionManagerProps> = ({ onUpgrade }) => {
  const subscriptionTiers = [
    {
      name: 'Basic',
      price: '$14.99',
      features: [
        'More matches',
        'Unlimited likes',
        'Access to Rizz AI for smart conversation suggestions',
        'Icebreaker Games',
        'Ad-free experience',
      ],
      icon: <Star className="text-yellow-500" />,
      color: 'yellow',
      tier: 'basic',
    },
    {
      name: 'Premium',
      price: '$49.99',
      features: [
        'All Basic features',
        'See who liked you',
        'Super Likes',
        'Profile boosts',
        'Advanced filters',
        'Video Chat functionality',
        'Virtual Date Planner',
      ],
      icon: <Zap className="text-pink-500" />,
      color: 'pink',
      tier: 'premium',
    },
    {
      name: 'Elite',
      price: '$999.99',
      features: [
        'All Premium features',
        'Unlimited Super Like Blast',
        'AI DM Blast',
        'Verified badge',
        'Priority customer support',
        'Exclusive events access',
        'Profile boost once a week',
      ],
      icon: <Radio className="text-purple-500" />,
      color: 'purple',
      tier: 'elite',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <Star className="mr-2 text-yellow-500" />
        Upgrade Your Experience
      </h2>
      <p className="text-gray-600 mb-6">
        Choose the perfect plan to enhance your dating journey and unlock exclusive features.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {subscriptionTiers.map((tier) => (
          <div key={tier.name} className={`border-2 border-${tier.color}-500 rounded-lg p-6`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">{tier.name}</h3>
              {tier.icon}
            </div>
            <p className="text-2xl font-bold mb-4">{tier.price}<span className="text-sm font-normal text-gray-600"> / month</span></p>
            <ul className="space-y-2 mb-6">
              {tier.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className={`text-${tier.color}-500 mr-2`}>✓</span>
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => onUpgrade(tier.tier)}
              className={`w-full bg-${tier.color}-500 text-white py-2 px-4 rounded-md hover:bg-${tier.color}-600 transition duration-300`}
            >
              Upgrade to {tier.name}
            </button>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-6 text-center">
        By upgrading, you agree to our Terms of Service and Privacy Policy.
      </p>
    </div>
  );
};

export default SubscriptionManager;