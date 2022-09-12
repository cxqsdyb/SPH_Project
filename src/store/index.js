import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
// 引入小仓库
import home from './home';
import search from './search';
import detail from './detail';
import shopcart from './shopcart'
import user from './user'
import trade from './trade';
// 还有getters：可以理解为计算属性，用于简化仓库中的数据
export default new Vuex.Store({
  // 注册小仓库
  modules: {
    home,
    search,
    detail,
    shopcart,
    user,
    trade
  }
})