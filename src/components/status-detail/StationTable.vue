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
    density="compact"
    class="rounded-lg border-lg"
  >
    <thead>
      <tr>
        <th class="pr-1 text-center">编号</th>
        <th class="pl-1 text-center">插座状态</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(chargerStatus, chargerName) in stationStatus"
        :key="chargerName"
      >
        <td class="pr-1 text-center">{{ chargerName }}</td>
        <td class="pl-1 text-center">
          <station-table-charger-status :charger-status="chargerStatus" />
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script lang="ts" setup>
import StationTableChargerStatus from '@/components/status-detail/StationTableChargerStatus.vue';

defineProps<{
  stationStatus: {
    [chargerName: string]: number[] | null;
  };
}>();
</script>
