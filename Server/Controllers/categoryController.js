import mongoose from "mongoose";
import Category from "../Models/categoryModel.js";

export const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        const category = new Category({
            name,
            description,
            categoryAdmin: req.user._id
        });

        category.save();
        res.status(201).json({message: "Category created successfully"});
    } catch (error) {
        res.status(500).json({message: "Error creating category"});
    }
}

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find()
        
        res.status(200).json({message: "Success", categories});
    } catch (error) {
        res.status(500).json({mesage: "Error fetching categories"});
    }
}

export const updateCategory = async (req, res) => {
    try {
        const {categoryId} = req.params;
        const userId = req.user._id;


        const {name, description} = req.body;

        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            return res.status(400).json({ message: "Given ID is not in proper format" });
        }

        const categoryToEdit = await Category.findById(categoryId);

        if (!categoryToEdit) {
            return res.status(404).json({ message: "Brand not found" });
        }

        if (categoryToEdit.categoryAdmin.toString() !== userId.toString()) {
            return res.status(403).json({ message: "You are not authorized to update this category" });
        }

        await Category.findByIdAndUpdate(categoryId, {name, description});

        res.status(200).json({message: "Category updated successfuly"});

    } catch (error) {
        res.status(500).json({message: "Error updating category", error});
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const {categoryId} = req.params;
        const userId = req.user._id;



        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            return res.status(400).json({ message: "Given ID is not in proper format" });
        }

        const categoryToDelete = await Category.findById(categoryId);

        if (!categoryToDelete) {
            return res.status(404).json({ message: "Category not found" });
        }

        if (categoryToDelete.categoryAdmin.toString() !== userId.toString()) {
            return res.status(403).json({ message: "You are not authorized to update this category" });
        }

        await Category.findByIdAndDelete(categoryId);

        res.status(200).json({message: "Category deleted successfuly"});

    } catch (error) {
        res.status(500).json({message: "Error deleting category", error});
    }
}

