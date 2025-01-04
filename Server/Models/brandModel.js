import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    brandOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    description: {
        type: String,
        required: true
    }
},
{timestamps: true});

const Brand = mongoose.model("brand", brandSchema);
export default Brand;