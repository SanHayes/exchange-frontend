const dayjs = require('dayjs');
const { short } = require('git-rev-sync');
const Webpack = require('webpack');

// 适配spug获取commit id的方式
const SPUG_GIT_COMMIT_ID = process.env.SPUG_GIT_COMMIT_ID;

const info = {
  commit: `${SPUG_GIT_COMMIT_ID ?? short()}`,
  build_time: dayjs().format('YYYY-MM-DD HH:mm:ss')
};

process.env.VUE_APP_INFO = JSON.stringify(info);

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
  pages: {
    //前台
    index: {
      entry: 'src/pages/index/main.js',
      template: 'public/client/index.html',
      title: 'Home',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    //后台
    portal: {
      entry: 'src/main.js',
      template: 'public/index.html',
      title: 'Admin',
      chunks: ['chunk-vendors', 'chunk-common', 'portal']
    },
    //不知道干嘛的
    daily: {
      entry: 'src/dai-ly/main.js',
      template: 'public/client/dai-ly.html',
      title: 'Đại lý',
      chunks: ['chunk-vendors', 'chunk-common', 'daily']
    },
    //faq
    faqs: {
      entry: 'src/faqs/main.js',
      template: 'public/client/faqs.html',
      title: 'faqs',
      chunks: ['chunk-vendors', 'chunk-common', 'faqs']
    }
  },

  productionSourceMap: false,

  configureWebpack: {
    plugins: [
      new Webpack.DefinePlugin({
        __APP_INFO__: process.env.VUE_APP_INFO
      })
    ],
    cache: {
      type: 'filesystem'
    }
  },

  transpileDependencies: true

  //cssSourceMap: false,
  // publicPath: '/',
  // transpileDependencies: [
  //   'vue-echarts',
  //   'resize-detector'
  // ],
  // configureWebpack: {
  //   // optimization: {
  //   //   splitChunks: {
  //   //     chunks: 'all'
  //   //   }
  //   // }
  //   devServer: {
  //     historyApiFallback: true
  //   }
  // }
};
