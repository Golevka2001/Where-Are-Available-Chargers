<!-- 基础布局 -->
<!-- +-------------------------+ -->
<!-- | ==       TopBar         | -->
<!-- +--------+----------------+ -->
<!-- |        |                | -->
<!-- |  Side  |      Main      | -->
<!-- | Drawer |     Content    | -->
<!-- |        |                | -->
<!-- +--------+----------------+ -->
<!-- |          Footer         | -->
<!-- +-------------------------+ -->

<template>
  <v-app>
    <TheTopBar />

    <TheSideDrawer />

    <v-main>
      <router-view />
    </v-main>

    <TheFooter />
  </v-app>
</template>

<script lang="ts" setup>
import { TheTopBar, TheSideDrawer, TheFooter } from '@/layouts/components';
</script>
