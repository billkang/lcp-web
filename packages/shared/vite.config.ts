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
  };
  return mergeConfig(base, config);
});
