import mongoose, { ObjectId } from "mongoose";

const { Schema } = mongoose

export interface IPost {
  _id: ObjectId
  title: string;
  desc: string;
  img: string;
  content: string
  username: string
}

const postSchema = new Schema<IPost>({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
},
  { timestamps: true }
)

export default mongoose.models.Post || mongoose.model("Post", postSchema)