<!-- 充电桩位置示意图页面 -->

<template>
  <div class="fill-height">
    <div
      v-vue-viewer.static="{
        backdrop: false,
        button: false,
        fullscreen: false,
        initialCoverage: 1,
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
        alt="充电桩位置示意图"
        src="/img/map.webp"
        width="100%"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import 'viewerjs/dist/viewer.css';
import { directive as viewer } from 'v-viewer';

const vVueViewer = viewer();
</script>
