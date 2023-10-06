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
      density="compact"
      nav
    >
      <v-list-item
        v-for="item in navItems"
        :key="item.title"
        :to="item.props.to"
        :href="item.props.href"
        :target="item.props.target"
      >
        <template v-slot:prepend>
          <v-icon :icon="item.props.prependIcon" />
        </template>
        <v-list-item-title>
          {{ item.title }}
        </v-list-item-title>
      </v-list-item>
      <v-list-item @click="clickThemeButton">
        <template v-slot:prepend>
          <v-icon
            :icon="
              theme.global.current.value.dark
                ? 'mdi-weather-sunny'
                : 'mdi-weather-night'
            "
          />
        </template>
        <v-list-item-title>
          {{ theme.global.current.value.dark ? '浅色模式' : '深色模式' }}
        </v-list-item-title>
      </v-list-item>
    </v-list>

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
import { useTheme } from 'vuetify';
import { useAppStore } from '@/store/app';

const appStore = useAppStore();
const theme = useTheme();

const clickThemeButton = () => {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
};

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
