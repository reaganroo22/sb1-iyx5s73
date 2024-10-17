import React, { useState } from 'react';
import { Upload, Check } from 'lucide-react';

interface VerificationProcessProps {
  onVerified: () => void;
}

const VerificationProcess: React.FC<VerificationProcessProps> = ({ onVerified }) => {
  const [step, setStep] = useState(1);
  const [photo, setPhoto] = useState<File | null>(null);
  const [bio, setBio] = useState('');

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setPhoto(event.target.files[0]);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Here you would typically send the verification data to your backend
      console.log('Verification data:', { photo, bio });
      onVerified();
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Verification Process</h2>
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
            <h3 className="text-lg font-semibold mb-4">Upload a Clear Photo</h3>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="photo">
                Profile Photo
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="photo-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-pink-600 hover:text-pink-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-pink-500"
                    >
                      <span>Upload a file</span>
                      <input id="photo-upload" name="photo-upload" type="file" className="sr-only" onChange={handlePhotoUpload} />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {step === 2 && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Tell Us About Yourself</h3>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bio">
                Bio
              </label>
              <textarea
                id="bio"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows={4}
                placeholder="Share a bit about yourself..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              ></textarea>
            </div>
          </div>
        )}
        {step === 3 && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Review and Submit</h3>
            <p className="text-gray-600 mb-4">
              Please review your information before submitting. Our team will carefully review your application to ensure you meet our
              community standards.
            </p>
            <div className="mb-4">
              <h4 className="font-semibold">Photo:</h4>
              {photo && <p className="text-gray-600">{photo.name}</p>}
            </div>
            <div className="mb-4">
              <h4 className="font-semibold">Bio:</h4>
              <p className="text-gray-600">{bio}</p>
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

export default VerificationProcess;