import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Video, Coffee, MapPin, Plus } from 'lucide-react';
import { DatePlan } from '../types';
import PostDatePoll from './PostDatePoll';

interface DatesProps {
  subscription: string;
}

const Dates: React.FC<DatesProps> = ({ subscription }) => {
  const [plannedDates, setPlannedDates] = useState<DatePlan[]>([]);
  const [showDatePlanner, setShowDatePlanner] = useState(false);
  const [newDate, setNewDate] = useState<Partial<DatePlan>>({});
  const [showPostDatePoll, setShowPostDatePoll] = useState(false);
  const [currentDatePartner, setCurrentDatePartner] = useState('');

  useEffect(() => {
    // Fetch planned dates from API or local storage
    const mockDates: DatePlan[] = [
      { id: 1, date: new Date('2023-05-15'), time: '19:00', type: 'virtual', activity: 'Virtual Movie Night', partner: 'Sarah' },
      { id: 2, date: new Date('2023-05-18'), time: '20:00', type: 'physical', activity: 'Coffee Shop Meet', partner: 'Mike' },
    ];
    setPlannedDates(mockDates);

    // Check for completed dates and show post-date poll
    const completedDate = mockDates.find(date => new Date(date.date) < new Date());
    if (completedDate) {
      setCurrentDatePartner(completedDate.partner);
      setShowPostDatePoll(true);
    }
  }, []);

  const handleAddDate = () => {
    if (newDate.date && newDate.time && newDate.type && newDate.activity && newDate.partner) {
      const dateToAdd: DatePlan = {
        id: plannedDates.length + 1,
        ...newDate as DatePlan
      };
      setPlannedDates([...plannedDates, dateToAdd]);
      setNewDate({});
      setShowDatePlanner(false);
    }
  };

  const handlePostDatePollSubmit = (rating: number, feedback: string) => {
    console.log('Post-date feedback:', { partner: currentDatePartner, rating, feedback });
    // Here you would typically send this data to your backend
    setShowPostDatePoll(false);
  };

  const dateIdeas: { [key: string]: string[] } = {
    virtual: [
      'Virtual Movie Night',
      'Online Game Session',
      'Virtual Art Class',
      'Book Club Discussion',
      'Virtual Concert Experience',
    ],
    physical: [
      'Coffee Shop Meet',
      'Park Picnic',
      'Museum Visit',
      'Cooking Class',
      'Mini Golf Adventure',
    ],
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <Calendar className="mr-2" />
        Date Planner
      </h2>

      <div className="mb-6">
        <button
          onClick={() => setShowDatePlanner(true)}
          className="bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 transition duration-300 flex items-center"
        >
          <Plus size={18} className="mr-2" />
          Plan New Date
        </button>
      </div>

      {showDatePlanner && (
        <div className="mb-6 bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">New Date</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50"
                value={newDate.date ? newDate.date.toISOString().split('T')[0] : ''}
                onChange={(e) => setNewDate({ ...newDate, date: new Date(e.target.value) })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Time</label>
              <input
                type="time"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50"
                value={newDate.time || ''}
                onChange={(e) => setNewDate({ ...newDate, time: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Type</label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50"
                value={newDate.type || ''}
                onChange={(e) => setNewDate({ ...newDate, type: e.target.value as 'virtual' | 'physical' })}
              >
                <option value="">Select type</option>
                <option value="virtual">Virtual</option>
                <option value="physical">Physical</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Activity</label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50"
                value={newDate.activity || ''}
                onChange={(e) => setNewDate({ ...newDate, activity: e.target.value })}
              >
                <option value="">Select activity</option>
                {newDate.type && dateIdeas[newDate.type].map((idea) => (
                  <option key={idea} value={idea}>{idea}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Partner</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50"
                value={newDate.partner || ''}
                onChange={(e) => setNewDate({ ...newDate, partner: e.target.value })}
                placeholder="Enter partner's name"
              />
            </div>
            <button
              onClick={handleAddDate}
              className="w-full bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 transition duration-300"
            >
              Add Date
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {plannedDates.map((date) => (
          <div key={date.id} className="bg-gray-100 p-4 rounded-lg flex items-center">
            <div className="flex-grow">
              <p className="font-semibold">{date.partner}</p>
              <p className="text-sm text-gray-600">
                {date.date.toLocaleDateString()} at {date.time}
              </p>
              <p className="text-sm text-gray-600">{date.activity}</p>
            </div>
            {date.type === 'virtual' ? <Video className="text-blue-500" /> : <MapPin className="text-green-500" />}
          </div>
        ))}
      </div>

      {showPostDatePoll && (
        <div className="mt-6">
          <PostDatePoll
            partnerName={currentDatePartner}
            onSubmit={handlePostDatePollSubmit}
          />
        </div>
      )}

      {subscription !== 'free' && (
        <div className="mt-6 bg-yellow-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Premium Feature</h3>
          <p className="text-sm text-gray-700">
            As a premium user, you can sync your dates with Google and Apple Calendars. 
            This feature will be available soon!
          </p>
        </div>
      )}
    </div>
  );
};

export default Dates;