const { exec } = require('child_process');
const winston = require('winston');

// Configure winston logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'git-operations.log' }),
  ],
});

// Execute Git commands with logging
const executeGitCommand = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        logger.error(`Git command failed: ${command}`, { error: stderr });
        return reject(error);
      }
      logger.info(`Git command executed: ${command}`, { output: stdout });
      resolve(stdout);
    });
  });
};

module.exports = { executeGitCommand };