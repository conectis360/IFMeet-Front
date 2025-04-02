module.exports = {
  publicPath: '/',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://ifmeet.sytes.net:9000',
        changeOrigin: true,
        secure: false
      },
      port: 8081
    },
    configureWebpack: {
      output: {
        filename: '[name].[hash].js',
        chunkFilename: '[name].[hash].js',
      },
    },

    pluginOptions: {
      i18n: {
        locale: 'en',
        fallbackLocale: 'en',
        localeDir: 'locales',
        enableInSFC: false,
      },
    },
  }