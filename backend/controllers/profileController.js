const Profile = require('../models/Profile');

// @desc    Get profile (public)
const getProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create({});
    }
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update profile (admin only)
const updateProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create({});
    }

    const { name, role, pitch } = req.body;
    profile.name = name ?? profile.name;
    profile.role = role ?? profile.role;
    profile.pitch = pitch ?? profile.pitch;

    if (req.file) {
      profile.profilePicture = req.file.path;
    }

    const updatedProfile = await profile.save();
    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getProfile, updateProfile };