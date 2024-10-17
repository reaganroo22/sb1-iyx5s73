import React, { useState, useEffect } from 'react';
import { TrendingUp, Award, Book, Target, Plus, Trash2 } from 'lucide-react';
import { GrowthGoal } from '../types';
import { getMockGoals } from '../services/mockDataService';

interface PersonalGrowthProps {
  subscription: string;
}

const PersonalGrowth: React.FC<PersonalGrowthProps> = ({ subscription }) => {
  const [goals, setGoals] = useState<GrowthGoal[]>([]);
  const [newGoal, setNewGoal] = useState({ title: '', description: '' });
  const [showAddGoal, setShowAddGoal] = useState(false);

  useEffect(() => {
    // Fetch goals from mock service
    const fetchedGoals = getMockGoals();
    setGoals(fetchedGoals);
  }, []);

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (newGoal.title && newGoal.description) {
      const goal: GrowthGoal = {
        id: goals.length + 1,
        title: newGoal.title,
        description: newGoal.description,
        progress: 0,
      };
      setGoals([...goals, goal]);
      setNewGoal({ title: '', description: '' });
      setShowAddGoal(false);
    }
  };

  const handleProgressUpdate = (id: number, progress: number) => {
    setGoals(goals.map(goal => goal.id === id ? { ...goal, progress } : goal));
  };

  const handleDeleteGoal = (id: number) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <TrendingUp className="mr-2 text-pink-500" />
        Personal Growth Tracker
      </h3>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-lg font-semibold">Your Goals</h4>
          <button
            onClick={() => setShowAddGoal(!showAddGoal)}
            className="bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 transition duration-300 flex items-center"
          >
            <Plus size={18} className="mr-2" />
            Add Goal
          </button>
        </div>
        {goals.map(goal => (
          <div key={goal.id} className="mb-4 p-4 bg-gray-100 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h5 className="font-semibold">{goal.title}</h5>
                <p className="text-gray-600 text-sm">{goal.description}</p>
              </div>
              <button
                onClick={() => handleDeleteGoal(goal.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={18} />
              </button>
            </div>
            <div className="flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                <div className="bg-pink-500 h-2.5 rounded-full" style={{ width: `${goal.progress}%` }}></div>
              </div>
              <span className="text-sm font-medium text-gray-700">{goal.progress}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={goal.progress}
              onChange={(e) => handleProgressUpdate(goal.id, parseInt(e.target.value))}
              className="w-full mt-2"
            />
          </div>
        ))}
      </div>

      {showAddGoal && (
        <div className="mb-8">
          <h4 className="text-lg font-semibold mb-4">Add New Goal</h4>
          <form onSubmit={handleAddGoal} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Goal Title</label>
              <input
                type="text"
                id="title"
                value={newGoal.title}
                onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                id="description"
                value={newGoal.description}
                onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50"
                rows={3}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 transition duration-300"
            >
              Add Goal
            </button>
          </form>
        </div>
      )}

      <div className="bg-gray-100 p-4 rounded-lg">
        <h4 className="text-lg font-semibold mb-2">Growth Tips</h4>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          <li>Set specific, measurable, achievable, relevant, and time-bound (SMART) goals</li>
          <li>Break larger goals into smaller, manageable tasks</li>
          <li>Celebrate small victories along the way</li>
          <li>Regularly review and adjust your goals as needed</li>
          <li>Seek support from friends, family, or a mentor</li>
        </ul>
      </div>

      {subscription !== 'free' && (
        <div className="mt-8 bg-yellow-100 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2 flex items-center">
            <Award className="mr-2 text-yellow-500" />
            Premium Feature
          </h4>
          <p className="text-sm text-gray-700">
            As a premium user, your personal growth progress is highlighted on your profile, 
            making you more attractive to potential matches who value self-improvement!
          </p>
        </div>
      )}
    </div>
  );
};

export default PersonalGrowth;