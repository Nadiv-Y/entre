import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3001/api"
});

// Add a request interceptor to inject the token
api.interceptors.request.use(request => {
    const token = localStorage.getItem("token");
    if (token) {
        request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
});

export default api;
