// 对API统一管理
import requests from './request'
// 引入mock请求
import mockRequest from './mockAjax';
// 三级联动接口！
// 请求三级分类列表
// 将其封装成函数并对外暴露，外部就可以调用发送请求
export const reqCategoryList = () => {
  // 发请求:axios发请求的返回结果为Promise对象
  return requests({
    url: 'product/getBaseCategoryList',
    method: 'get'
  })
}
// 请求大轮播图
export const ReqGetBannerList = () => {
  // 发请求:axios发请求的返回结果为Promise对象
  return mockRequest({
    url: '/banner',
    method: 'get'
  })
}
//请求小轮播图
export const ReqGetFloorList = () => {
  // 发请求:axios发请求的返回结果为Promise对象
  return mockRequest({
    url: '/floor',
    method: 'get'
  })
}

// 请求商品参数 /list
// POST请求，需要参数params！是一个对象！
export const ReqGetGoodsList = (params) => {
  // 发请求:axios发请求的返回结果为Promise对象
  return requests({
    url: '/list',
    method: 'post',
    data: params
  })
}
// 请求商品详情信息
export const reqGoodsInfo = (skuId) => requests({ url: `/item/${skuId}`, method: 'get' })
// 更新购物车信息
export const UpdateShopCart = (skuId, skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })
// 获取购物车信息  get
export const reqCartList = () => requests({ url: '/cart/cartList', method: 'get' });
// 删除购物车中指定商品
export const reqDeleteGoods = (skuId) => requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' });
// 修改购物车中商品的选中状态
export const reqChangeIsChecked = (skuId, isChecked) => requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' });
// 请求验证码
export const reqGetCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' });
// 用户注册请求
export const reqUserRegister = (phone, password, code) => requests({ url: `/user/passport/register`, data: { phone, password, code }, method: 'post' });
// 用户登录请求
export const reqUserLogin = (phone, password) => requests({ url: `/user/passport/login`, data: { phone, password }, method: 'post' });
// 获取用户信息【需要向服务器传递用户的token！】
export const reqUserInfo = () => requests({ url: '/user/passport/auth/getUserInfo', method: 'get' });
// 退出登录
export const reqLogout = () => requests({ url: '/user/passport/logout', method: 'get' });
// 请求用户收货地址信息
export const reqAddressInfo = () => requests({ url: '/user/userAddress/auth/findUserAddressList', method: 'get' });
// 获取商品清单
export const reqOrderInfo = () => requests({ url: '/order/auth/trade', method: 'get' });
// 提交订单
export const reqSubmitOrder = (tradeNo, userData) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data: userData, method: 'post' })
// 请求订单支付信息
export const reqPayInfo = (orderId) => requests({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' })
// 获取订单支付状态
export const reqPayStatus = (orderId) => requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get' })
// 获取我的订单列表
export const reqMyOrderList = (page, limit) => requests({ url: `/order/auth/${page}/${limit}`, method: 'get' })