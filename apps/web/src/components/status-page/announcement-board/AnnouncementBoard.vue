<!-- 公告栏 -->
<!-- 公告栏是否启用以及内容可在 src/config.ts 中配置 -->

<template>
  <v-alert
    :border="border"
    :color="color"
    :icon="mdiBullhornOutline"
    :variant="variant"
    rounded="lg"
  >
    <!-- Title -->
    <template v-slot:title>
      <span v-html="title"> </span>
    </template>

    <!-- Content -->
    <template v-slot:text>
      <span v-html="content"> </span>
    </template>
  </v-alert>
</template>

<script lang="ts" setup>
import config from '@/config';

import { mdiBullhornOutline } from '@mdi/js';

const { border, color, content, title, variant } = config.announcementBoard;
</script>
