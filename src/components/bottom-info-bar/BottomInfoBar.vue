<!-- 底部状态更新信息展示栏 -->

<template>
  <v-layout-item
    model-value
    :style="{ zIndex: config.zIndex.bottomInfoBar }"
    position="bottom"
    class="d-flex align-end"
    style="pointer-events: none"
  >
    <!-- Clickable button -->
    <v-slide-y-reverse-transition leave-absolute>
      <v-btn
        v-show="appStore.isBottomBarVisible"
        :block="true"
        :color="appStore.getBottomBarBgColor"
        class="text-background rounded-0"
        style="pointer-events: all"
        @click.stop="onClickBottomBar"
      >
        <!-- Update message -->
        <v-scroll-y-transition leave-absolute>
          <span :key="String(appStore.bottomBarText)">
            {{ appStore.getBottomBarText }}
          </span>
        </v-scroll-y-transition>
      </v-btn>
    </v-slide-y-reverse-transition>
  </v-layout-item>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useAppStore } from '@/store/app';
import { useStatusStore } from '@/store/status';
import config from '@/config';

const emit = defineEmits(['manuallyUpdateData']);

const appStore = useAppStore();
const statusStore = useStatusStore();

let isProcessingClick = false;
let intervalId: NodeJS.Timeout;

// 触发定时器（定时器的功能是更新当前时间差，以及判断过期后停止。文字和底色的更新在 appStore 中根据时间差自动完成）
const startInterval = () => {
  // 启动有延迟，需要先更新一次
  appStore.statusUpdateTimeDiff =
    Date.now() - new Date(statusStore.lastUpdateTime).getTime();
  // 启动定时器
  clearInterval(intervalId); // 防止重复启动
  intervalId = setInterval(() => {
    appStore.statusUpdateTimeDiff =
      Date.now() - new Date(statusStore.lastUpdateTime).getTime();
    // 数据过期，停止定时器
    if (appStore.statusUpdateTimeDiff > config.dataExpirationTime) {
      clearInterval(intervalId);
      return;
    }
  }, config.bottomBarUpdateInterval);
};

defineExpose({
  startInterval,
  stopInterval: () => {
    clearInterval(intervalId);
  },
});

const onClickBottomBar = async () => {
  // 防止重复点击
  if (isProcessingClick || statusStore.isFetchingData) {
    return;
  }
  isProcessingClick = true;
  // 后端数据未更新，不刷新
  if (appStore.statusUpdateTimeDiff < config.backendUpdateInterval) {
    appStore.bottomBarText = '数据仍在有效期内';
    await new Promise((resolve) =>
      setTimeout(resolve, config.bottomBarUpdateInterval),
    );
    appStore.bottomBarText = null;
    isProcessingClick = false;
    return;
  }
  // 从后端获取新数据，同时重置定时器
  emit('manuallyUpdateData');
  isProcessingClick = false;
};

onMounted(() => {
  startInterval();
});
</script>
