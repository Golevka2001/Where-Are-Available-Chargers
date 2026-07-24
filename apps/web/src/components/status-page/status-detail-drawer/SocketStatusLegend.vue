<!-- 插座状态图例 -->

<template>
  <v-row
    class="justify-center text-body-2 my-4"
    no-gutters
    style="flex-wrap: nowrap"
  >
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
        rounded="circle"
        size="small"
        class="text-center"
        style="
          min-width: 0;
          width: 1.2rem;
          height: 1.2rem;
          aspect-ratio: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 0.3rem;
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
