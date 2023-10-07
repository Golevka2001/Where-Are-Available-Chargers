<!-- 移除页脚的布局 -->
<!-- +--------------------------+ -->
<!-- | ==       App Bar         | -->
<!-- +--------+-----------------+ -->
<!-- |        |                 | -->
<!-- |  App   |      Main       | -->
<!-- | Drawer |     Content     | -->
<!-- |        |                 | -->
<!-- +--------+-----------------+ -->

<template>
  <v-app>
    <app-bar />

    <app-drawer />

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import AppBar from '@/components/app/bar/Bar.vue';
import AppDrawer from '@/components/app/drawer/Drawer.vue';
</script>
