import React, { useState } from 'react';
import { Upload, Camera, Check } from 'lucide-react';

interface PhotoVerificationProps {
  onVerified: () => void;
}

const PhotoVerification: React.FC<PhotoVerificationProps> = ({ onVerified }) => {
  const [step, setStep] = useState(1);
  const [photos, setPhotos] = useState<File[]>([]);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setPhotos([...photos, ...Array.from(event.target.files)]);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Here you would typically send the verification photos to your backend for AI analysis
      console.log('Verification photos:', photos);
      // Simulate AI verification process
      setTimeout(() => {
        onVerified();
      }, 2000);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">AI-Powered Photo Verification</h2>
      <div className="mb-6">
        <div className="flex justify-between items-center">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                i <= step ? 'bg-pink-500 text-white' : 'bg-gray-200 text-gray-500'
              }`}
            >
              {i < step ? <Check size={16} /> : i}
            </div>
          ))}
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Upload a Clear Selfie</h3>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="selfie">
                Selfie Photo
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <Camera className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="selfie-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-pink-600 hover:text-pink-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-pink-500"
                    >
                      <span>Take a selfie</span>
                      <input id="selfie-upload" name="selfie-upload" type="file" accept="image/*" capture="user" className="sr-only" onChange={handlePhotoUpload} />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {step === 2 && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Upload Additional Photos</h3>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="additional-photos">
                Additional Photos (2-3)
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="photo-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-pink-600 hover:text-pink-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-pink-500"
                    >
                      <span>Upload photos</span>
                      <input id="photo-upload" name="photo-upload" type="file" multiple className="sr-only" onChange={handlePhotoUpload} />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {step === 3 && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Review and Submit</h3>
            <p className="text-gray-600 mb-4">
              Please review your photos before submitting. Our AI will analyze them to ensure authenticity and quality.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {photos.map((photo, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt={`Uploaded photo ${index + 1}`}
                    className="w-full h-40 object-cover rounded-md"
                  />
                  <span className="absolute bottom-2 right-2 bg-white px-2 py-1 rounded-full text-xs font-semibold">
                    {index === 0 ? 'Selfie' : `Photo ${index}`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 transition duration-300"
        >
          {step < 3 ? 'Next' : 'Submit for Verification'}
        </button>
      </form>
    </div>
  );
};

export default PhotoVerification;