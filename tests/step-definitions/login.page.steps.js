const { expect } = require('@playwright/test');
const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const LoginPage = require('../../pages/login.page.objects');
const appProps = require('../../utils/application.properties');
const { loadFirstData } = require('../../utils/dataLoader');
const { getDataFilePathFromTags } = require('../../utils/cucumberUtils');

setDefaultTimeout(30000); // Set step timeout to 30 seconds

// Step: Verify invalid credentials message is visible
Then('I should see Invalid credentials message', async function () {
  await this.attach('Step: I should see Invalid credentials message');
  await this.loginPage.verifyInvalidCredentialsMessageVisible();
  const messageText = await this.page.textContent(this.loginPage.InvalidCredentialsMessage);
  await this.attach('Invalid credentials message text: ' + messageText);
  console.log('Invalid credentials message text:', messageText);
});

When('I login with invalid credentials', async function () {
  await this.attach('Step: I login with invalid credentials');
  await this.loginPage.login("unvalid", "credentials");
  await this.attach('Attempted login with username: **** and password: ****');
});

// Step: Login with static credentials from feature file
When('I login with valid static credentials {string} and {string}', async function (username, password) {
  await this.attach('Step: I login with valid static credentials [MASKED] and [MASKED]');
  await this.loginPage.login(username, password);
  await this.attach('Attempted login with username: **** and password: ****');
});

Given('I am on the login page', async function () {
  await this.attach('Step: I am on the login page');
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.navigate(appProps.baseUrl);
  await this.attach('Navigated to: ' + appProps.baseUrl);
});

// Step: Login using data from @dataFile tag
When('I login with valid credentials from json data file', async function () {
  await this.attach('Step: I login with valid credentials from data file');
  const dataFilePath = getDataFilePathFromTags(this);
  await this.attach('Data file path: ' + dataFilePath);
  const data = loadFirstData(dataFilePath); // data is an object with username and password
  const resolvedUsername = data.username;
  const resolvedPassword = data.password;
  await this.loginPage.login(resolvedUsername, resolvedPassword);
  await this.attach('Attempted login with username: **** and password: ****');
});

When('I enter credentials firstname and lastname and email and mobile', async function () {
  const dataFilePath = getDataFilePathFromTags(this);
  const data = loadFirstData(dataFilePath);
  await this.attach(`First Name: ${data.firstname}`);
  await this.attach(`Last Name: ${data.lastname}`);
  await this.attach(`Email: ${data.email}`);
  await this.attach(`Mobile: ${data.mobile}`);
  // Optionally, fill fields here using this.page or this.loginPage
});

When('I enter address from address data in address field', async function () {
  const dataFilePath = getDataFilePathFromTags(this);
  const data = loadFirstData(dataFilePath);
  await this.attach(`Address: ${JSON.stringify(data.address)}`);
  await this.attach(`Address: ${JSON.stringify(data.address, null, 2)}`);
  await this.attach(`Street: ${data.address.street}`);
  console.log('Address from data file:', data.address);
  console.log('Street from data file:', data.address.street);
  // Optionally, fill the address field here
});

//this steps should be moved into dashoard step definition file
// Then('I should see the dashboard', async function () {
//   await this.attach('Step: I should see the dashboard');
//   await this.loginPage.isDashboardVisible();
//   await this.attach('Dashboard is visible');
// });

