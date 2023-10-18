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
    :style="{ zIndex: config.zIndex.appSideDrawer }"
    :temporary="true"
    location="left"
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
          variant="outlined"
        >
          回到旧版
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store/app';
import config from '@/config';
import DrawerNavList from './DrawerNavList.vue';
import ThemeToggle from './ThemeToggle.vue';

import { mdiUndoVariant } from '@mdi/js';

const appStore = useAppStore();
</script>
