<template>
  <div class="d-flex justify-space-between">
    <v-btn
      :disabled="appStore.curStationIndex === 0"
      :prepend-icon="mdiChevronLeft"
      rounded="lg"
      variant="outlined"
      @click.stop="appStore.curStationIndex--"
    >
      <v-icon v-if="appStore.curStationIndex === 0">{{ mdiCancel }}</v-icon>
      <span v-else>{{
        statusStore.statusDetail.stations[appStore.curStationIndex - 1]?.name
      }}</span>
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
      <v-icon
        v-if="
          appStore.curStationIndex ===
          statusStore.statusDetail.stations.length - 1
        "
        >{{ mdiCancel }}</v-icon
      >
      <span v-else>{{
        statusStore.statusDetail.stations[appStore.curStationIndex + 1]?.name
      }}</span>
    </v-btn>
  </div>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store/app';
import { useStatusStore } from '@/store/status';

import { mdiCancel, mdiChevronLeft, mdiChevronRight } from '@mdi/js';

const appStore = useAppStore();
const statusStore = useStatusStore();
</script>
