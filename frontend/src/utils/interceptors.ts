import axios from 'axios';
import { store } from '../redux/Store';

// Add a request interceptor
axios.interceptors.request.use(
    (config) => {
        // Get token from Redux store (which reads from sessionStorage initially)
        const token = store.getState().auth.token;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axios;
