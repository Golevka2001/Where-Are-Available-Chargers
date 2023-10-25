<template>
  <div class="d-flex justify-space-between">
    <v-btn
      :disabled="appStore.curStationIndex === 0"
      :prepend-icon="mdiChevronLeft"
      rounded="lg"
      variant="outlined"
      @click.stop="appStore.curStationIndex--"
    >
      <span v-html="prevStationName"> </span>
    </v-btn>
    <v-btn
      :append-icon="mdiChevronRight"
      :disabled="
        appStore.curStationIndex ===
        statusStore.statusDetail.stations.length - 1
      "
      rounded="lg"
      variant="outlined"
      @click.stop="appStore.curStationIndex++"
    >
      <span v-html="nextStationName"> </span>
    </v-btn>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useAppStore } from '@/store/app';
import { useStatusStore } from '@/store/status';

import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';

const appStore = useAppStore();
const statusStore = useStatusStore();

// 当前的上一个、下一个充电站名称
const prevStationName = computed(() => {
  if (appStore.curStationIndex === 0) {
    return '&#9940;';
  } else {
    return statusStore.statusDetail.stations[appStore.curStationIndex - 1].name;
  }
});
const nextStationName = computed(() => {
  if (
    appStore.curStationIndex ===
    statusStore.statusDetail.stations.length - 1
  ) {
    return '&#9940;';
  } else {
    return statusStore.statusDetail.stations[appStore.curStationIndex + 1].name;
  }
});
</script>
