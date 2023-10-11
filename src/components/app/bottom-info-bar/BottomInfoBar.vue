<!-- 底部状态更新信息展示栏 -->
<!-- TODO：拆分 -->

<template>
  <v-layout-item
    v-scroll="onScroll"
    model-value
    position="bottom"
    class="d-flex align-end"
    style="pointer-events: none"
  >
    <v-slide-y-reverse-transition leave-absolute>
      <v-btn
        v-show="isBarVisible"
        :block="true"
        :color="barBackground"
        rounded="0"
        class="text-background"
        style="pointer-events: all"
        @click.stop="clickBottomBar"
      >
        <v-scroll-y-transition leave-absolute>
          <span :key="String(isBarClicked)">
            {{ barText }}
          </span>
        </v-scroll-y-transition>
      </v-btn>
    </v-slide-y-reverse-transition>
  </v-layout-item>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useStatusStore } from '@/store/status';
import config from '@/config';

const statusStore = useStatusStore();

const isBarVisible = ref(false);
const barBackground = ref('');
const barText = ref('');

let isBarClicked = false;
let lastScrollY = 0;

let intervalId: NodeJS.Timeout;
let isIntervalStarted = false;

// 背景色渐变：绿[rgb(76, 175, 80)] -> 橙[rgb(255, 152, 0)]
const getBarBackground = (diff: number): string => {
  if (diff < config.dataExpirationTime / 6) {
    return 'green';
  }
  if (diff > config.dataExpirationTime) {
    return 'orange';
  }
  const percent = diff / config.dataExpirationTime;
  const r = 76 + Math.floor((255 - 76) * percent);
  const g = 175 + Math.floor((152 - 175) * percent);
  const b = 80 + Math.floor((0 - 80) * percent);
  return `rgb(${r}, ${g}, ${b})`;
};

// 文字信息：更新于 xxx
const getUpdateMessage = (diff: number): string => {
  if (diff > config.dataExpirationTime) {
    return '数据已过期，点此刷新';
  }
  const diffSeconds = Math.floor(diff / 1000);
  if (diffSeconds < 5) {
    return `更新于 刚刚`;
  } else if (diffSeconds < 60) {
    return `更新于 ${diffSeconds} 秒前`;
  } else if (diffSeconds < 3600) {
    return `更新于 ${Math.floor(diffSeconds / 60)} 分钟前`;
  } else if (diffSeconds < 86400) {
    return `更新于 ${Math.floor(diffSeconds / 3600)} 小时前`;
  } else {
    return `更新于 ${Math.floor(diffSeconds / 86400)} 天前`;
  }
};

// 更新底部状态栏
const updateBottomBar = () => {
  const diff = Date.now() - new Date(statusStore.lastUpdateTime).getTime();
  barBackground.value = getBarBackground(diff);
  // 被点击时需要一般需要显示其他文字，不更新
  if (!isBarClicked) {
    barText.value = getUpdateMessage(diff);
  }
  // 数据过期，停止定时器
  if (diff > config.dataExpirationTime) {
    clearInterval(intervalId);
    isIntervalStarted = false;
    return;
  }
};

// 触发定时器
const startInterval = () => {
  if (isIntervalStarted) {
    return;
  }
  isIntervalStarted = true;
  updateBottomBar(); // 定时器启动后有 1s 的延迟，需要手动更新一次
  intervalId = setInterval(() => {
    updateBottomBar();
  }, config.bottomBarInterval);
};

const clickBottomBar = async () => {
  if (isBarClicked) {
    return;
  }
  isBarClicked = true;
  const diff = Date.now() - new Date(statusStore.lastUpdateTime).getTime();
  // 后端数据未更新，不刷新
  if (diff < config.backendUpdateInterval) {
    barText.value = '数据仍在有效期内';
    await new Promise((resolve) =>
      setTimeout(resolve, config.bottomBarInterval),
    );
  }
  // 从后端获取新数据
  else {
    barText.value = '正在更新数据，请稍候...';
    await statusStore.updateData(true);
  }
  isBarClicked = false;
  isIntervalStarted ? updateBottomBar() : startInterval();
};

const onScroll = () => {
  // 向下滚动：隐藏底栏，一定时间后显示
  if (scrollY > lastScrollY) {
    isBarVisible.value = false;
    setTimeout(() => {
      isBarVisible.value = true;
    }, config.bottomBarShowDelay);
  }
  // 向上滚动：显示底栏
  else {
    isBarVisible.value = true;
  }
  lastScrollY = scrollY;
};

onMounted(() => {
  // 底栏在页面加载完成后缓出
  setTimeout(() => {
    isBarVisible.value = true;
  }, config.bottomBarShowDelay / 3);

  startInterval();
});
</script>
