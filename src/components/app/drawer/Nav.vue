<!-- 侧边栏导航链接 -->

<template>
  <v-list-item
    v-for="navItem in navList"
    :key="navItem.title"
    :href="navItem.props.href"
    :target="navItem.props.target"
    :to="navItem.props.to"
  >
    <template v-slot:prepend>
      <v-icon :icon="navItem.props.prependIcon" />
    </template>
    <v-list-item-title>
      {{ navItem.title }}
    </v-list-item-title>
  </v-list-item>
</template>

<script setup lang="ts">
// 外链用 `href`，内部路由用 `to`
const navList = [
  {
    title: '状态查询',
    props: {
      prependIcon: 'mdi-bicycle-electric ',
      to: '/',
    },
  },
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
      to: '/feedback',
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
