import instance from '../axiosConfig.js';
import React, { useEffect, useState } from 'react'
import {useNavigate, Link, useSearchParams} from 'react-router-dom'
import { useAuth } from '../contexts/Auth.jsx';

function Login() {
  const { login, isAuthenticated } = useAuth();
  const [data, setData] = useState({
    username: "",
    password: "" 
  });
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  useEffect(()=>{
    if(isAuthenticated){
      const referer = searchParams.get("referer");
      if(referer) navigate(referer);
    }
  }, [isAuthenticated, navigate, searchParams]);

  function handleChange(e){
    const {name, value} = e.target;
    setData((prevData) => {
      return {...prevData, [name] : value};
    });
  }

  async function handleSubmit(e){
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const finalData = Object.fromEntries(formData.entries());
      const response = await instance.post('/user/login', finalData);
  
      if(response.status === 200){
        login();
        navigate('/');
      }
    } catch (error) {
      setMessage(error);
    }
   
  }
  return (
    <div className="w-full h-full flex justify-center items-center">
    <div
      className="bg-gradient-to-r from-blue-200 via-stone-300 to-zinc-400 
    flex justify-center items-center flex-col p-4 rounded-xl gap-3 w-1/4"
    >

      {message.length > 0  ? (
        <p><em className='font-bold text-2xl text-center'>{message}</em></p>
      ):
      (
        <>
        <h2 className="font-bold text-2xl"> Log in to your account</h2>

        <form action="" onSubmit={handleSubmit}  className="flex justify-center items-center flex-col w-full">
           <input 
              type="text" 
              name="username" 
              placeholder="Enter your username" 
              value={data.username}
              onChange={handleChange}
              className="rounded p-1.5 border-none outline-none bg-gray-200 w-10/12 focus:shadow-md focus:shadow-lime-400"
              />
              <br />
            <input 
              type="password" 
              name="password" 
              placeholder="Enter your password" 
              value={data.password}
              onChange={handleChange}
              className="rounded p-1.5 border-none outline-none bg-gray-200 w-10/12 focus:shadow-md focus:shadow-lime-400"
              />
              <br />

              <button type='submit'  className="p-2 rounded bg-cyan-600 text-white font-bold hover:bg-sky-400">Log In</button>
      </form>
      <Link to="/forgot-password" className='underline text-blue-700'>Forgot Password</Link>
      <p>
        New User? <Link to="/register" className="text-indigo-800">Register</Link>
      </p>
      </>
      )}  
    </div>
    </div>
  )
}

export default Login
