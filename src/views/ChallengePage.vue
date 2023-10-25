<!-- 质询（人机验证）页面 -->

<template>
  <div class="d-flex flex-column fill-height">
    <iframe
      v-if="isIframeVisible"
      :src="config.challengeUrl"
      height="100%"
      width="100%"
      style="border: 0; display: block"
    ></iframe>

    <div class="px-4 py-2 align-center bg-deep-purple-accent-4 d-flex">
      <div>&#129302;</div>
      <div class="mx-4">我们怀疑你是人类，请完成机器人验证</div>

      <v-spacer />

      <v-btn
        :prepend-icon="mdiRefresh"
        variant="tonal"
        @click.stop="refreshIframe()"
      >
        刷新
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, onBeforeMount, onBeforeUnmount, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAppStore } from '@/store/app';
import config from '@/config';

import { mdiRefresh } from '@mdi/js';

const appStore = useAppStore();
const router = useRouter();

const isIframeVisible = ref(true);

// 此页面不显示 Footer
onBeforeMount(() => {
  appStore.isFooterVisible = false;
  window.addEventListener('message', handleMessage);
});
onBeforeUnmount(() => {
  appStore.isFooterVisible = true;
  window.removeEventListener('message', handleMessage);
});

const handleMessage = (event: MessageEvent) => {
  if (
    event.origin === window.location.origin &&
    event.data === 'verificationComplete'
  ) {
    // 处于其他考虑，这里暂时不解析 callback，统一返回 `/status`
    /*
    const callbackUrl = router.currentRoute.value.query['callback'];
    router.push(callbackUrl || '/status');
     */
    router.push('/status');
  }
};

const refreshIframe = () => {
  isIframeVisible.value = false;
  nextTick(() => {
    isIframeVisible.value = true;
  });
};
</script>
