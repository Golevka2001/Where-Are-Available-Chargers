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
      @click.stop="router.push('/status')"
    >
      <span> 重试 </span>
    </v-btn>

    <div
      :style="{ color: color }"
      class="mt-6 text-decoration-underline"
      style="cursor: pointer; font-size: 0.7rem; opacity: 0.5"
      @click.stop="onClickText"
    >
      {{ text }}
    </div>
  </v-alert>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useTheme } from 'vuetify';
import config from '@/config';

const router = useRouter();
const theme = useTheme();

const text = ref('若问题仍然存在，请与我们联系');
const color = ref('');

const onClickText = () => {
  // 复制联系邮箱
  navigator.clipboard.writeText(config.contactEmail);
  // 显示提示信息
  text.value = '联系邮箱已复制到剪贴板，您可通过邮件反馈遇到的问题';
  color.value = theme.current.value.colors.success;
};
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
