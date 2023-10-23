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
    scrim="transparent"
    :style="{
      backgroundColor: useTheme().current.value.colors.surface + 'A0',
      zIndex: config.zIndex.appSideDrawer,
    }"
    :temporary="true"
    location="left"
    style="backdrop-filter: blur(0.5rem)"
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
      <div class="pa-4">
        <!-- TODO：旧版链接和页面 -->
        <v-btn
          :block="true"
          :prepend-icon="mdiUndoVariant"
          rounded="lg"
          variant="outlined"
        >
          回到旧版
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { useTheme } from 'vuetify';
import { useAppStore } from '@/store/app';
import config from '@/config';

import DrawerNavList from './DrawerNavList.vue';
import ThemeToggle from './ThemeToggle.vue';

import { mdiUndoVariant } from '@mdi/js';

const appStore = useAppStore();
</script>
