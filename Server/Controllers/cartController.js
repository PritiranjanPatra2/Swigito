import Cart from '../Models/cartModel.js';
import Products from '../Models/productModel.js';


export const addToCart = async (req, res) => {
    try {
        const {productId, quantity =1} = req.body;
        const userId = req.user._id;

        let cart = await Cart.findOne({user: userId});

        if(!cart){
            cart = new Cart({user: userId, items: []});
        }

        const existingItem = cart.items.find(
            (item) => item.product.toString() === productId
        );

        if(existingItem){
            existingItem.quantity += quantity;
        }
        else{
            cart.items.push({ product: productId, quantity: quantity});
        }

        cart.totalAmount = await calculateTotalAmount(cart.items);

        await cart.save();

        await cart.populate("items.product");
        res.status(200).send({ cart });
    } catch (error) {
        res.status(500).json({message: "Error adding to cart"});
    }
}

async function calculateTotalAmount(items){
    let total = 0;

    for(const item of items){
        const productToAdd = await Products.findOne(item.product);
        total += productToAdd.price * item.quantity;
    }

    return total;
}

export const getCart = async (req, res) => {
    try {
        const userId = req.user._id;
        const cart = await Cart.findOne({ user: userId}).populate("items.product");

        if(!cart){
            return res.status(200).send({cart: { items: [], totalAmount: 0}});
        }

        return res.status(200).send({ cart });
    } catch (error) {
        res.status(500).json({ message: "Error fetching cart"});
    }
}

export const updateQuantity = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user._id;
        
        if(quantity < 1){
            return res.status(400).json({message: "Quantity must be at least 1"});
        }

        const cart = await Cart.findOne({ user: userId});

        if(!cart){
            return res.status(404).json({message: "Cart not found"});
        }

        const cartItem = cart.items.find(
            (item) => item.product.toString() === productId
        );

        if(!cartItem){
            return res.status(404).json({ message: "Product not found in cart"});
        }

        cartItem.quantity = quantity;

        cart.totalAmount = await calculateTotalAmount(cart.items);

        await cart.save();

        await cart.populate("items.product");

        res.status(200).json({cart});
    } catch (error) {
        res.status(500).json({message: "Error updating quantity"});
    }
}

export const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.params;
        const userId = req.user._id;

        const cart = await Cart.findOne({ user:userId });

        if(!cart){
            return res.status(404).send({message: "Cart not found"});
        }

        cart.items = cart.items.filter(
            (item) => item.product.toString() !== productId
        );

        cart.totalAmount = await calculateTotalAmount(cart.items);

        await cart.save();
        await cart.populate("items.product");

        res.status(200).send({cart});
    } catch (error) {
        res.status(500).json({message: "Error removing from cart"});
    }
}