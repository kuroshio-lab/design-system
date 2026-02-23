import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';

const config: StorybookConfig = {
  stories: [
    '../packages/ui/src/**/*.stories.@(ts|tsx)',
    '../packages/components/src/**/*.stories.@(ts|tsx)',
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
  ],
  framework: { name: '@storybook/react-vite', options: {} },
  async viteFinal(config) {
    const { mergeConfig } = await import('vite');
    return mergeConfig(config, {
      css: {
        postcss: path.resolve(__dirname, '../postcss.config.js'),
      },
      resolve: {
        alias: {
          // Mirror root tsconfig.json path aliases
          '@kuroshio-lab/ui': path.resolve(__dirname, '../packages/ui/src/index.ts'),
          '@kuroshio-lab/components': path.resolve(__dirname, '../packages/components/src/index.ts'),
          '@kuroshio-lab/styles': path.resolve(__dirname, '../packages/styles/src/index.ts'),
          // Next.js mocks — prevent errors from components package
          'next/image': path.resolve(__dirname, '../packages/components/src/__mocks__/next-image.tsx'),
          'next/navigation': path.resolve(__dirname, '../packages/components/src/__mocks__/next-navigation.ts'),
          'next/dynamic': path.resolve(__dirname, '../packages/components/src/__mocks__/next-dynamic.tsx'),
        },
      },
    });
  },
};
export default config;
