<!-- 分享菜单下的二维码 -->

<template>
  <div
    class="rounded-lg"
    style="outline: thin solid darkgray; width: 10rem"
  >
    <!-- QR code image -->
    <div
      class="rounded-ts-lg rounded-te-lg rounded-bs-0 rounded-be-0"
      style="background-color: white"
    >
      <v-img
        src="@/assets/img/qr-code.svg"
        height="10rem"
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

    <!-- Download button -->
    <v-fade-transition mode="out-in">
      <v-btn
        :block="true"
        :color="color"
        :icon="true"
        :key="String(showHint)"
        :variant="showHint ? 'text' : 'tonal'"
        density="compact"
        class="rounded-ts-0 rounded-te-0 rounded-bs-lg rounded-be-lg"
        @click.stop="onClickDownloadBtn"
      >
        <v-icon>
          {{ showHint ? mdiCheck : mdiDownloadBoxOutline }}
        </v-icon>
        <v-tooltip
          activator="parent"
          location="bottom"
        >
          保存二维码
        </v-tooltip>
      </v-btn>
    </v-fade-transition>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useTheme } from 'vuetify';

import { mdiCheck, mdiDownloadBoxOutline } from '@mdi/js';

let isProcessingClick = false;

// 点击按钮后，颜色、按钮图标将变化
const showHint = ref(false);
const color = computed(() => {
  return showHint.value ? useTheme().current.value.colors.success : '';
});

const onClickDownloadBtn = () => {
  // 防止重复点击
  if (isProcessingClick) return;
  isProcessingClick = true;
  // 下载二维码图片（png）
  const link = document.createElement('a');
  link.href = '/img/qr-code.png';
  link.download = 'qr-code.png';
  link.click();
  // 显示提示信息
  showHint.value = true;
  setTimeout(() => {
    showHint.value = false;
    isProcessingClick = false;
  }, 2000);
};
</script>
