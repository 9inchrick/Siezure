const { executeGitCommand } = require('./gitLogger');

// Example: Fetch latest changes from the remote repository
const fetchLatestChanges = async () => {
  try {
    const output = await executeGitCommand('git pull origin main');
    console.log('Fetched latest changes:', output);
  } catch (error) {
    console.error('Failed to fetch changes:', error.message);
  }
};

// Example: Commit changes with a message
const commitChanges = async (message) => {
  try {
    await executeGitCommand('git add .');
    const output = await executeGitCommand(`git commit -m "${message}"`);
    console.log('Changes committed:', output);
  } catch (error) {
    console.error('Failed to commit changes:', error.message);
  }
};

module.exports = { fetchLatestChanges, commitChanges };