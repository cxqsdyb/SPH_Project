// 引入路由组件
// import Home from '@/pages/Home'
import Search from '@/pages/Search'
// import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess';
import ShopCart from '@/pages/ShopCart';
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay';
import PaySuccess from '@/pages/PaySuccess';
import Center from '@/pages/Center';
import MyOrder from '@/pages/Center/MyOrder';
import GroupOrder from '@/pages/Center/GroupOrder';
// 路由懒加载功能实现！
const foo = () => import('@/pages/Home')
export default [
  {
    name: 'Home',
    path: '/home',
    component: foo,
    meta: { show: true }
  },
  {
    name: 'Search',
    path: '/search/:keyword?',
    component: Search,
    meta: { show: true },
    props: (route) => {
      return { keyword: route.query.keyword }
    }
  },
  {
    name: 'Login',
    path: '/login',
    // component: Login,
    component: () => import('@/pages/Login'),
    // 下面这一行用来判断是否显示下面的footer
    meta: { show: false }//不显示footer！
  },
  {
    name: 'Register',
    path: '/register',
    component: Register,
    meta: { show: false }//不显示footer！
  },
  {
    name: 'Detail',
    // params参数，带上商品的id
    path: '/detail/:goodsId',
    component: Detail,
    meta: { show: true }
  },
  {
    name: 'AddCartSuccess',
    path: '/addcartsuccess',
    component: AddCartSuccess,
    meta: { show: true }
  },
  {
    name: 'ShopCart',
    path: '/shopcart',
    component: ShopCart,
    meta: { show: true }
  },
  {
    name: 'Trade',
    path: '/trade',
    component: Trade,
    meta: { show: true },
    beforeEnter: (to, from, next) => {
      // 只有购物车才能跳到交易页面！
      if (from.path == '/shopcart') {
        next();
      } else {
        next(false);
      }
    }
  },
  {
    name: 'Pay',
    path: '/pay',
    component: Pay,
    meta: { show: true },
    beforeEnter: (to, from, next) => {
      // 只有订单才能跳到支付
      if (from.path == '/trade') {
        next();
      } else {
        next(false);
      }
    }
  },
  {
    name: 'PaySuccess',
    path: '/paysuccess',
    component: PaySuccess,
    meta: { show: true },
    // 另一种方法：写到组件内路由守卫！
    // beforeEnter: (to, from, next) => {
    //   // 只有支付才能跳支付成功
    //   if (from.path == '/pay') {
    //     next();
    //   } else {
    //     next(false);
    //   }
    // }

  },
  {
    name: 'Center',
    path: '/center',
    component: Center,
    meta: { show: true },
    // 重定向到指定组件（页面加载时自动跳转到该路由！）
    redirect: '/center/myorder',
    // 二级路由
    children: [
      {
        name: 'MyOrder',
        path: 'myorder',
        component: MyOrder,
      },
      {
        name: 'GroupOrder',
        path: 'grouporder',
        component: GroupOrder,
      }
    ]

  },
  // 重定向，默认跳转到/home下
  {
    path: '*',
    redirect: '/home'
  }
]