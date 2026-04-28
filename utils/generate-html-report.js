const reporter = require('cucumber-html-reporter');
const fs = require('fs');
const path = require('path');

const jsonReportPath = path.join(__dirname, '../reports/cucumber_report.json');
const htmlReportPath = path.join(__dirname, '../reports/cucumber_report.html');

if (fs.existsSync(jsonReportPath)) {
  reporter.generate({
    theme: 'bootstrap',
    jsonFile: jsonReportPath,
    output: htmlReportPath,
    reportSuiteAsScenarios: true,
    launchReport: false,
    metadata: {
      "Test Environment": process.env.env || 'dev',
      "Browser": "Playwright - Chromium",
      "Platform": process.platform,
      "Executed": "Local"
    }
  });
  console.log('HTML report generated at:', htmlReportPath);
} else {
  console.warn('Cucumber JSON report not found. Skipping HTML report generation.');
}
