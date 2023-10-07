<!-- 充电桩状态展示页面 -->
<!-- +---------------------+ -->
<!-- | +-----------------+ | -->
<!-- | | Status Overview | | -->
<!-- | +-----------------+ | -->
<!-- |                     | -->
<!-- | +-----------------+ | -->
<!-- | |  Status Detail  | | -->
<!-- | +-----------------+ | -->
<!-- +---------------------+ -->

<template>
  <status-overview />

  <status-detail />
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store/app';
import StatusOverview from '@/components/status-overview/StatusOverview.vue';
import StatusDetail from '@/components/status-detail/StatusDetail.vue';

const appStore = useAppStore();

appStore.statusManager.updateData();
</script>
