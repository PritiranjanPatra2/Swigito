import express from 'express';
import { protectRoute } from '../Middlewares/auth.js';
import { allBlogs, commentOnBlog, createBlog, deleteBlog, deleteComment, editComment, likeBlog, updateBlog } from '../Controllers/blogController.js';

const blogRouter = express.Router();

blogRouter.post("/add", protectRoute, createBlog);
blogRouter.post('/like/:blogId', protectRoute, likeBlog);
blogRouter.post('/comment/:blogId', protectRoute, commentOnBlog);
blogRouter.get('/', allBlogs);
blogRouter.put("/edit/:blogId", protectRoute, updateBlog);
blogRouter.delete('/delete/:blogId', protectRoute, deleteBlog);
blogRouter.delete("/:blogId/comment/delete/:commentId", protectRoute, deleteComment);
blogRouter.put("/:blogId/comment/edit/:commentId", protectRoute, editComment);

export default blogRouter;