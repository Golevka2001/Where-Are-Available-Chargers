<!-- 充电站概览卡片上的 `可用插座` -->

<template>
  <span class="d-flex">
    <span style="font-size: 0.9rem; align-content: center"> 可用插座 </span>
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
import { useTheme } from 'vuetify';
import { campusConfig } from '@/types/campus-config';

const props = defineProps<{
  availableCount: number;
  totalCount: number;
  campus: campusConfig;
}>();

const theme = useTheme();

// TODO：准备改一下判断逻辑
const availableCountTextColor = computed(() => {
  return props.availableCount >
    props.totalCount * props.campus.stationThresholdPercentage
    ? theme.current.value.colors.success
    : theme.current.value.colors.warning;
});
</script>
