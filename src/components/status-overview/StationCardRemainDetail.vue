<!-- 充电站概览卡片上的 `桩号·余量` 信息 -->

<template>
  <v-card-text
    class="text-left text-truncate"
    style="font-size: 0.9rem"
  >
    <span v-if="availableCount === 0">暂无可用</span>
    <span v-else> 桩号·余量： </span>
    <span
      v-for="(chargerStatus, index) in chargerList"
      :key="index"
    >
      <span
        v-if="
          typeof chargerStatus.fault_info !== 'string' &&
          chargerStatus.available_count !== 0
        "
      >
        <span v-if="showComma()"> , </span>
        <sup>{{ chargerStatus.name }}</sup>
        {{ chargerStatus.available_count }}
      </span>
    </span>
  </v-card-text>
</template>

<script lang="ts" setup>
import { ChargerStatus } from '@/types/charger';
import { watch } from 'vue';

const props = defineProps<{
  availableCount: number;
  chargerList: ChargerStatus[];
}>();

let availableChargerCounter: number = 0;
// 用于判断分隔符 `,` 是否显示的计数器
const showComma = () => availableChargerCounter++;

watch(
  () => props.chargerList,
  () => {
    availableChargerCounter = 0;
  },
);
</script>
