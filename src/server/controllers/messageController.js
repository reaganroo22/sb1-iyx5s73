import asyncHandler from 'express-async-handler';
import supabase from '../supabaseClient.js';

// @desc    Send a message
// @route   POST /api/messages
// @access  Private
export const sendMessage = asyncHandler(async (req, res) => {
  const { matchId, content } = req.body;
  const senderId = req.user.id;

  const { data, error } = await supabase
    .rpc('send_message', {
      p_match_id: matchId,
      p_sender_id: senderId,
      p_content: content
    });

  if (error) throw new Error(error.message);

  res.status(201).json({ messageId: data, message: 'Message sent successfully' });
});

// @desc    Get messages for a match
// @route   GET /api/messages/:matchId
// @access  Private
export const getMessagesForMatch = asyncHandler(async (req, res) => {
  const { matchId } = req.params;
  const userId = req.user.id;

  const { data: match, error: matchError } = await supabase
    .from('matches')
    .select('*')
    .eq('id', matchId)
    .single();

  if (matchError) throw new Error(matchError.message);

  if (match.user1_id !== userId && match.user2_id !== userId) {
    res.status(403);
    throw new Error('Not authorized to view these messages');
  }

  const { data: messages, error } = await supabase
    .from('messages')
    .select('*')
    .eq('match_id', matchId)
    .order('created_at', { ascending: true });

  if (error) throw new Error(error.message);

  res.json(messages);
});

// @desc    Get user's conversations
// @route   GET /api/messages/conversations
// @access  Private
export const getUserConversations = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const { data: conversations, error } = await supabase
    .from('matches')
    .select(`
      id,
      status,
      user1:user1_id (id, email),
      user2:user2_id (id, email),
      messages (id, content, created_at)
    `)
    .or(`user1_id.eq.${userId},user2_id.eq.${userId}`)
    .eq('status', 'match')
    .order('updated_at', { ascending: false });

  if (error) throw new Error(error.message);

  // Format the conversations
  const formattedConversations = conversations.map(conv => {
    const otherUser = conv.user1.id === userId ? conv.user2 : conv.user1;
    const lastMessage = conv.messages.length > 0 ? conv.messages[conv.messages.length - 1] : null;

    return {
      matchId: conv.id,
      otherUser: {
        id: otherUser.id,
        email: otherUser.email
      },
      lastMessage: lastMessage ? {
        content: lastMessage.content,
        createdAt: lastMessage.created_at
      } : null
    };
  });

  res.json(formattedConversations);
});