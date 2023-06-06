const fs = require('fs-extra');
const { resolve } = require('path');
const exec = require('child_process').exec;

// 拉取微应用模板
const cloneRepo = meta => {
  fs.copySync(resolve(__dirname, './micro-app'), resolve(__dirname, `../../packages/${meta.appName}`));
};

// 修改微应用 package.json 和 vite.config.ts
const replaceName = async meta => {
  const filePath = `../../packages/${meta.appName}/package.json`;
  const jsonFile = fs.readFileSync(resolve(__dirname, filePath), 'utf-8');
  const jsonContent = JSON.parse(jsonFile);
  console.log(jsonContent);
  jsonContent.name = meta.appName;
  const newJsonContent = JSON.stringify(jsonContent, null, 2);
  fs.writeFile(resolve(__dirname, filePath), newJsonContent, err => {
    if (err) console.log(err);
  });

  const viteConfigPath = `../../packages/${meta.appName}/vite.config.ts`;
  const viteConfigFile = fs.readFileSync(resolve(__dirname, viteConfigPath), 'utf-8');
  const viteConfigContent = viteConfigFile.replace(/port:\s10001/g, `port: ${meta.port}`);
  fs.writeFile(resolve(__dirname, viteConfigPath), viteConfigContent, err => {
    if (err) console.log(err);
  });
};

// 修改 qiankun/apps.ts
const writeMicroApps = async newApps => {
  const reg = /const\sapps:\smicroApp\[\]\s=\s\[(.|\s)*export\sdefault\sapps/;
  const filePath = `../../packages/main/src/qiankun/apps.ts`;
  const microAppsFile = fs.readFileSync(resolve(__dirname, filePath), 'utf-8');
  const microAppsContent = microAppsFile.replace(reg, `const apps: microApp[] = ${newApps} \r\n export default apps`);
  fs.writeFile(resolve(__dirname, filePath), microAppsContent, err => {
    if (err) console.log(err);
  });
};

// 修改 qiankun/list.json
const writeAppsFile = async meta => {
  const filePath = `../../packages/main/src/qiankun/list.json`;
  const jsonFile = fs.readFileSync(resolve(__dirname, filePath), 'utf-8');
  const jsonContent = JSON.parse(jsonFile);
  jsonContent.push({
    name: meta.appName,
    entry: `//localhost:${meta.port}`,
    container: '#view-main',
    activeRule: `/${meta.appName}`,
    port: meta.port,
  });
  const newJsonContent = JSON.stringify(jsonContent, null, 2);
  fs.writeFile(resolve(__dirname, filePath), newJsonContent, err => {
    if (err) console.log(err);
  });
  return newJsonContent;
};

module.exports = async meta => {
  cloneRepo(meta);
  await replaceName(meta);
  const newApps = await writeAppsFile(meta);
  await writeMicroApps(newApps);
  const workerProcess = exec(`pnpm install`);
  workerProcess.stdout.on('data', data => {
    console.log('stdout: ' + data);
  });

  workerProcess.stderr.on('data', data => {
    console.log('stderr: ' + data);
  });
  console.log(`微服务创建成功，请在 pnpm install 完成之后，前往 packages/${meta.appName} 目录进行开发`);
};
