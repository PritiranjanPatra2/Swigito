import React, { useEffect, useState } from 'react';
import useCart from '../hooks/useCart.jsx';
import { LiaRupeeSignSolid } from 'react-icons/lia';
import { Link, useNavigate } from 'react-router-dom';
import ApplyCoupon from '../components/ApplyCoupon.jsx';

function Cart() {
  const { cart, fetchCart, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchCart();
  }, []);

  function handleAddressChange(e) {
    setAddress(e.target.value);
  }

  function proceedToCheckout() {
    if (address.trim() === '') {
      setMessage('Please enter your address.');
    } else {
      setMessage('');
      navigate('/checkout');
    }
  }

  if (!cart || cart?.items?.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h2>Your cart is empty</h2>
        <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-8 py-4">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items - Left Side */}
        <div className="lg:col-span-2 space-y-4">
          {cart.items.map((item) => (
            <div
              key={item.product._id}
              className="border rounded-lg p-4 flex gap-4"
            >
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex-1 space-y-2">
                <h3 className="font-semibold">{item.product.name}</h3>
                <p className="text-gray-600">{item.product.brand}</p>
                <p className="flex items-center font-bold">
                  <LiaRupeeSignSolid />
                  {item.product.price}
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border rounded">
                    <button
                      onClick={() =>
                        updateQuantity(item.product._id, item.quantity - 1)
                      }
                      className="px-3 py-1 border-r"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-4">{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item.product._id, item.quantity + 1)
                      }
                      className="px-3 py-1 border-l"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.product._id)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary - Right Side */}
        <div className="lg:col-span-1">
          <div className="border rounded-lg p-4 sticky top-4">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <ApplyCoupon />

            <div className="space-y-2 pb-4 border-b">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="flex items-center font-bold">
                  <LiaRupeeSignSolid />
                  {cart.totalAmount.toFixed(2)}
                </span>
              </div>

              {cart.discountAmount > 0 && (
                <div className="flex justify-between text-green-500">
                  <span>Discount</span>
                  <span>- {cart.discountAmount}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
            </div>
            <div className="flex justify-between py-4 font-bold">
              <span>Total</span>
              <span className="flex items-center">
                <LiaRupeeSignSolid />
                {Math.round(cart.totalAmount)}
              </span>
            </div>

            {/* Address field */}
            <div className="mb-4">
              <textarea
                placeholder="Enter your address"
                value={address}
                onChange={handleAddressChange}
                className="w-full p-2 border rounded"
                rows="4"
              />
              {message && (
                <p className="text-red-500 text-sm mt-2">{message}</p>
              )}
            </div>

            <button
              className={`w-full py-2 rounded ${
                !address.trim() ? 'bg-gray-500' : 'bg-blue-500'
              } text-white font-bold`}
              onClick={proceedToCheckout}
              disabled={!address.trim()}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
