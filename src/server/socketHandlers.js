import { saveMessage } from './controllers/messageController.js';
import { createNotification } from './controllers/notificationController.js';

export const setupSocketHandlers = (io) => {
  const connectedUsers = new Map();

  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('authenticate', (userId) => {
      connectedUsers.set(userId, socket.id);
      console.log(`User ${userId} authenticated`);
    });

    socket.on('send_message', async ({ senderId, recipientId, content }) => {
      try {
        const message = await saveMessage(senderId, recipientId, content);
        const recipientSocketId = connectedUsers.get(recipientId);

        if (recipientSocketId) {
          io.to(recipientSocketId).emit('new_message', message);
        }

        // Create a notification for the recipient
        await createNotification({
          recipient: recipientId,
          type: 'message',
          relatedUser: senderId,
          message: `You have a new message from ${senderId}`,
        });

        // Emit the notification to the recipient if they're online
        if (recipientSocketId) {
          io.to(recipientSocketId).emit('new_notification', {
            type: 'message',
            message: `You have a new message from ${senderId}`,
          });
        }

        socket.emit('message_sent', message);
      } catch (error) {
        console.error('Error sending message:', error);
        socket.emit('message_error', { error: 'Failed to send message' });
      }
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
      for (const [userId, socketId] of connectedUsers.entries()) {
        if (socketId === socket.id) {
          connectedUsers.delete(userId);
          break;
        }
      }
    });
  });
};