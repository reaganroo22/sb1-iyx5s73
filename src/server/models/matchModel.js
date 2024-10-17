import mongoose from 'mongoose';

const matchSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  targetUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['like', 'superlike', 'match'],
    required: true,
  },
}, {
  timestamps: true,
});

const Match = mongoose.model('Match', matchSchema);

export default Match;