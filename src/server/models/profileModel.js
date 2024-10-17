import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  bio: {
    type: String,
    maxlength: 500,
  },
  photos: [{
    type: String,
    required: true,
  }],
  interests: [{
    type: String,
  }],
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  preferences: {
    ageRange: {
      min: { type: Number, default: 18 },
      max: { type: Number, default: 99 },
    },
    distance: { type: Number, default: 50 },
    genderPreference: { type: String },
  },
}, {
  timestamps: true,
});

profileSchema.index({ location: '2dsphere' });

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;