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
    @click.stop="onClickStatusCard"
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
        <!-- TODO: Add link -->
        <span style="font-size: 0.9rem">
          详情<v-icon size="small">{{ mdiChevronRight }}</v-icon>
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
      class="px-2 pb-2"
    />
  </v-card>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store/app';
import { StationStatus } from '@/types/station-status';
import StationCardRemainCount from './StationCardRemainCount.vue';
import StationCardRemainDetail from './StationCardRemainDetail.vue';

import { mdiChevronRight } from '@mdi/js';

const props = defineProps<{
  stationIndex: number;
  stationStatus: StationStatus;
}>();

const appStore = useAppStore();

const onClickStatusCard = () => {
  appStore.openStatusDetailDrawer(props.stationIndex);
};
</script>
