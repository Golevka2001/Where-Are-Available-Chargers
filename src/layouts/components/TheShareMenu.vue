<template>
  <v-menu :close-on-content-click="false">
    <template v-slot:activator="{ props }">
      <!-- Share button -->
      <v-btn
        @click.stop="appStore.isSideDrawerOpen = false"
        v-bind="props"
        icon="mdi-share-variant-outline"
      />
    </template>

    <v-card>
      <v-sheet
        width="10rem"
        class="mx-auto my-6 bg-white"
        style="outline: gray solid 1px"
        rounded
      >
        <!-- QR code -->
        <v-img src="@/assets/img/qr-code.svg">
          <template v-slot:placeholder>
            <div class="d-flex fill-height align-center justify-center">
              <v-progress-circular
                color="grey"
                indeterminate
              />
            </div>
          </template>
        </v-img>
        <!-- Download button -->
        <v-btn
          @click.stop="clickDownloadButton"
          density="compact"
          rounded="0"
          variant="tonal"
          block
          icon
        >
          <v-icon> mdi-download-box-outline </v-icon>
          <v-tooltip
            activator="parent"
            location="bottom"
          >
            下载二维码
          </v-tooltip>
        </v-btn>
      </v-sheet>

      <!-- Link -->
      <v-text-field
        density="compact"
        label="Link"
        model-value="https://chargers.injs.eu"
        variant="outlined"
        class="mx-4"
        style="width: 15rem"
        flat
        readonly
      >
        <!-- Copy button -->
        <template v-slot:append-inner>
          <v-btn
            @click.stop="clickCopyButton"
            rounded=""
            size="x-small"
            variant="tonal"
            icon
          >
            <v-icon> mdi-content-copy </v-icon>
            <v-tooltip
              activator="parent"
              location="bottom"
            >
              复制网址
            </v-tooltip>
          </v-btn>
        </template>
      </v-text-field>
    </v-card>
  </v-menu>

  <!-- Snackbar -->
  <!-- TODO：想让消息条显示在分享菜单中 -->
  <v-snackbar
    v-model="isSnackbarVisible"
    :timeout="snackbarTimeout"
    color="success"
  >
    {{ snackbarText }}
  </v-snackbar>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useAppStore } from '@/store/app';

const appStore = useAppStore();
const isSnackbarVisible = ref(false);
const snackbarTimeout = 1000; // ms
const snackbarText = ref('');

// 点击下载按钮
const clickDownloadButton = () => {
  // 下载二维码图片（png）
  const link = document.createElement('a');
  link.href = '/public/img/qr-code.png';
  link.download = 'qr-code.png';
  link.click();
  // 显示提示信息
  isSnackbarVisible.value = true;
  snackbarText.value = '已下载';
};

// 点击复制按钮
const clickCopyButton = () => {
  // 复制网址
  navigator.clipboard.writeText('https://chargers.injs.eu');
  // 显示提示信息
  isSnackbarVisible.value = true;
  snackbarText.value = '已复制到剪贴板';
};
</script>
