var path = require('path')
var c = require('./webpack.config.js')

c.entry = {} // 清空 entry
c.devtool = '#inline-source-map'

c.module = {
  preLoaders: [
    {
      test: /\.js$/,
      include: path.resolve('./libs/'),
      loader: 'istanbul-instrumenter-loader'
    }
  ]
}

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: ['tests/index.js'],
    preprocessors: {
      'tests/index.js': ['webpack', 'sourcemap']
    },
    webpack: c,
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      dir: 'coverage',
      reporters: [
        {
          type: 'html',
          subdir (browser) {
            return 'html/' + browser.toLowerCase().split(/[ /-]/)[0]
          }
        },
        {
          type: 'lcov',
          subdir: 'lcov'
        }
      ]
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['Chrome', 'PhantomJS'],
    singleRun: true
  })
}
