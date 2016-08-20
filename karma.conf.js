module.exports = function (config) {
  config.set({
    files: [
      'public/node_modules/core-js/client/shim.min.js',
      'public/node_modules/zone.js/dist/zone.js',
      'public/node_modules/reflect-metadata/Reflect.js',
      'public/node_modules/systemjs/dist/system.src.js',
      'public/spec/core/systemjs.spec.config.js',
      //'public/spec/loginViewComponent.spec.js'
    ],
    frameworks: ['jasmine'],
    singleRun: true,
    autoWatch: false,
    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-phantomjs-launcher',
      'phantomjs'
    ],
    browsers: ['PhantomJS']
  });
};