<!-- 充电桩状态详情 -->
<!-- +---------------------+ -->
<!-- |   Station Table 1   | -->
<!-- +---------------------+ -->
<!-- |   Station Table 2   | -->
<!-- +---------------------+ -->
<!-- |         ...         | -->
<!-- +---------------------+ -->

<template>
  <div
    v-for="(stationStatus, index) in statusStore.statusDetail.stations"
    :key="index"
  >
    <station-info :station-status="stationStatus" />
    <station-table :charger-list="stationStatus.chargers" />
  </div>
</template>

<script lang="ts" setup>
import { useStatusStore } from '@/store/status';
import StationInfo from './StationInfo.vue';
import StationTable from './StationTable.vue';

const statusStore = useStatusStore();
</script>
