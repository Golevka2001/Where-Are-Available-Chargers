<!-- 页脚版权信息 -->

<template>
  <div style="font-size: 0.7rem">
    &#169;&nbsp;2022-{{ new Date().getFullYear() }}&nbsp;
    <span
      v-for="developer in developerList"
      :key="developer.name"
    >
      <a
        :href="developer.link"
        target="_blank"
        class="text-decoration-none"
        style="color: inherit"
      >
        {{ developer.name }}
      </a>
      <span v-if="developer !== developerList[developerList.length - 1]">
        &
      </span>
    </span>
  </div>
  <div
    class="mt-2 text-center text-default"
    style="font-size: 0.7rem"
  >
    <span>
      数据由
      <span class="text-decoration-underline"> 久安充电 </span>
      &nbsp;提供，查询结果仅供参考
    </span>
  </div>
</template>

<script lang="ts" setup>
import { developerList } from '@/utils/lists';
</script>
