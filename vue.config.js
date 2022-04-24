module.exports = {
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "/src/assets/styles/_variables.scss";`
      }
    }
  },
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'Vanguard Camo Tracker'
        return args
      })
  },
  publicPath: ''
}