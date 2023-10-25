<!-- 状态详情中的表格 -->
<!-- +----+----------------------+ -->
<!-- | No |    Socket Status     | -->
<!-- +----+----------------------+ -->
<!-- | A  | 1 2 3 4 5 6 7 8 9 10 | -->
<!-- +----+----------------------+ -->
<!-- | B  | 1 2 3 4 5 6 7 8 9 10 | -->
<!-- +----+----------------------+ -->
<!-- | C  |         ...          | -->
<!-- +----+----------------------+ -->

<template>
  <v-table
    density="comfortable"
    class="border-sm rounded-lg"
  >
    <thead>
      <tr>
        <th class="pr-1 text-center">编号</th>
        <th class="pl-1 text-center">插座状态</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(chargerStatus, index) in chargerList"
        :key="index"
      >
        <!-- Charger name -->
        <td class="pr-1 text-center">
          {{ chargerStatus.name }}
        </td>
        <!-- Sockets status -->
        <td class="pl-1 text-center">
          <div v-if="typeof chargerStatus.fault_info === 'string'">
            {{ chargerStatus.fault_info }}
          </div>
          <station-table-charger-status
            v-else
            :socket-list="chargerStatus.sockets"
          />
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script lang="ts" setup>
import { ChargerStatus } from '@/types/charger';

import StationTableChargerStatus from './StationTableChargerStatus.vue';

defineProps<{
  chargerList: ChargerStatus[];
}>();
</script>
