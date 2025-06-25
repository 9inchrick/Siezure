// services/videoProcessing.js
//
// Orchestrates advanced video processing features using FFmpeg.
// It builds a base FFmpeg command (for example, for trimming) and
// conditionally delegates to additional services:
//    - transcoding: to generate multiple output resolutions.
//    - watermarking: to apply a watermark overlay.
//    - thumbnail: to generate a snapshot or animated GIF.
//    - mediaAnalysis: to extract metadata using FFprobe.
//
// This file is written to be cross-platform and works with a bundled FFmpeg
// (using ffmpeg-static), making it well-suited for a Windows environment.

const { exec } = require('child_process');
const ffmpegPath = require('ffmpeg-static'); // Bundled FFmpeg binary
const transcoding = require('./transcoding');
const watermarking = require('./watermarking');
const thumbnail = require('./thumbnail');
const mediaAnalysis = require('./mediaAnalysis');

/**
 * processVideo - Orchestrates the overall video processing pipeline.
 *
 * @param {string} inputPath   - Path to the input video file.
 * @param {string} outputPath  - Path to output the processed video file.
 * @param {Object} options     - Processing options. Supports:
 *                                 • startTime, endTime (for trimming)
 *                                 • transcode (object with options such as resolutions)
 *                                 • watermark (object with properties: image, position)
 *                                 • thumbnail (object with options like time to capture)
 *                                 • metadata (boolean flag to analyze media info)
 *
 * @returns {Promise} Resolves with processing details when complete.
 */
exports.processVideo = async (inputPath, outputPath, options = {}) => {
  // Build a basic FFmpeg command for trimming (if startTime and endTime are provided)
  let processingCmd = `${ffmpegPath} -i "${inputPath}" `;

  if (options.startTime !== undefined && options.endTime !== undefined) {
    processingCmd += `-ss ${options.startTime} -to ${options.endTime} `;
  }

  // Use '-c copy' to simply copy streams without re-encoding.
  // This is a fast operation for basic trimming.
  processingCmd += `-c copy "${outputPath}"`;

  // Execute additional processing if requested:

  // Adaptive Transcoding: generate multiple resolutions or formats.
  if (options.transcode) {
    await transcoding.transcodeVideo(inputPath, outputPath, options.transcode);
  }

  // Apply watermark overlay (logo/text), if specified.
  if (options.watermark) {
    await watermarking.applyWatermark(outputPath, options.watermark);
  }

  // Generate a thumbnail or GIF from the video.
  if (options.thumbnail) {
    await thumbnail.generateThumbnail(inputPath, options.thumbnail);
  }

  // Extract media metadata using FFprobe.
  if (options.metadata) {
    const metadata = await mediaAnalysis.getMediaInfo(inputPath);
    console.log('Media Metadata:', metadata);
  }

  // Execute the base FFmpeg processing command (e.g., trimming).
  return new Promise((resolve, reject) => {
    exec(processingCmd, (error, stdout, stderr) => {
      if (error) {
        console.error('FFmpeg processing error:', stderr);
        return reject(new Error(`FFmpeg error: ${stderr}`));
      }
      console.log('FFmpeg processing complete:', stdout);
      resolve(stdout);
    });
  });
};