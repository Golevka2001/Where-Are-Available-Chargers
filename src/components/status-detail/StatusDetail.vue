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
    v-for="(stationStatus, stationName) in appStore.statusManager.statusDetail"
    :key="stationName"
    class="ma-6"
  >
    <station-info
      :station-name="String(stationName)"
      :available-count="
        appStore.statusManager.statusOverview[stationName].availableCount
      "
      :total-count="
        appStore.statusManager.statusOverview[stationName].totalCount
      "
    />
    <station-table :station-status="stationStatus" />
  </div>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store/app';
import StationInfo from '@/components/status-detail/StationInfo.vue';
import StationTable from '@/components/status-detail/StationTable.vue';

const appStore = useAppStore();
</script>
