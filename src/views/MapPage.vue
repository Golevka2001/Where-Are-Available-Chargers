<!-- 地图页面 -->

<template>
  <loading-indicator v-if="!isIframeLoaded" />
  <div
    v-show="isIframeLoaded"
    class="flex-column fill-height"
    :class="isIframeLoaded ? 'd-flex' : ''"
  >
    <!-- Map -->
    <iframe
      :src="mapUrl"
      height="100%"
      width="100%"
      style="border: 0; display: block"
      @load="isIframeLoaded = true"
    >
    </iframe>

    <v-divider />

    <!-- Button group -->
    <bottom-button-group v-if="statusStore.statusDetail.stations.length > 1" />
  </div>
</template>

<script lang="ts" setup>
import { computed, onBeforeMount, onBeforeUnmount, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAppStore } from '@/store/app';
import { useStatusStore } from '@/store/status';
import config from '@/config';
import { stationPositionList } from '@/utils/lists';

import { LoadingIndicator } from '@/components/global';
import { BottomButtonGroup } from '@/components/map-page';

// 从路由传入，/map/:stationName
const props = defineProps({
  stationName: String,
});

const router = useRouter();
const appStore = useAppStore();
const statusStore = useStatusStore();

const isIframeLoaded = ref(false);
// 构造腾讯地图 URL
const mapUrl = computed(() => {
  const stationPosition = stationPositionList.find(
    (station) => station.title === props.stationName,
  );
  return stationPosition
    ? config.tencentMapUrl
        .replace('{lat}', stationPosition.lat.toString())
        .replace('{lng}', stationPosition.lng.toString())
        .replace('{title}', stationPosition.title + '充电站')
        .replace('{addr}', stationPosition.addr)
    : '';
});

// 此页面不显示 Footer
onBeforeMount(() => {
  appStore.isFooterVisible = false;
  // 检查充电站位置信息列表中是否存在传入的充电站名称
  if (
    !stationPositionList.some(
      (stationPosition) => stationPosition.title === props.stationName,
    )
  ) {
    // TODO：error message
    router.push('/error');
  }
});
onBeforeUnmount(() => {
  appStore.isFooterVisible = true;
});
</script>
