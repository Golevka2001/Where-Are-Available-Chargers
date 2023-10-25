<!-- 加载中提示 -->

<template>
  <div
    class="text-center"
    style="overflow: hidden"
  >
    <!-- Motor emoji -->
    <div
      class="motor mb-n6"
      style="font-size: 8rem"
    >
      &#128757;
    </div>
    <!-- Loading text -->
    <div style="font-size: 1.5rem">
      {{ loadingText }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';

let intervalId: NodeJS.Timeout;
const loadingText = ref('Loading');

onMounted(() => {
  intervalId = setInterval(() => {
    loadingText.value += '.';
    if (loadingText.value.length > 10) {
      // 3 个点后重置
      loadingText.value = 'Loading';
    }
  }, 600);

  return () => {
    clearInterval(intervalId);
  };
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<!-- 自定义动画 -->
<style>
.motor {
  animation: 4000ms linear 0s 1 both running translate-easeInElastic;
  animation-iteration-count: infinite;
}

@keyframes translate-easeInElastic {
  0% {
    transform: translateX(0%);
  }
  2% {
    transform: translateX(-0.04%);
  }
  4% {
    transform: translateX(-0.16%);
  }
  7% {
    transform: translateX(-0.17%);
  }
  9% {
    transform: translateX(0.04%);
  }
  13% {
    transform: translateX(0.58%);
  }
  14% {
    transform: translateX(0.55%) rotateZ(0) skewX(0);
  }
  20% {
    transform: translateX(-1.56%) rotateZ(5deg) skewX(-5deg);
  }
  21% {
    transform: translateX(-1.64%) rotateZ(0) skewX(0);
  }
  28% {
    transform: translateX(4.63%);
  }
  29% {
    transform: translateX(4.4%) rotateZ(0) skewX(0);
  }
  36% {
    transform: translateX(-13.12%) rotateZ(10deg) skewX(-10deg);
  }
  38% {
    transform: translateX(1.22%) rotateZ(0) skewX(0);
  }
  43% {
    transform: translateX(37.06%) rotateZ(0) skewX(0);
  }
  55% {
    transform: translateX(-100%) rotateZ(30deg) skewX(-30deg);
  }
  56% {
    transform: translateX(-100%) rotateZ(0) skewX(0);
  }
  90% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(0%);
  }
}
</style>
