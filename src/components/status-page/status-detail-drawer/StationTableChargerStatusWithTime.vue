<!-- 详情表格中的插座状态（带剩余时间显示） -->
<!-- +----------------------+ -->
<!-- | 1 2 3 4 5 6 7 8 9 10 | -->
<!-- +----------------------+ -->

<template>
  <v-chip
    v-for="(socketStatus, index) in socketList"
    :key="index"
    :color="socketChipColor(socketStatus)"
    density="compact"
    variant="flat"
    style="
      margin: 0.3rem 0.15rem 0.3rem 0.15rem;
      padding: 0.6rem 0.1rem 0.6rem 0.1rem;
    "
  >
    <span
      class="justify-center fill-height text-background font-weight-medium"
      style="height: 1rem; width: 1rem"
    >
      {{ socketStatus.status === 1 ? index + 1 : '&nbsp;' }}
    </span>

    <!-- Remaining time -->
    <v-tooltip
      :attach="true"
      :close-on-back="true"
      :close-on-content-click="true"
      :disabled="socketStatus.status !== 0"
      :open-on-click="true"
      activator="parent"
      location="bottom"
    >
      {{ socketStatus.remaining_time }}
    </v-tooltip>
  </v-chip>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { SocketStatus } from '@/types/charger';

defineProps<{
  socketList: SocketStatus[];
}>();

// 0-占用-橙色，1-空闲-绿色，2-故障-灰色
const socketChipColor = computed(() => (socketStatus: SocketStatus) => {
  switch (socketStatus.status) {
    case 0:
      return 'warning';
    case 1:
      return 'success';
    case 2:
      return 'default';
    default:
      return 'default';
  }
});
</script>
