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
    v-model="appStore.isDrawerOpen"
    temporary
  >
    <v-list
      density="compact"
      nav
    >
      <!-- Nav links -->
      <app-drawer-nav />

      <!-- Theme toggle -->
      <app-drawer-theme-toggle />
    </v-list>

    <!-- Classic version -->
    <template #append>
      <div class="pa-4">
        <!-- TODO：旧版链接和页面 -->
        <v-btn
          prepend-icon="mdi-undo-variant"
          variant="outlined"
          block
        >
          回到旧版
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store/app';
import AppDrawerNav from '@/components/app/drawer/Nav.vue';
import AppDrawerThemeToggle from '@/components/app/drawer/ThemeToggle.vue';

const appStore = useAppStore();
</script>
