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
    text: 'Issues',
    link: 'https://github.com/Golevka2001/Where-Are-Available-Chargers/issues',
    isRouterLink: false,
  },
  {
    text: 'API',
    link: 'https://chargers.injs.eu/doc/ver4_pub/api/get_status/',
    isRouterLink: false,
  },
  {
    text: 'Docs',
    link: 'https://chargers.injs.eu/doc/',
    isRouterLink: false,
  },
  {
    text: 'About',
    link: '/about',
    isRouterLink: true,
  },
];
