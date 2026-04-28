
const env = process.env.env || 'dev';

const urls = {
  dev: 'https://opensource-demo.orangehrmlive.com/web/index.php',
  sit: 'https://opensource-demo.orangehrmlive.com/web/index.php',
  uat: 'https://opensource-demo.orangehrmlive.com/web/index.php'
};

module.exports = {
  baseUrl: urls[env],
  timeout: 30000,
  browser: 'chromium'
};
