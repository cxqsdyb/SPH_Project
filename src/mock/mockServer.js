// 映入mockjs模块
import Mock from 'mockjs';
// 将JSON数据引入
// JSON数据格式不需要对外暴露，但是可以引入！
// webpack默认对外暴露：图片、JSON数据格式
import banner from './banner.json';//轮播图
import floor from './floor.json';//floor

// mock数据:第一个参数请求地址  第二个参数：请求数据
Mock.mock('/mock/banner',{code:200,data:banner});
Mock.mock('/mock/floor',{code:200,data:floor});

