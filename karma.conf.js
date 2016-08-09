module.exports = function(config) {
  config.set({
    files: [
        '**/**.spec.js',
    ],
    frameworks: ['jasmine'],
    singleRun: true,
    autoWatch: false,
    browsers: ['Chrome']
  });
};