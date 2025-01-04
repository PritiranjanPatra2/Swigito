import React, { useState } from 'react'
import instance from '../axiosConfig';

function AddBlog() {
    const [formData, setFormData] = useState({
        title: "",
        content: ""
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    async function handleSubmit(e){
       e.preventDefault();
       try {
        await instance.post("/blog/add", formData);
        setSuccess("Blog added successfully");
        setFormData({
           title:"",
           content: "",
           likes:"",
           comments:""
        });
        setError("");
       } catch (error) {
        setError(error.response?.data?.message || "Error adding blog");
       }
    }
  return (
    <form
    onSubmit={handleSubmit}
    className="space-y-4 max-w-md mx-auto p-4 min-h-screen"
  >
    <h2 className="text-2xl font-bold">Add Blog</h2>

    {error && <div className="text-red-500">{error}</div>}
    {success && <div className="text-green-500">{success}</div>}

    <div>
      <label className="block mb-1">Blog Title</label>
      <input
        type="text"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        className="w-full border-none outline-none p-2 rounded"
        required
      />
    </div>

    <div>
      <label className="block mb-1">Blog Content</label>
      <textarea
        type="text"
        value={formData.content}
        onChange={(e) =>
          setFormData({ ...formData, content: e.target.value })
        }
        className="w-full border-none outline-none p-2 rounded"
        required
      ></textarea>
    </div>

    <button
      type="submit"
      className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
    >
      Add Blog
    </button>
  </form>
  )
}

export default AddBlog
