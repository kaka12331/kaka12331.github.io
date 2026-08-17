import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// GitHub Actions 会自动提供 GITHUB_REPOSITORY，例如 kaka12331/my-site。
const [owner = 'kaka12331', repository = ''] = (process.env.GITHUB_REPOSITORY ?? '').split('/');
const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';
const isUserSite = repository === `${owner}.github.io`;
const inferredSite = isGitHubActions ? `https://${owner}.github.io` : 'http://localhost:4321';
const inferredBase = isGitHubActions && repository && !isUserSite ? `/${repository}` : '/';

export default defineConfig({
  site: process.env.SITE_URL || inferredSite,
  base: process.env.BASE_PATH || inferredBase,
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      wrap: true,
    },
  },
});
