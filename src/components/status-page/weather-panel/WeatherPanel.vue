<!-- 天气预报面板 -->
<!-- +-------------------------+ -->
<!-- | [~]  Brief Forecast   > | -->
<!-- +-------------------------+ -->
<!-- |      Panel Content      | -->
<!-- +-------------------------+ -->

<template>
  <v-expansion-panels :readonly="weatherStore.skyconIconList.length === 0">
    <v-expansion-panel
      bg-color="info"
      elevation="0"
      rounded="lg"
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
import { onMounted, watch } from 'vue';
import { useWeatherStore } from '@/store/weather';

import PanelContent from './PanelContent.vue';

import { mdiWeatherCloudyClock } from '@mdi/js';
import { campusConfig } from '@/types/campus-config';

const props = defineProps<{
  campus: campusConfig;
}>();

const weatherStore = useWeatherStore();

const updateWeatherData = async () => {
  await weatherStore.updateData(props.campus);
};

onMounted(updateWeatherData);

watch(
  () => props.campus,
  () => {
    updateWeatherData();
  },
);
</script>
