<!-- 底部状态更新信息展示栏 -->

<template>
  <v-layout-item
    model-value
    position="bottom"
    class="d-flex align-end"
    style="pointer-events: none"
  >
    <v-slide-y-reverse-transition leave-absolute>
      <bar-button
        v-show="appStore.isBottomBarVisible"
        @manually-update-data="emit('manuallyUpdateData')"
      />
    </v-slide-y-reverse-transition>
  </v-layout-item>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useAppStore } from '@/store/app';
import { useStatusStore } from '@/store/status';
import config from '@/config';
import BarButton from './BarButton.vue';

defineExpose({ stopBottomBarInterval: () => clearInterval(intervalId) });
const emit = defineEmits(['manuallyUpdateData']);

const appStore = useAppStore();
const statusStore = useStatusStore();

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

onMounted(() => {
  startInterval();
});
</script>
