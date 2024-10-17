import { Profile, GrowthGoal, IcebreakerAnswer, Message } from '../types';

const mockIcebreakerAnswers: IcebreakerAnswer[] = [
  {
    question: "If you could have dinner with any historical figure, who would it be and why?",
    answer: "I'd love to have dinner with Leonardo da Vinci. His curiosity and diverse interests in art, science, and engineering are truly inspiring. I'd ask him about his creative process and how he balanced his various pursuits."
  },
  {
    question: "What's the most adventurous thing you've ever done?",
    answer: "I once went on a solo backpacking trip through Southeast Asia for three months. It was challenging but incredibly rewarding to navigate new cultures and experiences on my own."
  },
  {
    question: "If you could instantly become an expert in one subject, what would it be?",
    answer: "I'd love to become an expert in astrophysics. The mysteries of the universe fascinate me, and I'd love to contribute to our understanding of cosmic phenomena."
  }
];

const mockGrowthGoals: GrowthGoal[] = [
  {
    id: 1,
    title: "Learn a new language",
    description: "Become conversational in Spanish",
    progress: 60
  },
  {
    id: 2,
    title: "Improve fitness",
    description: "Run a half marathon",
    progress: 40
  },
  {
    id: 3,
    title: "Develop a new skill",
    description: "Learn to play the guitar",
    progress: 25
  }
];

const mockProfiles: Profile[] = [
  {
    id: 1,
    name: 'Sarah Smith',
    age: 26,
    gender: 'female',
    location: 'Los Angeles, CA',
    bio: 'Adventure seeker and coffee enthusiast. Let\'s explore the world together!',
    photos: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    ],
    interests: ['Travel', 'Photography', 'Yoga'],
    values: ['Authenticity', 'Growth', 'Kindness'],
    hotnessScore: 92,
    premium: false,
    icebreakerAnswers: mockIcebreakerAnswers,
    growthGoals: mockGrowthGoals,
    likes: 150,
    matches: 30,
  },
  {
    id: 2,
    name: 'Mike Johnson',
    age: 29,
    gender: 'male',
    location: 'New York, NY',
    bio: 'Tech enthusiast and foodie. Always up for trying new restaurants!',
    photos: [
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    ],
    interests: ['Technology', 'Cooking', 'Hiking'],
    values: ['Innovation', 'Honesty', 'Adventure'],
    hotnessScore: 88,
    premium: true,
    icebreakerAnswers: mockIcebreakerAnswers,
    growthGoals: mockGrowthGoals,
    likes: 120,
    matches: 25,
  },
  {
    id: 3,
    name: 'Emily Chen',
    age: 24,
    gender: 'female',
    location: 'San Francisco, CA',
    bio: 'Artist and nature lover. Looking for someone to share creative adventures with!',
    photos: [
      'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1513721032312-6a18a42c8763?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    ],
    interests: ['Painting', 'Hiking', 'Meditation'],
    values: ['Creativity', 'Sustainability', 'Personal Growth'],
    hotnessScore: 95,
    premium: true,
    icebreakerAnswers: mockIcebreakerAnswers,
    growthGoals: mockGrowthGoals,
    likes: 180,
    matches: 40,
  },
];

export const getRandomProfile = (): Profile => {
  const randomIndex = Math.floor(Math.random() * mockProfiles.length);
  return mockProfiles[randomIndex];
};

export const getMockMatches = (count: number): Profile[] => {
  return mockProfiles.slice(0, count);
};

export const getMockMessages = (): Message[] => {
  return [
    { id: 1, sender: "Sarah", content: "Hey, how are you?", timestamp: new Date(Date.now() - 3600000) },
    { id: 2, sender: "You", content: "I'm doing great, thanks! How about you?", timestamp: new Date(Date.now() - 3500000) },
    { id: 3, sender: "Sarah", content: "I'm good too! Any plans for the weekend?", timestamp: new Date(Date.now() - 3400000) },
  ];
};

export const getMockGoals = () => {
  return mockGrowthGoals;
};

export const likeProfile = async (profileId: number): Promise<void> => {
  console.log(`Liked profile with ID: ${profileId}`);
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
};

export const superLikeProfile = async (profileId: number): Promise<void> => {
  console.log(`Super liked profile with ID: ${profileId}`);
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
};

export const rejectProfile = async (profileId: number): Promise<void> => {
  console.log(`Rejected profile with ID: ${profileId}`);
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
};

export const sendMessage = async (recipientId: number, content: string): Promise<Message> => {
  console.log(`Sending message to profile with ID: ${recipientId}`);
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  return {
    id: Date.now(),
    sender: "You",
    content,
    timestamp: new Date(),
  };
};

// Add more mock data functions as needed