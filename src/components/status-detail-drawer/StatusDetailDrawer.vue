<!-- 充电桩状态详情 -->
<!-- +---------------------+ -->
<!-- |   Station Table 1   | -->
<!-- +---------------------+ -->
<!-- |   Station Table 2   | -->
<!-- +---------------------+ -->
<!-- |         ...         | -->
<!-- +---------------------+ -->

<template>
  <v-navigation-drawer
    v-model:model-value="appStore.isStatusDetailDrawerOpen"
    :style="{ zIndex: config.zIndex.statusDetailDrawer, minWidth: '22rem' }"
    :temporary="true"
    location="right"
  >
    <drawer-header
      :stationDescription="curStation.description"
      :stationName="curStation.name"
    />

    <socket-status-legend class="ma-auto" />

    <station-table
      :charger-list="curStation.chargers"
      class="mx-4"
    />
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useDisplay } from 'vuetify';
import { useAppStore } from '@/store/app';
import { useStatusStore } from '@/store/status';
import config from '@/config';
import DrawerHeader from './DrawerHeader.vue';
import SocketStatusLegend from './SocketStatusLegend.vue';
import StationInfo from './StationInfo.vue';
import StationTable from './StationTable.vue';

const { width } = useDisplay();
const appStore = useAppStore();
const statusStore = useStatusStore();

const curStation = computed(() => {
  return statusStore.statusDetail.stations[appStore.curStationIndex];
});
</script>
