<!-- 充电站概览卡片 -->
<!-- 包括：充电站名称、总可用插座数、充电桩概览 -->
<!-- +-----------------------------+ -->
<!-- | Station Name >      Count 5 | -->
<!-- |                             | -->
<!-- | Chargers Status             | -->
<!-- +-----------------------------+ -->

<template>
  <v-card variant="flat">
    <v-card-title class="px-2 pt-2 d-flex justify-space-between">
      <!-- Station name -->
      <div>
        <span
          class="mr-2"
          style="font-size: 1.2rem"
        >
          {{ stationName }}
        </span>
        <span style="font-size: 1rem">
          详情<v-icon size="small">mdi-chevron-right</v-icon>
        </span>
      </div>

      <!-- Available sockets count -->
      <StationAvailable
        :availableCount="stationStatus.availableCount"
        :totalCount="stationStatus.totalCount"
      />
    </v-card-title>

    <!-- Chargers info overview -->
    <ChargersInfo :stationStatus="stationStatus" />
  </v-card>
</template>

<script lang="ts" setup>
import StationAvailable from '@/components/StatusOverview/StationAvailable.vue';
import ChargersInfo from '@/components/StatusOverview/ChargersInfo.vue';

defineProps<{
  stationName: string;
  stationStatus: {
    [chargerName: string]: number;
    availableCount: number;
    totalCount: number;
  };
}>();
</script>
