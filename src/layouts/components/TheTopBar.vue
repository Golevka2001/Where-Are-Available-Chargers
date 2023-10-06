<!-- 顶部导航栏 -->
<!-- 包含：菜单按钮、标题、分享菜单 -->

<template>
  <v-app-bar class="text-center">
    <!-- Menu button -->
    <v-app-bar-nav-icon
      @click.stop="appStore.isDrawerOpen = !appStore.isDrawerOpen"
    />

    <!-- Title -->
    <v-app-bar-title class="mx-0 text-center">
      <span>&#128268;&#128545;</span>
      <router-link
        to="/"
        class="font-weight-medium text-decoration-none text-no-wrap"
        style="font-size: 1rem; color: inherit"
      >
        Where Are Available Chargers
      </router-link>
    </v-app-bar-title>

    <!-- Share button & menu -->
    <TheShareMenu />
  </v-app-bar>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store/app';
import TheShareMenu from '@/layouts/components/TheShareMenu.vue';

const appStore = useAppStore();
</script>
