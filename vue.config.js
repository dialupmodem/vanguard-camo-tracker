module.exports = {
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "/src/assets/styles/_variables.scss";`
      }
    }
  },
  publicPath: ''
}