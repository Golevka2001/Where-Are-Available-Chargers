<template>
  <status-overview />
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store/app';
import StatusOverview from '@/components/status-overview/StatusOverview.vue';

const appStore = useAppStore();

appStore.statusManager.updateData();
</script>
