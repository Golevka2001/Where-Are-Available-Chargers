<!-- 充电桩位置示意图页面 -->

<template>
  <loading-indicator v-if="!isImgLoaded" />
  <div
    v-show="isImgLoaded"
    class="fill-height"
  >
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
        src="/img/illustration.webp"
        width="100%"
        @load="isImgLoaded = true"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import 'viewerjs/dist/viewer.css';
import { directive as viewer } from 'v-viewer';

import { ref } from 'vue';

import { LoadingIndicator } from '@/components/global';

const vVueViewer = viewer();

const isImgLoaded = ref(false);
</script>
