import React, { createContext, useState, useContext, useEffect } from 'react'
import instance from '../axiosConfig';

const AuthContext = createContext(null);



export function AuthProvider({children}) {

  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const response = await instance.get('/auth/validate-token', {
        withCredentials: true,
      });

      setAuthState({
        isAuthenticated: true,
        user: response.data.user,
        loading: false,
        error: null,
      });
    } catch (error) {
      setAuthState({
        isAuthenticated: false,
        user: null,
        loading: false,
        error: error,
      });
    }
  }

  function login(userData){
    setAuthState({
      isAuthenticated: true,
      user: userData,
      loading: false,
      error: null,
    });
  }


  async function logout() {
    try {
      const response = await instance.post("/user/logout",
        {},
         {
        withCredentials: true,
      });

      setAuthState({
        isAuthenticated: false,
        user: null,
        loading: false,
        error: null,
      });
    } catch (error) {
      setAuthState({
        isAuthenticated: false,
        user: null,
        loading: false,
        error: error.response.data.message,
      });
    } 
  }

  function updateUser(userData){
    setAuthState({...authState, user: userData});
  }

  return (
   <AuthContext.Provider
     value={{
         ...authState,
         login,
         logout,
        updateUser,
     }}>
      {children}
   </AuthContext.Provider>
  )
}

export  function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
