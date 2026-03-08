import mongoose from "mongoose";
const userSchma = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["applicant", "recruiter"],
      required: true,
    },
    profile: {
      bio: { type: String },
      designation: { 
        type: String,
        default: "" 
      },
      profilePicture: {
        type: String,
        default: "",
      },
      skills: [String],
      resume: { type: String },
      companyName: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    },
  },
  { timestamps: true, versionKey: false },
);
export const User = mongoose.model("User", userSchma);
