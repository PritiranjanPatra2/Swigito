import express from 'express';
import { createCategory, deleteCategory, getCategories, updateCategory } from '../Controllers/categoryController.js';
import { protectRoute } from '../Middlewares/auth.js';

const categoryRouter = express.Router();

categoryRouter.post("/create", protectRoute, createCategory);
categoryRouter.get("/", getCategories);
categoryRouter.put("/edit/:categoryId", protectRoute, updateCategory)
categoryRouter.delete("/delete/:categoryId", protectRoute, deleteCategory);

export default categoryRouter;