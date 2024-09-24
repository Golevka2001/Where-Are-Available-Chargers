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
let isWxwork = ua.indexOf('wxwork') !== -1;

// 获取用户系统主题偏好
if (isWxwork) {
  // 企业微信深色模式适配
  theme.global.name.value =
    ua.indexOf('colorscheme/dark') !== -1 ? 'dark' : 'light';
} else {
  theme.global.name.value = window.matchMedia('(prefers-color-scheme: dark)')
    .matches
    ? 'dark'
    : 'light';
}

// Firefox < 103 不使用半透明背景
let firefoxVersion = isFirefox
  ? parseInt((/firefox\/(\d+)/.exec(ua) || [])[1])
  : 0;
appStore.isSemiTransparentSupported = !(isFirefox && firefoxVersion < 103);
</script>
