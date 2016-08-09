module.exports = function(config) {
  config.set({
    files: [
        '**/**.spec.js',
    ],
    frameworks: ['jasmine', 'requirejs', 'chai'],
    singleRun: true,
    autoWatch: false,
    browsers: ['PhantomJS']
  });
};