<!-- 侧边栏主题切换按钮 -->

<template>
  <v-list-item @click.stop="onClickThemeBtn">
    <template v-slot:prepend>
      <v-icon :icon="themeToggleIcon" />
    </template>
    <v-list-item-title>
      {{ themeToggleText }}
    </v-list-item-title>
  </v-list-item>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useTheme } from 'vuetify';
import { useAppStore } from '@/store/app';
import config from '@/config';

import { mdiWeatherNight, mdiWeatherSunny } from '@mdi/js';

const appStore = useAppStore();
const theme = useTheme();

const themeToggleIcon = computed(() => {
  return theme.global.current.value.dark ? mdiWeatherSunny : mdiWeatherNight;
});

const themeToggleText = computed(() => {
  return theme.global.current.value.dark ? '浅色模式' : '深色模式';
});

const onClickThemeBtn = () => {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
  setTimeout(() => {
    appStore.isDrawerOpen = false;
  }, config.drawerCloseDelay);
};
</script>
