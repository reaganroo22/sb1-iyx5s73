import asyncHandler from 'express-async-handler';
import supabase from '../supabaseClient.js';

// @desc    Create or update user profile
// @route   POST /api/profiles
// @access  Private
export const createOrUpdateProfile = asyncHandler(async (req, res) => {
  const { name, birthdate, gender, bio, location, photos, interests, values } = req.body;

  const { data: existingProfile } = await supabase
    .from('profiles')
    .select('id')
    .eq('user_id', req.user.id)
    .single();

  let profile;
  if (existingProfile) {
    const { data, error } = await supabase
      .from('profiles')
      .update({ name, birthdate, gender, bio, location, photos, interests, values })
      .eq('user_id', req.user.id)
      .single();

    if (error) throw new Error(error.message);
    profile = data;
  } else {
    const { data, error } = await supabase
      .from('profiles')
      .insert({ user_id: req.user.id, name, birthdate, gender, bio, location, photos, interests, values })
      .single();

    if (error) throw new Error(error.message);
    profile = data;
  }

  res.json(profile);
});

// @desc    Get user profile
// @route   GET /api/profiles
// @access  Private
export const getProfile = asyncHandler(async (req, res) => {
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', req.user.id)
    .single();

  if (error) {
    res.status(404);
    throw new Error('Profile not found');
  }

  res.json(profile);
});

// @desc    Get profile by ID
// @route   GET /api/profiles/:id
// @access  Private
export const getProfileById = asyncHandler(async (req, res) => {
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', req.params.id)
    .single();

  if (error) {
    res.status(404);
    throw new Error('Profile not found');
  }

  res.json(profile);
});

// @desc    Get nearby profiles
// @route   GET /api/profiles/nearby
// @access  Private
export const getNearbyProfiles = asyncHandler(async (req, res) => {
  const { data: userProfile } = await supabase
    .from('profiles')
    .select('location')
    .eq('user_id', req.user.id)
    .single();

  if (!userProfile || !userProfile.location) {
    res.status(400);
    throw new Error('User location not set');
  }

  const { latitude, longitude } = userProfile.location;
  const radius = 50; // 50km radius, adjust as needed

  const { data: nearbyProfiles, error } = await supabase
    .rpc('nearby_profiles', {
      lat: latitude,
      long: longitude,
      radius_km: radius
    });

  if (error) throw new Error(error.message);

  res.json(nearbyProfiles);
});