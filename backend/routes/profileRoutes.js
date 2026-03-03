import express from "express";
import Profile from "../models/Profile.js";

const router = express.Router();

/* ===========================
   TEST ROUTE
=========================== */
router.get("/ping", (req, res) => {
  res.send("Profiles route is working");
});

/* ===========================
   GET ALL PROFILES (WITH ORDERS)
=========================== */
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.aggregate([
      {
        $lookup: {
          from: "orders",
          localField: "email",
          foreignField: "email",
          as: "orders"
        }
      }
    ]);
    res.json(profiles);
  } catch (error) {
    console.error("GET ERROR:", error);
    res.status(500).json({ message: "Failed to fetch profiles" });
  }
});

/* ===========================
   CREATE PROFILE
=========================== */
router.post("/", async (req, res) => {
  try {
    const profile = new Profile(req.body);
    const savedProfile = await profile.save();
    res.status(201).json(savedProfile);
  } catch (error) {
    // 🔴 Mongoose validation error
    if (error.name === "ValidationError") {
      const errors = {};
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });

      return res.status(400).json({
        type: "validation",
        errors
      });
    }

    // 🔴 Duplicate key error (email / phone)
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(409).json({
        field,
        message: `${field} already exists`
      });
    }

    console.error("POST ERROR:", error);
    res.status(500).json({ message: "Failed to save profile" });
  }
});

/* ===========================
   UPDATE PROFILE (DUPLICATE SAFE)
=========================== */
router.put("/:id", async (req, res) => {
  try {
    const updatedProfile = await Profile.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true // 🔥 IMPORTANT
      }
    );

    res.json(updatedProfile);
  } catch (error) {
    // 🔴 Validation error
    if (error.name === "ValidationError") {
      const errors = {};
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });

      return res.status(400).json({
        type: "validation",
        errors
      });
    }

    // 🔴 Duplicate key error (email / phone)
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(409).json({
        field,
        message: `${field} already exists`
      });
    }

    console.error("UPDATE ERROR:", error);
    res.status(500).json({ message: "Update failed" });
  }
});

/* ===========================
   DELETE PROFILE
=========================== */
router.delete("/:id", async (req, res) => {
  try {
    await Profile.findByIdAndDelete(req.params.id);
    res.json({ message: "Profile deleted" });
  } catch (error) {
    console.error("DELETE ERROR:", error);
    res.status(500).json({ message: "Delete failed" });
  }
});

export default router;
