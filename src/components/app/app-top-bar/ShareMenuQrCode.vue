<!-- 分享菜单下的二维码 -->

<template>
  <v-sheet
    color="white"
    rounded="lg"
    width="10rem"
    style="outline: rgb(158, 158, 158) solid 1px"
  >
    <!-- QR code image -->
    <v-img
      src="@/assets/img/qr-code.svg"
      height="160"
    >
      <template v-slot:placeholder>
        <div class="d-flex fill-height align-center justify-center">
          <v-progress-circular
            color="grey"
            :indeterminate="true"
          />
        </div>
      </template>
    </v-img>

    <!-- Download button -->
    <v-btn
      :block="true"
      :icon="true"
      density="compact"
      rounded="0"
      variant="tonal"
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
  </v-sheet>
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
  appStore.showSnackBar('&#10024;&nbsp;已保存', 'green');
};
</script>
