<!-- 反馈问卷页面 -->

<template>
  <loading-indicator v-if="!isIframeLoaded" />
  <iframe
    v-show="isIframeLoaded"
    ref="iframeRef"
    :src="config.surveyUrl"
    referrerpolicy="no-referrer"
    class="survey-iframe"
    @load="onIframeLoad"
  ></iframe>
</template>

<script lang="ts" setup>
import { onBeforeMount, onUnmounted, onMounted, ref } from 'vue';
import { useAppStore } from '@/store/app';
import config from '@/config';

import { LoadingIndicator } from '@/components/global';

const appStore = useAppStore();

const isIframeLoaded = ref(false);
const iframeRef = ref<HTMLIFrameElement | null>(null);

// 处理移动端视口变化
const handleViewportChange = () => {
  if (iframeRef.value) {
    // 使用视觉视口高度，处理移动端地址栏变化
    const height = window.visualViewport?.height || window.innerHeight;
    iframeRef.value.style.height = `${height}px`;
  }
};

// iframe加载完成回调
const onIframeLoad = () => {
  isIframeLoaded.value = true;
  handleViewportChange();
};

// 此页面不显示 Footer
onBeforeMount(() => {
  appStore.isFooterVisible = false;
});
onMounted(() => {
  // 监听视口变化（移动端地址栏收缩/展开）
  window.visualViewport?.addEventListener('resize', handleViewportChange);
  window.addEventListener('resize', handleViewportChange);
});
onUnmounted(() => {
  appStore.isFooterVisible = true;
  window.visualViewport?.removeEventListener('resize', handleViewportChange);
  window.removeEventListener('resize', handleViewportChange);
});
</script>

<style scoped>
.survey-iframe {
  border: 0;
  display: block;
  width: 100%;
  height: 100vh;
}
</style>
