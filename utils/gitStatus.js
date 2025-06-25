const { executeGitCommand } = require('./gitLogger');

const getGitStatus = async () => {
  try {
    const status = await executeGitCommand('git status');
    console.log('Current Git Status:', status);
  } catch (error) {
    console.error('Failed to retrieve Git status:', error.message);
  }
};

module.exports = { getGitStatus };