const User = require('../models/User');

exports.listUsers = async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
};

exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.userId);
  res.json({ message: 'User deleted.' });
};