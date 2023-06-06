import { defineConfig, loadConfigFromFile, mergeConfig, UserConfigExport } from 'vite';
import packageConfig from './package.json';
import qiankun from 'vite-plugin-qiankun';
import { resolve } from 'path';

const pathResolve = (dir: string): string => {
  return resolve(__dirname, '.', dir);
};

const useDevMode = true; // 如果是在主应用中加载子应用 vite, 必须打开这个, 否则vite加载不成功, 单独运行没影响
// https://vitejs.dev/config/
export default defineConfig(async ({ command, mode }) => {
  const base = (await loadConfigFromFile({ command, mode }, pathResolve('../../vite.config.ts'))).config;
  const config: UserConfigExport = {
    base: 'http://localhost:10001/',
    server: {
      port: 10001,
      cors: true,
      origin: 'http://localhost:10001',
    },
    resolve: {
      alias: {
        '@': pathResolve('src'),
      },
    },
    plugins: [qiankun(`${packageConfig.name}`, { useDevMode })],
  };

  return mergeConfig(base, config);
});
