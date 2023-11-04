// 侧栏导航列表
// 在 src/components/layouts/app-side-drawer/AppSideDrawer.vue 中使用

import {
  mdiBicycleElectric,
  mdiBookOpenPageVariantOutline,
  mdiForumOutline,
  mdiInformationOutline,
  mdiMapLegend,
} from '@mdi/js';
import { githubIcon } from '@/assets/custom-icons';
import config from '@/config';

// 外链用 href + target，内部路由用 to
export const sideDrawerNavList = [
  {
    title: '状态查询',
    prependIcon: mdiBicycleElectric,
    to: '/status',
  },
  {
    title: '充电桩位置示意图',
    prependIcon: mdiMapLegend,
    to: '/illustration',
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
    title: '项目文档',
    prependIcon: mdiBookOpenPageVariantOutline,
    href: config.projectDocUrl,
    target: '_blank',
  },
  {
    title: 'GitHub',
    prependIcon: githubIcon,
    href: 'https://github.com/Golevka2001/Where-Are-Available-Chargers',
    target: '_blank',
  },
];
