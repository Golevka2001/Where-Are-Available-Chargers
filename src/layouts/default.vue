<!-- 默认布局 -->
<!-- +-------------------------+ -->
<!-- | ==       AppBar         | -->
<!-- +--------+----------------+ -->
<!-- |        |                | -->
<!-- |  App   |      Main      | -->
<!-- | Drawer |     Content    | -->
<!-- |        |                | -->
<!-- +--------+----------------+ -->
<!-- |        AppFooter        | -->
<!-- +-------------------------+ -->

<template>
  <v-app>
    <app-bar />

    <app-drawer />

    <v-main>
      <router-view />
    </v-main>

    <app-footer />
  </v-app>
</template>

<script lang="ts" setup>
import AppBar from '@/components/app/bar/Bar.vue';
import AppDrawer from '@/components/app/drawer/Drawer.vue';
import AppFooter from '@/components/app/footer/Footer.vue';
</script>
