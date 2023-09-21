import mongoose from "mongoose";

const { Schema } = mongoose

interface User {
  name: string;
  email: string;
  password: string
}

const userSchema = new Schema<User>({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
},
  { timestamps: true }
)

export default mongoose.models.User || mongoose.model("User", userSchema)