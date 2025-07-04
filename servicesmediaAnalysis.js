// services/mediaAnalysis.js
//
// Extracts media metadata using FFprobe. We use the ffprobe-static package to obtain the FFprobe path.
const { exec } = require('child_process');
const ffprobePath = require('ffprobe-static').path;

exports.getMediaInfo = (inputPath) => {
  return new Promise((resolve, reject) => {
    const command = `${ffprobePath} -v quiet -print_format json -show_format -show_streams "${inputPath}"`;
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error('FFprobe error:', stderr);
        return reject(new Error(`FFprobe error: ${stderr}`));
      }
      try {
        const metadata = JSON.parse(stdout);
        resolve(metadata);
      } catch (err) {
        reject(new Error('Error parsing metadata'));
      }
    });
  });
};