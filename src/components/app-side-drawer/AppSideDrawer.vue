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
      <div class="ma-6">
        <v-btn
          :block="true"
          :disabled="loading"
          :href="config.classicVersionUrl"
          :loading="loading"
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
import { ref } from 'vue';
import { useTheme } from 'vuetify';
import { useAppStore } from '@/store/app';
import config from '@/config';

import DrawerNavList from './DrawerNavList.vue';
import ThemeToggle from './ThemeToggle.vue';

import { mdiUndoVariant } from '@mdi/js';

const appStore = useAppStore();

const loading = ref(false);

const onClickClassicVersionButton = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 3000);
};
</script>
