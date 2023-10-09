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
  <div v-if="appStore.statusManager.isFetchingData">
    <loading-indicator />
  </div>

  <div v-else>
    <status-overview />

    <status-detail />
  </div>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store/app';
import LoadingIndicator from '@/components/app/loading/Loading.vue';
import StatusOverview from '@/components/status-overview/StatusOverview.vue';
import StatusDetail from '@/components/status-detail/StatusDetail.vue';

const appStore = useAppStore();

appStore.statusManager.updateData();
</script>
