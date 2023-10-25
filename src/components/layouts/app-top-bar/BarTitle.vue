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
import { ref } from 'vue';

const emojiFace = ref('&#128545;');

const onClickEmojiFace = () => {
  // 黄豆和小动物脸的编码范围
  const emojiCodeRangeList = [
    [128045, 128060],
    [128512, 128580],
    [129296, 129303],
    [129312, 129327],
  ];
  const rangeIndex = Math.floor(Math.random() * emojiCodeRangeList.length);
  const [start, end] = emojiCodeRangeList[rangeIndex];
  const emojiCode = Math.floor(Math.random() * (end - start + 1)) + start;
  emojiFace.value = `&#${emojiCode};`;
};
</script>
