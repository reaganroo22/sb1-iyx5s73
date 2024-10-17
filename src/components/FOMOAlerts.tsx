import React, { useState, useEffect } from 'react';
import { Bell, X } from 'lucide-react';

interface Alert {
  id: number;
  message: string;
}

const FOMOAlerts: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    // Simulating receiving FOMO alerts
    const fakeAlerts = [
      { id: 1, message: "You've dropped 5 spots in the local leaderboard! Boost your profile now!" },
      { id: 2, message: "3 new hotties in your area! Don't miss out on potential matches!" },
      { id: 3, message: "Your match rate is lower than usual. Update your profile to stand out!" },
    ];

    setAlerts(fakeAlerts);

    // Simulating receiving new alerts periodically
    const interval = setInterval(() => {
      const newAlert = {
        id: Date.now(),
        message: `New alert at ${new Date().toLocaleTimeString()}!`,
      };
      setAlerts((prevAlerts) => [...prevAlerts, newAlert]);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const removeAlert = (id: number) => {
    setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));
  };

  return (
    <div className="fixed bottom-4 right-4 w-80">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className="bg-pink-500 text-white p-4 rounded-lg shadow-lg mb-2 relative animate-slide-in"
        >
          <button
            onClick={() => removeAlert(alert.id)}
            className="absolute top-2 right-2 text-white hover:text-gray-200"
          >
            <X size={16} />
          </button>
          <div className="flex items-center">
            <Bell className="mr-2" size={20} />
            <p>{alert.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FOMOAlerts;