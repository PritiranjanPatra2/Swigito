import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useState } from 'react'
import useCart from '../hooks/useCart';
import { useNavigate } from 'react-router-dom';
import instance from '../axiosConfig';

function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();
    const { cart } = useCart();

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();

    async function handleSubmit(e){
       e.preventDefault();

       if(!stripe || !elements) return;
       
       setLoading(true);
       setError(null);
       try {
        const data = await instance.post("/pay/create-payment-intent", {
            amount: Math.round(cart.totalAmount),
          });
        //   console.log(data.data);
    
          const result = await stripe.confirmCardPayment(data.data.clientSecret, {
            payment_method: {
              card: elements.getElement(CardElement),
            },
          });

        if(result.error){
            setError(result.error.message);
        }
        else if (result.paymentIntent.status === "succeeded"){
            setSuccess(true);

        await instance.post("/orders/create", {
            payIntentId: result.paymentIntent._id,
        });

        // window.location.href = "/order-success";
        navigate("/order-success");
       }
       } catch (error) {
        console.log(error);
          setError("Payment failed. Please try again.");
       } finally {
           setLoading(false);
       }
    }
  return (
    <>
      <form  action=""
      onSubmit={handleSubmit}
        className="container max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mb-4 mt-4"
        >
            <CardElement />
            <button 
               type="submit"
               className="bg-blue-500 text-white px-4 py-1 rounded mt-8"
               >
                {loading? "processing" : "Pay Now"}
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            {success && <p className="text-green-500 mt-2">Payment Successful!</p>}
      </form>
    </>
  )
}

export default CheckoutForm
