const fs = require('fs');
const path = require('path');

const workspaceConfigPath = path.join(__dirname, '..', 'workspace.json');
const configDataJSON = fs.readFileSync(workspaceConfigPath).toString();
const config = JSON.parse(configDataJSON);

const version = config.version || 1

Object.keys(config.projects).forEach((project) => {
  const projectConfig = config.projects[project];
  const keyName = version === 1 ? 'architect' : 'targets';
  const build = projectConfig[keyName].build.options || {};

  if (!build.outputPath) {
    console.log(`Empty outputPath project ${project}.`)
    return;
  }

  const outputPath = build.outputPath.substring(0, 5);
  if ('dist/' !== outputPath) {
    console.log(`Invalid dist project ${project}.`)
    return;
  }

  const newOutputPath = build.outputPath.substring(5) + '/dist';
  projectConfig[keyName].build.options.outputPath = newOutputPath;

  config.projects[project] = projectConfig;
});

try {
  fs.unlinkSync(workspaceConfigPath + '.bak');
} catch (e) {
  console.warn('Backup file not exists.');
}

fs.copyFileSync(workspaceConfigPath, workspaceConfigPath + '.bak');
fs.writeFileSync(workspaceConfigPath, JSON.stringify(config, null, 2));
console.log('Success.');
