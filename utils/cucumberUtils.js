
function getDataFilePathFromTags(context) {
  const tags = context._scenarioTags;
  if (!tags) {
    throw new Error('No scenario tags found in context');
  }
  const dataFileTag = tags.find(tag => tag.name.startsWith('@dataFile:'));
  if (!dataFileTag) {
    throw new Error('No @dataFile tag found for scenario');
  }
  let filePath = dataFileTag.name.replace('@dataFile:', '');
  // Replace ${environments} with process.env.environments or default to 'dev'
  const envName = process.env.environments || 'dev';
  filePath = filePath.replace('${env}', envName);
  return filePath;
}

module.exports = { getDataFilePathFromTags };
