<!-- 质询（人机验证）页面 -->

<template>
  <loading-indicator v-if="!isIframeLoaded" />
  <div
    v-show="isIframeLoaded"
    class="flex-column fill-height"
    :class="isIframeLoaded ? 'd-flex' : ''"
  >
    <iframe
      :key="refreshHelper"
      :src="config.challengeUrl"
      height="100%"
      width="100%"
      style="border: 0; display: block"
      @load="isIframeLoaded = true"
    ></iframe>

    <div class="px-4 py-2 align-center bg-deep-purple-accent-4 d-flex">
      <div>&#129302;</div>
      <div class="mx-4">我们怀疑你是人类，请完成机器人验证</div>

      <v-spacer />

      <v-btn
        :prepend-icon="mdiRefresh"
        variant="tonal"
        @click.stop="refreshHelper += 1"
      >
        刷新
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAppStore } from '@/store/app';
import config from '@/config';

import LoadingIndicator from '@/components/global/loading-indicator/LoadingIndicator.vue';

import { mdiRefresh } from '@mdi/js';

const appStore = useAppStore();
const router = useRouter();

const isIframeLoaded = ref(false);
const refreshHelper = ref(0); // 据说使用 key 比 v-if 会更好

// 监听 iframe 的 message 事件，验证完成后返回 /status
const handleMessage = (event: MessageEvent) => {
  if (
    event.origin === window.location.origin &&
    event.data === 'verificationComplete'
  ) {
    // 出于其他考虑，这里暂时不解析 callback，统一返回 `/status`
    /*
    const callbackUrl = router.currentRoute.value.query['callback'];
    router.push(callbackUrl || '/status');
     */
    router.push('/status');
  }
};

// 此页面不显示 Footer
onBeforeMount(() => {
  appStore.isFooterVisible = false;
  window.addEventListener('message', handleMessage);
});
onUnmounted(() => {
  appStore.isFooterVisible = true;
  window.removeEventListener('message', handleMessage);
});
</script>
