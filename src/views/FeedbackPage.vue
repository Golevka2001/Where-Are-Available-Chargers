<!-- 反馈问卷页面 -->

<template>
  <iframe
    src="https://forms.larksuite.com/m/cfm?t=sLfgofRTAwMi-5i3x"
    width="100%"
    height="100%"
    style="border: 0; display: block"
  ></iframe>
</template>

<script lang="ts" setup>
import { onBeforeMount, onBeforeUnmount } from 'vue';
import { useAppStore } from '@/store/app';

const appStore = useAppStore();

// 此页面不显示 Footer
onBeforeMount(() => {
  appStore.isFooterVisible = false;
});
onBeforeUnmount(() => {
  appStore.isFooterVisible = true;
});
</script>
