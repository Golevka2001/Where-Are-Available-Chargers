<!-- 顶部导航栏右侧的分享按钮和弹出的菜单 -->

<template>
  <v-menu :close-on-content-click="false">
    <template v-slot:activator="{ props }">
      <!-- Share button -->
      <v-btn
        @click.stop="clickShareBtn"
        v-bind="props"
        icon="mdi-share-variant-outline"
      />
    </template>

    <!-- Share menu -->
    <v-card>
      <!-- QR code -->
      <share-menu-qr-code />

      <!-- Link -->
      <share-menu-link />
    </v-card>
  </v-menu>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store/app';
import ShareMenuLink from './ShareMenuLink.vue';
import ShareMenuQrCode from './ShareMenuQrCode.vue';

const appStore = useAppStore();

const clickShareBtn = () => {
  appStore.isDrawerOpen = false;
};
</script>
