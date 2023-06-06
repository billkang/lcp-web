import { defineConfig, loadConfigFromFile, mergeConfig } from 'vite';
import { resolve } from 'path';

const pathResolve = (dir: string): string => {
  return resolve(__dirname, '.', dir);
};

// https://vitejs.dev/config/
export default defineConfig(async ({ command, mode }) => {
  const base = (await loadConfigFromFile({ command, mode }, pathResolve('../../vite.config.ts'))).config;
  const config = {
    resolve: {
      alias: {
        '@': pathResolve('src'),
      },
    },
    server: {
      port: 3000, // 设置服务启动端口号
      open: true, // 设置服务启动时是否自动打开浏览器
      cors: true, // 允许跨域
    },
  };

  return mergeConfig(base, config);
});
