// 对axios进行二次封装
import axios from 'axios';
// 引入进度条插件
import nprogress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'
import { Promise } from 'core-js';
import store from '@/store';

// 利用axios方法create，创建axios实例
const requests = axios.create({
  // 请求的时候，路径上会加上/api
  baseURL: '/api',
  timeout: 5000,
})
// 配置请求拦截器
requests.interceptors.request.use((config) => {
  // config:配置对象，对象里面有一个属性很重要：header请求头
  // 进度条开始
  nprogress.start();
  // 如果有用户临时id，放在请求头的userTempId中！
  if (store.state.detail.uuid_token) {
    config.headers.userTempId = store.state.detail.uuid_token;
  }
  // 如果有token，就传递给服务器！
  if (store.state.user.token) {
    config.headers.token = store.state.user.token;
  }
  return config;
})

// 配置响应拦截器
requests.interceptors.response.use((res) => {
  // 成功的回调，服务器响应数据回来后，响应拦截器可以检测到，做一些事情
  // 进度条结束
  nprogress.done();
  return res.data;
}, (err) => {
  // 响应失败的回调
  return Promise.reject(new Error('fail'))
})

// 对外暴露
export default requests;