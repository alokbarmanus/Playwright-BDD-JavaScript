const { expect } = require('@playwright/test');


class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = 'input[name="username"]';
    this.passwordInput = 'input[name="password"]';
    this.submitButton = 'button[type="submit"]';
    this.dashboardHeader = 'h6:has-text("Dashboard")';
    this.InvalidCredentialsMessage = 'text=Invalid credentials';
  }

  async navigate(url) {
    await this.page.goto(url);
  }

  async login(username, password) {
    await this.page.fill(this.usernameInput, username);
    console.log('DEBUG: Filled username:', username);
    await this.page.fill(this.passwordInput, password);
    console.log('DEBUG: Filled password:', password);
    await this.page.waitForTimeout(2000);
    await this.page.click(this.submitButton);
    await this.page.waitForTimeout(5000);
  }

  async isDashboardVisible() {
    await this.page.waitForSelector(this.dashboardHeader);
  }

  async getTitle() {
    return this.page.title();
  }

  async waitForSelector(selector) {
    await this.page.waitForSelector(selector);
  }

  async verifyInvalidCredentialsMessageVisible() {
    await this.page.waitForSelector(this.InvalidCredentialsMessage);
    
  }
}

module.exports = LoginPage;
