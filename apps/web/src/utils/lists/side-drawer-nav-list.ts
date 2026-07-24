// 侧栏导航列表
// 在 src/components/layouts/app-side-drawer/AppSideDrawer.vue 中使用

import {
  mdiBicycleElectric,
  mdiChartTimelineVariant,
  mdiFileDocumentOutline,
  mdiForumOutline,
  mdiInformationOutline,
} from '@mdi/js';
import { githubIcon } from '@/assets/custom-icons';

// 外链用 href + target，内部路由用 to
export const sideDrawerNavList = [
  {
    title: '状态查询',
    prependIcon: mdiBicycleElectric,
    to: '/status',
  },
  {
    title: '历史数据',
    prependIcon: mdiChartTimelineVariant,
    to: '/history',
  },
  {
    title: '反馈 & 建议',
    prependIcon: mdiForumOutline,
    to: '/feedback',
  },
  {
    title: '关于我们',
    prependIcon: mdiInformationOutline,
    to: '/about',
  },
  {
    title: 'API 文档',
    prependIcon: mdiFileDocumentOutline,
    to: '/docs',
  },
  {
    title: 'GitHub',
    prependIcon: githubIcon,
    href: 'https://github.com/Golevka2001/Where-Are-Available-Chargers',
    target: '_blank',
  },
];
