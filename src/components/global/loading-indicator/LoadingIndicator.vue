<!-- 加载中提示 -->
<!-- NOTE：在使用时，如果是以待加载元素的 load 事件来控制 LoadingIndicator 的显示，
  LoadingIndicator 可以用 v-if 来判断，而待加载元素务必使用 v-show 控制。
  因为 v-if 在条件值为 false 时不会渲染元素，也就永远不会触发 load 事件，
  而 v-show 只是将元素 display 属性设置为 none，元素正常加载。
  所带来的问题是如果待加载元素同时使用了 d-flex 类，优先级会高于 v-show，需额外处理。 -->

<template>
  <div
    class="text-center"
    style="overflow: hidden"
  >
    <!-- Motor emoji -->
    <div
      class="motor"
      style="font-size: 6rem"
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
    transform: translateX(-1.64%) rotateZ(0) skewX(0);
  }
  43% {
    transform: translateX(27.06%) rotateZ(0) skewX(0);
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
