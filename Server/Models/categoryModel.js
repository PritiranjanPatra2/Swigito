import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    categoryAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    description: {
        type: String,
        required: true
    }
},
{timestamps: true});

const Category = mongoose.model("category", categorySchema);
export default Category;