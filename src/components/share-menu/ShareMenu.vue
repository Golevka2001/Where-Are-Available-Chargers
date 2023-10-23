<!-- 顶部导航栏右侧的分享按钮和弹出的菜单 -->

<template>
  <v-menu
    :close-on-content-click="false"
    :style="{ zIndex: config.zIndex.shareMenu }"
    location="bottom"
    z-index=""
  >
    <!-- Share button -->
    <template v-slot:activator="{ props }">
      <v-btn
        :icon="mdiShareVariantOutline"
        v-bind="props"
        @click.stop="onClickShareButton"
      />
    </template>

    <!-- Share menu -->
    <v-card
      :style="{
        backgroundColor: useTheme().current.value.colors.surface + 'A0',
      }"
      rounded="lg"
      style="backdrop-filter: blur(0.5rem)"
    >
      <!-- QR code -->
      <share-menu-qr-code class="mx-auto my-8" />

      <!-- Link -->
      <share-menu-link class="mx-4" />
    </v-card>
  </v-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useTheme } from 'vuetify';
import { useAppStore } from '@/store/app';
import config from '@/config';

import ShareMenuLink from './ShareMenuLink.vue';
import ShareMenuQrCode from './ShareMenuQrCode.vue';

import { mdiShareVariantOutline } from '@mdi/js';

const appStore = useAppStore();

const isShareMenuOpen = ref(false);

const onClickShareButton = () => {
  isShareMenuOpen.value = true;
  appStore.isAppSideDrawerOpen = false;
  // 状态详细信息抽屉就不关了
};
</script>
