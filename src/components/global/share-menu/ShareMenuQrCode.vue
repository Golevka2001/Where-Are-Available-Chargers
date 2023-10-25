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
    <v-btn
      :block="true"
      :icon="true"
      density="compact"
      variant="tonal"
      class="rounded-ts-0 rounded-te-0 rounded-bs-lg rounded-be-lg"
      @click.stop="onClickDownloadBtn"
    >
      <v-icon> {{ mdiDownloadBoxOutline }} </v-icon>
      <v-tooltip
        activator="parent"
        location="bottom"
      >
        保存二维码
      </v-tooltip>
    </v-btn>
  </div>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store/app';

import { mdiDownloadBoxOutline } from '@mdi/js';

const appStore = useAppStore();

const onClickDownloadBtn = () => {
  // 下载二维码图片（png）
  const link = document.createElement('a');
  link.href = '/img/qr-code.png';
  link.download = 'qr-code.png';
  link.click();
  // 显示提示信息
  appStore.showSnackBar('&#10024;&nbsp;已保存', 'success');
};
</script>
