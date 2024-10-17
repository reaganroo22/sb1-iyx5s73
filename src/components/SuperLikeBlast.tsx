import React, { useState } from 'react';
import { Radio, MapPin, Send } from 'lucide-react';

const SuperLikeBlast: React.FC = () => {
  const [radius, setRadius] = useState(50);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSuperLikeBlast = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Here you would typically send the Super Like Blast to your backend
    console.log('Super Like Blast sent:', { radius, message });

    setIsLoading(false);
    alert('Super Like Blast sent successfully!');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <Radio className="mr-2 text-purple-500" />
        Super Like Blast
      </h3>
      <p className="text-gray-600 mb-6">
        Send a Super Like to all profiles within your chosen radius. Stand out and boost your visibility!
      </p>
      <form onSubmit={handleSuperLikeBlast}>
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
            Personalized Message (optional)
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-purple-500"
            rows={4}
            placeholder="Add a personal touch to your Super Like Blast..."
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 transition duration-300 flex items-center justify-center"
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
              Send Super Like Blast
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default SuperLikeBlast;