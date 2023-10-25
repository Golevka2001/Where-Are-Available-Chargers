<!-- 页脚版权信息 -->

<template>
  <div style="font-size: 0.7rem">
    &#169;&nbsp;2022-{{ new Date().getFullYear() }}&nbsp;
    <span
      v-for="maintainer in maintainerList"
      :key="maintainer.name"
    >
      <a
        :href="maintainer.link"
        target="_blank"
        class="text-decoration-none"
        style="color: inherit"
      >
        {{ maintainer.name }}
      </a>
      <span v-if="maintainer !== maintainerList[maintainerList.length - 1]">
        &
      </span>
    </span>
  </div>
</template>

<script lang="ts" setup>
import { maintainerList } from '@/utils/lists';
</script>
