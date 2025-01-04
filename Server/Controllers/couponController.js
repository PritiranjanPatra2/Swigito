import mongoose from 'mongoose';
import Coupon from '../Models/couponModel.js';
import Cart from '../Models/cartModel.js';

export const createCoupon = async (req, res) => {
    try {
        const { name, code, discountPercentage, minPrice } = req.body;
        const userId = req.user._id;

        const existingCoupon = await Coupon.findOne({ code });
        if(existingCoupon){
            return res.status(400).json({message: "Coupon code already exists"});
        }

        const coupon = new Coupon({
            name,
            code,
            minPrice,
            discountPercentage,
            seller: req.user._id,
        });

        await coupon.save();
        res.status(201).json({message: "Coupon created successfully", coupon});
    } catch (error) {
        res.status(500).send({ message: "Error Adding Coupon" });
    }
}


export const fetchCoupon = async (req, res) => {
    try {
        const userId = req.user._id;

        const coupons = await Coupon.find({ seller: userId });

        if(!coupons){
            return res.status(404).send({message: "No coupons found for this seller"});
        }

        res.send(coupons);
    } catch (error) {
        res.status(500).json({ message: "Error fetching coupon" });
    }
}

export const applyCoupon = async (req, res) => {
    try {
        const { code } = req.body;
        const userId = req.user._id;

        const coupon = await Coupon.findOne({ code });

        if(!coupon){
            return res.status(404).json({message: "Invalid coupon code"});
        }

        if(coupon.expiryDate < new Date()){
            return res.status(400).json({ message: "Coupon has expired"});
        }

        if (coupon.usedBy.includes(userId)) {
            return res.status(400).json({ message: "Coupon already used by this user" });
        }

        const cart = await Cart.findOne({ user: userId}).populate("items.product");

        if(!cart || cart.items.length === 0){
            return res.status(400).json({ message: "Cart is empty"});
        }

        if(cart.totalAmount < coupon.minPrice){
            return res.status(400).json({
                message: `Minimum purchase amount of ₹${coupon.minPrice} required`,
              }); 
        }

        const discountAmount = (cart.totalAmount * coupon.discountPercentage) / 100;
        const finalAmount = cart.totalAmount - discountAmount;

        cart.totalAmount = finalAmount;
        await cart.save();

        coupon.usedBy.push(userId);
        await coupon.save();
    
        res.status(200).json({
          message: "Coupon applied successfully",
          discountAmount,
          finalAmount,
          cart,
        });
    } catch (error) {
        res.status(500).json({message: "Error applying coupon"});
    }
}