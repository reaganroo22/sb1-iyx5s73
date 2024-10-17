import React, { useState } from 'react';
import { Star, ThumbsUp, ThumbsDown } from 'lucide-react';

interface PostDatePollProps {
  partnerName: string;
  onSubmit: (rating: number, feedback: string) => void;
}

const PostDatePoll: React.FC<PostDatePollProps> = ({ partnerName, onSubmit }) => {
  const [rating, setRating] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(rating, feedback);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">How was your date with {partnerName}?</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Rate your experience:
          </label>
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={24}
                className={`cursor-pointer ${
                  star <= rating ? 'text-yellow-400' : 'text-gray-300'
                }`}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="feedback">
            Feedback:
          </label>
          <textarea
            id="feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
            rows={4}
            placeholder="Share your thoughts about the date..."
          ></textarea>
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300 flex items-center"
          >
            <ThumbsUp size={20} className="mr-2" />
            Submit Feedback
          </button>
          <button
            type="button"
            onClick={() => onSubmit(0, '')}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300 flex items-center"
          >
            <ThumbsDown size={20} className="mr-2" />
            Skip
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostDatePoll;