<template>
  <v-btn
    :block="true"
    :color="appStore.getBottomBarBgColor"
    rounded="0"
    class="text-background"
    style="pointer-events: all"
    @click.stop="onClickBottomBar"
  >
    <v-scroll-y-transition leave-absolute>
      <span :key="String(appStore.bottomBarText)">
        {{ appStore.getBottomBarText }}
      </span>
    </v-scroll-y-transition>
  </v-btn>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store/app';
import { useStatusStore } from '@/store/status';
import config from '@/config';

const emit = defineEmits(['restartInterval']);

const appStore = useAppStore();
const statusStore = useStatusStore();

let isProcessingClick = false;

const onClickBottomBar = async () => {
  // 防止重复点击
  if (isProcessingClick) {
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
  // 从后端获取新数据
  await statusStore.updateData();
  // 如果已过期，需要重启定时器
  if (appStore.statusUpdateTimeDiff > config.backendUpdateInterval) {
    emit('restartInterval');
  }
  isProcessingClick = false;
};
</script>
