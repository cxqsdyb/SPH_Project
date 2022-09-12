// 配置路由！
// 引入vue和vue-router
import Vue from "vue";
import VueRouter from 'vue-router';
import routes from './routers';
import store from '@/store'
Vue.use(VueRouter);

// // 解决ElementUI导航栏中的vue-router在3.0版本以上重复点击菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
let router = new VueRouter({
  // 路由配置
  routes,
  // 路由跳转后的滚动条设置！
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  },

})
// 全局守卫：前置守卫，在路由跳转前判断
// next:放行函数,next()放行  
// next(path)放行到指定path的路由
// next(false) url重置到from
router.beforeEach(async (to, from, next) => {
  // console.log('store :>> ', store);
  // 如果处于登录状态，不能去登录页面！
  let token = store.state.user.token;
  let name = store.state.user.userInfo.name;
  // 如果有token，表示处于登录状态
  if (token) {
    // 如果登陆状态下去登录或注册
    if (to.path == '/login' || to.path == '/register') {
      // 跳转到首页
      next('/home');
    } else {
      // 如果在登录状态,且没有去登录页面
      // 如果已经有用户信息,直接放行
      if (name) {
        next();
      } else {
        // 如果处于登录状态且没有用户信息,获取!
        try {
          await store.dispatch('getUserInfo');
          next();
        } catch (error) {
          // 如果失败,说明token失效!清除无效token(用退出登录函数!)
          await store.dispatch('userLogout');
          alert('登录过期!请重新登录');
          next('/login');
        }

      }
    }
  } else {
    // 如果不处于登录状态
    // 判断路径是否包含不可去的页面
    let toPath = to.path;
    if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/paysuccess') != -1 || toPath.indexOf('/center') != -1) {
      // 将想去的路由作为query参数传给登录路由组件
      alert('请先登录！')
      next(`/login?toPath=${toPath}`);
    } else {
      next();
    }
  }

})

export default router