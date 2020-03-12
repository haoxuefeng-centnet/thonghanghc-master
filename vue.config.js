const path = require('path')
module.exports = {
  lintOnSave: true,
  productionSourceMap: process.env.NODE_ENV === 'production' ? false : true,
  devServer: {
    // 解决热更新失效问题
    disableHostCheck: true,
    // 错误提示
    overlay: {
      warnings: true,
      errors: true
    },
    publicPath: '/',
    host: 'localhost',
    port: 8080,
    // 代理配置
    proxy: {
      // 开发接口代理
      '/dev': {
        // target: 'http://test.app.yaominyu.com/api-pc',
        // target: 'http://47.107.106.42:8086/api-pc',
        ws: true,
        changeOrigin: true,
        // 用/api代替target里面的请求
        pathRewrite: {
          '^/dev': ''
        }
      },
      // 测试接口地址
      '/api-test': {
        target: 'http://proxy1.autu.live/api-pc',
        ws: true,
        changeOrigin: false,
        // 用/test代替target里面的请求
        pathRewrite: {
          '^/api-test': ''
        }
      },
      // 正式接口代理地址
      '/api-pc': {
        target: 'http://47.107.106.42:8086/api-pc',
        ws: true,
        changeOrigin: true,
        // 用/api代替target里面的请求
        pathRewrite: {
          '^/api-pc': ''
        }
      }
    }
  },
  // webpack配置
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.json', '.vue'],
      alias: {
        // 重新设置 alias,扩展项目路径别名
        '@': path.resolve(__dirname, './src'),
        '@assets': path.resolve(__dirname, './src/assets'),
        '@api': path.resolve(__dirname, './src/api'),
        '@pages': path.resolve(__dirname, './src/pages'),
        '@comp': path.resolve(__dirname, './src/components'),
        '@plug': path.resolve(__dirname, './src/plugins'),
        '@utils': path.resolve(__dirname, './src/utils')
      }
    }
  },
  chainWebpack: config => {
    /**
     * 删除懒加载模块的 prefetch preload，降低带宽压力
     * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#prefetch
     * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#preload
     * 而且预渲染时生成的 prefetch 标签是 modern 版本的，低版本浏览器是不需要的
     */
    config.plugins.delete('prefetch').delete('preload')
  }
}
