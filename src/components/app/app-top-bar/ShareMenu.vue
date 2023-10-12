<!-- 顶部导航栏右侧的分享按钮和弹出的菜单 -->

<template>
  <v-menu :close-on-content-click="false">
    <template v-slot:activator="{ props }">
      <!-- Share button -->
      <v-btn
        icon="mdi-share-variant-outline"
        v-bind="props"
        @click.stop="onClickShareBtn"
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

const onClickShareBtn = () => {
  appStore.isDrawerOpen = false;
};
</script>
