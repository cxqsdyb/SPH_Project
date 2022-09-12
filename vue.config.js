const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 下面一行如果为true，就可以实现打包后的代码报错也能精确定位到哪一行，
  // 但是缺点是打包体积过大，会多出.map文件！
  productionSourceMap:false,
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        // target: 'http://39.98.123.211',
        target: 'http://gmall-h5-api.atguigu.cn'
        // pathRewrite:{'^/api':''}
      },
    }
  }

})
