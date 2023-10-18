<!-- 页面顶部进度条 -->
<!-- NOTE：下面一大堆随机增加进度的代码在网络好的情况下根本用不上，纯自嗨 -->

<template>
  <v-progress-linear
    v-show="isProgressBarVisible"
    :absolute="true"
    :model-value="progressValue"
    color="green"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import config from '@/config';

const router = useRouter();

const isProgressBarVisible = ref(false);
const progressValue = ref(0);

let intervalId: NodeJS.Timeout;

const startRandomIncrement = (lowerBound: number, higherBound: number) => {
  clearInterval(intervalId);
  intervalId = setInterval(
    () => {
      // 随机增加进度
      const increment = Math.floor(
        (Math.random() * (higherBound - lowerBound + 1)) /
          config.progressBarMinUpdateTimes +
          lowerBound,
      );
      if (progressValue.value + increment >= higherBound) {
        clearInterval(intervalId);
        return;
      }
      progressValue.value += increment;
      startRandomIncrement(increment, higherBound); // 不确定这样危不危险
    },
    // 随机间隔时间
    Math.floor(
      Math.random() *
        (config.progressBarUpdateIntervalRange[1] -
          config.progressBarUpdateIntervalRange[0] +
          1) +
        config.progressBarUpdateIntervalRange[0],
    ),
  );
};

// 路由守卫
router.beforeEach((to) => {
  // 错误页面不需要显示进度条
  if (to.path === '/error') {
    return;
  }
  isProgressBarVisible.value = true;
  progressValue.value = config.progressBarValues[0];
  startRandomIncrement(
    config.progressBarValues[0],
    config.progressBarValues[1] - 10,
  );
});

router.beforeResolve(() => {
  progressValue.value = config.progressBarValues[1];
  startRandomIncrement(
    config.progressBarValues[1],
    config.progressBarValues[2] - 10,
  );
});

router.afterEach(() => {
  progressValue.value = config.progressBarValues[2];
  setTimeout(() => {
    isProgressBarVisible.value = false;
  }, config.progressBarHideDelay);
});
</script>
