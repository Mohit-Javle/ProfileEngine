import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"]
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      unique: true,
      match: [/^\d{10,13}$/, "Phone must be 10–13 digits"]
    },

    role: {
      type: String,
      required: [true, "Role is required"]
    },

    experience: {
      type: String,
      required: [true, "Experience is required"]
    },

    availability: {
      type: String,
      required: [true, "Availability is required"]
    },

    skills: {
      type: String,
      required: [true, "Skills are required"],
      trim: true
    },

    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true
    },

    bio: {
      type: String,
      required: [true, "Bio is required"],
      minlength: [5, "Bio must be at least 5 characters"],
      trim: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Profile", profileSchema);
