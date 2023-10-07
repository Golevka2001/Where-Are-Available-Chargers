<!-- 详情表格中的插座状态 -->
<!-- +----------------------+ -->
<!-- | 1 2 3 4 5 6 7 8 9 10 | -->
<!-- +----------------------+ -->

<template>
  <v-chip
    v-for="(socketStatus, index) in chargerStatus"
    :key="index"
    :color="{ 0: 'orange', 1: 'green' }[socketStatus] || 'grey'"
    density="compact"
    variant="flat"
    style="margin: 0 0.15rem 0 0.15rem; padding: 0.6rem 0.1rem 0.6rem 0.1rem"
  >
    <div
      class="justify-center fill-height text-background font-weight-medium"
      style="height: 1rem; width: 1rem"
    >
      {{ socketStatus === 1 ? index + 1 : '' }}
    </div>
  </v-chip>
</template>

<script lang="ts" setup>
defineProps<{
  chargerStatus: number[] | null;
}>();
</script>
