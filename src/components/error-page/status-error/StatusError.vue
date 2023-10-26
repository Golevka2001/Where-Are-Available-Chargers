<!-- 错误页面中的充电桩状态获取失败页面 -->

<template>
  <v-alert
    border="top"
    border-color="error"
    color="surface"
    rounded="lg"
    variant="flat"
    class="elevation-6 text-center"
  >
    <div
      class="face"
      style="font-size: 6rem"
    >
      &#129488;
    </div>
    <div style="font-size: 1.5rem; font-weight: bolder">充电桩状态获取失败</div>
    <div class="ma-4">请检查网络连接后重试</div>

    <v-btn
      color="error"
      rounded="pill"
      variant="tonal"
      class="mt-6"
      @click.once.stop="router.push('/status')"
    >
      <span> 重试 </span>
    </v-btn>

    <!-- TODO：Link -->
    <div
      class="mt-6 text-decoration-underline"
      style="font-size: 0.7rem; opacity: 0.5"
    >
      若问题仍然存在，请与我们联系
    </div>
  </v-alert>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<!-- 自定义动画 -->
<style scoped>
.face {
  animation: rotate 2000ms linear infinite;
}

@keyframes rotate {
  0% {
    transform: rotateZ(0);
  }
  25% {
    transform: rotateZ(10deg);
  }
  75% {
    transform: rotateZ(-10deg);
  }
  100% {
    transform: rotateZ(0deg);
  }
}
</style>
