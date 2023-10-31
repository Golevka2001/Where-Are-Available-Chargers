<!-- 弹出的分享菜单 -->

<template>
  <v-menu
    :close-on-content-click="false"
    :style="{ zIndex: config.zIndex.shareMenu }"
    location="bottom"
    z-index=""
  >
    <v-card
      :style="semiTransparentStyle"
      rounded="lg"
    >
      <!-- QR code -->
      <share-menu-qr-code class="mx-auto my-8" />

      <!-- Link -->
      <share-menu-link class="mx-4" />
    </v-card>
  </v-menu>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useTheme } from 'vuetify';
import { useAppStore } from '@/store/app';
import config from '@/config';

import ShareMenuLink from './ShareMenuLink.vue';
import ShareMenuQrCode from './ShareMenuQrCode.vue';

const theme = useTheme();
const appStore = useAppStore();

// 毛玻璃背景样式
const semiTransparentStyle = computed(() => {
  return appStore.isSemiTransparentSupported
    ? {
        backdropFilter: 'blur(0.5rem)',
        backgroundColor: theme.current.value.colors.surface + 'A0',
      }
    : {};
});
</script>
