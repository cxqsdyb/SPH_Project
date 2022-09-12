// 商品详情页组件的小仓库
// 引入请求函数
import { reqGoodsInfo, UpdateShopCart } from '@/api'
import Vue from 'vue';
import Vuex from 'vuex';
import { getUUID } from "@/utils/uuid_token";
Vue.use(Vuex);
const state = {
  GoodsInfo: {},
  // 游客临时id
  uuid_token: getUUID()
};

const actions = {
  // 请求商品详情
  async getGoodsInfo(context, skuId) {
    // params={}的目的是reqGetGoodsList的参数必须是一个对象！
    let result = await reqGoodsInfo(skuId);
    if (result.code == 200) {
      context.commit('GOODSINFO', result.data);
    }

  },
  // {commit}替代context.commit
  // 修改购物车！
  async UpdateShopCart({ commit }, { skuId, skuNum }) {
    let result = await UpdateShopCart(skuId, skuNum);
    // console.log('result :>> ', result);
    // 根据执行结果返回promise
    // 若添加购物车成功
    if (result.code == 200) {
      // 若async返回值为字符串，则返回成功promise
      return 'ok'
    } else {
      // 添加购物车失败
      return Promise.reject('添加购物车失败')
    }
  }
};
const mutations = {
  GOODSINFO(state, value) {
    state.GoodsInfo = value;
  }
};
// 对商品详情进行简化！
const getters = {
  categoryView(state) {
    return state.GoodsInfo.categoryView || {}
  },
  price(state) {
    return state.GoodsInfo.price
  },
  skuInfo(state) {
    return state.GoodsInfo.skuInfo || {}
  },
  spuSaleAttrList(state) {
    return state.GoodsInfo.spuSaleAttrList || []
  }
};
export default {
  state,
  mutations,
  actions,
  getters
}