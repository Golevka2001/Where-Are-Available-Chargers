<!-- 地图页面 -->

<template>
  <loading-indicator v-if="mapUrl === ''" />
  <div
    v-else
    class="d-flex flex-column fill-height"
  >
    <!-- Map -->
    <iframe
      :src="mapUrl"
      height="100%"
      width="100%"
      style="border: 0; display: block"
    >
    </iframe>

    <v-divider />

    <!-- Button group -->
    <bottom-button-group v-if="statusStore.statusDetail.stations.length > 1" />
  </div>
</template>

<script lang="ts" setup>
import { computed, onBeforeMount, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import { useAppStore } from '@/store/app';
import { useStatusStore } from '@/store/status';
import config from '@/config';

import { LoadingIndicator } from '@/components/global';
import { BottomButtonGroup } from '@/components/map-page';

const props = defineProps({
  stationName: String,
});

const router = useRouter();
const appStore = useAppStore();
const statusStore = useStatusStore();

const stationPositionList = [
  {
    title: '东门北侧',
    addr: '桃园篮球场东侧车棚内',
    lat: 31.888485,
    lng: 118.829991,
  },
  {
    title: '东门南侧',
    addr: '东门校内南侧外卖架旁',
    lat: 31.886716,
    lng: 118.830103,
  },
  {
    title: '西门北侧',
    addr: '西门到快递站路口之间的道路北侧，南工路燕湖桥旁',
    lat: 31.886339,
    lng: 118.812658,
  },
  {
    title: '西门南侧',
    addr: '西门到快递站路口之间的道路南侧，南工路燕湖桥旁',
    lat: 31.886095,
    lng: 118.812658,
  },
  {
    title: '南门西侧',
    addr: '南门校外西侧',
    lat: 31.880837,
    lng: 118.819328,
  },
  {
    title: '南门东侧',
    addr: '南门校外东侧',
    lat: 31.880837,
    lng: 118.820108,
  },
  {
    title: '北门东北侧',
    addr: '北门校内东侧空地北侧，南高北路旁',
    lat: 31.893529,
    lng: 118.823852,
  },
  {
    title: '北门东南侧',
    addr: '北门校内东侧空地南侧，南高北路旁',
    lat: 31.893461,
    lng: 118.823852,
  },
  {
    title: '橘园北侧南',
    addr: '位于橘园9/10舍北侧道路的南侧',
    lat: 31.885002,
    lng: 118.812975,
  },
  {
    title: '校医院西',
    addr: '校医院西侧空地',
    lat: 31.892616,
    lng: 118.823786,
  },
];

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
