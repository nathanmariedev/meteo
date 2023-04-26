module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "~@/assets/sass/variables.scss";',
      },
    },
  },
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');

    svgRule.uses.clear();

    svgRule
      .use('vue-loader')
      .loader('vue-loader')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader');
  },
};
