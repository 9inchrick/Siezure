// models/Clip.js
//
// This file defines the Clip schema and model for storing clips extracted from live streams.
// Each clip is associated with a user (its creator) and a stream from which it was generated.
// The model includes fields for title, the clip URL, start and end times, and an optional description.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clipSchema = new Schema(
  {
    // Reference to the User that created/viewed the clip.
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Clip must belong to a user']
    },
    // Reference to the Stream from which the clip was generated.
    stream: {
      type: Schema.Types.ObjectId,
      ref: 'Stream',
      required: [true, 'Clip must be associated with a stream']
    },
    // The title or caption for the clip.
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true
    },
    // URL where the clip is stored or can be accessed.
    clipUrl: {
      type: String,
      required: [true, 'Clip URL is required']
    },
    // The start time (in seconds or milliseconds, as defined by your app logic)
    // where the clip begins in the original stream.
    startTime: {
      type: Number,
      required: [true, 'Start time is required']
    },
    // The end time (in seconds or milliseconds)
    // where the clip ends in the original stream.
    endTime: {
      type: Number,
      required: [true, 'End time is required']
    },
    // An optional description for the clip.
    description: {
      type: String,
      default: ''
    }
  },
  { timestamps: true } // Automatically includes createdAt and updatedAt fields.
);

module.exports = mongoose.model('Clip', clipSchema);