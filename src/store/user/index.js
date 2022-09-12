// user组件的小仓库
// 引入请求函数
import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from '@/api'
import Vue from 'vue';
import Vuex from 'vuex';
import { setToken, getToken, clearToken } from '@/utils/token'
Vue.use(Vuex);
const state = {
  code: "",
  token: getToken(),
  userInfo: {}
};

const actions = {
  // 获取验证码
  async getCode({ commit }, phone) {
    let result = await reqGetCode(phone);
    if (result.code == 200) {
      commit('GETCODE', result.data);
      return 'ok'
    } else {
      return Promise.reject();
    }
  },
  // 用户注册
  async userRegister({ commit }, userData) {
    let { phone, password, code } = userData;
    let result = await reqUserRegister(phone, password, code);
    return result

  },
  // 用户登录【token】
  async userLogin({ commit }, userData) {
    let { phone, password } = userData;
    let result = await reqUserLogin(phone, password);
    // console.log('result :>> ', result);
    if (result.code == 200) {
      commit('USERLOGIN', result.data.token);
      // 登录成功后本地存储token
      setToken(result.data.token);
    } else {
      return Promise.reject(result.message);
    }
  },
  // 获取用户信息
  async getUserInfo({ commit }) {
    let result = await reqUserInfo();
    if (result.code == 200) {
      commit("GETUSERINFO", result.data);
      return 'ok'
    } else {
      return Promise.reject('error!')
    }
  },
  // 退出登录
  async userLogout({ commit }) {
    let result = await reqLogout();
    // console.log('result :>> ', result);
    if (result.code == 200) {
      commit('CLEAR');
      return '已退出登录！'
    } else {
      return Promise.reject('error!!!')
    }
  }
};
const mutations = {
  GETCODE(state, code) {
    state.code = code;
  },
  USERLOGIN(state, token) {
    state.token = token;
  },
  GETUSERINFO(state, userInfo) {
    state.userInfo = userInfo;
  },
  CLEAR(state) {
    // 清空用户数据
    state.token = '';
    state.userInfo = {};
    // 清空本地存储token！
    clearToken();
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