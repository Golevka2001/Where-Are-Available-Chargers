<!-- 质询（人机验证）页面 -->

<template>
  <iframe
    :src="config.challengeUrl"
    height="100%"
    width="100%"
    style="border: 0; display: block"
  ></iframe>
</template>

<script lang="ts" setup>
import { onBeforeMount, onBeforeUnmount } from 'vue';
import { useAppStore } from '@/store/app';
import { useRouter } from 'vue-router';
import config from '@/config';

const appStore = useAppStore();
const router = useRouter();

// 此页面不显示 Footer
onBeforeMount(() => {
  appStore.isFooterVisible = false;
  window.addEventListener('message', handleMessage);
});
onBeforeUnmount(() => {
  appStore.isFooterVisible = true;
  window.removeEventListener('message', handleMessage);
});

function handleMessage(event: MessageEvent) {
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
}
</script>
