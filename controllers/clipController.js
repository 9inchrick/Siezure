const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const clipSchema = new Schema({
  // ...existing fields...
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  comments: [commentSchema]
}, { timestamps: true });

const Clip = mongoose.model('Clip', clipSchema);

exports.likeClip = async (req, res) => {
  try {
    const { clipId } = req.params;
    const userId = req.user.id;

    // Logic to like the clip
    const clip = await Clip.findById(clipId);
    if (!clip) {
      return res.status(404).json({ message: 'Clip not found' });
    }

    if (clip.likes.includes(userId)) {
      return res.status(400).json({ message: 'You already liked this clip' });
    }

    clip.likes.push(userId);
    await clip.save();

    const io = req.app.get('io');
    io.emit('clipLiked', { clipId, userId });

    res.status(200).json({ message: 'Clip liked successfully', likes: clip.likes.length });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while liking the clip', error: error.message });
  }
};

exports.commentOnClip = async (req, res) => {
  try {
    const { clipId } = req.params;
    const { comment } = req.body;
    const userId = req.user.id;

    if (!comment || typeof comment !== 'string' || comment.trim().length === 0) {
      return res.status(400).json({ message: 'Comment cannot be empty' });
    }
    if (comment.length > 500) {
      return res.status(400).json({ message: 'Comment too long' });
    }

    // Logic to add a comment to the clip
    const clip = await Clip.findById(clipId);
    if (!clip) {
      return res.status(404).json({ message: 'Clip not found' });
    }

    const newComment = {
      userId,
      comment,
      createdAt: new Date(),
    };

    clip.comments.push(newComment);
    await clip.save();

    res.status(201).json({ message: 'Comment added successfully', comments: clip.comments });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while adding the comment', error: error.message });
  }
};

exports.blockUser = async (req, res) => {
  // Implement block logic
  res.json({ message: 'User blocked.' });
};

exports.reportUser = async (req, res) => {
  // Implement report logic
  res.json({ message: 'User reported.' });
};

module.exports = {
  likeClip: exports.likeClip,
  commentOnClip: exports.commentOnClip,
  blockUser: exports.blockUser,
  reportUser: exports.reportUser
};