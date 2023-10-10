<!-- 底部状态更新信息展示栏 -->
<!-- TODO：拆分 -->

<template>
  <v-layout-item
    v-scroll="onScroll"
    position="bottom"
    class="d-flex align-end"
    style="pointer-events: none"
    model-value
  >
    <v-slide-y-reverse-transition leave-absolute>
      <v-btn
        @click="clickBottomBar"
        :color="barBackground"
        v-show="isBarVisible"
        rounded="0"
        class="text-background"
        style="pointer-events: all"
        block
      >
        <v-scroll-y-transition leave-absolute>
          <span :key="String(isRefreshing)">
            {{ updateMessage }}
          </span>
        </v-scroll-y-transition>
      </v-btn>
    </v-slide-y-reverse-transition>
  </v-layout-item>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { useAppStore } from '@/store/app';

const appStore = useAppStore();
const dataExpirationTime = appStore.config.dataExpirationTime;

const isBarVisible = ref(true);
const now = ref(new Date());
const barBackground = ref('');
const updateMessage = ref('');

let isRefreshing = false;
let lastScrollY = 0;
let intervalId: NodeJS.Timeout;

// 背景色渐变：绿[rgb(76, 175, 80)] -> 橙[rgb(255, 152, 0)]
const getBarBackground = (diff: number) => {
  if (diff > dataExpirationTime) {
    return 'orange';
  } else {
    const percent = diff / dataExpirationTime;
    const r = 76 + (255 - 76) * percent;
    const g = 175 + (152 - 175) * percent;
    const b = 80 + (0 - 80) * percent;
    return `rgb(${r}, ${g}, ${b})`;
  }
};

// 文字信息：更新于 xxx
const getUpdateMessage = (diff: number) => {
  if (diff > dataExpirationTime) {
    clearInterval(intervalId);
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
  now.value = new Date();
  const diff =
    now.value.getTime() -
    new Date(appStore.statusManager.updateMessage.lastSuccessEndTime).getTime();
  barBackground.value = getBarBackground(diff);
  updateMessage.value = getUpdateMessage(diff);
};

// 触发定时器
const startInterval = () => {
  clearInterval(intervalId);
  updateBottomBar(); // 定时器启动后有 1s 的延迟，需要手动更新一次
  intervalId = setInterval(() => {
    if (isRefreshing) {
      return;
    } else {
      updateBottomBar();
    }
  }, 1000);
};

const clickBottomBar = () => {
  isRefreshing = true;
  updateMessage.value = '正在更新数据，请稍候 ...';
  appStore.statusManager.updateData(true).then(() => {
    isRefreshing = false;
    startInterval();
  });
};

const onScroll = () => {
  // 向下滚动：隐藏底栏，一定时间后显示
  if (scrollY > lastScrollY) {
    isBarVisible.value = false;
    setTimeout(() => {
      isBarVisible.value = true;
    }, appStore.config.bottomBarShowDelay);
  }
  // 向上滚动：显示底栏
  else {
    isBarVisible.value = true;
  }
  lastScrollY = scrollY;
};

onMounted(() => {
  startInterval();
});
</script>
