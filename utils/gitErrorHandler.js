const handleGitError = (error) => {
  if (error.message.includes('not a git repository')) {
    console.error('Error: This directory is not a Git repository.');
  } else if (error.message.includes('merge conflict')) {
    console.error('Error: Merge conflict detected. Resolve conflicts before proceeding.');
  } else {
    console.error('Git Error:', error.message);
  }
};

module.exports = { handleGitError };