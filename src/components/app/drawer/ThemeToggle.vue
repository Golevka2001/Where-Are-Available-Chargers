<!-- 侧边栏主题切换按钮 -->

<template>
  <v-list-item @click="clickThemeBtn">
    <template v-slot:prepend>
      <v-icon
        :icon="
          theme.global.current.value.dark
            ? 'mdi-weather-sunny'
            : 'mdi-weather-night'
        "
      />
    </template>
    <v-list-item-title>
      {{ theme.global.current.value.dark ? '浅色模式' : '深色模式' }}
    </v-list-item-title>
  </v-list-item>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify';
import { useAppStore } from '@/store/app';

const appStore = useAppStore();
const theme = useTheme();

const clickThemeBtn = () => {
  appStore.isDrawerOpen = false;
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
};
</script>
