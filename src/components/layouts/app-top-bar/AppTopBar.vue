<!-- 顶部导航栏 -->
<!-- +------+---------------+-------+ -->
<!-- | Menu |   App Title   | Share | -->
<!-- +------+---------------+-------+ -->

<template>
  <v-app-bar
    :style="{ zIndex: config.zIndex.appTopBar }"
    class="text-center"
  >
    <!-- Menu button -->
    <v-app-bar-nav-icon @click.stop="onClickMenuBtn">
      <transition
        name="switch-menu-icon"
        style="position: absolute"
      >
        <v-icon :key="String(appStore.isAppSideDrawerOpen)">
          {{ appStore.isAppSideDrawerOpen ? lineMenu : mdiMenu }}
        </v-icon>
      </transition>
    </v-app-bar-nav-icon>

    <!-- Title -->
    <bar-title />

    <!-- Progress bar -->
    <progress-bar />

    <!-- Share button & Share menu -->
    <share-menu />
  </v-app-bar>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store/app';
import config from '@/config';

import BarTitle from './BarTitle.vue';
import { ProgressBar, ShareMenu } from '@/components/global';

import { mdiMenu } from '@mdi/js';
import { lineMenu } from '@/assets/custom-icons';

const appStore = useAppStore();

const onClickMenuBtn = () => {
  appStore.isAppSideDrawerOpen = !appStore.isAppSideDrawerOpen;
  appStore.isStatusDetailDrawerOpen = false; // 同时关闭状态详情抽屉
};
</script>

<!-- 自定义菜单图标过渡动画 -->
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
