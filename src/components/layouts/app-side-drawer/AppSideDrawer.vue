<!-- 侧边栏（抽屉） -->
<!-- +------------+ -->
<!-- | = Link1    | -->
<!-- | = Link2    | -->
<!-- | = Link3    | -->
<!-- |   ...      | -->
<!-- |            | -->
<!-- |            | -->
<!-- | | Button | | -->
<!-- +------------+ -->

<template>
  <v-navigation-drawer
    v-model:model-value="appStore.isAppSideDrawerOpen"
    :style="[semiTransparentStyle, { zIndex: config.zIndex.appSideDrawer }]"
    :temporary="true"
    location="left"
    scrim="transparent"
  >
    <v-list
      :nav="true"
      density="compact"
    >
      <!-- Nav links -->
      <drawer-nav-list />

      <!-- Theme toggle -->
      <theme-toggle />
    </v-list>

    <!-- Classic version -->
    <template #append>
      <div class="ma-6">
        <v-btn
          :block="true"
          :disabled="isLoadingClassicPage"
          :href="config.classicVersionUrl"
          :loading="isLoadingClassicPage"
          :prepend-icon="mdiUndoVariant"
          rounded="lg"
          variant="tonal"
          style="border: thin solid"
          @click.stop="onClickClassicVersionButton"
        >
          回到旧版
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useTheme } from 'vuetify';
import { useAppStore } from '@/store/app';
import config from '@/config';

import DrawerNavList from './DrawerNavList.vue';
import ThemeToggle from './ThemeToggle.vue';

import { mdiUndoVariant } from '@mdi/js';

const theme = useTheme();
const appStore = useAppStore();

const isLoadingClassicPage = ref(false);
// 毛玻璃背景样式
const semiTransparentStyle = computed(() => {
  return appStore.isSemiTransparentSupported
    ? {
        backdropFilter: 'blur(0.5rem)',
        backgroundColor: theme.current.value.colors.surface + 'A0',
      }
    : {};
});

const onClickClassicVersionButton = () => {
  isLoadingClassicPage.value = true;
  setTimeout(() => {
    isLoadingClassicPage.value = false;
  }, 5000);
};
</script>
