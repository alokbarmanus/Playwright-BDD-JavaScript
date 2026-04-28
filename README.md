# Playwright BDD JavaScript Framework

This project is a Playwright BDD framework using JavaScript, following the Page Object Model (POM) pattern for maintainability and reusability.

## Features
- Playwright Native Page Object Model
- Cucumber BDD with hooks
- BasePage class for shared actions
- Application properties in a separate config file
- Data-driven testing with JSON

## Folder Structure
- `pages/` - Page Object classes
- `tests/features/` - Gherkin feature files
- `tests/step-definitions/` - Step definitions
- `utils/` - Hooks and config
- `data/` - Test data JSON

## Demo Application
[OrangeHRM Demo](https://opensource-demo.orangehrmlive.com/web/index.php)

## Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run tests:
   ```bash
   npm test
   ```
