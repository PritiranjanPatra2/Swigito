import instance from '../axiosConfig.js';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function VerifyEmail() {
    const URL = new URLSearchParams(window.location.search);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const token = URL.get("token");

    if(!token) {
        return(
            <h2>Missing Token. Go Back to <Link to="/">Home</Link></h2>
        );
    }
    else{
        sendTokenToBackend();
    }

    async function sendTokenToBackend(){
        const response = await instance.post("/auth/verify-token", {
            token: token,
        });
        // console.log(response);

        if(response.status === 200) navigate("/login?msg=verification_successful");

        if(response.status === 404) setMessage(response.message);
    }
  return(  
    <>
      {message.length > 0 ? <h3>{message}</h3> : ""}
      <h2>Verify</h2>
    </>
  )
}

export default VerifyEmail
