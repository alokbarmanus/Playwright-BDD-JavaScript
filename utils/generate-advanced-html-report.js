const reporter = require('multiple-cucumber-html-reporter');
const fs = require('fs');
const path = require('path');

const jsonReportPath = path.join(__dirname, '../reports/cucumber_report.json');
const htmlReportDir = path.join(__dirname, '../reports/html');

if (fs.existsSync(jsonReportPath)) {
  reporter.generate({
    jsonDir: path.dirname(jsonReportPath),
    reportPath: htmlReportDir,
    metadata: {
      browser: {
        name: 'chromium',
        version: 'latest',
      },
      device: 'Local test machine',
      platform: {
        name: process.platform,
        version: process.version,
      },
    },
    customData: {
      title: 'Run info',
      data: [
        { label: 'Project', value: 'Playwright BDD JavaScript' },
        { label: 'Release', value: '1.0.0' },
        { label: 'Test Environment', value: process.env.env || 'dev' },
        { label: 'Execution Start Time', value: new Date().toLocaleString() },
      ],
    },
    displayDuration: true,
    openReportInBrowser: false,
    pageTitle: 'BDD Test Report',
    reportName: 'Playwright BDD Automation Report',
    saveCollectedJSON: true,
    pageFooter: '<div style="text-align:center;">&copy; 2026 Your Company</div>',
    // logo: 'path/to/logo.png', // Uncomment and set your logo path if needed
  });
  console.log('Advanced HTML report generated at:', htmlReportDir);
} else {
  console.warn('Cucumber JSON report not found. Skipping advanced HTML report generation.');
}
