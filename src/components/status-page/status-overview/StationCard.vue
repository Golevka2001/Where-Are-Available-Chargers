<!-- 充电站概览卡片 -->
<!-- +-----------------------------+ -->
<!-- | Station Name >        Count | -->
<!-- |                             | -->
<!-- | Chargers Status             | -->
<!-- +-----------------------------+ -->

<template>
  <v-card
    rounded="0"
    variant="text"
    @click.stop="appStore.openStatusDetailDrawer(props.stationIndex)"
  >
    <v-card-title class="px-2 pt-2 d-flex justify-space-between">
      <div>
        <!-- Station name -->
        <span
          class="mr-2"
          style="font-size: 1.2rem"
        >
          {{ stationStatus.name }}
        </span>
        <span style="font-size: 0.9rem">
          详情<v-icon size="small">{{ mdiChevronRight }}</v-icon>
        </span>
      </div>

      <!-- Available sockets count -->
      <station-card-remain-count
        :available-count="stationStatus.available_count"
        :total-count="stationStatus.total_count"
        :campus="campus"
      />
    </v-card-title>

    <!-- Chargers status overview -->
    <station-card-remain-detail
      :available-count="stationStatus.available_count"
      :chargerList="stationStatus.chargers"
      class="px-2 pb-2"
    />
  </v-card>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store/app';
import { StationStatus } from '@/types/charger';

import StationCardRemainCount from './StationCardRemainCount.vue';
import StationCardRemainDetail from './StationCardRemainDetail.vue';

import { mdiChevronRight } from '@mdi/js';
import { campusConfig } from '@/types/campus-config';

const props = defineProps<{
  stationIndex: number;
  stationStatus: StationStatus;
  campus: campusConfig;
}>();

const appStore = useAppStore();
</script>
