const fs = require('fs');
const path = require('path');

/**
 * Loads the first data object from a JSON file at the given relative path.
 * @param {string} relativePath - Path relative to project root (e.g. 'environments/dev/loginData.json')
 * @returns {object} The first data object in the array
 */
function loadFirstData(relativePath) {
  const dataFilePath = path.join(process.cwd(), ...relativePath.split('/'));
  const dataArr = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
  return dataArr[0];
}

module.exports = { loadFirstData };
