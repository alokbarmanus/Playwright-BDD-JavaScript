module.exports = {
  default: {
    require: [
      './tests/step-definitions/**/*.js',
      './utils/hooks.js'
    ],
    requireModule: ['@babel/register'],
    format: [
      'progress',
      'json:reports/cucumber_report.json'
    ],
    tags: '@regression' // Change this to @login or @smoke or @regression as needed
  }
};
