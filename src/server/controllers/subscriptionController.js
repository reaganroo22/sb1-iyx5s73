import asyncHandler from 'express-async-handler';
import supabase from '../supabaseClient.js';

// @desc    Update user subscription
// @route   PUT /api/subscriptions
// @access  Private
export const updateSubscription = asyncHandler(async (req, res) => {
  const { tier, endDate } = req.body;
  const userId = req.user.id;

  const { data, error } = await supabase
    .rpc('update_subscription', {
      p_user_id: userId,
      p_tier: tier,
      p_end_date: endDate
    });

  if (error) throw new Error(error.message);

  res.json({ message: 'Subscription updated successfully' });
});

// @desc    Get user subscription
// @route   GET /api/subscriptions
// @access  Private
export const getUserSubscription = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const { data: subscription, error } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) throw new Error(error.message);

  res.json(subscription);
});