import React from 'react'
import { Link } from 'react-router-dom'

function OrderSuccess() {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
    <h1 className="text-3xl font-bold text-green-500">
      Order Placed Successfully!
    </h1>
    <p className="mt-4">
      Thank you for your purchase. Your order is on its way!
    </p>
    <Link
      to="/"
      className="bg-blue-500 text-white px-4 py-2 rounded mt-6 inline-block"
    >
      Continue Shopping
    </Link>
  </div>
  )
}

export default OrderSuccess
