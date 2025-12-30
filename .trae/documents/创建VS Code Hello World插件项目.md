# 使用pnpm创建VS Code Hello World插件项目

## 实现步骤

1. **安装依赖工具**
   - 使用pnpm全局安装Yeoman和generator-code

2. **生成插件项目**
   - 运行`yo code`命令生成Hello World插件项目
   - 选择TypeScript作为开发语言
   - 选择Hello World模板

3. **处理文件夹嵌套问题**
   - 检查生成的项目结构，确保没有多余的嵌套文件夹
   - 如果生成的项目被放在子文件夹中，将所有文件移动到根目录

4. **配置pnpm**
   - 确保项目使用pnpm作为包管理器
   - 检查package.json中的依赖配置

5. **验证项目结构**
   - 确认核心文件存在：package.json、tsconfig.json、src/extension.ts等
   - 配置VS Code调试环境

## 技术栈
- TypeScript
- VS Code Extension API
- pnpm
- Yeoman + generator-code

这个计划将确保使用pnpm创建一个完整的、可运行的VS Code Hello World插件项目，并且不会有多余的文件夹嵌套问题。