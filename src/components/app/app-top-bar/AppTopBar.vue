<!-- 顶部导航栏 -->
<!-- +------+-----------+-------+ -->
<!-- | Menu |    App    | Share | -->
<!-- | Btn  |   Title   |  Btn  | -->
<!-- +------+-----------+-------+ -->

<template>
  <v-app-bar class="text-center">
    <!-- Menu button -->
    <v-app-bar-nav-icon @click.stop="onClickMenuBtn" />

    <!-- Title -->
    <bar-title />

    <!-- Progress bar -->
    <progress-bar :absolute="true" />

    <!-- Share button & share menu -->
    <share-menu />
  </v-app-bar>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store/app';
import BarTitle from './BarTitle.vue';
import ShareMenu from './ShareMenu.vue';
import ProgressBar from './ProgressBar.vue';

const appStore = useAppStore();

const onClickMenuBtn = () => {
  appStore.isDrawerOpen = !appStore.isDrawerOpen;
};
</script>
