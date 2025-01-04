import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/Auth.jsx'
import instance from '../axiosConfig';
import { Link } from 'react-router-dom';

function MyCoupons() {
    const { user, isAuthenticated } = useAuth();

    const [coupons, setCoupons] = useState([]);

    useEffect(() => {
        if(!isAuthenticated) return;
        fetchCoupons();
    }, []);

    async function fetchCoupons(){
        try {
            const response = await instance.get("/coupon");
            setCoupons(response.data);
        } catch (error) {
            console.log(error.message);
        }
    }


    function convertToIST(timestamp) {
        const utcDate = new Date(timestamp);
        const offsetDate = new Date(utcDate.getTime() + 5.5 * 60 * 60 * 1000);
        const formattedDate = offsetDate
          .toLocaleString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
          })
          .replace(",", "");
        return formattedDate;
      }
      
  return (
    <div className="min-h-screen w-full p-6">
        <div>
            <Link to="/my-coupons/add"
                  className="bg-red-500 text-white px-8 py-2 rounded">
              Add Coupon
            </Link>
        </div>
        <div className="w-full py-4 px-2 flex flex-col justify-center items-center gap-2">
        <h3 className='font-bold text-2xl'>MyCoupons</h3>
        {coupons.length > 0 &&
          coupons.map((coupon) => {
            return (
              <div
                key={coupon._id}
                className="p-2 mb-1 flex w-full justify-evenly gap-2 shadow-2xl bg-indigo-300 rounded"
              >
                <p>{coupon.name}</p>
                <p>{coupon.code}</p>
                <p>{coupon.minPrice}</p>
                <p>{coupon.discountPercentage}</p>
                <p>{convertToIST(coupon.expiryDate)}</p>
              </div>
            );
          })}
      </div>
    </div>
  )
}

export default MyCoupons
