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
          {{ stationStatus.name }}
        </span>
        <!-- TODO: Add link -->
        <span style="font-size: 0.9rem">
          详情<v-icon size="small">mdi-chevron-right</v-icon>
        </span>
      </div>

      <!-- Available sockets count -->
      <station-card-remain-count
        :available-count="stationStatus.available_count"
        :total-count="stationStatus.total_count"
      />
    </v-card-title>

    <!-- Chargers status overview -->
    <station-card-remain-detail
      :available-count="stationStatus.available_count"
      :chargerList="stationStatus.chargers"
    />
  </v-card>
</template>

<script lang="ts" setup>
import { StationStatus } from '@/types/station-status';
import StationCardRemainCount from './StationCardRemainCount.vue';
import StationCardRemainDetail from './StationCardRemainDetail.vue';

defineProps<{
  stationStatus: StationStatus;
}>();
</script>
