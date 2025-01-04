import mongoose from "mongoose";
import Brand from "../Models/brandModel.js";

export const createBrand = async (req, res) => {
    try {
        const { name, description } = req.body;

        const brand = new Brand({
            name,
            description,
            brandOwner: req.user._id
        });

        brand.save();
        res.status(201).json({message: "Brand created successfully"});
    } catch (error) {
        res.status(500).json({message: "Error creating brand"});
    }
}

export const getBrands = async (req, res) => {
    try {
        const brands = await Brand.find()
        
        res.status(200).json({message: "Success", brands});
    } catch (error) {
        res.status(500).json({mesage: "Error fetching brands"});
    }
}

export const updateBrand = async (req, res) => {
    try {
        const {brandId} = req.params;
        const userId = req.user._id;


        const {name, description} = req.body;

        if (!mongoose.Types.ObjectId.isValid(brandId)) {
            return res.status(400).json({ message: "Given ID is not in proper format" });
        }

        const brandToEdit = await Brand.findById(brandId);

        if (!brandToEdit) {
            return res.status(404).json({ message: "Brand not found" });
        }

        if (brandToEdit.brandOwner.toString() !== userId.toString()) {
            return res.status(403).json({ message: "You are not authorized to update this brand" });
        }

        await Brand.findByIdAndUpdate(brandId, {name, description});

        res.status(200).json({message: "Brand updated successfuly"});

    } catch (error) {
        res.status(500).json({message: "Error updating brand", error});
    }
}

export const deleteBrand = async (req, res) => {
    try {
        const {brandId} = req.params;
        const userId = req.user._id;



        if (!mongoose.Types.ObjectId.isValid(brandId)) {
            return res.status(400).json({ message: "Given ID is not in proper format" });
        }

        const brandToDelete = await Brand.findById(brandId);

        if (!brandToDelete) {
            return res.status(404).json({ message: "Brand not found" });
        }

        if (brandToDelete.brandOwner.toString() !== userId.toString()) {
            return res.status(403).json({ message: "You are not authorized to update this brand" });
        }

        await Brand.findByIdAndDelete(brandId);

        res.status(200).json({message: "Brand deleted successfuly"});

    } catch (error) {
        res.status(500).json({message: "Error deleting brand", error});
    }
}

