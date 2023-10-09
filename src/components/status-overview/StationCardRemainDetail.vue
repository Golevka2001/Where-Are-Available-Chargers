<!-- 充电站概览卡片上的 `桩号·余量` 信息 -->

<template>
  <v-card-text
    class="px-2 pb-2 text-left text-truncate"
    style="font-size: 0.9rem"
  >
    <span v-if="stationStatus.availableCount === 0">暂无可用</span>
    <span v-else> 桩号·余量： </span>
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
        <span v-if="showComma()"> , </span>
        <sup>{{ chargerName }}</sup>
        {{ chargerStatus }}
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

let availableChargerCounter: number = 0;
// 用于判断分隔符 `,` 是否显示的计数器
const showComma = () => availableChargerCounter++;
</script>
