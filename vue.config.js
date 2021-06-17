const path = require('path')
const resolve = dir => {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: './',
  chainWebpack: config => {
    config.resolve.alias
      .set('_c', resolve('src/components')) // key,value自行定义，比如.set('@@', resolve('src/components'))
  },
  devServer: {
    // overlay: { // 让浏览器 overlay 同时显示警告和错误
    //   warnings: true,
    //   errors: true
    // },
    // open: false, // 是否打开浏览器
    // host: "localhost",
    port: "8080", // 代理端口
    // https: false,
    // hotOnly: false, // 热更新
    proxy: {
      "/api/result": {
        // target: "http://172.16.17.49:31000", // 目标代理接口地址
        target: "http://10.86.224.3:10081", // 目标代理接口地址
        secure: false,
        changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
        // ws: true, // 是否启用websockets
        pathRewrite: {
          "^/api": "/"
        }
      },
      "/api": {
        // target: "http://172.16.60.209:8082/", // 目标代理接口地址
        // target: "http://localhost:10080", // 目标代理接口地址
        target: "http://localhost:8080", // 目标代理接口地址
        secure: false,
        changeOrigin: false, // 开启代理，在本地创建一个虚拟服务端
        // ws: true, // 是否启用websockets
        pathRewrite: {
          "^/api": "/"
        }
      },
    }
  }
}