// controllers/streamController.js
//
// This controller manages stream-related operations, including starting a new stream,
// ending an active stream, fetching details for a given stream, and listing current live streams.
// It assumes that the authenticated user's ID is available on req.user and that a Stream model exists.

const Stream = require('../models/Stream');

// Start a new stream. Expects title, description, and game in the request body.
exports.startStream = async (req, res) => {
  try {
    const { title, description, game } = req.body;
    
    // Validate essential fields for starting a stream
    if (!title || !game) {
      return res.status(400).json({
        message: 'Please provide at least a title and a game for the stream.'
      });
    }

    // Create a new stream entry with status "live" and capture the start time.
    const newStream = new Stream({
      user: req.user.id, // Assumes req.user is populated via authentication middleware
      title,
      description,
      game,
      status: 'live',
      startedAt: new Date()
    });

    await newStream.save();

    return res.status(201).json({
      message: 'Stream started successfully.',
      stream: newStream
    });
  } catch (error) {
    console.error('Error starting stream:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

// End an active stream. Expects the stream ID in request parameters.
exports.endStream = async (req, res) => {
  try {
    const { streamId } = req.params;

    // Find the stream by its ID
    const stream = await Stream.findById(streamId);
    if (!stream) {
      return res.status(404).json({ message: 'Stream not found.' });
    }

    // Check if the authenticated user is the owner of the stream.
    if (stream.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to end this stream.' });
    }

    // Ensure that the stream is currently live.
    if (stream.status !== 'live') {
      return res.status(400).json({ message: 'Stream is not live.' });
    }

    // Update stream status and record end time.
    stream.status = 'ended';
    stream.endedAt = new Date();
    await stream.save();

    return res.status(200).json({
      message: 'Stream ended successfully.',
      stream
    });
  } catch (error) {
    console.error('Error ending stream:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

// Get details of a specific stream by its ID.
exports.getStreamDetails = async (req, res) => {
  try {
    const { streamId } = req.params;
    // Populate user info (username and email) for additional context
    const stream = await Stream.findById(streamId).populate('user', 'username email');
    if (!stream) {
      return res.status(404).json({ message: 'Stream not found.' });
    }
    return res.status(200).json({ stream });
  } catch (error) {
    console.error('Error fetching stream details:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

// Get a list of all live streams.
exports.getLiveStreams = async (req, res) => {
  try {
    // Find streams where the status is "live" and populate basic user info.
    const liveStreams = await Stream.find({ status: 'live' }).populate('user', 'username');
    return res.status(200).json({ streams: liveStreams });
  } catch (error) {
    console.error('Error fetching live streams:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};