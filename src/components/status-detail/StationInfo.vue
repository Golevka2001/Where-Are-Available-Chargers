<!-- 状态详情中的概览信息 -->
<!-- x门x侧 · 空插座x个 -->

<template>
  {{ stationStatus.name }}
  ·
  <span :style="{ color: availableCountTextColor }">
    空插座
    {{ stationStatus.available_count }}
    个
  </span>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useAppStore } from '@/store/app';
import { StationStatus } from '@/types/station-status';

const props = defineProps<{
  stationStatus: StationStatus;
}>();

const appStore = useAppStore();

// TODO：准备改一下判断逻辑
const availableCountTextColor = computed(() => {
  return props.stationStatus.available_count >
    props.stationStatus.total_count * appStore.config.stationThresholdPercentage
    ? 'green'
    : 'orange';
});
</script>
