# 介绍

记录自己的学习，保持不断的输出。

> 𝘓𝘪𝘧𝘦’𝘴 𝘢𝘵𝘵𝘪𝘵𝘶𝘥𝘦 𝘵𝘰 𝘺𝘰𝘶 𝘥𝘦𝘱𝘦𝘯𝘥𝘴 𝘰𝘯 𝘺𝘰𝘶𝘳 𝘢𝘵𝘵𝘪𝘵𝘶𝘥𝘦 𝘵𝘰 𝘪𝘵.

<b>Info</b>

![ID](https://img.shields.io/badge/🆔-Chi's/Carina957-%23323031?style=flat&labelColor=323031)

![wechat](https://img.shields.io/badge/-CHIS___xx-%23323031?style=flat&logo=wechat)

[![Netlify Status](https://api.netlify.com/api/v1/badges/9de6bd17-76f8-4fac-864b-23fbda42ad4b/deploy-status)](https://app.netlify.com/sites/chis-blog/deploys)

![license](https://img.shields.io/badge/license-MIT-green)

<b>Languages and Tools</b>

![HTML5](https://img.shields.io/badge/-HTML5-%23E34C26?style=flat&logo=html5&logoColor=ffffff)

![CSS3](https://img.shields.io/badge/-CSS3-%23197CBE?style=flat&logo=css3)

![JavaScript](https://img.shields.io/badge/-JavaScript-%23FFEE58?style=flat&logo=javascript&logoColor=fff)

![TypeScript](https://img.shields.io/badge/-TypeScript-%235da6ee?style=flat&logo=typescript&logoColor=ffffff)

![React](https://img.shields.io/badge/-React-%2320232A?logoColor=61DAFB&style=flat&logo=react)

![Vue](https://img.shields.io/badge/-vue-%23caecdd?style=flat&logo=vue.js)

![Shell](https://img.shields.io/badge/-Shell-%2389E051?style=flat&logo=powershell&logoColor=ffffff)

![Git](https://img.shields.io/badge/-Git-%23ED5A47?style=flat&logo=git&logoColor=%23ffffff)

![VS Code](https://img.shields.io/badge/-VSCode-%230066B8?style=flat&logo=visual-studio-code)

![Node.js](https://img.shields.io/badge/-Node.js-%23579050?style=flat&logo=node.js&logoColor=ffffff)

![Sass](https://img.shields.io/badge/-Sass-%23CB6498?style=flat&logo=sass&logoColor=ffffff)

![vite](https://img.shields.io/badge/-Vite-%23bcc0ff?style=flat&logo=vite)

![unocss](https://img.shields.io/badge/-Unocss-%23ccc?style=flat&logo=unocss&cacheSeconds=3600)

<VPTeamMembers align="center" size="small" :members="members" />

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>Our Team</template>
    <template #lead>...</template>
  </VPTeamPageTitle>
  <VPTeamMembers align="center" size="small" :members="members" />
  <VPTeamPageSection>
    <template #title>Partners</template>
    <template #lead>...</template>
    <template #members>
      <VPTeamMembers align="center" size="small" :members="members" />
    </template>
  </VPTeamPageSection>
</VPTeamPage>

<script setup>
import {
  VPTeamPage,
  VPTeamMembers,
  VPTeamPageTitle,
  VPTeamPageSection
} from 'vitepress/theme'

const members = [
  {
    avatar: 'https://github.com/Carina957.png',
    name: 'Chi\'s xu',
    title: 'Creator',
    org: 'Chi\'s',
    orgLink: 'https://chis-blog.netlify.app',
    desc: 'Record life and codes.',
    links: [
      { icon: 'github', link: 'https://github.com/Carina957' },
      { icon: 'twitter', link: 'https://twitter.com/chis__xx' },
      { icon: 'facebook', link: 'https://www.facebook.com' },
      { icon: 'instagram', link: 'https://www.instagram.com' },
      { icon: 'youtube', link: 'https://www.youtube.com' },
      { icon: 'linkedin', link: 'https://www.linkedin.com' },
    ]
  },
]
</script>
