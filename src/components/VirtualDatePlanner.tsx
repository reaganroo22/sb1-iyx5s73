import React, { useState } from 'react';
import { Calendar, Clock, Video, Music, Film, Coffee, Book, Palette } from 'lucide-react';

interface DateIdea {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const VirtualDatePlanner: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedIdea, setSelectedIdea] = useState<DateIdea | null>(null);
  const [selectedPartner, setSelectedPartner] = useState('');
  const [plannedDates, setPlannedDates] = useState<Array<{date: Date, time: string, idea: DateIdea, partner: string}>>([]);

  const dateIdeas: DateIdea[] = [
    { id: 1, title: 'Virtual Movie Night', description: 'Watch a movie together using a synchronized streaming platform.', icon: <Film /> },
    { id: 2, title: 'Online Game Session', description: 'Play an online multiplayer game or a virtual board game together.', icon: <Coffee /> },
    { id: 3, title: 'Virtual Art Class', description: 'Take an online art class together and compare your masterpieces.', icon: <Palette /> },
    { id: 4, title: 'Book Club Discussion', description: 'Read the same book and have a virtual discussion about it.', icon: <Book /> },
    { id: 5, title: 'Virtual Concert Experience', description: 'Attend a live-streamed concert or music festival together.', icon: <Music /> },
  ];

  const handleDateSelection = (date: Date) => {
    setSelectedDate(date);
  };

  const handleTimeSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTime(e.target.value);
  };

  const handleIdeaSelection = (idea: DateIdea) => {
    setSelectedIdea(idea);
  };

  const handlePartnerSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPartner(e.target.value);
  };

  const handlePlanDate = () => {
    if (selectedDate && selectedTime && selectedIdea && selectedPartner) {
      const newDate = {
        date: selectedDate,
        time: selectedTime,
        idea: selectedIdea,
        partner: selectedPartner,
      };
      setPlannedDates([...plannedDates, newDate]);
      // Reset form
      setSelectedDate(null);
      setSelectedTime('');
      setSelectedIdea(null);
      setSelectedPartner('');
      alert('Virtual date planned successfully!');
    } else {
      alert('Please fill in all fields before planning the date.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <Calendar className="mr-2" />
        Virtual Date Planner
      </h2>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Select a Date</h3>
        <input
          type="date"
          onChange={(e) => handleDateSelection(new Date(e.target.value))}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Select a Time</h3>
        <input
          type="time"
          onChange={handleTimeSelection}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Choose a Virtual Date Idea</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dateIdeas.map((idea) => (
            <div
              key={idea.id}
              className={`p-4 border rounded-md cursor-pointer transition duration-300 ${
                selectedIdea?.id === idea.id ? 'bg-pink-100 border-pink-500' : 'hover:bg-gray-100'
              }`}
              onClick={() => handleIdeaSelection(idea)}
            >
              <div className="flex items-center mb-2">
                {idea.icon}
                <h4 className="font-semibold ml-2">{idea.title}</h4>
              </div>
              <p className="text-sm text-gray-600">{idea.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Select a Partner</h3>
        <input
          type="text"
          placeholder="Enter your partner's name or username"
          value={selectedPartner}
          onChange={handlePartnerSelection}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
      </div>

      <button
        onClick={handlePlanDate}
        className="w-full bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 transition duration-300"
      >
        Plan Virtual Date
      </button>

      {plannedDates.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Your Planned Dates</h3>
          <div className="space-y-4">
            {plannedDates.map((date, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-lg">
                <p className="font-medium">{date.date.toDateString()} at {date.time}</p>
                <p className="text-gray-700">{date.idea.title} with {date.partner}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Tips for a Great Virtual Date</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Test your internet connection and video chat software beforehand</li>
          <li>Choose a quiet, well-lit space for your date</li>
          <li>Dress up as you would for an in-person date</li>
          <li>Have a backup plan in case of technical difficulties</li>
          <li>Be present and engaged during the date</li>
          <li>Follow up after the date to share your thoughts and plan the next one</li>
        </ul>
      </div>
    </div>
  );
};

export default VirtualDatePlanner;