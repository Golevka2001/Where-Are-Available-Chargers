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
    <span
      class="justify-center fill-height text-background font-weight-medium"
      style="height: 1rem; width: 1rem"
    >
      {{
        (typeof socketStatus === 'number'
          ? socketStatus
          : socketStatus.status) === 1
          ? index + 1
          : '&nbsp;'
      }}
    </span>

    <!-- Remaining time -->
    <v-tooltip
      :attach="true"
      :close-on-back="true"
      :close-on-content-click="true"
      :disabled="typeof socketStatus === 'number' || socketStatus.status !== 0"
      :open-on-click="true"
      activator="parent"
      location="bottom"
    >
      {{
        typeof socketStatus === 'number'
          ? '该充电桩不支持显示剩余时间'
          : parseTimeUsedNew(socketStatus.end_timestamp)
      }}
    </v-tooltip>
  </v-chip>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { SocketStatus, SocketStatusWithEndTS } from '@/types/charger';

defineProps<{
  socketList: Array<SocketStatus | SocketStatusWithEndTS>;
}>();

const parseTimeUsedNew = (inputTime: number | null): string => {
  if (inputTime == null) {
    return '该充电插座不支持显示剩余时间';
  }
  let curTime = new Date().getTime();
  let time: number = inputTime / 1000 - curTime / 1000;

  if (time < 60) {
    return `剩余约1分钟内`;
  } else if (time < 3600) {
    return `剩余约${Math.floor(time / 60)}分钟`;
  } else if (time < 86400) {
    let h = Math.floor(time / 3600);
    let min = time - h * 3600;
    let m = Math.floor(min / 60);
    return `剩余约${h}小时${m}分`;
  } else if (time > 86400) {
    return '剩余时间很长';
  }
  return '剩余时间未知';
};

// 0-占用-橙色，1-空闲-绿色，2-故障-灰色
const socketChipColor = computed(
  () => (socketStatus: SocketStatus | SocketStatusWithEndTS) => {
    switch (
      typeof socketStatus === 'number' ? socketStatus : socketStatus.status
    ) {
      case 0:
        return 'warning';
      case 1:
        return 'success';
      case 2:
        return 'default';
      default:
        return 'default';
    }
  },
);
</script>
