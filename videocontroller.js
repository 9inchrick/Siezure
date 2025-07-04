// controllers/videoController.js
//
// This controller manages video-related endpoints: downloading videos,
// triggering automated video editing/processing, and listing available video files.

const path = require('path');
const fs = require('fs');
const videoProcessing = require('../services/videoProcessing');

/**
 * Download a video file based on the provided videoId.
 * Endpoint: GET /api/video/download/:videoId
 */
exports.downloadVideo = (req, res) => {
  const { videoId } = req.params;
  const filePath = path.join(__dirname, '../videos/', `${videoId}.mp4`);

  if (fs.existsSync(filePath)) {
    // Send the file as a downloadable response
    res.download(filePath, `${videoId}.mp4`, (err) => {
      if (err) {
        console.error('Download error:', err);
        return res.status(500).json({ message: 'Error while downloading video.' });
      }
    });
  } else {
    res.status(404).json({ message: 'Video not found.' });
  }
};

/**
 * Trigger an automated video editing process.
 * This handles operations such as trimming (using startTime and endTime),
 * and can also trigger additional processing (transcoding, watermarking, thumbnail generation, etc.).
 * Endpoint: POST /api/video/edit
 *
 * Expected request body parameters:
 *   - videoId: The ID of the video to process.
 *   - startTime: (Optional) Start time (in seconds) for trimming.
 *   - endTime: (Optional) End time (in seconds) for trimming.
 *   - options: (Optional) Additional processing options (object) such as transcode, watermark, thumbnail, and metadata.
 */
exports.automatedEdit = async (req, res) => {
  const { videoId, startTime, endTime, options } = req.body;
  if (!videoId) {
    return res.status(400).json({ message: 'Video ID is required.' });
  }
  
  const inputPath = path.join(__dirname, '../videos/', `${videoId}.mp4`);
  const outputPath = path.join(__dirname, '../videos/', `${videoId}_edited.mp4`);

  // Verify input file exists
  if (!fs.existsSync(inputPath)) {
    return res.status(404).json({ message: 'Input video not found.' });
  }

  try {
    // Process the video, passing along the advanced options (transcode, watermark, thumb, metadata, etc.)
    await videoProcessing.processVideo(inputPath, outputPath, { startTime, endTime, ...options });
    res.status(200).json({
      message: 'Video processed successfully.',
      editedVideo: path.basename(outputPath)
    });
  } catch (error) {
    console.error('Automated video edit error:', error);
    res.status(500).json({ message: 'Error while processing video.' });
  }
};

/**
 * List all video files in the designated videos directory.
 * Endpoint: GET /api/video/list
 */
exports.listVideos = (req, res) => {
  const videosDir = path.join(__dirname, '../videos/');
  fs.readdir(videosDir, (err, files) => {
    if (err) {
      console.error('Error reading videos directory:', err);
      return res.status(500).json({ message: 'Error reading videos directory.' });
    }
    // Filter only .mp4 files and return them
    const videos = files.filter(file => file.endsWith('.mp4'));
    res.status(200).json({ videos });
  });
};