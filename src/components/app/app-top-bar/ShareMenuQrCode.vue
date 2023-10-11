<!-- 分享菜单下的二维码 -->

<template>
  <v-sheet
    :rounded="true"
    width="10rem"
    class="mx-auto my-6 bg-white"
    style="outline: rgb(158, 158, 158) solid 1px"
  >
    <!-- QR code image -->
    <v-img src="@/assets/img/qr-code.svg">
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
      @click.stop="clickDownloadBtn"
    >
      <v-icon> mdi-download-box-outline </v-icon>
      <v-tooltip
        activator="parent"
        location="bottom"
      >
        保存二维码
      </v-tooltip>
    </v-btn>
  </v-sheet>

  <!-- Snackbar -->
  <v-snackbar
    v-model="isSnackbarVisible"
    color="green"
    timeout="1000"
  >
    &#10024;&nbsp;已保存
  </v-snackbar>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const isSnackbarVisible = ref(false);

const clickDownloadBtn = () => {
  // 下载二维码图片（png）
  const link = document.createElement('a');
  link.href = '/img/qr-code.png';
  link.download = 'qr-code.png';
  link.click();
  // 显示提示信息
  isSnackbarVisible.value = true;
};
</script>
