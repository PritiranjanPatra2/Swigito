import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { AiFillLike } from "react-icons/ai";
import instance from "../axiosConfig";

function Blogs() {
    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState(null);
    const [comment, setComment] = useState("");
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [updatedComment, setUpdatedComment] = useState("");

    useEffect(() => {
        fetchBlogs();
    }, []);

    async function fetchBlogs() {
        try {
            const response = await instance.get("/blog");
            setBlogs(response.data.blogs);
            setError(null);
        } catch (error) {
            setError(error.response?.data?.message || "Failed to fetch blogs.");
        }
    }

    async function handleLike(blogId) {
        try {
            const response = await instance.post(`/blog/like/${blogId}`);
            setBlogs((prevBlogs) =>
                prevBlogs.map((blog) =>
                    blog._id === blogId
                        ? { ...blog, likes: response.data.blog.likes || [] }
                        : blog
                )
            );
        } catch (error) {
            console.error("Failed to like the blog:", error.response?.data?.message || error.message);
        }
    }

    async function handleComment(blogId, e) {
        e.preventDefault();
        try {
            const response = await instance.post(`/blog/comment/${blogId}`, { comment });
            setBlogs((prevBlogs) =>
                prevBlogs.map((blog) =>
                    blog._id === blogId
                        ? { ...blog, comments: response.data.blog.comments || [] }
                        : blog
                )
            );
            setComment("");
        } catch (error) {
            console.error("Failed to add comment:", error.response?.data?.message || error.message);
        }
    }

    async function handleDeleteComment(blogId, commentId) {
        try {
            const response = await instance.delete(`/blog/${blogId}/comment/delete/${commentId}`);
            setBlogs((prevBlogs) =>
                prevBlogs.map((blog) =>
                    blog._id === blogId
                        ? { ...blog, comments: response.data.comments || [] }
                        : blog
                )
            );
        } catch (error) {
            console.error("Failed to delete comment:", error.response?.data?.message || error.message);
        }
    }

    async function handleEditComment(blogId, commentId) {
        try {
            const response = await instance.put(`/blog/${blogId}/comment/edit/${commentId}`, {
                comment: updatedComment,
            });
            setBlogs((prevBlogs) =>
                prevBlogs.map((blog) =>
                    blog._id === blogId
                        ? { ...blog, comments: response.data.comments || [] }
                        : blog
                )
            );
            setEditingCommentId(null); // Exit edit mode
            setUpdatedComment(""); // Clear the input
        } catch (error) {
            console.error("Failed to edit comment:", error.response?.data?.message || error.message);
        }
    }

    return (
        <div className="min-h-screen w-full p-6">
            <div className="flex justify-end mb-4">
                <Link to="/blogs/add" className="bg-blue-500 text-white px-8 py-2 rounded">
                    Add Blog
                </Link>
            </div>
            <div className="w-full py-4 px-2 flex flex-col items-center gap-4">
                <h3 className="font-bold text-2xl">Blogs</h3>
                {error && <p className="text-red-500">{error}</p>}
                {blogs.length === 0 && !error && <p>No blogs available.</p>}
                {blogs.length > 0 &&
                    blogs.map((blog) => (
                        <div
                            key={blog._id}
                            className="p-4 w-full max-w-3xl flex flex-col gap-4 shadow-lg bg-white rounded"
                        >
                            <h3 className="text-lg font-semibold">{blog.title}</h3>
                            <p className="text-gray-600">{blog.content}</p>
                            <div className="text-sm text-gray-500">
                                By {blog.author || "Unknown"} on{" "}
                                {new Date(blog.createdAt).toLocaleDateString()}
                            </div>
                            <div className="flex flex-col">
                                    <AiFillLike onClick={() => handleLike(blog._id)}/> <p>{(blog.likes || []).length || 0}</p>
                            </div>
                            <div className="mt-2">
                                <h4 className="font-semibold">Comments</h4>
                                <ul className="mt-2">
                                    {(blog.comments || []).length > 0 ? (
                                        blog.comments.map((comment) => (
                                            <div key={comment._id} className="flex flex-col gap-2">
                                                {editingCommentId === comment._id ? (
                                                    <div className="flex gap-2">
                                                        <input
                                                            type="text"
                                                            value={updatedComment}
                                                            onChange={(e) =>
                                                                setUpdatedComment(e.target.value)
                                                            }
                                                            className="border p-2 flex-1 rounded"
                                                            placeholder="Edit your comment..."
                                                        />
                                                        <button
                                                            onClick={() =>
                                                                handleEditComment(blog._id, comment._id)
                                                            }
                                                            className="bg-green-500 text-white px-4 py-2 rounded"
                                                        >
                                                            Save
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                setEditingCommentId(null);
                                                                setUpdatedComment("");
                                                            }}
                                                            className="bg-red-500 text-white px-4 py-2 rounded"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="flex gap-3">
                                                        <li className="text-gray-700">{comment.comment}</li>
                                                        <p className="text-gray-500">By {comment.user}</p>
                                                        <div className="flex gap-2">
                                                            <button
                                                                onClick={() => {
                                                                    setEditingCommentId(comment._id);
                                                                    setUpdatedComment(comment.comment);
                                                                }}
                                                            >
                                                                <CiEdit />
                                                            </button>
                                                            <button
                                                                onClick={() =>
                                                                    handleDeleteComment(blog._id, comment._id)
                                                                }
                                                            >
                                                                <MdDelete />
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <p>No comments yet</p>
                                    )}
                                </ul>
                                <form
                                    onSubmit={(e) => handleComment(blog._id, e)}
                                    className="mt-2 flex gap-2"
                                >
                                    <input
                                        type="text"
                                        name="comment"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        placeholder="Add a comment..."
                                        className="border p-2 flex-1 rounded"
                                    />
                                    <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                                        Submit
                                    </button>
                                </form>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default Blogs;
