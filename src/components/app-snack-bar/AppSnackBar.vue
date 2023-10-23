<!-- 消息提示条 -->

<template>
  <v-snackbar
    v-model:model-value="appStore.isSnackBarVisible"
    :color="appStore.snackBarBgColor"
    location="top"
    rounded="lg"
    timeout="1000"
    style="opacity: 0.9"
  >
    <span v-html="appStore.snackBarText"></span>
  </v-snackbar>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store/app';

const appStore = useAppStore();
</script>
