import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    expiryDate: {
      type: Date,
      default: () => new Date(+new Date() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    },
    minPrice: { type: Number },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    discountPercentage: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    usedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }]
},{timestamps:true}
);

const Coupon = mongoose.model("coupon", couponSchema);
export default Coupon;