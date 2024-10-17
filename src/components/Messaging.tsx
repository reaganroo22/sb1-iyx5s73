import React, { useState, useEffect } from 'react';
import { Send, User, Phone, Video } from 'lucide-react';
import { getMockMessages, sendMessage } from '../services/mockDataService';
import { Message, Profile } from '../types';
import EmojiPicker from 'emoji-picker-react';
import RizzAI from './RizzAI';

interface MessagingProps {
  subscription: string;
}

const Messaging: React.FC<MessagingProps> = ({ subscription }) => {
  const [conversations, setConversations] = useState<{ id: number; name: string; lastMessage: string; unreadCount: number }[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);

  useEffect(() => {
    // Simulating fetching conversations
    const mockConversations = [
      { id: 1, name: 'Sarah', lastMessage: 'Hey, how are you?', unreadCount: 2 },
      { id: 2, name: 'Mike', lastMessage: 'Want to grab coffee sometime?', unreadCount: 0 },
      { id: 3, name: 'Emily', lastMessage: 'That sounds great!', unreadCount: 1 },
    ];
    setConversations(mockConversations);
  }, []);

  useEffect(() => {
    if (selectedConversation) {
      // Fetch messages for the selected conversation
      const fetchedMessages = getMockMessages();
      setMessages(fetchedMessages);

      // Fetch profile for the selected conversation
      // This is a mock implementation. In a real app, you'd fetch the actual profile data.
      setSelectedProfile({
        id: selectedConversation,
        name: conversations.find(c => c.id === selectedConversation)?.name || '',
        age: 25,
        gender: 'female',
        location: 'New York, NY',
        bio: 'Love traveling and trying new foods!',
        photos: ['https://example.com/photo.jpg'],
        interests: ['Travel', 'Cooking', 'Photography'],
        values: ['Honesty', 'Adventure', 'Kindness'],
        hotnessScore: 85,
        premium: false,
        icebreakerAnswers: [],
        likes: 100,
        matches: 20,
      });
    }
  }, [selectedConversation]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '' || !selectedConversation) return;

    const sentMessage = await sendMessage(selectedConversation, newMessage);
    setMessages([...messages, sentMessage]);
    setNewMessage('');

    // Update the last message in conversations
    setConversations(prevConversations =>
      prevConversations.map(conv =>
        conv.id === selectedConversation
          ? { ...conv, lastMessage: newMessage }
          : conv
      )
    );
  };

  const handleEmojiClick = (emojiObject: any) => {
    setNewMessage(prevMessage => prevMessage + emojiObject.emoji);
  };

  const handlePhoneCall = () => {
    if (subscription === 'elite') {
      alert(`Initiating phone call with ${conversations.find(c => c.id === selectedConversation)?.name}`);
      // Implement actual phone call functionality here
    } else {
      alert('Phone calls are available for Elite users only.');
    }
  };

  const handleVideoCall = () => {
    if (subscription === 'elite') {
      alert(`Initiating video call with ${conversations.find(c => c.id === selectedConversation)?.name}`);
      // Implement actual video call functionality here
    } else {
      alert('Video calls are available for Elite users only.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden flex h-[600px]">
      <div className="w-1/3 border-r">
        <h2 className="text-xl font-semibold p-4 border-b">Conversations</h2>
        <div className="overflow-y-auto h-[calc(100%-60px)]">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`p-4 border-b cursor-pointer hover:bg-gray-100 ${
                selectedConversation === conversation.id ? 'bg-gray-100' : ''
              }`}
              onClick={() => setSelectedConversation(conversation.id)}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{conversation.name}</h3>
                {conversation.unreadCount > 0 && (
                  <span className="bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {conversation.unreadCount}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="w-2/3 flex flex-col">
        {selectedConversation ? (
          <>
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                {conversations.find((c) => c.id === selectedConversation)?.name}
              </h2>
              {subscription === 'elite' && (
                <div>
                  <button
                    onClick={handlePhoneCall}
                    className="bg-pink-500 text-white p-2 rounded-full hover:bg-pink-600 transition duration-300 mr-2"
                  >
                    <Phone size={20} />
                  </button>
                  <button
                    onClick={handleVideoCall}
                    className="bg-pink-500 text-white p-2 rounded-full hover:bg-pink-600 transition duration-300"
                  >
                    <Video size={20} />
                  </button>
                </div>
              )}
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-4 ${message.sender === 'You' ? 'text-right' : 'text-left'}`}
                >
                  <div
                    className={`inline-block p-2 rounded-lg ${
                      message.sender === 'You' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                    }`}
                  >
                    <p>{message.content}</p>
                    <p className="text-xs mt-1 opacity-75">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="p-4 border-t">
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="mr-2"
                >
                  😊
                </button>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 border rounded-l-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <button
                  type="submit"
                  className="bg-pink-500 text-white py-2 px-4 rounded-r-md hover:bg-pink-600 transition duration-300"
                >
                  <Send size={20} />
                </button>
              </div>
              {showEmojiPicker && (
                <div className="absolute bottom-16 right-4"><EmojiPicker onEmojiClick={handleEmojiClick} />
                </div>
              )}
            </form>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Select a conversation to start messaging</p>
          </div>
        )}
      </div>
      {selectedProfile && (
        <RizzAI profile={selectedProfile} conversation={messages} onSuggestion={(suggestion) => setNewMessage(suggestion)} />
      )}
    </div>
  );
};

export default Messaging;