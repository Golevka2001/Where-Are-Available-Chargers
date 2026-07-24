<!-- 错误页面中的 404 页面 -->

<template>
  <v-alert
    border="top"
    border-color="#ffb700"
    color="surface"
    rounded="lg"
    variant="flat"
    class="elevation-6 text-center"
  >
    <div
      class="my-2"
      style="font-size: 1rem"
    >
      &nbsp;&nbsp;你的性格类型是：
    </div>
    <div style="font-size: 1.8rem; font-weight: bolder; opacity: 0.8">
      探险家
    </div>
    <div style="font-size: 1.1rem; font-weight: bolder; color: #e4ae3a">
      404 NOT FOUND
    </div>
    <div
      class="mx-auto my-4"
      style="height: 10rem; width: 10rem"
    >
      <img
        alt="explorer"
        src="@/assets/img/explorer.svg"
      />
    </div>
    <div
      class="mx-4"
      style="font-size: 0.8rem"
    >
      <slot> </slot>
    </div>

    <v-divider class="my-4" />

    <v-btn
      color="#e4ae3a"
      rounded="pill"
      variant="flat"
      @click.stop="router.push('/status')"
    >
      <span class="text-background"> 回到首页 </span>
    </v-btn>
  </v-alert>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();
</script>
