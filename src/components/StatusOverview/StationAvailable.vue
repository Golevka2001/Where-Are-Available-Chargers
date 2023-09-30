<!-- 充电站概览卡片上的 `可用插座` -->
<!-- TODO：根据余量决定字体颜色 -->

<template>
  <span class="d-flex">
    <span style="font-size: 1rem"> 可用插座 </span>
    <span
      class="ml-2"
      style="font-size: 1.8rem"
      :style="color"
    >
      {{ availableCount }}
    </span>
  </span>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

defineProps<{
  availableCount: number;
  totalCount: number;
}>();

const color = computed(() => {
  // TODO：判断逻辑待补充
  // 之前的做法:
  // (空闲桩数 > 充电桩数 * 临界值) ? green : orange
  // 取临界值 2.5
  return 'color: green';
});
</script>
