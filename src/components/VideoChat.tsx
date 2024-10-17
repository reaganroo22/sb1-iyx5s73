import React, { useState, useEffect, useRef } from 'react';
import { Video, Mic, MicOff, VideoOff, Phone, PhoneOff } from 'lucide-react';

const VideoChat: React.FC = () => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCallActive) {
      interval = setInterval(() => {
        setCallDuration((prevDuration) => prevDuration + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCallActive]);

  useEffect(() => {
    if (isCallActive) {
      startLocalVideo();
    } else {
      stopLocalVideo();
    }
  }, [isCallActive]);

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const startLocalVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing media devices:', error);
    }
  };

  const stopLocalVideo = () => {
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      const tracks = (localVideoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
    }
  };

  const toggleCall = () => {
    setIsCallActive(!isCallActive);
    if (!isCallActive) {
      setCallDuration(0);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      (localVideoRef.current.srcObject as MediaStream).getAudioTracks().forEach(track => {
        track.enabled = isMuted;
      });
    }
  };

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      (localVideoRef.current.srcObject as MediaStream).getVideoTracks().forEach(track => {
        track.enabled = !isVideoOn;
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <Video className="mr-2" />
          Video Chat
        </h2>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="aspect-w-16 aspect-h-9">
            <video
              ref={localVideoRef}
              className="w-full h-full object-cover rounded-lg"
              autoPlay
              muted
              playsInline
            />
          </div>
          <div className="aspect-w-16 aspect-h-9">
            <video
              ref={remoteVideoRef}
              className="w-full h-full object-cover rounded-lg"
              autoPlay
              playsInline
            />
          </div>
        </div>

        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={toggleMute}
            className={`p-3 rounded-full ${
              isMuted ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'
            } hover:bg-gray-300 transition duration-300`}
          >
            {isMuted ? <MicOff /> : <Mic />}
          </button>
          <button
            onClick={toggleVideo}
            className={`p-3 rounded-full ${
              !isVideoOn ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'
            } hover:bg-gray-300 transition duration-300`}
          >
            {isVideoOn ? <Video /> : <VideoOff />}
          </button>
          <button
            onClick={toggleCall}
            className={`p-3 rounded-full ${
              isCallActive ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
            } hover:opacity-90 transition duration-300`}
          >
            {isCallActive ? <PhoneOff /> : <Phone />}
          </button>
        </div>

        {isCallActive && (
          <div className="text-center text-gray-600">
            Call duration: {formatDuration(callDuration)}
          </div>
        )}
      </div>

      <div className="bg-gray-100 p-6">
        <h3 className="text-xl font-semibold mb-4">Video Chat Guidelines</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Ensure you're in a quiet, well-lit environment</li>
          <li>Test your camera and microphone before the call</li>
          <li>Be respectful and attentive during the conversation</li>
          <li>If you feel uncomfortable at any point, you can end the call</li>
          <li>Report any inappropriate behavior to our support team</li>
        </ul>
      </div>
    </div>
  );
};

export default VideoChat;