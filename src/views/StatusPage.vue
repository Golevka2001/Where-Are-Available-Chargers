<!-- 充电桩状态展示页面 -->
<!-- +---------------------+ -->
<!-- | +-----------------+ | -->
<!-- | | Status Overview | | -->
<!-- | +-----------------+ | -->
<!-- |                     | -->
<!-- | +-----------------+ | -->
<!-- | |  Status Detail  | | -->
<!-- | +-----------------+ | -->
<!-- +---------------------+ -->

<template>
  <loading-indicator v-if="isLoadingIndicatorVisible" />
  <div
    v-else
    :style="{ maxWidth: width < 960 ? '40rem' : '70rem' }"
    class="mx-auto"
  >
    <!-- Temporary: Anniversary -->
    <v-card
      color="pink-accent-1"
      density="compact"
      rounded="0"
      variant="tonal"
      width="100%"
    >
      <v-card-text class="pa-3 text-center">
        <span style="font-size: 1.2rem">&#129395;</span>
        &nbsp;&nbsp; Where-Are-Available-Chargers 上线一周年 &nbsp;&nbsp;
        <span style="font-size: 1.2rem">&#127874;</span>
      </v-card-text>
    </v-card>

    <div class="ma-8">
      <status-detail-drawer />

      <announcement-board
        v-if="config.announcementBoard.enabled"
        class="mb-6"
      />

      <weather-panel class="mb-6" />

      <status-overview />

      <bottom-info-bar
        v-scroll="onScroll"
        ref="bottomInfoBarComponent"
        @manually-update-data="manualUpdateData"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { onBeforeRouteLeave, useRouter } from 'vue-router';
import { useDisplay } from 'vuetify';
import { useAppStore } from '@/store/app';
import { useErrorStore } from '@/store/error';
import { useStatusStore } from '@/store/status';
import config from '@/config';

import { LoadingIndicator } from '@/components/global';
import {
  AnnouncementBoard,
  BottomInfoBar,
  StatusDetailDrawer,
  StatusOverview,
  WeatherPanel,
} from '@/components/status-page';

const router = useRouter();
const { width } = useDisplay();
const appStore = useAppStore();
const errorStore = useErrorStore();
const statusStore = useStatusStore();

const bottomInfoBarComponent = ref();
const isLoadingIndicatorVisible = ref(true);

let lastScrollY = 0;
let intervalId: NodeJS.Timeout;

// 触发定时器（定时器的功能是按照设定的间隔自动更新数据）
const startInterval = () => {
  clearInterval(intervalId); // 防止重复启动
  let autoUpdateCount = 0;
  intervalId = setInterval(async () => {
    if (router.currentRoute.value.path !== '/status') {
      // 路由不在当前页面时，清除定时器
      // 对应的问题是：若页面加载时触发 challenge，路由跳转不会被 onBeforeRouteLeave 捕获，导致定时器不被清除
      clearInterval(intervalId);
      return;
    }
    try {
      await statusStore.updateData();
      // 一定次数后停止定时器
      autoUpdateCount++;
      if (autoUpdateCount >= config.autoUpdateMaxTimes) {
        clearInterval(intervalId);
      }
    } catch (err) {
      // 数据更新失败，清除定时器
      clearInterval(intervalId);
      bottomInfoBarComponent.value.stopInterval();
      return;
    }
  }, config.autoUpdateInterval);
};

// 底栏被点击触发手动更新数据，拉取数据成功后重置定时器
const manualUpdateData = async () => {
  // 停止定时器
  clearInterval(intervalId);
  try {
    await statusStore.updateData();
    // 重置定时器
    bottomInfoBarComponent.value.startInterval();
    startInterval();
  } catch (err) {
    bottomInfoBarComponent.value.stopInterval();
    return;
  }
};

// 页面滚动，控制底栏的显示和隐藏
const onScroll = () => {
  if (
    appStore.bottomBarText !== null ||
    appStore.bottomBarBgColor !== null ||
    appStore.statusUpdateTimeDiff > config.dataExpirationTime
  ) {
    return;
  }
  if (scrollY > lastScrollY) {
    // 向下滚动：隐藏底栏，一定时间后显示
    appStore.isBottomBarVisible = false;
    setTimeout(() => {
      appStore.isBottomBarVisible = true;
    }, config.bottomBarReshowDelay);
  } else {
    // 向上滚动：显示底栏
    appStore.isBottomBarVisible = true;
  }
  lastScrollY = scrollY;
};

onMounted(async () => {
  // 页面挂载时更新数据，显示加载动画，之后在当前页面内不再显示加载动画
  isLoadingIndicatorVisible.value = true;
  try {
    await statusStore.updateData();
  } catch (err) {
    // 数据更新失败，跳转到错误页面
    errorStore.errorFrom = 'status';
    router.push('/error');
    return;
  }
  isLoadingIndicatorVisible.value = false;

  // 数据更新完成后，底栏缓出
  setTimeout(() => {
    appStore.isBottomBarVisible = true;
  }, config.bottomBarInitDelay);

  startInterval();
});

// 应使用路由守卫而不能是 onUnmounted
onBeforeRouteLeave(() => {
  clearInterval(intervalId);
});
</script>
