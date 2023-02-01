module.exports = {
  lang: 'zh-CN',
  title: "Chi's",
  description: 'Record life and codes.',

  lastUpdated: false,
  // srcDir: 'src', // 更改默认目录
  scrollOffset: 'header',
  cleanUrls: 'without-subfolders',

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/author_48x48.ico' }],
    ['meta', { name: 'theme-color', content: '#42b883' }],
  ],

  markdown: {
    headers: {
      level: [0, 0],
    },
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
        ],
      },
    ],

    sidebar: {
      '/guide': [
        {
          text: 'Introduction',
          collapsible: false,
          items: [{ text: 'Getting Started', link: '/guide/' }],
        },
        {
          text: 'Git',
          collapsible: false,
          items: [
            { text: '基础', link: '/guide/git/basic' },
            { text: '提交', link: '/guide/git/commit' },
          ],
        },
        {
          text: 'JavaScript',
          collapsible: false,
          items: [
            { text: '基础', link: '/guide/javascript/basic' },
            { text: '拓展', link: '/guide/javascript/expand' },
            { text: '工具函数', link: '/guide/javascript/utils' },
          ]
        },
        {
          text: 'TypeScript',
          collapsible: false,
          items: [
            { text: '基础', link: '/guide/typescript/basic' },
          ]
        },
        {
          text: 'Vue',
          collapsible: false,
          items: [
            { text: '基础', link: '/guide/vue/basic' },
            { text: '拓展', link: '/guide/vue/expand' },
            { text: '组件', link: '/guide/vue/components' },
          ]
        },
        {
          text: 'React',
          collapsible: false,
          items: [
            { text: '基础', link: '/guide/react/basic' },
          ]
        },
        {
          text: 'Webpack',
          collapsible: false,
          items: [
            { text: '基础', link: '/webpack/basic' },
          ]
        },
        {
          text: 'CSS',
          collapsible: false,
          items: [
            { text: '基础', link: '/guide/css/basic' },
          ]
        },
      ],
      '/notes': [
        {
          text: '旅游',
          collapsible: true,
          items: [
            { text: '骑行', link: '/notes/travel/cycling' },
          ],
        },
        {
          text: '阅读',
          collapsible: true,
          items: [
            { text: '读后感', link: '/notes/read/reaction' },
          ],
        },
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
        after: '。'
      },
      deadLinkReport: {
        before: '不介意的话请提交到',
        link: '这里',
        after: '，我们会跟进修复。'
      },
      // ariaDarkMode: '切换深色模式',
      // ariaSkipToContent: '直接跳到内容',
      // ariaToC: '当前页面的目录',
      // ariaMainNav: '主导航',
      // ariaMobileNav: '移动版导航',
      // ariaSidebarNav: '侧边栏导航',
    },

    editLink: {
      pattern: 'https://github.com/Carina957/vitepress-blog/edit/main/docs/:path',
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
      // appId: 'YZ38NEQ0IF',
      // apikey: '6a488e314c2da4ee16c4fdff1abf3a0a',
      // indexName: 'dev_chis',
      indexName: 'vuejs_cn2',
      appId: 'UURH1MHAF7',
      apiKey: 'c23eb8e7895f42daeaf2bf6f63eb4bf6',
      searchParameters: {
        facetFilters: ['version:v3']
      }
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
