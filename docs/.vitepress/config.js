module.exports = {
  lang: 'zh-CN',
  title: "Chi's",
  description: 'Record life and codes.',

  lastUpdated: false,
  // srcDir: 'src', // 更改默认目录
  scrollOffset: 'header',
  // cleanUrls: 'without-subfolders',
  clearUrls: true,

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/author_48x48.ico' }],
    ['meta', { name: 'theme-color', content: '#42b883' }],
  ],

  markdown: {
    headers: false,
    // headers: {
    //   level: [0, 0],
    // },
  },

  themeConfig: {
    // siteTitle: false,
    logo: '/author_120x120.png',

    nav: [
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
            text: 'Vue',
            link: 'https://cn.vuejs.org/',
          },
          {
            text: 'React',
            link: 'https://beta.reactjs.org/',
          },
          {
            text: 'TypeScript',
            link: 'https://www.typescriptlang.org/zh/',
          },
        ],
      },
    ],

    sidebar: {
      '/guide': [
        {
          text: 'Getting Started', // Getting Started
          collapsed: true,
          items: [{ text: 'Introduction', link: '/guide/' }], // Introduction
        },
        {
          text: 'Git',
          collapsed: false,
          items: [
            { text: 'basic', link: '/guide/git/basic' },
            { text: 'commit', link: '/guide/git/commit' },
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
          text: 'Node',
          collapsed: false,
          items: [{ text: 'basic', link: '/guide/node/basic' }],
        },
        {
          text: 'CSS',
          collapsed: true,
          items: [{ text: 'basic', link: '/guide/css/basic' }],
        },
        {
          text: 'Vscode',
          collapsed: false,
          items: [{ text: 'config', link: 'guide/vscode/config' }],
        },
        {
          text: 'Markdown',
          collapsed: false,
          items: [{ text: 'Basic', link: 'guide/markdown/Basic' }],
        },
        {
          text: 'InterView',
          collapsed: false,
          items: [
            { text: 'interview', link: '/guide/interview/index' },
            { text: 'algorithm', link: '/guide/interview/algorithm' },
            {
              text: 'Enter the URL to see what happens to the page?',
              link: '/guide/interview/enter-url-happens',
            },
          ],
        },
      ],
      '/notes': [
        {
          text: 'travel',
          collapsed: false,
          items: [{ text: 'cycling', link: '/notes/travel/cycling' }],
        },
        {
          text: 'read',
          collapsed: false,
          items: [{ text: 'reaction', link: '/notes/read/reaction' }],
        },
        {
          text: 'Reproduction',
          link: '/notes/reproduction/index',
        },
        {
          text: 'Speech',
          link: '/notes/speech/index'
        }
      ],
    },

    i18n: {
      search: '搜索',
      menu: '菜单',
      toc: '本页目录',
      appearance: '外观',
      previous: '上一篇',
      next: '下一篇',
      pageNotFound: '页面未找到',
      returnToTop: '返回顶部',
      deadLink: {
        before: '你打开了一个不存在的链接：',
        after: '。',
      },
      deadLinkReport: {
        before: '不介意的话请提交到',
        link: '这里',
        after: '，我们会跟进修复。',
      },
      // ariaDarkMode: '切换深色模式',
      // ariaSkipToContent: '直接跳到内容',
      // ariaToC: '当前页面的目录',
      // ariaMainNav: '主导航',
      // ariaMobileNav: '移动版导航',
      // ariaSidebarNav: '侧边栏导航',
    },

    editLink: {
      pattern:
        'https://github.com/Carina957/vitepress-blog/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页',
      // text: 'Edit this page on GitHub',
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Carina957/vitepress-blog' },
      { icon: 'twitter', link: 'https://twitter.com' },
      { icon: 'discord', link: 'https://discord.com/invite/aYVNktYeEB' },
    ],

    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: "Copyright © 2023-present Chi's",
    },

    algolia: {
      // indexName: 'vuejs_cn2',
      // appId: 'UURH1MHAF7',
      // apiKey: 'c23eb8e7895f42daeaf2bf6f63eb4bf6',
      // searchParameters: {
      //   facetFilters: ['version:v3']
      // },

      indexName: 'carina957io',
      appId: '4L9RSE98LX',
      // apiKey: 'e7d88369a35a226f42f612999477f606',
      // apiKey: 'afeff9433e6037489688be24b45d025c',
      apiKey: '0e8806e938f2c8c4cbee3aea4e8d17aa',
    },

    localeLinks: {
      text: '简体中文',
      items: [
        { text: 'English', link: 'https://carina957.github.io' },
        { text: '日本語', link: 'https://carina957.github.io' },
        { text: 'Español', link: 'https://carina957.github.io' },
      ],
    },
  },
}
