module.exports = {
  publicPath: '/IFMeet/',
  devServer: {
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