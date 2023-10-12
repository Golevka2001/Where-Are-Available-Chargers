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
  <div style="max-width: 45rem; margin: auto">
    <!-- ^临时措施: 横向宽度大时，横向会撑满屏幕，先加一行限制宽度并居中 -->
    <!-- TODO: 若改为多栏布局，需另行调整 -->
    <loading-indicator v-if="showLoadingIndicator" />

    <div v-else>
      <status-overview />

      <status-detail />

      <bottom-info-bar v-scroll="onScroll" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useAppStore } from '@/store/app';
import { useStatusStore } from '@/store/status';
import config from '@/config';
import BottomInfoBar from '@/components/app/bottom-info-bar/BottomInfoBar.vue';
import LoadingIndicator from '@/components/app/loading-indicator/LoadingIndicator.vue';
import StatusDetail from '@/components/status-detail/StatusDetail.vue';
import StatusOverview from '@/components/status-overview/StatusOverview.vue';

const appStore = useAppStore();
const statusStore = useStatusStore();

const showLoadingIndicator = ref(true);
let lastScrollY = 0;

const onScroll = () => {
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
  showLoadingIndicator.value = true;
  await statusStore.updateData();

  // 之后在当前页面内不再显示加载动画
  showLoadingIndicator.value = false;

  // 数据更新完成后，底栏缓出
  setTimeout(() => {
    appStore.isBottomBarVisible = true;
  }, config.bottomBarInitDelay);

  // 设置定时器，自动更新数据一定次数
  let autoUpdateCount = 0;
  const intervalId = setInterval(() => {
    // TODO：停止自动更新的条件
    statusStore.updateData();
    ++autoUpdateCount;
    if (autoUpdateCount >= config.autoUpdateMaxTimes) {
      clearInterval(intervalId);
    }
  }, config.autoUpdateInterval);
});
</script>
