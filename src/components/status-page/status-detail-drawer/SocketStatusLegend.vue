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
      v-for="legend in legendList"
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
const legendList = [
  {
    color: 'success',
    content: 1,
    text: '空闲',
  },
  {
    color: 'warning',
    content: null,
    text: '占用',
  },
  // // 暂不添加故障的图例
  // {
  //   color: 'default',
  //   content: null,
  //   text: '故障',
  // },
];
</script>
