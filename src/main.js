import Vue from 'vue'
import App from './App.vue'
import router from '@/router';
// 三级联动组件----全局组件
import TypeNav from '@/components/TypeNav';
// 分页器---全局组件
import Pagination from '@/components/Pagination'
import store from '@/store'
// 引入MockServer.js,没有暴露，只需引入即可
import '@/mock/mockServer';
// 引入swiper样式
import 'swiper/css/swiper.css'
// 注册全局组件：轮播图
import Carouse from '@/components/Carouse';
// 按需引入ElementUI组件
import { Button, Select, MessageBox, Message } from 'element-ui';
// 引入图片懒加载组件
import VueLazyload from 'vue-lazyload'
// 将所有API引入！再挂载到vue原型上！
import * as API from '@/api';
import loadingImg from '@/assets/loading.png';
import error from '@/assets/error.png';
Vue.config.productionTip = false
// 设置全局组件
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carouse.name, Carouse);
Vue.component(Pagination.name, Pagination);
// 注册全局ElementUI组件
Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
// 使用懒加载组件和配置
Vue.use(VueLazyload, {
  // preLoad: 1.3,
  error: error,
  loading: loadingImg,
  // attempt: 1
})
// 引入自定义组件
import myPlugins from '@/plugins/myPlugins';
// 使用自定义插件和配置
Vue.use(myPlugins, { name: 'upper' });
// 引入表单校验插件
import '@/plugins/validate';
new Vue({
  render: h => h(App),
  // 配置全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this;
    // 将API挂载到原型上！类似全局事件总线！
    Vue.prototype.$API = API;
    // ElementUI挂载在vue原型上
    Vue.prototype.$msgbox = MessageBox;
    Vue.prototype.$alert = MessageBox.alert;
    Vue.prototype.$message = Message;
  },
  // 注册路由 kv一致，省略v！
  router,
  // 注册vuex的仓库，组件实例上会有$store
  store
  // 手动挂载app组件！
}).$mount('#app')
