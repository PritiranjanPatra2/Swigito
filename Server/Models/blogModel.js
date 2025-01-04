import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    user: { type: String, ref: "user", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user"},
    comment: { type: String, required: true },
},
{timestamps: true});

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, ref: "user", required: true },
    authorId: {type: mongoose.Schema.Types.ObjectId, ref: "user"},
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    comments: [commentSchema],
}, 
{timestamps: true});

const Blog = mongoose.model("blog", blogSchema);

export default Blog;