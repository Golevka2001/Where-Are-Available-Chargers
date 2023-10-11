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
  <div style="max-width: 45rem; margin: auto">
    <!-- ^临时措施: 横向宽度大时，横向会撑满屏幕，先加一行限制宽度并居中 -->
    <!-- TODO: 若改为多栏布局，需另行调整 -->
    <div v-if="appStore.statusManager.isFetchingData">
      <loading-indicator />
    </div>

    <div v-else>
      <status-overview />

      <status-detail />

      <bottom-info-bar />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useAppStore } from '@/store/app';
import config from '@/config';
import BottomInfoBar from '@/components/app/bottom-info-bar/BottomInfoBar.vue';
import LoadingIndicator from '@/components/app/loading-indicator/LoadingIndicator.vue';
import StatusDetail from '@/components/status-detail/StatusDetail.vue';
import StatusOverview from '@/components/status-overview/StatusOverview.vue';

const appStore = useAppStore();

appStore.statusManager.updateData(false);

onMounted(() => {
  let updateCount = 0;
  // 自动更新数据一定次数
  const intervalId = setInterval(() => {
    appStore.statusManager.updateData(false);
    ++updateCount;
    if (updateCount >= config.autoUpdateMaxTimes) {
      clearInterval(intervalId);
    }
  }, config.autoUpdateInterval);
});
</script>
