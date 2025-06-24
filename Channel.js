// models/Channel.js
//
// This file defines the Channel schema that stores channel-specific details
// such as channel name, description, profile picture, banner image, and social links.
// Each Channel is linked to a User by the `user` field. Timestamps are enabled
// to track when a channel is created and updated.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const channelSchema = new Schema(
  {
    // Reference to the User that owns the channel
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Channel must belong to a user']
    },
    // Custom channel name, could be different from the user's username
    channelName: {
      type: String,
      required: [true, 'Channel name is required'],
      trim: true
    },
    // A brief description or bio for the channel
    description: {
      type: String,
      default: ''
    },
    // URL to the profile picture of the channel
    profilePicture: {
      type: String,
      default: ''
    },
    // URL to the banner image of the channel
    bannerImage: {
      type: String,
      default: ''
    },
    // Optional social media links for the channel
    socialLinks: {
      twitter: { type: String, default: '' },
      youtube: { type: String, default: '' },
      instagram: { type: String, default: '' }
    }
  },
  { timestamps: true } // This adds createdAt and updatedAt fields automatically.
);

module.exports = mongoose.model('Channel', channelSchema);