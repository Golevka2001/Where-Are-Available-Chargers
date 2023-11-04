// 页脚导航链接列表
// 在 src/components/layouts/app-footer/AppFooter.vue 中使用

import config from '@/config';

// 区分外链和内部路由
export const footerNavList = [
  {
    text: 'Source Code',
    link: 'https://github.com/Golevka2001/Where-Are-Available-Chargers',
    isRouterLink: false,
  },
  {
    text: 'Issues',
    link: 'https://github.com/Golevka2001/Where-Are-Available-Chargers/issues',
    isRouterLink: false,
  },
  {
    text: 'API',
    link: config.apiDocUrl,
    isRouterLink: false,
  },
  {
    text: 'Docs',
    link: config.projectDocUrl,
    isRouterLink: false,
  },
  {
    text: 'About',
    link: '/about',
    isRouterLink: true,
  },
];
