<!-- 状态详情中的概览信息 -->
<!-- x门x侧 · 空插座x个 -->

<template>
  {{ stationName }}
  ·
  <span :style="{ color: availableCountTextColor }">
    空插座
    {{ appStore.statusManager.statusOverview[stationName].availableCount }}
    个
  </span>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useAppStore } from '@/store/app';

const appStore = useAppStore();

const props = defineProps<{
  stationName: string;
  availableCount: number;
  totalCount: number;
}>();

const availableCountTextColor = computed(() => {
  return props.availableCount >
    props.totalCount * appStore.config.stationThresholdPercentage
    ? 'green'
    : 'orange';
});
</script>
