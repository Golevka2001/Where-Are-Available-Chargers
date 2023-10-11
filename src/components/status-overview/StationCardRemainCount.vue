<!-- 充电站概览卡片上的 `可用插座` -->

<template>
  <span class="d-flex">
    <span style="font-size: 0.9rem"> 可用插座 </span>
    <span
      :style="{ color: availableCountTextColor }"
      class="ml-2"
      style="font-size: 1.8rem"
    >
      {{ availableCount }}
    </span>
  </span>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useAppStore } from '@/store/app';

const appStore = useAppStore();

const props = defineProps<{
  availableCount: number;
  totalCount: number;
}>();

// TODO：准备改一下判断逻辑
const availableCountTextColor = computed(() => {
  return props.availableCount >
    props.totalCount * appStore.config.stationThresholdPercentage
    ? 'green'
    : 'orange';
});
</script>
