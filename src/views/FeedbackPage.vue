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
import { useAppStore } from '@/store/app';

const appStore = useAppStore();
appStore.isFooterVisible = false;
</script>
