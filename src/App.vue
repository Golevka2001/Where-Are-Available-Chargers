<template>
  <router-view />
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify';

const theme = useTheme();

// 获取用户系统主题偏好
theme.global.name.value = window.matchMedia('(prefers-color-scheme: dark)')
  .matches
  ? 'dark'
  : 'light';
</script>
