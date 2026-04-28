const appProps = require('../utils/application.properties');

class DashboardPage {

  constructor(page) {
    this.page = page;
    this.header = 'h6:has-text("Dashboard")';
    this.adminLinkInLeftPanel = 'getByRole(AriaRole.LINK, new Page.GetByRoleOptions().setName("Admin"))';
    // Update selector as per actual DOM
    // Add more locators as needed
  }

  async goto() {
    // Use baseUrl from appProps and append dashboard path
    const dashboardUrl = appProps.baseUrl.endsWith('/dashboard/index')
      ? appProps.baseUrl
      : appProps.baseUrl.replace(/\/$/, '') + '/dashboard/index';
    await this.page.goto(dashboardUrl);
  }

  async isHeaderVisible() {
    await this.page.waitForSelector(this.header);
    return this.page.isVisible(this.header);
  }

  async isQuickLaunchPanelVisible() {
    this.page.waitForTimeout(5000);
    await this.page.waitForSelector(this.adminLinkInLeftPanel);
    return this.page.isVisible(this.adminLinkInLeftPanel);
  }
}

module.exports = DashboardPage;
