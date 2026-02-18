import path from 'path';

import { defineConfig } from 'vitest/config';

const testConfig = defineConfig({
  resolve: {
    alias: [
      {
        find: '@atoms',
        replacement: path.resolve(__dirname, './src/components/_atoms'),
      },
      {
        find: '@molecules',
        replacement: path.resolve(__dirname, './src/components/_molecules'),
      },
      {
        find: '@organisms',
        replacement: path.resolve(__dirname, './src/components/_organisms'),
      },
      {
        find: '@templates',
        replacement: path.resolve(__dirname, './src/components/_templates'),
      },
      {
        find: '@utilities',
        replacement: path.resolve(__dirname, './src/components/utilities'),
      },
      { find: '@hooks', replacement: path.resolve(__dirname, './src/hooks') },
      {
        find: '@styles',
        replacement: path.resolve(__dirname, './src/styles'),
      },
      {
        find: '@core',
        replacement: path.resolve(__dirname, './src/components/core'),
      },
      {
        find: '@helpers',
        replacement: path.resolve(__dirname, './src/helpers'),
      },
      {
        find: '@constants',
        replacement: path.resolve(__dirname, './src/constants'),
      },
      { find: '@utils', replacement: path.resolve(__dirname, './src/utils') },
      { find: '@typings', replacement: path.resolve(__dirname, './src/types') },
      { find: '@libs', replacement: path.resolve(__dirname, './src/libs') },
      { find: '@tests', replacement: path.resolve(__dirname, './src/tests') },
    ],
  },
  test: {
    env: {
      NEXT_PUBLIC_API_MOCKING: 'false',
      NEXT_PUBLIC_PADDLE_BASE_URL: 'https://mockapi.paddle.com',
    },
    globals: true,
    clearMocks: true,
    include: ['**/*.test.{ts,tsx}'],
    environment: 'jsdom',
    setupFiles: ['./src/tests/configs/setupTests.ts'],
    coverage: {
      provider: 'istanbul',
      enabled: false,
      reportsDirectory: 'testCoverage',
      reporter: ['json', 'text', 'lcov', 'clover'],
      include: [
        'src/**/*.{ts,tsx,}',
        'server/**/*.{ts,}',
        '!**/stories.{tsx,}',
        '!**/*.stories.{tsx,}',
        '!**/*.d.{ts,}',
        '!**/test.{ts,tsx,}',
        '!**/spec.{ts,tsx,}',
        '!**/*.test.{ts,tsx,}',
        '!**/*.spec.{ts,tsx,}',
        '!src/**/__test__/**/*',
        '!src/**/__test__/*',
        '!src/**/__tests__/**/*',
        '!src/**/__tests__/*',
        '!src/**/__mock__/**/*',
        '!src/**/__mock__/*',
        '!src/**/__mocks__/*',
        '!src/**/__mocks__/**/*',
        '!scripts/**/*',
      ],
      exclude: ['/node_modules/', './configs/vitest/setupTests.ts'],
    },
  },
});

export default testConfig;
