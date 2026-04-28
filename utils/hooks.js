
// Cucumber and Playwright dependencies
const { Before, After, AfterStep } = require('@cucumber/cucumber');
const BaseTest = require('./BaseTest');
const LoginPage = require('../pages/login.page.objects');
const DashboardPage = require('../pages/dashboard.page.objects');
const fs = require('fs');
const path = require('path');


// Attach scenario tags to the World object for every scenario (for data-driven or tag-based logic)
Before(function (scenario) {
  this._scenarioTags = scenario.pickle && scenario.pickle.tags ? scenario.pickle.tags : [];
});


// Step duration tracking (for reporting step execution time)
Before(function () {
  this._stepStartTime = null;
});


// Setup Playwright browser, context, and page before each scenario
Before(async function () {
  this.baseTest = new BaseTest();
  await this.baseTest.setup();
  this.browser = this.baseTest.browser;
  this.context = this.baseTest.context;
  this.page = this.baseTest.page;
});


// Initialize page objects for each scenario (after this.page is set)
// This allows you to use this.loginPage and this.dashboardPage in all step definitions
Before(function () {
  this.loginPage = new LoginPage(this.page);
  //this.dashboardPage = new DashboardPage(this.page);
});
Before(function () {
  this.dashboardPage = new DashboardPage(this.page);
});

// After each step: attach step duration and take screenshot on failure
AfterStep(async function ({ result, pickleStep }) {
  // Step duration
  if (!this._stepStartTime) {
    this._stepStartTime = Date.now();
  }
  const stepEndTime = Date.now();
  const durationMs = stepEndTime - this._stepStartTime;
  this._stepStartTime = stepEndTime;
  await this.attach(`Step duration: ${durationMs} ms`);

  // Screenshot on failure
  if (result.status === 'FAILED' && this.page) {
    const screenshotPath = path.join('reports', 'screenshots', `${Date.now()}-${pickleStep.text.replace(/\s+/g, '_')}.png`);
    await this.page.screenshot({ path: screenshotPath, fullPage: true });
    const img = fs.readFileSync(screenshotPath);
    await this.attach(img, 'image/png');
  }
});


// After each scenario: close browser and clean up
After(async function () {
  if (this.baseTest) {
    await this.baseTest.teardown();
  }
});
