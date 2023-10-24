<!-- 质询（人机验证）页面 -->

<script lang="ts">
export default {
  data: () => ({
    snackbar: true,
    text: '我们怀疑你是人类，请完成机器人验证',
    timeout: 3000,
  }),
};
</script>

<template>
  <iframe
    :src="config.challengeUrl"
    height="100%"
    width="100%"
    style="border: 0; display: block"
  ></iframe>

  <v-snackbar
    v-model="snackbar"
    color="deep-purple-accent-4"
    :timeout="timeout"
  >
    {{ text }}

    <template v-slot:actions>
      <v-btn
        variant="text"
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
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
