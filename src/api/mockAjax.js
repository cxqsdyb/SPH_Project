// 对axios进行二次封装
import axios from 'axios';
// 引入进度条插件
import nprogress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'
import { Promise } from 'core-js';

// 利用axios方法create，创建axios实例
const mockRequest = axios.create({
  // 请求的时候，路径上会加上/mock
  baseURL: '/mock',
  timeout: 5000,
})
// 配置请求拦截器
mockRequest.interceptors.request.use((config) => {
  // config:配置对象，对象里面有一个属性很重要：header请求头
  // 进度条开始
  nprogress.start();
  return config;
})

// 配置响应拦截器
mockRequest.interceptors.response.use((res) => {
  // 成功的回调，服务器响应数据回来后，响应拦截器可以检测到，做一些事情
  // 进度条结束
  nprogress.done();
  return res.data;
}, (err) => {
  // 响应失败的回调
  return Promise.reject(new Error('fail'))
})

// 对外暴露
export default mockRequest;