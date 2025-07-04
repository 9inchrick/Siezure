// services/watermarking.js
//
// Applies a watermark overlay onto a video using FFmpeg.
const { exec } = require('child_process');
const ffmpegPath = require('ffmpeg-static');

exports.applyWatermark = (videoPath, options = {}) => {
  return new Promise((resolve, reject) => {
    if (!options.image) {
      return reject(new Error("Watermark image is required."));
    }
    let overlay;
    switch (options.position) {
      case 'top-right': overlay = 'main_w-overlay_w-10:10'; break;
      case 'bottom-left': overlay = '10:main_h-overlay_h-10'; break;
      case 'bottom-right': overlay = 'main_w-overlay_w-10:main_h-overlay_h-10'; break;
      default: overlay = '10:10';
    }
    const outputPath = videoPath.replace('.mp4', '_watermarked.mp4');
    const command = `${ffmpegPath} -i "${videoPath}" -i "${options.image}" -filter_complex "overlay=${overlay}" -codec:a copy "${outputPath}"`;
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error('Watermarking error:', stderr);
        return reject(new Error(`Watermarking error: ${stderr}`));
      }
      console.log('Watermarking completed:', stdout);
      resolve(stdout);
    });
  });
};