// services/thumbnail.js
//
// Generates a thumbnail image from a video at a specified timestamp.
const { exec } = require('child_process');
const ffmpegPath = require('ffmpeg-static');

exports.generateThumbnail = (inputPath, options = {}) => {
  return new Promise((resolve, reject) => {
    const time = options.time || 1;
    const outputImagePath = inputPath.replace('.mp4', '_thumbnail.jpg');
    const command = `${ffmpegPath} -ss ${time} -i "${inputPath}" -frames:v 1 -q:v 2 "${outputImagePath}"`;
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error('Thumbnail generation error:', stderr);
        return reject(new Error(`Thumbnail generation error: ${stderr}`));
      }
      console.log('Thumbnail generated:', stdout);
      resolve(outputImagePath);
    });
  });
};