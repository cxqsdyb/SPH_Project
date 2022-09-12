<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <Header />
    <router-view></router-view>
    <!-- 根据路由中的mata属性判断是否显示footer组件！ -->
    <Footer v-show="$route.meta.show" />
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  mounted() {
    // 只请求一次！
    this.$store.dispatch('getCategoryList');
  },
}
</script>

<style>
</style>
