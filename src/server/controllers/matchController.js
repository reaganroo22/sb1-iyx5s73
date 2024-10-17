import asyncHandler from 'express-async-handler';
import supabase from '../supabaseClient.js';

// @desc    Like a profile
// @route   POST /api/matches/like/:id
// @access  Private
export const likeProfile = asyncHandler(async (req, res) => {
  const targetUserId = req.params.id;
  const userId = req.user.id;

  // Check if there's already a match
  const { data: existingMatch } = await supabase
    .from('matches')
    .select('*')
    .or(`user1_id.eq.${userId},user2_id.eq.${userId}`)
    .or(`user1_id.eq.${targetUserId},user2_id.eq.${targetUserId}`)
    .single();

  if (existingMatch) {
    if (existingMatch.status === 'match') {
      res.status(400);
      throw new Error('Users are already matched');
    } else if (existingMatch.user1_id === userId) {
      res.status(400);
      throw new Error('You have already liked this profile');
    } else {
      // If the target user has already liked the current user, create a match
      const { data: updatedMatch, error } = await supabase
        .from('matches')
        .update({ status: 'match' })
        .eq('id', existingMatch.id)
        .single();

      if (error) throw new Error(error.message);
      res.json({ message: 'It\'s a match!', match: updatedMatch });
    }
  } else {
    // Create a new like
    const { data: newMatch, error } = await supabase
      .from('matches')
      .insert({ user1_id: userId, user2_id: targetUserId, status: 'like' })
      .single();

    if (error) throw new Error(error.message);
    res.status(201).json({ message: 'Profile liked successfully', match: newMatch });
  }
});

// @desc    Super like a profile
// @route   POST /api/matches/superlike/:id
// @access  Private
export const superLikeProfile = asyncHandler(async (req, res) => {
  const targetUserId = req.params.id;
  const userId = req.user.id;

  // Check if the user has a premium subscription
  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('tier')
    .eq('user_id', userId)
    .single();

  if (!subscription || subscription.tier === 'free') {
    res.status(403);
    throw new Error('Super likes are only available for premium users');
  }

  // Check if there's already a match
  const { data: existingMatch } = await supabase
    .from('matches')
    .select('*')
    .or(`user1_id.eq.${userId},user2_id.eq.${userId}`)
    .or(`user1_id.eq.${targetUserId},user2_id.eq.${targetUserId}`)
    .single();

  if (existingMatch) {
    if (existingMatch.status === 'match') {
      res.status(400);
      throw new Error('Users are already matched');
    } else if (existingMatch.user1_id === userId) {
      res.status(400);
      throw new Error('You have already liked or super liked this profile');
    } else {
      // If the target user has already liked the current user, create a match
      const { data: updatedMatch, error } = await supabase
        .from('matches')
        .update({ status: 'match' })
        .eq('id', existingMatch.id)
        .single();

      if (error) throw new Error(error.message);
      res.json({ message: 'It\'s a super match!', match: updatedMatch });
    }
  } else {
    // Create a new super like
    const { data: newMatch, error } = await supabase
      .from('matches')
      .insert({ user1_id: userId, user2_id: targetUserId, status: 'superlike' })
      .single();

    if (error) throw new Error(error.message);
    res.status(201).json({ message: 'Profile super liked successfully', match: newMatch });
  }
});

// @desc    Get user's matches
// @route   GET /api/matches
// @access  Private
export const getMatches = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const { data: matches, error } = await supabase
    .from('matches')
    .select(`
      id,
      status,
      user1:user1_id (id, email),
      user2:user2_id (id, email)
    `)
    .or(`user1_id.eq.${userId},user2_id.eq.${userId}`)
    .eq('status', 'match');

  if (error) throw new Error(error.message);

  res.json(matches);
});