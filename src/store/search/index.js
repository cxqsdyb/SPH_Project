// Search组件的小仓库
// 引入请求函数
import { ReqGetGoodsList } from '@/api'
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const state = {
  searchGoodsList:{}
};

const actions = {
  async getGoodsList(context,params={}) {
    // params={}的目的是reqGetGoodsList的参数必须是一个对象！
    let result = await ReqGetGoodsList(params);
    if (result.code ==200){
      context.commit('GOODSLIST',result.data);
    }
    
  }
};
const mutations = {
  GOODSLIST(state,value){
    state.searchGoodsList=value;
  }
};
// 对数据进行简化
const getters = {
  // 这里的state是search仓库的state
  // 商品列表
  goodsList(state){
    return state.searchGoodsList.goodsList||[];
  },
  // 上部商品属性列表
  attrsList(state){
    return state.searchGoodsList.attrsList||[];
  },
  // 上部商品品牌列表
  trademarkList(state){
    return state.searchGoodsList.trademarkList||[];
  },

};
export default {
  state,
  mutations,
  actions,
  getters
}