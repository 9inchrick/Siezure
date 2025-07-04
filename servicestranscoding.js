// services/transcoding.js
//
// Generates multiple output resolutions for adaptive streaming.
// This simplified example creates two resolutions (e.g., 720p and 480p) by invoking FFmpeg commands.

const { exec } = require('child_process');
const ffmpegPath = require('ffmpeg-static');

exports.transcodeVideo = (inputPath, outputPath, options = {}) => {
  return new Promise((resolve, reject) => {
    const resolutions = options.resolutions || [720, 480];
    const commands = resolutions.map(res => {
      const outputResPath = outputPath.replace('.mp4', `_${res}p.mp4`);
      return `${ffmpegPath} -i "${inputPath}" -vf "scale=-2:${res}" -c:v libx264 -preset veryfast -crf 23 -c:a aac "${outputResPath}"`;
    });
    const execCommand = commands.join(' && ');
    exec(execCommand, (error, stdout, stderr) => {
      if (error) {
        console.error('Transcoding error:', stderr);
        return reject(new Error(`Transcoding error: ${stderr}`));
      }
      console.log('Transcoding completed:', stdout);
      resolve(stdout);
    });
  });
};