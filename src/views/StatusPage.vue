<template>
  <StatusOverview />
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store/app';
import { StatusOverview } from '@/components/StatusOverview';

const appStore = useAppStore();

appStore.statusManager.updateData();
</script>
