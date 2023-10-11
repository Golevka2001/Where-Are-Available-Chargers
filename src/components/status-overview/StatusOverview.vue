<!-- 充电桩状态总览 -->
<!-- +--------------------+ -->
<!-- |   Station Card 1   | -->
<!-- +--------------------+ -->
<!-- |   Station Card 2   | -->
<!-- +--------------------+ -->
<!-- |         ...        | -->
<!-- +--------------------+ -->

<template>
  <div>
    <v-card
      rounded="lg"
      variant="outlined"
      class="ma-6"
    >
      <v-row class="mx-auto my-auto">
        <!-- TODO：列数根据屏幕宽度调整 -->
        <v-col
          v-for="(stationStatus, index) in statusStore.statusDetail.stations"
          :key="index"
          cols="12"
          class="px-0 py-0"
        >
          <station-card :station-status="stationStatus" />
          <v-divider
            v-if="index !== statusStore.statusDetail.stations.length - 1"
            class="border-opacity-100"
          />
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
import { useStatusStore } from '@/store/status';
import StationCard from './StationCard.vue';

const statusStore = useStatusStore();
</script>
