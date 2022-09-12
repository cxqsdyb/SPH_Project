// 自定义插件一定要暴露一个对象
let myPlugins = {};
myPlugins.install = function (Vue, options) {
  // Vue.prototype.$bus:任何组件都能用
  // Vue.directive :全局自定义组件：例如v-lazy
  // Vue.component......
  // 自定义指令：名字，元素，传入值（v-zzz="xxx",xxx就是params）
  Vue.directive(options.name, (element, params) => {
    element.innerHTML = params.value.toUpperCase();
  })
}
export default myPlugins