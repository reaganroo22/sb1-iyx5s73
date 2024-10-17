export interface Profile {
  id: number;
  name: string;
  age: number;
  gender: string;
  location: string;
  bio: string;
  photos: string[];
  interests: string[];
  values: string[];
  hotnessScore: number;
  premium: boolean;
  icebreakerAnswers: IcebreakerAnswer[];
  growthGoals?: GrowthGoal[];
  likes: number;
  matches: number;
}

export interface User {
  id: string;
  name: string;
  premium: boolean;
  hotnessScore: number;
}

export interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: Date;
}

export interface GrowthGoal {
  id: number;
  title: string;
  description: string;
  progress: number;
}

export interface IcebreakerAnswer {
  question: string;
  answer: string;
}

export interface DatePlan {
  id: number;
  date: Date;
  time: string;
  type: 'virtual' | 'physical';
  activity: string;
  partner: string;
}

export interface Subscription {
  tier: 'free' | 'basic' | 'premium' | 'elite';
  features: string[];
  price: number;
}

// Add more interfaces as needed