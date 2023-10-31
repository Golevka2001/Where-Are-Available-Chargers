<!-- 侧边栏导航链接 -->

<template>
  <v-list-item
    v-for="navItem in sideDrawerNavList"
    :key="navItem.title"
    :href="navItem.href"
    :target="navItem.target"
    :to="navItem.to"
    rounded="lg"
  >
    <template v-slot:prepend>
      <v-icon>
        {{ navItem.prependIcon }}
      </v-icon>
    </template>
    <v-list-item-title>
      {{ navItem.title }}
    </v-list-item-title>
  </v-list-item>
</template>

<script lang="ts" setup>
import { sideDrawerNavList } from '@/utils/lists';
</script>
