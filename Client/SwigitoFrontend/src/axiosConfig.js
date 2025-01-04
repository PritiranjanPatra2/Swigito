import axios from 'axios';

const instance = axios.create({
    baseURL: "http://localhost:8917/api/v1",
    
    withCredentials: true
});

export default instance;
// baseURL: "https://e-commerce-8xmf.onrender.com/api/v1",