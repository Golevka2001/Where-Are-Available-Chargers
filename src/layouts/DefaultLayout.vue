<!-- 默认布局 -->
<!-- +--------------------------+ -->
<!-- | ==       App Bar         | -->
<!-- +--------+-----------------+ -->
<!-- |        |                 | -->
<!-- |  App   |      Main       | -->
<!-- | Drawer |     Content     | -->
<!-- |        |                 | -->
<!-- +--------+-----------------+ -->
<!-- |        App Footer        | -->
<!-- +--------------------------+ -->

<template>
  <v-app>
    <app-top-bar />

    <app-side-drawer />

    <v-main class="pb-0">
      <router-view />
    </v-main>

    <app-footer v-if="appStore.isFooterVisible" />
  </v-app>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store/app';
import AppFooter from '@/components/app/app-footer/AppFooter.vue';
import AppSideDrawer from '@/components/app/app-side-drawer/AppSideDrawer.vue';
import AppTopBar from '@/components/app/app-top-bar/AppTopBar.vue';

const appStore = useAppStore();
</script>
