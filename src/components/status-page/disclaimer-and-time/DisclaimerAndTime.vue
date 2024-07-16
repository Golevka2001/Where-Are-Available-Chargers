<!-- “仅供参考”免责声明 & 详细更新时间 -->

<template>
  <div
    class="mt-2 d-flex justify-space-between text-default"
    style="font-size: 0.7rem"
  >
    <a
      href="/feedback"
      target="_blank"
      class="text-decoration-none"
      style="color: inherit"
    >
      数据有误？点我反馈 >
    </a>
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
