<!-- 充电桩位置示意图页面 -->

<template>
  <div
    v-vue-viewer.static="{
      backdrop: false,
      fullscreen: false,
      initialCoverage: '1',
      inline: true,
      navbar: false,
      title: false,
      toggleOnDblclick: false,
      toolbar: {
        zoomIn: 'large',
        zoomOut: 'large',
        oneToOne: 'large',
        reset: 'large',
        prev: 0,
        play: 0,
        next: 0,
        rotateLeft: 0,
        rotateRight: 0,
        flipHorizontal: 0,
        flipVertical: 0,
      },
    }"
    class="text-center"
  >
    <img
      :src="appStore.config.latestMapPath"
      alt="充电桩位置示意图"
      width="100%"
    />
  </div>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store/app';

const appStore = useAppStore();
</script>