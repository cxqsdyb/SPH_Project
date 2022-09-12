// shopCart组件的小仓库
// 引入请求函数
import { reqCartList, reqDeleteGoods, reqChangeIsChecked } from '@/api'
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const state = {
  cartList: [],

};

const actions = {
  async getShopCartList({ commit }) {
    let result = await reqCartList();
    if (result.code == 200) {
      commit('GETSHOPCARTLIST', result.data)
    }
  },
  // 删除购物车商品
  async getDeleteGoods({ commit }, skuId) {
    let result = await reqDeleteGoods(skuId);
    if (result.code == 200) {
      return '删除成功！'//返回成功promise
    } else {
      //返回失败promise
      return Promise.reject('删除失败，请重试！')
    }
  },

  // 更改购物车选中状态
  async reqChangeIsChecked({ commit }, { skuId, isChecked }) {
    let result = await reqChangeIsChecked(skuId, isChecked)
    if (result.code == 200) {
      return '勾选成功！'//返回成功promise
    } else {
      //返回失败promise
      return Promise.reject('勾选失败，请重试！')
    }
  },
  deleteALLCheckedGoods(context) {
    let promiseALL = [];
    context.getters.shopCartInfo.cartInfoList.forEach(goods => {
      // 如果处于被勾选状态，就将其删除！
      if (goods.isChecked == '1') {
        // getDeleteGoods返回的是一个promise！将其存为一个列表！
        // 通过Promise.all判断是否全部删除成功！
        let promise = context.dispatch('getDeleteGoods', goods.skuId)
        promiseALL.push(promise);
      }
    });
    // 都成功：返回成功的promise
    // 只要有一个失败,返回失败的promise
    return Promise.all(promiseALL)
  },
  changeALLGoodsChecked(context, checked) {
    let promiseALL = [];
    context.getters.shopCartInfo.cartInfoList.forEach(goods => {
      let promise = context.dispatch('reqChangeIsChecked', { skuId: goods.skuId, isChecked: checked })
      promiseALL.push(promise);
    })
    return Promise.all(promiseALL)
  }
};
const mutations = {
  GETSHOPCARTLIST(state, cartList) {
    state.cartList = cartList
  }
};
// 对数据进行简化
const getters = {
  // 购物车所有信息
  shopCartInfo(state) {
    return state.cartList[0] || {}
  },
};
export default {
  state,
  mutations,
  actions,
  getters
}