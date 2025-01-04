
import Cart from "../Models/cartModel.js";
import {Order} from "../Models/orderModel.js"


export async function createOrder(req, res){
    const userId = req.user._id;
    const { paymentIntentId } = req.body;

    try {
        const cart = await Cart.findOne({ user: userId}).populate("items.product");

        if(!cart || cart.items.length === 0){
            return res.status(400).json({error: "Cart is empty"});
        }

        const order = new Order({
            user: userId,
            items:  cart.items.map((item) => ({
                product: item.product._id,
                quantity: item.quantity,
                price: item.product.price,
            })),
            totalAmount: cart.totalAmount,
            shippingAddress: req.body.shippingAddress || {},
            paymentStatus : "completed",
        });

        await order.save();

        cart.items = [];
        cart.totalAmount = 0;
        await cart.save();

        res.status(201).json({ message: "Order placed successfully", order});
    } catch (error) {
        res.status(500).send({message: "Error placing the order"});
    }
}