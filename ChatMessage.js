// models/ChatMessage.js
//
// This file defines the ChatMessage schema for storing live chat messages.
// Each chat message is linked to the originating stream and the user who sent the message.
// The schema includes a required text field for the message and automatically records timestamps.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatMessageSchema = new Schema(
  {
    // Reference to the Stream for which this chat message was sent.
    stream: {
      type: Schema.Types.ObjectId,
      ref: 'Stream',
      required: [true, 'Chat message must be associated with a stream']
    },
    // Reference to the User who sent the message.
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Chat message must be sent by a user']
    },
    // The content of the chat message.
    message: {
      type: String,
      required: [true, 'Message content is required'],
      trim: true
    }
    // Optionally, you can add other fields such as message type, emoji reactions, etc.
  },
  { timestamps: true } // Automatically includes `createdAt` and `updatedAt` fields.
);

module.exports = mongoose.model('ChatMessage', chatMessageSchema);