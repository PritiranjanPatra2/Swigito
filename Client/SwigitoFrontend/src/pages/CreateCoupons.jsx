import React, { useState } from 'react'
import instance from '../axiosConfig';

function CreateCoupons() {
    const [formData, setFormData] = useState({
        name: "",
        code: "",
        minPrice: "",
        discountPercentage: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    async function handleSubmit(e){
       e.preventDefault();
       try {
        await instance.post("/coupon/create", formData);
        setSuccess("Coupon created successfully");
        setFormData({
            name: "",
            code: "",
            minPrice: "",
            discountPercentage:""
        });
        setError("");
       } catch (error) {
        setError(error.response?.data?.message || "Error creating coupon");
       }
    }
  return (
    <form
    onSubmit={handleSubmit}
    className="space-y-4 max-w-md mx-auto p-4 min-h-screen"
  >
    <h2 className="text-2xl font-bold">Create Coupon</h2>

    {error && <div className="text-red-500">{error}</div>}
    {success && <div className="text-green-500">{success}</div>}

    <div>
      <label className="block mb-1">Coupon Name</label>
      <input
        type="text"
        value={formData.name}
        placeholder='Coupon Name'
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="w-full  p-2 rounded border-none outline-none"
        required
      />
    </div>

    <div>
      <label className="block mb-1">Coupon Code</label>
      <input
        type="text"
        value={formData.code}
        placeholder='Coupon Code'
        onChange={(e) =>
          setFormData({ ...formData, code: e.target.value.toUpperCase() })
        }
        className="w-full  p-2 rounded border-none outline-none"
        required
      />
    </div>

    <div>
      <label className="block mb-1">Minimum Price</label>
      <input
        type="number"
        value={formData.minPrice}
        placeholder='Minimum Price'
        onChange={(e) =>
          setFormData({ ...formData, minPrice: e.target.value })
        }
        className="w-full p-2 rounded border-none outline-none"
        required
      />
    </div>

    <div>
      <label className="block mb-1">Discount Percentage</label>
      <input
        type="number"
        value={formData.discountPercentage}
        placeholder='Discount Percentage'
        onChange={(e) =>
          setFormData({ ...formData, discountPercentage: e.target.value })
        }
        className="w-full  p-2 rounded border-none outline-none"
        min="0"
        max="100"
        required
      />
    </div>

    <button
      type="submit"
      className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
    >
      Create Coupon
    </button>
  </form>
  )
}

export default CreateCoupons
