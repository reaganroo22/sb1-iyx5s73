import asyncHandler from 'express-async-handler';
import Profile from '../models/profileModel.js';
import User from '../models/userModel.js';
import Match from '../models/matchModel.js';

// ... (keep existing functions)

// @desc    Get potential matches based on preferences and interests
// @route   GET /api/matching/potential-matches
// @access  Private
export const getPotentialMatches = asyncHandler(async (req, res) => {
  const userProfile = await Profile.findOne({ user: req.user._id });

  if (!userProfile) {
    res.status(404);
    throw new Error('User profile not found');
  }

  const { ageRange, distance, genderPreference } = userProfile.preferences;
  const userLocation = userProfile.location;

  const potentialMatches = await Profile.aggregate([
    {
      $geoNear: {
        near: userLocation,
        distanceField: 'distance',
        maxDistance: distance * 1000, // Convert km to meters
        spherical: true,
      },
    },
    {
      $match: {
        user: { $ne: req.user._id },
        age: { $gte: ageRange.min, $lte: ageRange.max },
        gender: genderPreference === 'all' ? { $in: ['male', 'female', 'other'] } : genderPreference,
      },
    },
    {
      $addFields: {
        commonInterests: {
          $size: { $setIntersection: ['$interests', userProfile.interests] },
        },
      },
    },
    {
      $sort: {
        commonInterests: -1,
        distance: 1,
      },
    },
    {
      $limit: 20,
    },
    {
      $lookup: {
        from: 'users',
        localField: 'user',
        foreignField: '_id',
        as: 'userDetails',
      },
    },
    {
      $unwind: '$userDetails',
    },
    {
      $project: {
        _id: 1,
        name: '$userDetails.name',
        age: 1,
        gender: 1,
        bio: 1,
        photos: 1,
        interests: 1,
        distance: 1,
        commonInterests: 1,
      },
    },
  ]);

  res.json(potentialMatches);
});

// ... (keep existing functions)