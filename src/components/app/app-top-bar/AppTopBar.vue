<!-- 顶部导航栏 -->
<!-- +------+-----------+-------+ -->
<!-- | Menu |    App    | Share | -->
<!-- | Btn  |   Title   |  Btn  | -->
<!-- +------+-----------+-------+ -->

<template>
  <v-app-bar class="text-center">
    <!-- Menu button -->
    <v-app-bar-nav-icon @click.stop="onClickMenuBtn">
      <transition
        name="switch-menu-icon"
        style="position: absolute"
      >
        <v-icon :key="menuIcon">
          {{ menuIcon }}
        </v-icon>
      </transition>
    </v-app-bar-nav-icon>

    <!-- Title -->
    <bar-title />

    <!-- Progress bar -->
    <progress-bar :absolute="true" />

    <!-- Share button & share menu -->
    <share-menu />
  </v-app-bar>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useAppStore } from '@/store/app';
import BarTitle from './BarTitle.vue';
import ShareMenu from './ShareMenu.vue';
import ProgressBar from './ProgressBar.vue';

import { mdiMenu } from '@mdi/js';
import { lineMenu } from '@/assets/img/custom-icons';

const appStore = useAppStore();

const menuIcon = computed(() => {
  return appStore.isDrawerOpen ? lineMenu : mdiMenu;
});

const onClickMenuBtn = () => {
  appStore.isDrawerOpen = !appStore.isDrawerOpen;
};
</script>

<style lang="less" scoped>
.switch-menu-icon-enter-active {
  animation: expand 0.2s;
}
.switch-menu-icon-leave-active {
  animation: shrink 0.2s;
}
@keyframes expand {
  from {
    transform: scaleY(0);
  }
  to {
    transform: scaleY(1);
  }
}
@keyframes shrink {
  from {
    transform: scaleY(1);
  }
  to {
    transform: scaleY(0);
  }
}
</style>
