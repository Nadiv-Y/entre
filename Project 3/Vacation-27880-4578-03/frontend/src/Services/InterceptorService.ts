import axios from "axios";
import { store } from "../app/store";

class InterceptorService {
    public createInterceptor(): void {
        axios.interceptors.request.use(request => {
            if (store.getState().auth.token) {
                request.headers.Authorization = "Bearer " + store.getState().auth.token;
            }
            return request;
        });
    }
}

const interceptorService = new InterceptorService();
export default interceptorService;
