import asyncHandler from 'express-async-handler';
import supabase from '../supabaseClient.js';

// @desc    Get user's notifications
// @route   GET /api/notifications
// @access  Private
export const getUserNotifications = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const { data: notifications, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);

  res.json(notifications);
});

// @desc    Mark notification as read
// @route   PUT /api/notifications/:id
// @access  Private
export const markNotificationAsRead = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  const { data, error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('id', id)
    .eq('user_id', userId);

  if (error) throw new Error(error.message);

  res.json({ message: 'Notification marked as read' });
});

// @desc    Delete a notification
// @route   DELETE /api/notifications/:id
// @access  Private
export const deleteNotification = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  const { data, error } = await supabase
    .from('notifications')
    .delete()
    .eq('id', id)
    .eq('user_id', userId);

  if (error) throw new Error(error.message);

  res.json({ message: 'Notification deleted successfully' });
});