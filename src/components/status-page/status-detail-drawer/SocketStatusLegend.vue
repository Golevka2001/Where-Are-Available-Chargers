<!-- 插座状态图例 -->

<template>
  <v-row class="justify-center text-body-2">
    <v-col
      cols="auto"
      class="px-0"
    >
      图例：
    </v-col>
    <v-col
      v-for="legend in detailDrawerLegendList"
      :key="legend.color"
      cols="auto"
      class="px-2 d-flex align-center"
    >
      <v-chip
        :color="legend.color"
        density="compact"
        variant="flat"
        class="text-center"
        style="
          margin: 0 0.15rem 0 0.15rem;
          padding: 0.6rem 0.1rem 0.6rem 0.1rem;
        "
      >
        <div
          class="justify-center fill-height text-background font-weight-medium"
          style="height: 1rem; width: 1rem"
        >
          {{ legend.content }}
        </div>
      </v-chip>
      {{ legend.text }}
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { detailDrawerLegendList } from '@/utils/lists';
</script>
