import axios from 'axios';

const request = axios.create({
  baseURL: '.',
  timeout: 5000,
});
// 请求拦截器
request.interceptors.request.use(function (config) {
  // 如果发送请求前需要做准备工作，可以在这里实现
  return config;
}, function (error) {
  // 如果需要处理发送失败的请求，则可以在这里设置
  return Promise.reject(error);
});

// 响应拦截器
request.interceptors.response.use(function (response) {
  // 如果需要处理响应数据，可以在这里实现
  return response;
}, function (error) {
  // 如果需要处理响应失败的请求，则可以在这里设置
  return Promise.reject(error);
});

export default request;
