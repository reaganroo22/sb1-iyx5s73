import React, { useState, useEffect } from 'react';
import { MessageCircle, Send } from 'lucide-react';
import { Profile, Message } from '../types';

interface RizzAIProps {
  profile: Profile;
  conversation: Message[];
  onSuggestion: (suggestion: string) => void;
}

const RizzAI: React.FC<RizzAIProps> = ({ profile, conversation, onSuggestion }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (!isMinimized) {
      generateSuggestions();
    }
  }, [profile, conversation, isMinimized]);

  const generateSuggestions = async () => {
    setIsLoading(true);

    // Simulate AI call with a timeout
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Generate suggestions based on profile and conversation context
    const newSuggestions = [
      `I noticed you're interested in ${profile.interests[0]}. What's your favorite aspect of it?`,
      `Your profile mentions ${profile.values[0]} as one of your values. How does that influence your daily life?`,
      `I see you're from ${profile.location}. What's your favorite hidden gem in the area?`,
      `Your bio says "${profile.bio}". Can you tell me more about that?`,
      `Based on our conversation, it seems we both enjoy ${conversation[conversation.length - 1].content.split(' ').slice(-3).join(' ')}. What else do you like to do for fun?`,
    ];
    setSuggestions(newSuggestions);
    setIsLoading(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    onSuggestion(suggestion);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div className={`fixed bottom-20 right-4 bg-white rounded-lg shadow-md transition-all duration-300 ${isMinimized ? 'w-12 h-12' : 'w-80 p-4'}`}>
      {isMinimized ? (
        <button onClick={toggleMinimize} className="w-full h-full flex items-center justify-center text-pink-500 hover:bg-pink-100 rounded-lg">
          <MessageCircle size={24} />
        </button>
      ) : (
        <>
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold flex items-center">
              <MessageCircle size={16} className="mr-2 text-pink-500" />
              Rizz AI
            </h3>
            <button onClick={toggleMinimize} className="text-gray-500 hover:text-gray-700">
              &times;
            </button>
          </div>
          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              <svg className="animate-spin h-5 w-5 text-pink-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          ) : (
            <div>
              <h4 className="font-semibold mb-2">Suggestions:</h4>
              <ul className="space-y-2">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="bg-gray-100 p-2 rounded-md text-sm cursor-pointer hover:bg-gray-200"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RizzAI;