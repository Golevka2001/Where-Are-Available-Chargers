<template>
  <v-expansion-panels>
    <v-expansion-panel
      :bg-color="
        theme.name.value === 'dark' ? 'indigo-darken-4' : 'blue-lighten-4'
      "
      elevation="0"
      rounded="lg"
      style="opacity: 0.8"
    >
      <!-- Weather panel summary -->
      <v-expansion-panel-title>
        <v-icon class="mr-4">
          {{ weatherStore.skyconIconList?.[0]?.icon || mdiWeatherCloudyClock }}
        </v-icon>
        {{ weatherStore.forecast }}
      </v-expansion-panel-title>

      <!-- Weather panel content -->
      <v-expansion-panel-text>
        <panel-content />
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useTheme } from 'vuetify';
import { useWeatherStore } from '@/store/weather';
import PanelContent from './PanelContent.vue';

import { mdiWeatherCloudyClock } from '@mdi/js';

const theme = useTheme();
const weatherStore = useWeatherStore();

onMounted(() => {
  weatherStore.updateData();
});
</script>
