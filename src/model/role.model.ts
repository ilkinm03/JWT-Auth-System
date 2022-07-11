import { Schema, model } from "mongoose";

const roleSchema = new Schema({
  role: {
    type: String,
    unique: true,
    uppercase: true,
    trim: true,
    required: true,
    immutable: true,
  },
});

export default model("Role", roleSchema);
