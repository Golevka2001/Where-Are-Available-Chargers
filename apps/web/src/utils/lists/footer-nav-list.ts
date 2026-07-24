// 页脚导航链接列表
// 在 src/components/layouts/app-footer/AppFooter.vue 中使用

// 区分外链和内部路由
export const footerNavList = [
  {
    text: 'Source Code',
    link: 'https://github.com/Golevka2001/Where-Are-Available-Chargers',
    isRouterLink: false,
  },
  {
    text: 'API',
    link: '/docs',
    isRouterLink: true,
  },
  {
    text: 'Feedback',
    link: '/feedback',
    isRouterLink: true,
  },
  {
    text: 'About',
    link: '/about',
    isRouterLink: true,
  },
];
