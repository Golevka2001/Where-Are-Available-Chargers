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
    <drawer-header
      :stationDescription="curStation.description"
      :stationName="curStation.name"
    />

    <socket-status-legend class="ma-auto" />

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

    <template #append>
      <div class="ma-4 d-flex justify-space-between">
        <v-btn
          :disabled="isCurStationTheFirst()"
          :prepend-icon="mdiChevronLeft"
          rounded="lg"
          variant="outlined"
          @click.stop="onClickPrevStationBtn"
        >
          <span v-html="prevStationName"> </span>
        </v-btn>
        <v-btn
          :append-icon="mdiChevronRight"
          :disabled="isCurStationTheLast()"
          rounded="lg"
          variant="outlined"
          @click.stop="onClickNextStationBtn"
        >
          <span v-html="nextStationName"> </span>
        </v-btn>
      </div>
    </template>
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

import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';

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

// 这两个属性不应该放在 computed 里，缓存结果会导致在下面的 computed 中无法更新
const isCurStationTheFirst = () => {
  return appStore.curStationIndex === 0;
};
const isCurStationTheLast = () => {
  return (
    appStore.curStationIndex === statusStore.statusDetail.stations.length - 1
  );
};

// 当前展示的充电站的详细信息
const curStation = computed(() => {
  return statusStore.statusDetail.stations[appStore.curStationIndex];
});

// 当前的上一个、下一个充电站名称
const prevStationName = computed(() => {
  if (isCurStationTheFirst()) {
    return '&#9940;';
  } else {
    return statusStore.statusDetail.stations[appStore.curStationIndex - 1].name;
  }
});
const nextStationName = computed(() => {
  if (isCurStationTheLast()) {
    return '&#9940;';
  } else {
    return statusStore.statusDetail.stations[appStore.curStationIndex + 1].name;
  }
});

const onClickPrevStationBtn = () => {
  appStore.curStationIndex--;
};
const onClickNextStationBtn = () => {
  appStore.curStationIndex++;
};
</script>
