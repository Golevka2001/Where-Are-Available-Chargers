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
    <VDropdown
      :triggers="['hover', 'click']"
      :disabled="typeof socketStatus === 'number'"
      theme="tooltip"
    >
      <div
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
      </div>
      <template #popper>
        <p>
          {{ tipContent(socketStatus) }}
        </p>
      </template>
    </VDropdown>
  </v-chip>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { SocketStatus, SocketStatusWithEndTS } from '@/types/charger';

import 'floating-vue/dist/style.css';

defineProps<{
  socketList: Array<SocketStatus | SocketStatusWithEndTS>;
}>();

const parseTimeUsedNew = (inputTime: number | null): string => {
  if (inputTime == null) {
    return '该充电插座不支持显示剩余时间';
  }
  let curTime = new Date().getTime();
  let time: number = inputTime / 1000 - curTime / 1000;

  if (time < 180) {
    return `剩余时间约<3分钟`;
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

const tipContent = (socketStatus: SocketStatus | SocketStatusWithEndTS) => {
  switch (
    typeof socketStatus === 'number' ? socketStatus : socketStatus.status
  ) {
    case 1:
      return '空闲';
    case 2:
      return '故障';
    case 0:
      if (typeof socketStatus === 'number') return '占用';
      else {
        if (socketStatus.end_timestamp == null) {
          return '已被占用';
        } else {
          return parseTimeUsedNew(socketStatus.end_timestamp);
        }
      }
  }
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
