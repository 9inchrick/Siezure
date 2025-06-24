// controllers/analyticsController.js
//
// This controller handles retrieval and aggregation of analytics data.
// It provides endpoints to get analytics for a specific stream, aggregated analytics for the authenticated user’s streams,
// and (optionally) global analytics across all streams. It assumes that analytics data is stored
// in an Analytics model with fields such as views, likes, and comments, and that a Stream model exists.

const Analytics = require('../models/Analytics'); // Assumed Analytics model
const Stream = require('../models/Stream'); // Stream model for referencing user's streams

// Get analytics data for a specific stream using its ID.
// Example endpoint: GET /api/analytics/stream/:streamId
exports.getStreamAnalytics = async (req, res) => {
  try {
    const { streamId } = req.params;

    // Find all analytics entries for the given stream
    const analytics = await Analytics.find({ stream: streamId });
    if (!analytics || analytics.length === 0) {
      return res.status(404).json({ message: 'No analytics data available for this stream.' });
    }
    return res.status(200).json({ analytics });
  } catch (error) {
    console.error('Error retrieving stream analytics:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

// Get aggregated analytics for the authenticated user's streams.
// Example endpoint: GET /api/analytics/user
exports.getUserAnalytics = async (req, res) => {
  try {
    // First, find all streams belonging to the authenticated user
    const userStreams = await Stream.find({ user: req.user.id });
    const streamIds = userStreams.map((stream) => stream._id);

    // Aggregate analytics data for these streams
    const aggregatedAnalytics = await Analytics.aggregate([
      { $match: { stream: { $in: streamIds } } },
      {
        $group: {
          _id: null,
          totalViews: { $sum: '$views' },
          totalLikes: { $sum: '$likes' },
          totalComments: { $sum: '$comments' },
        },
      },
    ]);

    if (!aggregatedAnalytics || aggregatedAnalytics.length === 0) {
      return res.status(404).json({ message: 'No analytics data available for your streams.' });
    }

    return res.status(200).json({ analytics: aggregatedAnalytics[0] });
  } catch (error) {
    console.error('Error retrieving user analytics:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

// (Optional) Get aggregated global analytics across all streams.
// Example endpoint: GET /api/analytics/global
exports.getGlobalAnalytics = async (req, res) => {
  try {
    const globalAnalytics = await Analytics.aggregate([
      {
        $group: {
          _id: null,
          totalViews: { $sum: '$views' },
          totalLikes: { $sum: '$likes' },
          totalComments: { $sum: '$comments' },
        },
      },
    ]);

    if (!globalAnalytics || globalAnalytics.length === 0) {
      return res.status(404).json({ message: 'No global analytics data available.' });
    }
    return res.status(200).json({ analytics: globalAnalytics[0] });
  } catch (error) {
    console.error('Error retrieving global analytics:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};