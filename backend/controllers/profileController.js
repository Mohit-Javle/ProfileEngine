const Profile = require("../models/Profile");

exports.createProfile = async (req, res) => {
  try {
    const profile = await Profile.create(req.body);
    res.status(201).json(profile);
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json({
        message: "Email or Phone number already exists"
      });
    } else {
      res.status(500).json({ message: "Server error" });
    }
  }
};

exports.getProfiles = async (req, res) => {
  const profiles = await Profile.find();
  res.json(profiles);
};
