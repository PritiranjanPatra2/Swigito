import React, { useState } from 'react'
import useCart from '../hooks/useCart';
import instance from '../axiosConfig';

function ApplyCoupon() {
    const [couponCode, setCouponCode] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { modifyCart } = useCart();

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        try {
          const response = await instance.post("/coupon/apply", {
            code: couponCode,
          });
          modifyCart(response.data);
          setCouponCode("");
        } catch (error) {
          setError(error.response?.data?.message || "Error applying coupon");
        } finally {
          setLoading(false);
        }
      }
    

  return (
    <form action="" className="flex gap-2 items-start" onSubmit={handleSubmit}>
      <div className="flex-1">
        <input
          type="text"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
          placeholder="Enter coupon code"
          className="w-full border p-2 rounded border-none outline-none"
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
      <button
        type="submit"
        disabled={loading || !couponCode}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
      >
        {loading ? "Applying..." : "Apply"}
      </button>
    </form>
  )
}

export default ApplyCoupon
