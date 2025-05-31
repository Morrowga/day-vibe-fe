import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.W10.Mwnyln9vH_mz9xoWX_8mmq6tCHrno0fjqJeNU3acH61Q5rnmu_FQtp_5PNGx1gsMM-A3rQbE5JY7Gmfl19Karv39697-_cWoQvoPiXg94c34ZgH9sJqkI3UCYB7vxXcPfsvuO04OMMzVVazxskWxk1k9MBWlgRbiN6e5yba_QBm_wzUqzHNliZBA0ruhhmFJcXRDtVHgmLy1NijqpdJx8mxwX4xQLVCHodTrt7s22Yk1BnhxPwmQPwxuC-gg74C3cmddFn2nEOTF2BDm6gAcc7nLD9yR2D8uEYVKvSLbAdQUVIle6K1qXGLdqF4S67ZWQByUGyyxhP9gNBIgUuZ-EA'
    },
});

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            console.log('Unauthorized.')
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
