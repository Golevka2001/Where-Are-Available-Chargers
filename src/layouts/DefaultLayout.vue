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
    <app-bar />

    <app-drawer />

    <v-main class="pb-0">
      <router-view />
    </v-main>

    <app-footer v-if="appStore.isFooterVisible" />
  </v-app>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store/app';
import AppBar from '@/components/app/bar/Bar.vue';
import AppDrawer from '@/components/app/drawer/Drawer.vue';
import AppFooter from '@/components/app/footer/Footer.vue';

const appStore = useAppStore();
</script>
