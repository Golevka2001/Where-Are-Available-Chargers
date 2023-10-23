<!-- 充电桩状态总览 -->
<!-- +--------------------+ -->
<!-- |   Station Card 1   | -->
<!-- +--------------------+ -->
<!-- |   Station Card 2   | -->
<!-- +--------------------+ -->
<!-- |         ...        | -->
<!-- +--------------------+ -->

<template>
  <div>
    <v-card
      border="sm"
      rounded="lg"
      variant="flat"
    >
      <v-row class="mx-auto my-auto">
        <v-col
          v-for="(stationStatus, index) in statusStore.statusDetail.stations"
          :key="index"
          :cols="colWidth"
          class="pa-0"
        >
          <station-card
            :station-index="index"
            :station-status="stationStatus"
            :style="cardBorderStyle(index)"
            class="pa-1"
          />
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useDisplay } from 'vuetify';
import { useStatusStore } from '@/store/status';

import StationCard from './StationCard.vue';

const { width } = useDisplay();
const statusStore = useStatusStore();

// 充电站状态卡片的列数
const colWidth = computed(() => {
  return width.value < 960 ? 12 : 6; // 注：Vuetify 的 grid 为 12 栅格
});

// 充电站状态卡片的边框样式
// NOTE：没出现问题的话不用琢磨里面的逻辑，有屎山潜质
const cardBorderStyle = (index: number) => {
  const singleColumn = width.value < 960; // 单列？
  const evenItemCount = statusStore.statusDetail.stations.length % 2 === 0; // 共偶数个元素？
  const isLastOne = index === statusStore.statusDetail.stations.length - 1; // 是最后一个元素？
  const isSecondLastOne =
    index === statusStore.statusDetail.stations.length - 2; // 是倒数第二个元素？
  const isEvenIndex = index % 2 === 0; // 在双列的左侧一列？

  const borderStyle =
    'thin solid rgba(var(--v-border-color), var(--v-border-opacity))';

  return {
    borderBottom:
      (singleColumn && !isLastOne) ||
      (!singleColumn && evenItemCount && !isLastOne && !isSecondLastOne) ||
      (!singleColumn && !evenItemCount && !isLastOne)
        ? borderStyle
        : 'none',
    borderRight: !singleColumn && isEvenIndex ? borderStyle : 'none',
  };
};
</script>
