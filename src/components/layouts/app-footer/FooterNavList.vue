<!-- 页脚导航链接 -->

<template>
  <v-btn
    v-for="navItem in footerNavList"
    :key="navItem.text"
    :ripple="false"
    size="small"
    variant="plain"
    class="px-2"
    style="font-size: 0.7rem"
  >
    <!-- 区分外链和内部路由 -->
    <router-link
      v-if="navItem.isRouterLink"
      :to="navItem.link"
      class="text-decoration-none"
      style="color: inherit"
    >
      {{ navItem.text }}
    </router-link>
    <a
      v-else
      :href="navItem.link"
      target="_blank"
      class="text-decoration-none"
      style="color: inherit"
    >
      {{ navItem.text }}
    </a>
  </v-btn>
</template>

<script lang="ts" setup>
import { footerNavList } from '@/utils/lists';
</script>
