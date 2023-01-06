module.exports = {
  lang: 'zh-CN',
  title: "Chi's",
  description: 'Record life and codes.',

  lastUpdated: false,
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
        items: [
          {
            text: 'Git',
            link: '/guide/git',
          },
          {
            text: 'JavaScript',
            link: '/guide/javascript',
          },
          {
            text: 'TypeScript',
            link: '/guide/typescript',
          },
          {
            text: 'Vue',
            link: '/guide/vue',
          },
          {
            text: 'React',
            link: '/guide/react',
          },
          {
            text: 'CSS',
            link: '/guide/css',
          },
        ],
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
          collapsible: true,
          items: [{ text: 'Getting Started', link: '/guide/' }],
        },
        {
          text: 'Record',
          collapsible: true,
          items: [
            { text: 'Git', link: '/guide/git' },
            { text: 'JavaScript', link: '/guide/javascript' },
            { text: 'TypeScript', link: '/guide/typescript' },
            { text: 'Vue', link: '/guide/vue' },
            { text: 'React', link: '/guide/react' },
            { text: 'CSS', link: '/guide/css' },
          ],
        },
      ],
      '/notes': [
        {
          text: 'Travel',
          collapsible: true,
          items: [{ text: 'Cycling', link: '/notes/cycling' }],
        },
      ],
    },

    editLink: {
      pattern: 'https://github.com/vuejs/vitepress/edit/main/docs/:path',
      text: 'Edit this page on GitHub',
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
      { icon: 'twitter', link: '' },
      { icon: 'discord', link: '' },
    ],

    // docFooter: {
    //   prev: '上一篇',
    //   next: '下一篇',
    // },

    footer: {
      message: 'Released under the MIT License.',
      copyright: "Copyright © 2023-present Chi's",
    },

    algolia: {
      // appId: 'YZ38NEQ0IF',
      // apikey: '6a488e314c2da4ee16c4fdff1abf3a0a',
      // indexName: 'dev_chis',
      appId: '7H67QR5P0A',
      apiKey: 'deaab78bcdfe96b599497d25acc6460e',
      indexName: 'vitejs',
      searchParameters: {
        facetFilters: ['tags:en'],
      },
    },

    localeLinks: {
      text: 'English',
      items: [
        { text: '简体中文', link: 'https://carina957.github.io/' },
        { text: '日本語', link: 'https://carina957.github.io/' },
        { text: 'Español', link: 'https://carina957.github.io/' },
      ],
    },
  },
}
