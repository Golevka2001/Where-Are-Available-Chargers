<!-- TODO：没写完还 -->

<template>
  <div
    :style="{ maxWidth: width < 960 ? '70%' : '50%' }"
    class="mx-auto d-flex flex-column"
  >
    <loading-indicator :hide-text="true" />

    <v-divider />

    <div class="my-8">
      <span class="font-weight-black"> Where-Are-Available-Chargers </span>
      项目开始于 2022 年 11 月，初衷是为了帮助 SEUers 更便捷地找到空闲充电桩。
      <br />
      <br />
      目前应用已迭代至 v5 版本，校园内的充电桩数量也从最初的 17 个增加到了 52
      个。
      <br />
      <br />
      应用所提供的功能包括：
      <ul class="ml-6">
        <li>实时查看所用充电桩的使用情况</li>
        <li>充电桩位置指示（示意图、导航）</li>
        <li>天气预报</li>
        <li>历史记录统计</li>
        <li>API</li>
        <li>...</li>
      </ul>
    </div>

    <dev-stage-timeline class="justify-center" />
  </div>
</template>

<script lang="ts" setup>
import { useDisplay } from 'vuetify';

import { DevStageTimeline } from '@/components/about-page';
import { LoadingIndicator } from '@/components/global';

const { width } = useDisplay();
</script>
