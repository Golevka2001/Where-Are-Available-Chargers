<!-- 错误页面 -->
<!-- NOTE：目前所有错误共用这一个页面，所以跳转时需要借助 errorStore 传递错误信息，并在此页面中相应地显示不同内容。
  若 errorStore.errorFrom 为空，则默认为 404 页面。 -->

<template>
  <div
    :style="{ maxWidth: width < 960 ? '40rem' : '70rem' }"
    class="mx-auto mt-16"
  >
    <!-- 404 (default) & Unknown station name -->
    <div
      v-if="errorStore.errorFrom === '' || errorStore.errorFrom === 'map'"
      class="mx-auto"
      style="width: 80%"
    >
      <not-found>
        <span v-if="errorStore.errorFrom === 'map'">
          没有找到充电站 “{{ errorStore.stationName }}” 的位置信息
        </span>
        <span v-else> 发现了未知的页面，换个地方探索吧 </span>
      </not-found>
    </div>

    <!-- Status request failed -->
    <div
      v-else-if="errorStore.errorFrom === 'status'"
      class="mx-auto"
      style="width: 80%"
    >
      <status-error />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeRouteLeave } from 'vue-router';
import { useDisplay } from 'vuetify';
import { useErrorStore } from '@/store/error';

import { NotFound, StatusError } from '@/components/error-page/';

const { width } = useDisplay();
const errorStore = useErrorStore();

onBeforeRouteLeave(() => {
  // 离开页面时清空错误信息
  errorStore.errorFrom = '';
  errorStore.stationName = '';
});
</script>
