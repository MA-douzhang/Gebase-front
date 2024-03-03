import axios from "axios";
import {useRouter} from "vue-router";
import router from "../config/router";

const isDev = process.env.NODE_ENV === 'development'
const myAxios = axios.create({
    baseURL: isDev ? 'http://127.0.0.1:9090/api':'http://8.130.16.185:9090/api'
});
//请求头携带cookie
myAxios.defaults.timeout = 25000;

myAxios.defaults.withCredentials = true
// 添加请求拦截器
myAxios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
myAxios.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    console.log(response)
    if(response.data.code === 40100){
        const redirectUrl = window.location.href;
        window.location.href = `/user/login?redirect=${redirectUrl}`;
    }
    return response.data;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});
export default myAxios;
