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
  <loading-indicator v-if="isLoadingIndicatorVisible" />

  <div
    v-else-if="fetchError || campusStore.campuses.length === 0"
    :style="{ maxWidth: width < MOBILE_BREAKPOINT ? '40rem' : '70rem' }"
    class="mx-auto"
  >
    <div class="ma-8">
      <status-error
        inline
        @retry="retryFetch"
      />
    </div>
  </div>

  <div
    v-else
    :style="{ maxWidth: width < MOBILE_BREAKPOINT ? '40rem' : '70rem' }"
    class="mx-auto"
  >
    <div class="ma-8">
      <announcement-board
        v-if="config.announcementBoard.enabled"
        class="mb-6"
      />
      <v-btn-toggle
        v-model="selectedCampusIndex"
        mandatory
        rounded="lg"
        class="mb-6"
        style="display: flex; width: 100%"
        @update:model-value="onCampusChange"
      >
        <v-btn
          v-for="(campus, index) in campusStore.campuses"
          density="comfortable"
          :key="campus.id"
          :value="index"
          style="flex: 1"
        >
          {{ campus.name }}
        </v-btn>
      </v-btn-toggle>

      <status-detail-drawer />

      <weather-panel
        :campus="selectedCampus"
        class="mb-6"
      />

      <status-overview :campus="selectedCampus" />

      <bottom-info-bar
        v-scroll="onScroll"
        ref="bottomInfoBarComponent"
        :campus="selectedCampus"
        @manually-update-data="manualUpdateData"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { onBeforeRouteLeave, useRouter } from 'vue-router';
import { useDisplay } from 'vuetify';
import { useAppStore } from '@/store/app';
import { useStatusStore } from '@/store/status';
import { useCampusStore } from '@/store/campus';
import config from '@/config';
import { MOBILE_BREAKPOINT } from '@/constants';

import { LoadingIndicator } from '@/components/global';
import {
  AnnouncementBoard,
  BottomInfoBar,
  StatusDetailDrawer,
  StatusOverview,
  WeatherPanel,
} from '@/components/status-page';
import { StatusError } from '@/components/error-page';

const router = useRouter();
const { width } = useDisplay();
const appStore = useAppStore();
const statusStore = useStatusStore();
const campusStore = useCampusStore();

const bottomInfoBarComponent = ref();
const isLoadingIndicatorVisible = ref(true);
const fetchError = ref(false);
const selectedCampusIndex = ref(0);
const selectedCampus = computed(
  () => campusStore.campuses[selectedCampusIndex.value],
);

let lastScrollY = 0;
let intervalId: ReturnType<typeof setInterval>;

// 触发定时器（定时器的功能是按照设定的间隔自动更新数据）
const startInterval = () => {
  clearInterval(intervalId); // 防止重复启动
  let autoUpdateCount = 0;
  intervalId = setInterval(async () => {
    if (router.currentRoute.value.path !== '/status') {
      // 路由不在当前页面时，清除定时器
      clearInterval(intervalId);
      return;
    }
    try {
      await statusStore.updateData(selectedCampus.value);
      // 一定次数后停止定时器
      autoUpdateCount++;
      if (autoUpdateCount >= selectedCampus.value.autoUpdateMaxTimes) {
        clearInterval(intervalId);
      }
    } catch (err) {
      // 数据更新失败，清除定时器
      clearInterval(intervalId);
      bottomInfoBarComponent.value.stopInterval();
      return;
    }
  }, selectedCampus.value.autoUpdateInterval);
};

// 底栏被点击触发手动更新数据，拉取数据成功后重置定时器
const manualUpdateData = async () => {
  // 停止定时器
  clearInterval(intervalId);
  try {
    await statusStore.updateData(selectedCampus.value);
    // 重置定时器
    bottomInfoBarComponent.value.startInterval();
    startInterval();
  } catch (err) {
    bottomInfoBarComponent.value.stopInterval();
    return;
  }
};

// 页面滚动，控制底栏的显示和隐藏
const onScroll = () => {
  if (
    appStore.bottomBarText !== null ||
    appStore.bottomBarBgColor !== null ||
    appStore.statusUpdateTimeDiff > selectedCampus.value.dataExpirationTime
  ) {
    return;
  }
  if (scrollY > lastScrollY) {
    // 向下滚动：隐藏底栏，一定时间后显示
    appStore.isBottomBarVisible = false;
    setTimeout(() => {
      appStore.isBottomBarVisible = true;
    }, config.bottomBarReshowDelay);
  } else {
    // 向上滚动：显示底栏
    appStore.isBottomBarVisible = true;
  }
  lastScrollY = scrollY;
};

onMounted(async () => {
  // 先获取校区列表
  await campusStore.fetchCampuses();
  selectedCampusIndex.value = getSelectedCampusIndex();

  // 页面挂载时更新数据，显示加载动画，之后在当前页面内不再显示加载动画
  isLoadingIndicatorVisible.value = true;
  try {
    await statusStore.updateData(selectedCampus.value);
  } catch (err) {
    // 数据更新失败，显示内联错误
    isLoadingIndicatorVisible.value = false;
    fetchError.value = true;
    return;
  }
  isLoadingIndicatorVisible.value = false;
  fetchError.value = false;

  // 数据更新完成后，底栏缓出
  setTimeout(() => {
    appStore.isBottomBarVisible = true;
  }, config.bottomBarInitDelay);

  startInterval();
});

// 应使用路由守卫而不能是 onUnmounted
onBeforeRouteLeave(() => {
  clearInterval(intervalId);
});

const onCampusChange = async () => {
  // 更新用户储存中的校区数据
  saveSelectedCampusIndex(selectedCampusIndex.value);
  router.go(0);
  // 下面是原本的逻辑，但是可能会导致切换后仍显示原来校区的数据
  // 所以改成 router.go(0) 强制重载
  /*
  isLoadingIndicatorVisible.value = true;
  try {
    await statusStore.updateData(selectedCampus.value);
  } catch (err) {
    errorStore.errorFrom = 'status';
    router.push('/error');
    return;
  } finally {
    isLoadingIndicatorVisible.value = false;
  }*/
};

const retryFetch = async () => {
  isLoadingIndicatorVisible.value = true;
  fetchError.value = false;
  try {
    await statusStore.updateData(selectedCampus.value);
  } catch (err) {
    isLoadingIndicatorVisible.value = false;
    fetchError.value = true;
    return;
  }
  isLoadingIndicatorVisible.value = false;

  setTimeout(() => {
    appStore.isBottomBarVisible = true;
  }, config.bottomBarInitDelay);

  startInterval();
};

// 储存和读取用户侧储存的校区数据
function saveSelectedCampusIndex(index: number) {
  localStorage.setItem(config.CAMPUS_INDEX_STORAGE_KEY, index.toString());
}

function getSelectedCampusIndex(): number {
  const storedIndex = localStorage.getItem(config.CAMPUS_INDEX_STORAGE_KEY);
  const index = storedIndex ? parseInt(storedIndex, 10) : 0;
  return index >= 0 && index < campusStore.campuses.length ? index : 0;
}
</script>
