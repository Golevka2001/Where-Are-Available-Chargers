<!-- 详情表格中的插座状态 -->
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
    <div
      class="justify-center fill-height text-background font-weight-medium"
      style="height: 1rem; width: 1rem"
    >
      {{ socketStatus === 1 ? index + 1 : null }}
    </div>
  </v-chip>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { SocketStatus } from '@/types/charger';

defineProps<{
  socketList: SocketStatus[];
}>();

const socketChipColor = computed(() => (socketStatus: SocketStatus) => {
  switch (socketStatus) {
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
