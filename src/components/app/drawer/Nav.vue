<!-- 侧边栏导航链接 -->

<template>
  <v-list-item
    v-for="navItem in navList"
    @click="clickNavItem"
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

<script setup lang="ts">
import { useAppStore } from '@/store/app';

const appStore = useAppStore();

const clickNavItem = () => {
  appStore.isDrawerOpen = false;
};

// 外链用 `href`，内部路由用 `to`
const navList = [
  {
    title: '状态查询',
    prependIcon: 'mdi-bicycle-electric ',
    to: '/',
  },
  {
    title: '充电桩位置示意图',
    prependIcon: 'mdi-map-legend',
    to: '', // TODO
  },
  {
    title: '反馈 & 建议',
    prependIcon: 'mdi-forum-outline',
    to: '/feedback',
  },
  {
    title: '文档',
    prependIcon: 'mdi-book-open-page-variant-outline',
    href: '', // TODO
  },
  {
    title: 'GitHub',
    prependIcon: 'mdi-github', // FIXME: github 图标已被 mdi 弃用
    href: 'https://github.com/Golevka2001/Where-Are-Available-Chargers',
    target: '_blank',
  },
];
</script>
