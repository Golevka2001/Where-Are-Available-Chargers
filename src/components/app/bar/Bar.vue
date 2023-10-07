<!-- 顶部导航栏 -->
<!-- +------+-----------+-------+ -->
<!-- | Menu |    App    | Share | -->
<!-- | Btn  |   Title   |  Btn  | -->
<!-- +------+-----------+-------+ -->

<template>
  <v-app-bar class="text-center">
    <!-- Menu button -->
    <v-app-bar-nav-icon @click.stop="clickMenuBtn" />

    <!-- Title -->
    <app-bar-title />

    <!-- Share button & share menu -->
    <app-bar-share-menu />
  </v-app-bar>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store/app';
import AppBarShareMenu from '@/components/app/bar/ShareMenu.vue';
import AppBarTitle from '@/components/app/bar/Title.vue';

const appStore = useAppStore();

const clickMenuBtn = () => {
  appStore.isDrawerOpen = !appStore.isDrawerOpen;
};
</script>
