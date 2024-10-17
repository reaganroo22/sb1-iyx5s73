import React, { useState } from 'react';
import { MessageCircle, Send, RefreshCw } from 'lucide-react';

const AIDMBlast: React.FC = () => {
  const [radius, setRadius] = useState(50);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);

  const generateAISuggestions = () => {
    // Simulate AI-generated suggestions
    const suggestions = [
      "Hey there! I noticed we have [shared interest] in common. What's your favorite aspect of it?",
      "Your profile caught my eye! I'm curious, what's the story behind your [interesting photo/detail]?",
      "Hi! If you could travel anywhere in the world right now, where would you go and why?",
      "Hello! I'm intrigued by your [hobby/interest]. What got you started with that?",
      "Hey! If you could have dinner with any historical figure, who would it be and why?",
    ];
    setAiSuggestions(suggestions);
  };

  const handleAIDMBlast = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Here you would typically send the AI DM Blast to your backend
    console.log('AI DM Blast sent:', { radius, message });

    setIsLoading(false);
    alert('AI DM Blast sent successfully!');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <MessageCircle className="mr-2 text-blue-500" />
        AI DM Blast
      </h3>
      <p className="text-gray-600 mb-6">
        Send AI-generated messages to multiple users within your chosen radius. Start conversations effortlessly!
      </p>
      <form onSubmit={handleAIDMBlast}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="radius">
            Radius (miles)
          </label>
          <input
            type="range"
            id="radius"
            min="1"
            max="100"
            value={radius}
            onChange={(e) => setRadius(parseInt(e.target.value))}
            className="w-full"
          />
          <span className="text-gray-600">{radius} miles</span>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
            rows={4}
            placeholder="Type your message or select an AI-generated suggestion..."
          ></textarea>
        </div>
        <div className="mb-4">
          <button
            type="button"
            onClick={generateAISuggestions}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 flex items-center"
          >
            <RefreshCw size={20} className="mr-2" />
            Generate AI Suggestions
          </button>
        </div>
        {aiSuggestions.length > 0 && (
          <div className="mb-4">
            <h4 className="font-semibold mb-2">AI Suggestions:</h4>
            <ul className="space-y-2">
              {aiSuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="bg-gray-100 p-2 rounded-md text-sm cursor-pointer hover:bg-gray-200"
                  onClick={() => setMessage(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 flex items-center justify-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </span>
          ) : (
            <>
              <Send size={20} className="mr-2" />
              Send AI DM Blast
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default AIDMBlast;