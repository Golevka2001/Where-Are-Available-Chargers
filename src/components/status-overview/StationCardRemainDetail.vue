<!-- 充电站概览卡片上的 `桩号·余量` 信息 -->

<template>
  <v-card-text
    class="px-2 pb-2 text-left text-truncate"
    style="font-size: 0.9rem"
  >
    桩号·余量：
    <span
      v-for="(chargerStatus, chargerName, index) in stationStatus"
      :key="index"
    >
      <span
        v-if="
          chargerName !== 'availableCount' &&
          chargerName !== 'totalCount' &&
          chargerStatus !== 0
        "
      >
        <sup>{{ chargerName }}</sup>
        {{ chargerStatus }}
        <span v-if="index !== Object.keys(stationStatus).length - 1"> , </span>
      </span>
    </span>
  </v-card-text>
</template>

<script lang="ts" setup>
defineProps<{
  stationStatus: {
    [chargerName: string]: number;
    availableCount: number;
    totalCount: number;
  };
}>();
</script>
