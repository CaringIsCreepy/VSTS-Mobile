// #docregion
module.exports = function(config) {

  var appBase    = '/';       // transpiled app JS and map files
  var appSrcBase = '/';       // app source TS files
  var appAssets  = '/'; // component assets fetched by Angular's compiler

  var testBase    = 'spec/';       // transpiled test JS and map files
  var testSrcBase = 'spec/';       // test source TS files

  config.set({
    basePath: '/',
    frameworks: ['jasmine'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-phantomjs-launcher')
    ],
    files: [
      // System.js for module loading
      'public/node_modules/systemjs/dist/system.src.js',

      // Polyfills
      'public/node_modules/core-js/client/shim.js',
      'public/node_modules/reflect-metadata/Reflect.js',

      // zone.js
      'public/node_modules/zone.js/dist/zone.js',
      'public/node_modules/zone.js/dist/long-stack-trace-zone.js',
      'public/node_modules/zone.js/dist/proxy.js',
      'public/node_modules/zone.js/dist/sync-test.js',
      'public/node_modules/zone.js/dist/jasmine-patch.js',
      'public/node_modules/zone.js/dist/async-test.js',
      'public/node_modules/zone.js/dist/fake-async-test.js',

      // RxJs
      { pattern: 'public/node_modules/rxjs/**/*.js', included: false, watched: false },
      { pattern: 'public/node_modules/rxjs/**/*.js.map', included: false, watched: false },

      // Paths loaded via module imports:
      // Angular itself
      {pattern: 'public/node_modules/@angular/**/*.js', included: false, watched: false},
      {pattern: 'public/node_modules/@angular/**/*.js.map', included: false, watched: false},

      //{pattern: 'systemjs.config.js', included: false, watched: false},
      //{pattern: 'systemjs.config.extras.js', included: false, watched: false},
      //'karma-test-shim.js',

      // transpiled application & spec code paths loaded via module imports
      {pattern: appBase + '**/*.js', included: false, watched: true},
      {pattern: testBase + '**/*.js', included: false, watched: true},


      // Asset (HTML & CSS) paths loaded via Angular's component compiler
      // (these paths need to be rewritten, see proxies section)
      {pattern: appBase + '**/*.html', included: false, watched: true},
      {pattern: appBase + '**/*.css', included: false, watched: true},

      // Paths for debugging with source maps in dev tools
      {pattern: appSrcBase + '**/*.ts', included: false, watched: false},
      {pattern: appBase + '**/*.js.map', included: false, watched: false},
      {pattern: testSrcBase + '**/*.ts', included: false, watched: false},
      {pattern: testBase + '**/*.js.map', included: false, watched: false}
    ],

    // Proxied base paths for loading assets
    proxies: {
      // required for component assets fetched by Angular's compiler
      "public/app/": appAssets
    },

    exclude: [],
    preprocessors: {},
    //reporters: ['progress', 'html'],

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: true
  })
}