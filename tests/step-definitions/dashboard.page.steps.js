const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const DashboardPage = require('../../pages/dashboard.page.objects');
const LoginPage = require('../../pages/login.page.objects');
const appProps = require('../../utils/application.properties');

Given('I am logged in as Admin', async function () {
  await this.loginPage.navigate(appProps.baseUrl);
  await this.loginPage.login('Admin', 'admin123');
});

Then('I should see the dashboard', async function () {
  await this.attach('Step: I should see the dashboard');
  await this.loginPage.isDashboardVisible();
  await this.attach('Dashboard is visible');
});

When('I am on the dashboard page', async function () {
  await this.dashboardPage.goto();
});

Then('I should see the dashboard header', async function () {
  expect(await this.dashboardPage.isHeaderVisible()).toBeTruthy();
});

Then('I should see the quick launch panel', async function () {
  // Wait for the quick launch panel using the selector from dashboardPage
  await this.page.waitForSelector(this.dashboardPage.quickLaunchPanel, { timeout: 60000 });
  expect(await this.dashboardPage.isQuickLaunchPanelVisible()).toBeTruthy();
});
