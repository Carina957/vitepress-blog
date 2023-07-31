import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Chi's",
  lang: 'zh-CN',
  description: 'Record life and codes.',
  cleanUrls: true,
  // base: '/blog/',
  // srcDir: 'docs',
  outDir: '.vitepress/dist',
  cacheDir: '.vitepress/cache',

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/author_48x48.ico' }],
    ['meta', { name: 'theme-color', content: '#42b883' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    [
      'meta',
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0',
      },
    ],
  ],

  locales: {
    root: { label: 'English' },
    zh: { label: '简体中文', link: 'https://cn.vitejs.dev' },
    ja: { label: '日本語', link: 'https://ja.vitejs.dev' },
    es: { label: 'Español', link: 'https://es.vitejs.dev' },
    pt: { label: 'Português', link: 'https://pt.vitejs.dev' },
  },

  themeConfig: {
    logo: '/author_120x120.png',
    outline: [2, 3],
    outlineTitle: 'On this page',
    carbonAds: {
      code: 'your-carbon-code',
      placement: 'your-carbon-placement',
    },

    editLink: {
      pattern:
        'https://github.com/Carina957/vitepress-blog/edit/main/docs/:path',
      text: 'Edit this page on GitHub',
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Carina957' },
      { icon: 'twitter', link: 'https://twitter.com/chis__xx' },
      { icon: 'discord', link: 'https://discord.com/invite/aYVNktYeEB' },
      { icon: 'facebook', link: 'https://www.facebook.com' },
      { icon: 'instagram', link: 'https://www.instagram.com' },
      { icon: 'youtube', link: 'https://www.youtube.com' },
      { icon: 'linkedin', link: 'https://www.linkedin.com' },
      { icon: 'slack', link: 'https://slack.com' },
      { icon: 'mastodon', link: 'https://mastodon.social' },
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: "Copyright © 2023-present Chi's",
    },

    algolia: {
      indexName: 'carina957io',
      appId: '4L9RSE98LX',
      apiKey: '0e8806e938f2c8c4cbee3aea4e8d17aa',
    },

    nav: nav(),

    sidebar: {
      '/guide': sidebarGuide(),
      '/notes': sidebarNotes(),
    },
  },
})

function nav() {
  return [
    {
      text: 'Guide',
      link: '/guide/',
      activeMatch: '/guide/',
    },
    { text: 'Notes', link: '/notes/', activeMatch: '/notes/' },
    {
      text: 'FrontEnd',
      items: [
        {
          text: 'Link',
          items: [
            {
              text: 'Vue',
              link: 'https://cn.vuejs.org',
            },
            {
              text: 'React',
              link: 'https://beta.reactjs.org',
            },
            {
              text: 'Nuxt',
              link: 'https://www.nuxtjs.cn',
            },
            {
              text: 'Next',
              link: 'https://nextjs.org',
            },
            {
              text: 'TypeScript',
              link: 'https://www.typescriptlang.org/zh',
            },
            {
              text: 'Vite',
              link: 'https://vitejs.dev',
            },
          ],
        },
      ],
    },
  ]
}

function sidebarGuide() {
  return [
    {
      text: 'Getting Started', // Getting Started
      collapsed: true,
      items: [{ text: 'Introduction', link: '/guide/' }], // Introduction
    },
    {
      text: 'Git',
      collapsed: false,
      items: [
        {
          text: 'basic',
          link: '/guide/git/basic',
        },
        { text: 'commit', link: '/guide/git/commit' },
        {
          text: 'article',
          items: [
            { text: 'End_of_line', link: '/guide/git/article/end-of-line' },
            { text: 'SSH_config', link: '/guide/git/article/ssh-config' },
          ],
        },
      ],
    },
    {
      text: 'JavaScript',
      collapsed: false,
      items: [
        { text: 'basic', link: '/guide/javascript/basic' },
        { text: 'expand', link: '/guide/javascript/expand' },
        { text: 'utils', link: '/guide/javascript/utils' },
      ],
    },
    {
      text: 'TypeScript',
      collapsed: false,
      items: [
        { text: 'basic', link: '/guide/typescript/basic' },
        { text: 'directives', link: '/guide/typescript/directives' },
        { text: 'utils', link: '/guide/typescript/utils' },
      ],
    },
    {
      text: 'Vue',
      collapsed: false,
      items: [
        { text: 'basic', link: '/guide/vue/basic' },
        { text: 'expand', link: '/guide/vue/expand' },
        { text: 'components', link: '/guide/vue/components' },
        { text: 'directives', link: '/guide/vue/directives' },
      ],
    },
    {
      text: 'Node',
      collapsed: false,
      items: [{ text: 'basic', link: '/guide/node/basic' }],
    },
    {
      text: 'Nuxt',
      collapsed: false,
      items: [{ text: 'basic', link: '/guide/nuxt/basic' }],
    },
    {
      text: 'React',
      collapsed: false,
      items: [
        { text: 'basic', link: '/guide/react/basic' },
        { text: 'expand', link: '/guide/react/expand' },
      ],
    },
    {
      text: 'Webpack',
      collapsed: false,
      items: [{ text: 'basic', link: '/guide/webpack/basic' }],
    },
    {
      text: 'CSS',
      collapsed: false,
      items: [
        { text: 'basic', link: '/guide/css/basic' },
        { text: 'framework', link: '/guide/css/framework' },
      ],
    },
    {
      text: 'Vscode',
      collapsed: false,
      items: [
        { text: 'basic', link: 'guide/vscode/basic' },
        { text: 'config', link: 'guide/vscode/config' },
      ],
    },
    {
      text: 'Markdown',
      collapsed: false,
      items: [{ text: 'Basic', link: 'guide/markdown/basic' }],
    },
    {
      text: 'Deploy',
      collapsed: false,
      items: [{ text: 'Github Actions', link: 'guide/deploy/github-actions' }],
    },
    {
      text: 'InterView',
      collapsed: true,
      items: [
        { text: 'interview', link: '/guide/interview/index' },
        { text: 'algorithm', link: '/guide/interview/algorithm' },
        {
          text: 'Enter the URL to see what happens to the page?',
          link: '/guide/interview/enter-url-happens',
        },
      ],
    },
  ]
}

function sidebarNotes() {
  return [
    {
      text: 'travel',
      collapsed: false,
      items: [{ text: 'cycling', link: '/notes/travel/cycling' }],
    },
    {
      text: 'read',
      collapsed: false,
      items: [
        { text: 'dragon-raja', link: '/notes/read/dragon-raja' },
        {
          text: 'excerpt',
          link: '/notes/read/excerpt',
        },
        {
          text: 'writing',
          link: '/notes/read/writing',
        },
      ],
    },
    {
      text: 'collection',
      collapsed: false,
      items: [{ text: 'article', link: '/notes/collection/article' }],
    },
    {
      text: 'others',
      collapsed: false,
      items: [
        {
          text: 'Share',
          items: [
            { text: 'Reproduction', link: '/notes/others/reproduction' },
            { text: 'ComponentsShare', link: '/notes/others/share' },
            { text: 'Notebook', link: '/notes/others/notebook' },
            { text: 'Changelog', link: '/notes/others/changelog' },
          ],
        },
      ],
    },
  ]
}
