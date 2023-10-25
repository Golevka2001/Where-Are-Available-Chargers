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
<!-- | Prev          Next | -->
<!-- +--------------------+ -->

<template>
  <v-navigation-drawer
    v-model:model-value="appStore.isStatusDetailDrawerOpen"
    :style="{
      zIndex: config.zIndex.statusDetailDrawer,
      width: drawerWidth,
    }"
    :temporary="true"
    color="background"
    location="right"
    class="pb-10"
  >
    <!-- Map button + Station info + Close button -->
    <drawer-header
      :stationDescription="curStation.description"
      :stationName="curStation.name"
    />

    <!-- Socket status legend -->
    <socket-status-legend class="ma-auto" />

    <!-- Station table -->
    <v-window v-model="appStore.curStationIndex">
      <v-window-item
        v-for="index in statusStore.statusDetail.stations.length"
        :key="index"
      >
        <station-table
          :charger-list="curStation.chargers"
          class="mx-4"
        />
      </v-window-item>
    </v-window>

    <!-- Disclaimer & Detailed update time -->
    <disclaimer-and-time class="mx-5 mt-2" />

    <!-- Prev/Next buttons -->
    <template #append>
      <drawer-bottom-buttons class="ma-6" />
    </template>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useDisplay } from 'vuetify';
import { useAppStore } from '@/store/app';
import { useStatusStore } from '@/store/status';
import config from '@/config';

import DisclaimerAndTime from '../disclaimer-and-time/DisclaimerAndTime.vue';
import DrawerBottomButtons from './DrawerBottomButtons.vue';
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

// 当前展示的充电站的状态信息
const curStation = computed(() => {
  return statusStore.statusDetail.stations[appStore.curStationIndex];
});
</script>
