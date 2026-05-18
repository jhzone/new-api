const { execSync, spawn } = require('child_process');
const fs = require('fs');

console.log('正在为 GalaxyCloud 初始化 New-API 环境...');

// 1. 自动下载 QuantumNous 编译好的 Linux 运行程序
const downloadUrl = 'https://github.com/QuantumNous/new-api/releases/latest/download/new-api'; 
if (!fs.existsSync('./new-api')) {
    console.log('下载可执行文件...');
    execSync(`curl -L ${downloadUrl} -o new-api && chmod +x new-api`);
}

// 2. 绑定 GalaxyCloud 分配给你的动态端口 (PORT 环境变量)
const port = process.env.PORT || 3000;
process.env.GLOBAL_WEB_BASE_PATH = port; 

console.log(`正在端口 ${port} 上启动 New-API 服务...`);

// 3. 拉起服务
const child = spawn('./new-api', [], {
    stdio: 'inherit',
    shell: true
});

child.on('close', (code) => {
    console.log(`进程退出，代码：${code}`);
});
