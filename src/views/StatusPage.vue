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
  <div
    :style="{ maxWidth: width < 960 ? '40rem' : '70rem' }"
    class="mx-auto"
  >
    <loading-indicator v-if="isLoadingIndicatorVisible" />

    <div
      v-else
      class="ma-8"
    >
      <status-detail-drawer />

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
import { useRouter } from 'vue-router';
import { useDisplay } from 'vuetify';
import { useAppStore } from '@/store/app';
import { useStatusStore } from '@/store/status';
import { useWeatherStore } from '@/store/weather';
import config from '@/config';

import BottomInfoBar from '@/components/bottom-info-bar/BottomInfoBar.vue';
import LoadingIndicator from '@/components/loading-indicator/LoadingIndicator.vue';
import StatusDetailDrawer from '@/components/status-detail-drawer/StatusDetailDrawer.vue';
import StatusOverview from '@/components/status-overview/StatusOverview.vue';
import WeatherPanel from '@/components/weather-panel/WeatherPanel.vue';

const router = useRouter();
const { width } = useDisplay();
const appStore = useAppStore();
const statusStore = useStatusStore();
const weatherStore = useWeatherStore();

const bottomInfoBarComponent = ref();
const isLoadingIndicatorVisible = ref(true);

let lastScrollY = 0;
let intervalId: NodeJS.Timeout;

// 触发定时器（定时器的功能是按照设定的间隔自动更新数据）
const startInterval = () => {
  clearInterval(intervalId); // 防止重复启动
  let autoUpdateCount = 0;
  intervalId = setInterval(async () => {
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

const onScroll = () => {
  if (
    appStore.bottomBarText !== null ||
    appStore.bottomBarBgColor !== null ||
    appStore.statusUpdateTimeDiff > config.dataExpirationTime
  ) {
    return;
  }
  // 向下滚动：隐藏底栏，一定时间后显示
  if (scrollY > lastScrollY) {
    appStore.isBottomBarVisible = false;
    setTimeout(() => {
      appStore.isBottomBarVisible = true;
    }, config.bottomBarReshowDelay);
  }
  // 向上滚动：显示底栏
  else {
    appStore.isBottomBarVisible = true;
  }
  lastScrollY = scrollY;
};

onMounted(async () => {
  // 页面挂载时更新数据，显示加载动画
  isLoadingIndicatorVisible.value = true;
  try {
    await statusStore.updateData();
    weatherStore.updateData();
  } catch (err) {
    // 数据更新失败，跳转到错误页面
    router.push('/error');
    return;
  }

  // 之后在当前页面内不再显示加载动画
  isLoadingIndicatorVisible.value = false;

  // 数据更新完成后，底栏缓出
  setTimeout(() => {
    appStore.isBottomBarVisible = true;
  }, config.bottomBarInitDelay);

  startInterval();
});
</script>
