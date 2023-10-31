<!-- 关于页面 -->

<template>
  <div
    :style="{ maxWidth: width < 960 ? '70%' : '50%' }"
    class="mx-auto mb-16 d-flex flex-column"
  >
    <loading-indicator :hide-text="true" />

    <!-- About us -->
    <div class="mb-6 d-flex align-center">
      <v-divider thickness="2" />
      <div
        class="mx-4 font-weight-bold text-no-wrap"
        style="font-size: 1.2rem; opacity: 0.8"
      >
        ABOUT
      </div>
      <v-divider thickness="2" />
    </div>
    <div>
      <span class="font-weight-black"> Where-Are-Available-Chargers </span>
      项目开始于 2022 年 11 月，初衷是为了帮助 SEUers 更便捷地找到空闲充电桩。
      <br /><br />
      目前应用已迭代至 v5 版本，校园内的充电桩数量也从最初的 17 个增加到了 52
      个。
      <br /><br />
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

    <!-- Timeline -->
    <div class="mt-12 mb-6 d-flex align-center">
      <v-divider thickness="2" />
      <div
        class="mx-4 font-weight-bold text-no-wrap"
        style="font-size: 1.2rem; opacity: 0.8"
      >
        TIMELINE
      </div>
      <v-divider thickness="2" />
    </div>
    <dev-stage-timeline class="mx-auto justify-center" />

    <!-- Developers -->
    <div class="mt-12 mb-6 d-flex align-center">
      <v-divider thickness="2" />
      <div
        class="mx-4 font-weight-bold text-no-wrap"
        style="font-size: 1.2rem; opacity: 0.8"
      >
        DEVELOPERS
      </div>
      <v-divider thickness="2" />
    </div>
    <developer-avatar />

    <!-- Support -->
    <div class="mt-12 mb-6 d-flex align-center">
      <v-divider thickness="2" />
      <div
        class="mx-4 font-weight-bold text-no-wrap"
        style="font-size: 1.2rem; opacity: 0.8"
      >
        SUPPORT
      </div>
      <v-divider thickness="2" />
    </div>
    <div>
      如果这个应用有帮助到您，不妨到我们的
      <a
        href="https://github.com/Golevka2001/Where-Are-Available-Chargers"
        target="_blank"
        style="color: inherit"
        >GitHub</a
      >
      点上一颗 &#11088;Star。
      也可以通过以下赞赏码发起捐赠，以支持项目的长久运行。
    </div>
    <div class="mx-auto mt-4">
      <v-img
        src="@/assets/img/reward-code.webp"
        height="10rem"
        width="10rem"
        class="border-md rounded-lg"
      >
        <template v-slot:placeholder>
          <div class="d-flex fill-height align-center justify-center">
            <v-progress-circular
              color="default"
              :indeterminate="true"
            />
          </div>
        </template>
      </v-img>
    </div>

    <!-- Acknowledgement -->
    <div class="mt-12 mb-6 d-flex align-center">
      <v-divider thickness="2" />
      <div
        class="mx-4 font-weight-bold text-no-wrap"
        style="font-size: 1.2rem; opacity: 0.8"
      >
        ACKNOWLEDGEMENT
      </div>
      <v-divider thickness="2" />
    </div>
    <div class="text-center">
      <a
        href="https://bwc.seu.edu.cn"
        target="_blank"
        style="color: inherit"
      >
        东南大学保卫处
      </a>
      <br />
      百骑客
      <br />
      东南大学唐仲英爱心社
      <br />
      <a
        href="https://www.7mate.cn"
        target="_blank"
        style="color: inherit"
      >
        7MA出行
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useDisplay } from 'vuetify';

import { DevStageTimeline, DeveloperAvatar } from '@/components/about-page';
import { LoadingIndicator } from '@/components/global';

const { width } = useDisplay();
</script>
