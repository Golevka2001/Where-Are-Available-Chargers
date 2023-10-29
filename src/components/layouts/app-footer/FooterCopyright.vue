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
</template>

<script lang="ts" setup>
import { developerList } from '@/utils/lists';
</script>
