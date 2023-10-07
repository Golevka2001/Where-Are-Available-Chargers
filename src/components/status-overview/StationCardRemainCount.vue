<!-- 充电站概览卡片上的 `可用插座` -->

<template>
  <span class="d-flex">
    <span style="font-size: 0.9rem"> 可用插座 </span>
    <span
      class="ml-2"
      style="font-size: 1.8rem"
      :style="{ color: availableCountTextColor }"
    >
      {{ availableCount }}
    </span>
  </span>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';

const props = defineProps<{
  availableCount: number;
  totalCount: number;
}>();

const availableCountTextColor = computed(() => {
  // TODO：将 0.25 （临界值）调整到配置文件之类的地方
  return props.availableCount > props.totalCount * 0.25 ? 'green' : 'orange';
});
</script>
