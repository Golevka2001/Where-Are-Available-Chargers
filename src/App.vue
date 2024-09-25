<template>
  <router-view />
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify';
import { useAppStore } from '@/store/app';

const theme = useTheme();
const appStore = useAppStore();

// 判断浏览器
const ua = navigator.userAgent.toLowerCase();
let isFirefox = ua.indexOf('firefox') !== -1;

// 获取用户系统主题偏好及企业微信深色主题设置
theme.global.name.value =
  window.matchMedia('(prefers-color-scheme: dark)').matches ||
  ua.indexOf('colorscheme/dark') !== -1
    ? 'dark'
    : 'light';

// Firefox < 103 不使用半透明背景
let firefoxVersion = isFirefox
  ? parseInt((/firefox\/(\d+)/.exec(ua) || [])[1])
  : 0;
appStore.isSemiTransparentSupported = !(isFirefox && firefoxVersion < 103);
</script>
