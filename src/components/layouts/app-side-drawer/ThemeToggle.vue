<!-- 侧边栏主题切换按钮 -->

<template>
  <v-list-item @click.stop="onClickThemeBtn">
    <template v-slot:prepend>
      <v-icon>
        {{
          theme.global.current.value.dark ? mdiWeatherSunny : mdiWeatherNight
        }}
      </v-icon>
    </template>
    <v-list-item-title>
      {{ theme.global.current.value.dark ? '浅色模式' : '深色模式' }}
    </v-list-item-title>
  </v-list-item>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useTheme } from 'vuetify';
import { useAppStore } from '@/store/app';

import { mdiWeatherNight, mdiWeatherSunny } from '@mdi/js';

const appStore = useAppStore();
const theme = useTheme();

// 点击按钮切换主题，随后关闭侧边栏
const onClickThemeBtn = () => {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
  setTimeout(() => {
    appStore.isAppSideDrawerOpen = false;
  }, 500);
};
</script>
