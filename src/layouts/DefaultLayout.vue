<!-- 默认布局 -->
<!-- +--------------------------+ -->
<!-- | ==       App Bar         | -->
<!-- +--------+-----------------+ -->
<!-- |        |                 | -->
<!-- |  App   |      Main       | -->
<!-- | Drawer |     Content     | -->
<!-- |        |                 | -->
<!-- +--------+-----------------+ -->
<!-- |        App Footer        | -->
<!-- +--------------------------+ -->

<template>
  <v-app>
    <app-top-bar />

    <app-side-drawer />

    <v-main class="pb-0">
      <v-overlay
        v-model:model-value="isOverlayVisible"
        :persistent="true"
        :style="{ zIndex: config.zIndex.overlay }"
        scrim="transparent"
      />
      <router-view />
    </v-main>

    <app-footer
      v-show="appStore.isFooterVisible"
      class="mb-4"
    />
  </v-app>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useAppStore } from '@/store/app';
import config from '@/config';

import { AppFooter, AppSideDrawer, AppTopBar } from '@/components/layouts';

const appStore = useAppStore();

const isOverlayVisible = computed(() => {
  return appStore.isStatusDetailDrawerOpen || appStore.isAppSideDrawerOpen;
});
</script>
