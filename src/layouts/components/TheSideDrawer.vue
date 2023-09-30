<!-- 侧边栏（抽屉） -->
<!-- 包含：导航链接、回到旧版按钮 -->
<!-- TODO：旧版页面跳转、导航链接完善、图标替换 -->

<template>
  <v-navigation-drawer
    v-model="appStore.isDrawerOpen"
    temporary
  >
    <!-- Nav links -->
    <v-list
      :items="navItems"
      density="compact"
      nav
    />

    <!-- Classic edition -->
    <template #append>
      <div class="pa-4">
        <!-- TODO：旧版链接和页面 -->
        <v-btn
          prepend-icon="mdi-undo-variant"
          block
        >
          回到旧版
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store/app';

const appStore = useAppStore();

// 外链用 `href`，内部路由用 `to`
const navItems = [
  {
    title: '充电桩位置示意图',
    props: {
      prependIcon: 'mdi-map-legend',
      to: '', // TODO
    },
  },
  {
    title: '反馈 & 建议',
    props: {
      prependIcon: 'mdi-forum-outline',
      href: '', // TODO
    },
  },
  {
    title: '文档',
    props: {
      prependIcon: 'mdi-book-open-page-variant-outline',
      href: '', // TODO
    },
  },
  {
    title: 'GitHub',
    props: {
      prependIcon: 'mdi-github', // FIXME: github 图标已被 mdi 弃用
      href: 'https://github.com/Golevka2001/Where-Are-Available-Chargers',
      target: '_blank',
    },
  },
];
</script>
