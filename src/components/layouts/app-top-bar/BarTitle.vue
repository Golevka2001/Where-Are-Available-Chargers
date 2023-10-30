<!-- 顶部导航栏标题 -->

<template>
  <v-app-bar-title
    class="mx-0 text-center"
    style="user-select: none"
  >
    <span>&#128268;</span>
    <!-- 川剧变脸 -->
    <v-scroll-y-reverse-transition leave-absolute>
      <span
        :key="emojiFace"
        v-html="emojiFace"
        style="cursor: pointer"
        @click.stop="onClickEmojiFace"
      ></span>
    </v-scroll-y-reverse-transition>
    <router-link
      to="/status"
      class="font-weight-medium text-decoration-none text-no-wrap"
      style="font-size: 1rem; color: inherit"
    >
      &nbsp;Where Are Available Chargers
    </router-link>
  </v-app-bar-title>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';

const route = useRoute();

const isHalloween = () => {
  const now = new Date();
  return (
    (now.getMonth() === 9 && now.getDate() === 31) ||
    (now.getMonth() === 10 && now.getDate() === 1)
  );
};

const emojiFace = isHalloween() ? ref('&#127875;') : ref('&#128545;');

// 点击表演川剧变脸
const onClickEmojiFace = () => {
  let emojiCodeRangeList = [];
  if (isHalloween()) {
    // 🎃 Happy Halloween
    emojiCodeRangeList = [
      [127875, 127875],
      [128121, 128128],
      [128520, 128520],
      [129313, 129313],
      [129415, 129415],
      [129484, 129484],
      [129497, 129503],
      [129702, 129702],
    ];
  } else {
    // 黄豆和小动物脸的编码范围
    emojiCodeRangeList = [
      [128045, 128060],
      [128512, 128580],
      [129296, 129303],
      [129312, 129327],
    ];
  }
  const rangeIndex = Math.floor(Math.random() * emojiCodeRangeList.length);
  const [start, end] = emojiCodeRangeList[rangeIndex];
  const emojiCode = Math.floor(Math.random() * (end - start + 1)) + start;
  emojiFace.value = `&#${emojiCode};`;
};

// 在不同页面显示不同的表情
onBeforeMount(() => {
  if (route.path === '/about') emojiFace.value = '&#128526;';
  if (route.path === '/error') emojiFace.value = '&#128560;';
});
onBeforeRouteUpdate((to) => {
  if (to.path === '/about') emojiFace.value = '&#128526;';
  else if (to.path === '/error') emojiFace.value = '&#128560;';
  else emojiFace.value = '&#128545;';
});
</script>
