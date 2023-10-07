<!-- 充电站概览卡片 -->
<!-- +-----------------------------+ -->
<!-- | Station Name >        Count | -->
<!-- |                             | -->
<!-- | Chargers Status             | -->
<!-- +-----------------------------+ -->

<template>
  <v-card variant="flat">
    <v-card-title class="px-2 pt-2 d-flex justify-space-between">
      <div>
        <!-- Station name -->
        <span
          class="mr-2"
          style="font-size: 1.2rem"
        >
          {{ stationName }}
        </span>
        <span style="font-size: 0.9rem">
          详情<v-icon size="small">mdi-chevron-right</v-icon>
        </span>
      </div>

      <!-- Available sockets count -->
      <station-card-remain-count
        :available-count="stationStatus.availableCount"
        :total-count="stationStatus.totalCount"
      />
    </v-card-title>

    <!-- Chargers info overview -->
    <station-card-remain-detail :stationStatus="stationStatus" />
  </v-card>
</template>

<script lang="ts" setup>
import StationCardRemainCount from '@/components/status-overview/StationCardRemainCount.vue';
import StationCardRemainDetail from '@/components/status-overview/StationCardRemainDetail.vue';

defineProps<{
  stationName: string;
  stationStatus: {
    [chargerName: string]: number;
    availableCount: number;
    totalCount: number;
  };
}>();
</script>
