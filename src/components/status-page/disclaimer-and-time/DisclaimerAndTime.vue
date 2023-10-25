<!-- “仅供参考”免责声明 & 详细更新时间 -->

<template>
  <div class="d-flex justify-space-between text-body-2 text-default">
    <span> 仅供参考 </span>
    <span>
      更新于
      {{
        new Date(statusStore.lastUpdateTime).toLocaleString('zh-CN', {
          hour12: false,
        })
      }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import { useStatusStore } from '@/store/status';

const statusStore = useStatusStore();
</script>
