// controllers/clipController.js
//
// This controller provides CRUD operations for clip management in the app.
// It allows the creation of a new clip (typically triggered by the auto-clipping functionality),
// retrieving a clip by its ID, listing all clips for the authenticated user,
// updating clip details, and deleting clips. It is designed for integration with routes
// that protect endpoints via authentication (i.e., req.user is populated).

const Clip = require('../models/Clip');

// Create a new clip based on stream data.
// Expects in req.body: streamId, title, clipUrl, startTime, endTime, and optionally description.
exports.createClip = async (req, res) => {
  try {
    const { streamId, title, clipUrl, startTime, endTime, description } = req.body;

    // Validate required fields.
    if (!streamId || !title || !clipUrl || !startTime || !endTime) {
      return res.status(400).json({
        message:
          "Missing required fields. Please provide streamId, title, clipUrl, startTime, and endTime."
      });
    }

    // Create a new clip entry.
    const newClip = new Clip({
      user: req.user.id, // Assumes req.user is set by authentication middleware.
      stream: streamId,
      title,
      clipUrl,
      startTime,
      endTime,
      description: description || ""
    });

    await newClip.save();

    return res.status(201).json({
      message: "Clip created successfully.",
      clip: newClip
    });
  } catch (error) {
    console.error("Error creating clip:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// Retrieve details of a specific clip using its identifier.
// This endpoint returns populated information about the clip.
exports.getClip = async (req, res) => {
  try {
    const { clipId } = req.params;

    const clip = await Clip.findById(clipId)
      .populate('user', 'username email')
      .populate('stream', 'title');

    if (!clip) {
      return res.status(404).json({ message: "Clip not found." });
    }

    return res.status(200).json({ clip });
  } catch (error) {
    console.error("Error retrieving clip:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// Retrieve all clips created by the authenticated user.
// Results are sorted by creation date, newest first.
exports.getUserClips = async (req, res) => {
  try {
    const clips = await Clip.find({ user: req.user.id }).sort({ createdAt: -1 });
    return res.status(200).json({ clips });
  } catch (error) {
    console.error("Error retrieving user clips:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// Update a clip's title and/or description. Only the owner of the clip may perform updates.
// Expects in req.body: title and/or description.
exports.updateClip = async (req, res) => {
  try {
    const { clipId } = req.params;
    const { title, description } = req.body;

    const clip = await Clip.findById(clipId);
    if (!clip) {
      return res.status(404).json({ message: "Clip not found." });
    }

    // Verify that the authenticated user is the owner of the clip.
    if (clip.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to update this clip." });
    }

    // Update fields if provided.
    if (title) clip.title = title;
    if (description) clip.description = description;

    await clip.save();
    return res.status(200).json({
      message: "Clip updated successfully.",
      clip
    });
  } catch (error) {
    console.error("Error updating clip:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// Delete a clip. Only the owner of the clip is allowed to delete it.
exports.deleteClip = async (req, res) => {
  try {
    const { clipId } = req.params;

    const clip = await Clip.findById(clipId);
    if (!clip) {
      return res.status(404).json({ message: "Clip not found." });
    }

    // Verify ownership.
    if (clip.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete this clip." });
    }

    await clip.remove();
    return res.status(200).json({ message: "Clip deleted successfully." });
  } catch (error) {
    console.error("Error deleting clip:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};