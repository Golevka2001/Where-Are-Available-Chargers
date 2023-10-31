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
        :disabled="
          appStore.curStationIndex ===
          statusStore.statusDetail.stations.length - 1
        "
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

// 点击 Home 按钮，回到状态详情页面
const onClickHomeBtn = () => {
  router.push('/status');
  appStore.isStatusDetailDrawerOpen = true;
};
// 点击 Next、Prev 按钮，导航到对应地图页面，并切换全局的当前充电站
const onClickNextStationBtn = () => {
  router.push(`/map/${nextStationName.value}`);
  appStore.curStationIndex++;
};
const onClickPrevStationBtn = () => {
  router.push(`/map/${prevStationName.value}`);
  appStore.curStationIndex--;
};
</script>
