const { chromium, firefox, webkit } = require('playwright');
const appProps = require('./application.properties');

class BaseTest {
  constructor() {
    this.browser = null;
    this.context = null;
    this.page = null;
  }

  async setup() {
    let browserType;
    switch ((appProps.browser || 'chromium').toLowerCase()) {
      case 'firefox':
        browserType = firefox;
        break;
      case 'webkit':
        browserType = webkit;
        break;
      case 'chromium':
      default:
        browserType = chromium;
        break;
    }
    this.browser = await browserType.launch({ headless: false });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
  }

  async teardown() {
    if (this.page) await this.page.close();
    if (this.context) await this.context.close();
    if (this.browser) await this.browser.close();
  }
}

module.exports = BaseTest;
