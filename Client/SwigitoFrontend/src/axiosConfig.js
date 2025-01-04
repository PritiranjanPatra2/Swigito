import axios from 'axios';

const instance = axios.create({
    baseURL: "https://swigito.onrender.com/api/v1",
    
    withCredentials: true
});

export default instance;
// baseURL: "https://e-commerce-8xmf.onrender.com/api/v1",
