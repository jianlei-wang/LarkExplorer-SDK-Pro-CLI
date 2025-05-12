#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';
import enquirer from 'enquirer'; // 交互式提问库
import { fileURLToPath } from 'url';
// 获取当前文件的目录路径
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const run = async () => {
  // 1. 提问获取用户输入
  const answers = await enquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'Project name:',
      initial: 'my-app',
    },
    {
      type: 'select',
      name: 'template',
      message: 'Choose a template:',
      choices: ['default', 'typescript'],
    },
  ]);

  // 2. 拉取模板（假设模板在本地templates目录）
  const templatePath = path.join(__dirname, '../templates', answers.template);
  const targetPath = path.resolve(process.cwd(), answers.projectName);

  // 复制模板文件到目标目录
  await fs.mkdir(targetPath, { recursive: true });
  await fs.cp(templatePath, targetPath, { recursive: true });

  // 3. 替换占位符（如package.json中的{{name}}）
  const pkgPath = path.join(targetPath, 'package.json');
  const pkgContent = await fs.readFile(pkgPath, 'utf-8');
  const updatedPkg = pkgContent.replace(/\{\{name\}\}/g, answers.projectName);
  await fs.writeFile(pkgPath, updatedPkg);

  // 4. 可选：自动安装依赖
  console.log('Installing dependencies...');
  // const execAsync = promisify(exec);
  // await execAsync('npm install', { cwd: targetPath });

  console.log('Project created successfully!');
};

run().catch(console.error);
