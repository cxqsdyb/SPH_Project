// Home组件的小仓库
import Vue from 'vue';
import Vuex from 'vuex';
// 引入axios请求
import { reqCategoryList, ReqGetBannerList,ReqGetFloorList } from '@/api'
Vue.use(Vuex);
const state = {
  categoryList: [],
  bannerList: [],
  floorList:[],
};

const actions = {
  // 传入commit！
  // 请求分类列表
  async getCategoryList(context) {
    let result = await reqCategoryList();//获取promise对象成功的结果
    // console.log('请求三级分类！');
    if (result.code == 200) {
      context.commit('CATEGORYLIST', result.data);
    }
  },

  // 请求轮播图
  async getBannerList(context) {
    let result = await ReqGetBannerList();
    if (result.code == 200) {
      context.commit('BANNERLIST', result.data);
    }
  },
  // 请求Floor列表！
  async getFloorList(context) {
    let result = await ReqGetFloorList();
    if (result.code == 200) {
      context.commit('FLOORLIST', result.data);
    }
  },

};

const mutations = {
  CATEGORYLIST(state, value) {
    state.categoryList = value;
  },
  BANNERLIST(state, value) {
    state.bannerList = value;
    // console.log('得到数据！');
  },
  FLOORLIST(state, value) {
    state.floorList = value;
    // console.log('得到数据！');
  },
};

const getters = {};
export default {
  state,
  mutations,
  actions,
  getters
}