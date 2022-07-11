import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      trim: true,
      required: [true, "Name is required!"],
      maxlength: [20, "Name cannot be longer than 20 characters!"],
    },
    email: {
      type: String,
      trim: true,
      unique: true,
    },
    phone: {
      type: Number,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Password is required!"],
      minlength: [6, "Password cannot be shorter than 6 characters"],
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: "Role",
    },
    cart: {
      type: Schema.Types.ObjectId,
      ref: "Shoe",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verifyToken: {
      type: String,
      default: "",
    },
    resetToken: {
      type: String,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: {
      type: Date,
      default: new Date(),
    },
  },
  {
    timestamps: true,
  }
);

export default model("User", userSchema);
