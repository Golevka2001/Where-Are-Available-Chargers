<!-- 地图页面底部的切换按钮组件 -->
<!-- +----------+----------+----------+ -->
<!-- | < Prev   |   Home   |   Next > | -->
<!-- +----------+----------+----------+ -->

<template>
  <div class="my-2 d-flex justify-center">
    <div
      class="text-start"
      style="width: 40%"
    >
      <v-btn
        :disabled="appStore.curStationIndex === 0"
        :prepend-icon="mdiChevronLeft"
        variant="text"
        @click.stop="onClickPrevStationBtn"
      >
        <v-icon v-if="appStore.curStationIndex === 0">{{ mdiCancel }}</v-icon>
        <span v-else>{{ prevStationName }}</span>
      </v-btn>
    </div>

    <v-spacer />

    <div
      class="text-center"
      style="width: 20%"
    >
      <v-btn
        variant="text"
        @click.stop="onClickHomeBtn"
      >
        <v-icon size="large">
          {{ mdiHome }}
        </v-icon>
      </v-btn>
    </div>

    <v-spacer />

    <div
      class="text-end"
      style="width: 40%"
    >
      <v-btn
        :append-icon="mdiChevronRight"
        :disabled="
          appStore.curStationIndex ===
          statusStore.statusDetail.stations.length - 1
        "
        variant="text"
        @click.stop="onClickNextStationBtn"
      >
        <v-icon
          v-if="
            appStore.curStationIndex ===
            statusStore.statusDetail.stations.length - 1
          "
          >{{ mdiCancel }}</v-icon
        >
        <span v-else>{{ nextStationName }}</span>
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAppStore } from '@/store/app';
import { useStatusStore } from '@/store/status';

import { mdiCancel, mdiChevronLeft, mdiChevronRight, mdiHome } from '@mdi/js';

const router = useRouter();
const appStore = useAppStore();
const statusStore = useStatusStore();

const prevStationName = computed(() => {
  return (
    statusStore.statusDetail.stations[appStore.curStationIndex - 1]?.name ?? ''
  );
});
const nextStationName = computed(() => {
  return (
    statusStore.statusDetail.stations[appStore.curStationIndex + 1]?.name ?? ''
  );
});

const onClickHomeBtn = () => {
  router.push('/status');
  appStore.isStatusDetailDrawerOpen = true;
};
const onClickNextStationBtn = () => {
  if (nextStationName.value) {
    router.push(`/map/${nextStationName.value}`);
    appStore.curStationIndex++;
  }
};
const onClickPrevStationBtn = () => {
  if (prevStationName.value) {
    router.push(`/map/${prevStationName.value}`);
    appStore.curStationIndex--;
  }
};
</script>
