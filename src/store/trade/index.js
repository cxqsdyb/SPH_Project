// trade组件的小仓库
// 引入请求函数
import { reqAddressInfo, reqOrderInfo } from '@/api'
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const state = {
  // 用户收货地址,数组形式
  userAddress: [],
  // 用户订单信息，对象形式
  orderInfo: {}
};

const actions = {
  // 请求用户收货地址
  async getUserAddress({ commit }) {
    let result = await reqAddressInfo();
    // console.log('result :>> ', result);
    if (result.code == 200) {
      commit('GETUSERADDRESS', result.data);
    }
  },
  // 请求商品清单数据
  async getOrderInfo({ commit }) {
    let result = await reqOrderInfo();
    if (result.code == 200) {
      commit('GETORDERINFO', result.data);
    }
  },
};
const mutations = {
  GETUSERADDRESS(state, userAddress) {
    state.userAddress = userAddress;
  },
  GETORDERINFO(state, orderInfo) {
    state.orderInfo = orderInfo;
  }
};
// 对数据进行简化
const getters = {

};
export default {
  state,
  mutations,
  actions,
  getters
}