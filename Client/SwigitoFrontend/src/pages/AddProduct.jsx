import { useState, useEffect } from "react";
import instance from "../axiosConfig";

function AddProduct() {
  const [data, setData] = useState({
    name: "",
    brand: "",
    category: "",
    price: "",
    description: "",
    attributes: [{ name: "", value: "" }],
    inStock: "",
    inventory: "",
    image: "",
  });

  const [message, setMessage] = useState("")

  function handleAttributeChange(index, field, value) {
    const newAttributes = data.attributes.map((attr, i) => {
      if (i === index) {
        return { ...attr, [field]: value };
      }
      return attr;
    });

    setData({
      ...data,
      attributes: newAttributes,
    });
  }

  function addNewAttribute() {
    setData({
      ...data,
      attributes: [...data.attributes, { name: "", value: "" }],
    });
  }

  function handleChange(e) {
    if (e.target.name === "image") {
      setData({ ...data, [e.target.name]: e.target.files[0] });
    } else {
      const { name, value } = e.target;
      setData({ ...data, [name]: value });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // console.log(data);
    const formdata = new FormData();
    // const finalData = Object.fromEntries(formdata.entries());

    formdata.append("name", data.name);
    formdata.append("price", data.price);
    formdata.append("category", data.category);
    formdata.append("brand", data.brand);
    formdata.append("description", data.description);
    formdata.append("attributes", JSON.stringify(data.attributes));
    formdata.append("inStock", data.inStock);
    formdata.append("inventory", data.inventory);
    formdata.append("image", data.image);

    const response = await instance.post("/product/add", formdata);
    setMessage(response.data.message)
    console.log(response);
    setData({
      name: "",
      brand: "",
      category: "",
      price: "",
      description: "",
      attributes: [{ name: "", value: "" }],
      inStock: "",
      inventory: "",
      image: "",
    });
  }

  useEffect(() => {
    if (message) {
      const timeout = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timeout);
    }
  }, [message]);

  return (
    <>
    {message.length > 0 ? (<h2 className="font-bold text-4xl text-green-700 pt-20">Thank You, {message}</h2>):(
   <>
    <div className="w-full h-full flex flex-col gap-4 py-4 mb-36 justify-around items-center">
      <h2 className="font-bold text-2xl">Add Products</h2>
      <form action="" 
           onSubmit={handleSubmit} 
           encType="multipart/form-data"
           className='w-2/5 h-auto flex flex-col justify-center items-start p-4 
                      bg-gradient-to-r from-cyan-500 to-teal-500 rounded-xl'
           >
        <input
          type="text"
          placeholder="Name"
          value={data.name}
          name="name"
          onChange={handleChange}
          className="rounded p-1.5 border-none outline-none bg-gray-200 w-full focus:shadow-md focus:shadow-lime-400"
        />
        <br />
        <input
          type="text"
          placeholder="Brand"
          value={data.brand}
          name="brand"
          onChange={handleChange}
          className="rounded p-1.5 border-none outline-none bg-gray-200 w-full focus:shadow-md focus:shadow-lime-400"
        />
        <br />
        <input
          type="text"
          placeholder="Category"
          value={data.category}
          name="category"
          onChange={handleChange}
          className="rounded p-1.5 border-none outline-none bg-gray-200 w-full focus:shadow-md focus:shadow-lime-400"
        />
        <br />
        <input
          type="number"
          placeholder="Price"
          value={data.price}
          name="price"
          onChange={handleChange}
          className="rounded p-1.5 border-none outline-none bg-gray-200 w-full focus:shadow-md focus:shadow-lime-400"
        />
        <br />
        <textarea
          name="description"
          value={data.description}
          placeholder="Description"
          id=""
          onChange={handleChange}
          className="rounded p-1.5 border-none outline-none bg-gray-200 w-full focus:shadow-md focus:shadow-lime-400"
        ></textarea>
        <br />
        <div id="attributes" className="w-full flex flex-col gap-4">
          {data.attributes.map((attribute, index) => {
            return (
              <div className="w-full flex gap-2" key={index}>
                <input
                  type="text"
                  name="attributeName"
                  placeholder="Enter Attribute Name"
                  value={attribute.name}
                  onChange={(e) =>
                    handleAttributeChange(index, "name", e.target.value)
                  }
                  className="rounded p-1.5 border-none outline-none bg-gray-200 w-1/2 focus:shadow-md focus:shadow-lime-400"
                />
                <input
                  type="text"
                  name="attributeValue"
                  placeholder="Enter Attribute Value"
                  value={attribute.value}
                  onChange={(e) =>
                    handleAttributeChange(index, "value", e.target.value)
                  }
                  className="rounded p-1.5 border-none outline-none bg-gray-200 w-1/2 focus:shadow-md focus:shadow-lime-400"
                />
              </div>
            );
          })}
          {/*
           */}

          <button
            type="button"
           className="p-2 rounded bg-fuchsia-400 text-white font-bold hover:bg-fuchsia-900"
            onClick={addNewAttribute}
          >
            Add Attribute
          </button>
        </div>
        <div id="inStock">
          <input
            type="radio"
            name="inStock"
            value={true}
            onChange={handleChange}
          />
          True
          <input
            type="radio"
            name="inStock"
            value={false}
            onChange={handleChange}
          />
          False
        </div>
        <input
          type="text"
          name="inventory"
          placeholder="Enter Inventory Count"
          value={data.inventory}
          onChange={handleChange}
           className="rounded p-1.5 border-none outline-none bg-gray-200 w-full focus:shadow-md focus:shadow-lime-400"
        />{" "}
        <br />
        <input type="file" name="image" onChange={handleChange}  className="rounded p-1.5 border-none outline-none bg-gray-200 w-full focus:shadow-md focus:shadow-lime-400"/> <br />
        <button type="submit" className="p-2 rounded bg-rose-400 text-white font-bold hover:bg-rose-900 w-full">Add Product</button>
      </form>
      </div>
      </>
      )}
    </>
  );
}

export default AddProduct;