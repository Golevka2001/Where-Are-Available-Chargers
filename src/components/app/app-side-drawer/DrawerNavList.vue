<!-- 侧边栏导航链接 -->

<template>
  <v-list-item
    v-for="navItem in navList"
    :key="navItem.title"
    :href="navItem.href"
    :target="navItem.target"
    :to="navItem.to"
  >
    <template v-slot:prepend>
      <v-icon :icon="navItem.prependIcon" />
    </template>
    <v-list-item-title>
      {{ navItem.title }}
    </v-list-item-title>
  </v-list-item>
</template>

<script lang="ts" setup>
import {
  mdiBicycleElectric,
  mdiBookOpenPageVariantOutline,
  mdiForumOutline,
  mdiGithub,
  mdiMapLegend,
} from '@mdi/js';

// 外链用 `href`，内部路由用 `to`
const navList = [
  {
    title: '状态查询',
    prependIcon: mdiBicycleElectric,
    to: '/status',
  },
  {
    title: '充电桩位置示意图',
    prependIcon: mdiMapLegend,
    to: '/map',
  },
  {
    title: '反馈 & 建议',
    prependIcon: mdiForumOutline,
    to: '/feedback',
  },
  {
    title: '文档',
    prependIcon: mdiBookOpenPageVariantOutline,
    href: 'https://chargers.injs.eu/doc/',
    target: '_blank',
  },
  {
    title: 'GitHub',
    prependIcon: mdiGithub, // FIXME: github 图标已被 mdi 弃用
    href: 'https://github.com/Golevka2001/Where-Are-Available-Chargers',
    target: '_blank',
  },
];
</script>
