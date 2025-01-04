import mongoose from "mongoose";
import Blog from "../Models/blogModel.js";

export const createBlog = async (req, res) => {
   try {
    const {title, content} = req.body;
    const blog = new Blog({
        title,
        content,
        author: req.user.username,
        authorId: req.user._id,
        likes: [],
        comments: [],
    });

    await blog.save();
    res.status(201).json({message: "Blog created successfully", blog});
   } catch (error) {
    res.status(500).json({message: "Error creating blog", error});
   }
}

export const likeBlog = async (req, res) => {
    try {
        const { blogId } = req.params;
        const userId = req.user._id;

        const blog = await Blog.findById(blogId);

        if(!blog) {
            return res.status(404).json({message: "Blog not found"});
        }

        if(blog.likes.includes(userId)){
            blog.likes = blog.likes.filter((id) => id.toString() !== userId.toString())
        }
        else{
            blog.likes.push(userId);
        }

        await blog.save();
        await blog.populate("likes");

        res.status(200).json({message: "Blog updated successfully", blog});
    } catch (error) {
        res.status(500).json({ message: "Error liking/unliking blog", error });
    }
}

export const commentOnBlog = async (req, res) => {
    try {
        const { blogId } = req.params;
        const { comment } = req.body;
        
        const blog = await Blog.findById(blogId);

        if(!blog){
            return res.status(404).json({message: "Blog not found"});
        };

        blog.comments.push({
            user:  req.user.username, 
            userId: req.user._id,
            comment
        });

        await blog.save();
        await  blog.populate("comments.comment");

        res.status(201).json({message: "Comment added successfully", blog});
    } catch (error) {
        res.status(500).json({message: "Error adding comment", error })
    }
}

export const allBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json({message: "Success", blogs});
    } catch (error) {
        res.status(500).json({message: "Error fetching blogs", error});
    }
}


export const deleteBlog = async (req, res) => {
    try {
        const { blogId } = req.params;
        const userId = req.user._id;

        if (!mongoose.Types.ObjectId.isValid(blogId)) {
            return res.status(400).json({ message: "Given ID is not in proper format" });
        }

        const blogToDelete = await Blog.findById(blogId);

        if (!blogToDelete) {
            return res.status(404).json({ message: "Blog not found" });
        }

        if (blogToDelete.author.toString() !== userId.toString()) {
            return res.status(403).json({ message: "You are not authorized to delete this blog" });
        }

       
        await Blog.findByIdAndDelete(blogId);

        res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
        console.error("Error deleting blog:", error);
        res.status(500).json({ message: "Error deleting blog", error: error.message });
    }
};

export const updateBlog = async (req, res) => {
    try {
        const { blogId } = req.params;
        const userId = req.user._id;
        const {title, content} = req.body;

        if (!mongoose.Types.ObjectId.isValid(blogId)) {
            return res.status(400).json({ message: "Given ID is not in proper format" });
        }

        const blogToEdit = await Blog.findById(blogId);

        if (!blogToEdit) {
            return res.status(404).json({ message: "Blog not found" });
        }

        if (blogToEdit.authorId.toString() !== userId.toString()) {
            return res.status(403).json({ message: "You are not authorized to update this blog" });
        }

        await Blog.findByIdAndUpdate(blogId, {title, content});

        res.status(200).json({message: "Blog updated successfuly"});
    } catch (error) {
        res.status(500).json({message: "Error updating blog"});
    }  
}


export const deleteComment = async (req, res) => {
    try {
        const { blogId, commentId } = req.params;
        const userID = req.user._id;

        const blog = await Blog.findById(blogId);

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        const comment = blog.comments.id(commentId);

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        if (comment.userId.toString() !== userID.toString()) {
            return res.status(403).json({ message: "You are not authorized to delete this comment" });
        }

        blog.comments = blog.comments.filter((c) => c._id.toString() !== commentId);

        await blog.save();

        res.status(200).json({ message: "Comment deleted successfully", comments: blog.comments });
    } catch (error) {
        console.error("Error deleting comment:", error);
        res.status(500).json({ message: "Error deleting comment", error });
    }
};

export const editComment = async (req, res) => {
    try {
        const { blogId, commentId } = req.params;
        const userID = req.user._id;

        const { comment: updatedComment } = req.body;

        const blog = await Blog.findById(blogId);

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        const comment = blog.comments.id(commentId);

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        if (comment.userId.toString() !== userID.toString()) {
            return res.status(403).json({ message: "You are not authorized to edit this comment" });
        }

        comment.comment = updatedComment;

        await blog.save();

        res.status(200).json({ message: "Comment edited successfully", comments: blog.comments });
    } catch (error) {
        console.error("Error editing comment:", error);
        res.status(500).json({ message: "Error editing comment", error });
    }
};
