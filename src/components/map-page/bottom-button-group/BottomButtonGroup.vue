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
        :disabled="isCurStationTheFirst()"
        :prepend-icon="mdiChevronLeft"
        variant="text"
        @click.stop="onClickPrevStationBtn"
      >
        <span v-html="prevStationName"> </span>
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
        :disabled="isCurStationTheLast()"
        variant="text"
        @click.stop="onClickNextStationBtn"
      >
        <span v-html="nextStationName"> </span>
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAppStore } from '@/store/app';
import { useStatusStore } from '@/store/status';

import { mdiChevronLeft, mdiChevronRight, mdiHome } from '@mdi/js';

const router = useRouter();
const appStore = useAppStore();
const statusStore = useStatusStore();

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

const isCurStationTheFirst = () => {
  return appStore.curStationIndex === 0;
};
const isCurStationTheLast = () => {
  return (
    appStore.curStationIndex === statusStore.statusDetail.stations.length - 1
  );
};

const onClickHomeBtn = () => {
  router.push('/status');
  appStore.isStatusDetailDrawerOpen = true;
};
const onClickNextStationBtn = () => {
  router.push(`/map/${nextStationName.value}`);
  appStore.curStationIndex++;
};
const onClickPrevStationBtn = () => {
  router.push(`/map/${prevStationName.value}`);
  appStore.curStationIndex--;
};
</script>
