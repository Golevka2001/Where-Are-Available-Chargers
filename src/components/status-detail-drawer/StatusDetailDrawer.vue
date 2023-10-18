<!-- 充电桩状态详情抽屉 -->
<!-- +--------------------+ -->
<!-- |   Drawer Header    | -->
<!-- +--------------------+ -->
<!-- |       Legend       | -->
<!-- | +----------------+ | -->
<!-- | |                | | -->
<!-- | |  Status Table  | | -->
<!-- | |                | | -->
<!-- | +----------------+ | -->
<!-- |                    | -->
<!-- +--------------------+ -->

<template>
  <v-navigation-drawer
    v-model:model-value="appStore.isStatusDetailDrawerOpen"
    :style="{
      zIndex: config.zIndex.statusDetailDrawer,
      width: drawerWidth,
    }"
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
import StationTable from './StationTable.vue';

const { width } = useDisplay();
const appStore = useAppStore();
const statusStore = useStatusStore();

const drawerWidth = computed(() => {
  if (width.value <= 360) {
    // 宽度不够排成 1*10 时变为 2*5
    return '240px';
  } else if (width.value <= 600) {
    // xs 显示全屏宽度
    return '100%';
  } else {
    // 其他情况固定宽度
    return '450px';
  }
});

const curStation = computed(() => {
  return statusStore.statusDetail.stations[appStore.curStationIndex];
});
</script>
