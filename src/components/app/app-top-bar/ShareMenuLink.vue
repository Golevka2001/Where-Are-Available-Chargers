<!-- 分享菜单下的链接 -->

<template>
  <!-- Link -->
  <v-text-field
    :model-value="link"
    :readonly="true"
    density="compact"
    label="Link"
    variant="outlined"
    class="mx-4"
    style="width: 15rem"
  >
    <!-- Copy button -->
    <template v-slot:append-inner>
      <v-btn
        :icon="true"
        rounded=""
        size="x-small"
        variant="tonal"
        @click.stop="onClickCopyBtn"
      >
        <v-icon> {{ mdiContentCopy }} </v-icon>
        <v-tooltip
          activator="parent"
          location="bottom"
        >
          复制网址
        </v-tooltip>
      </v-btn>
    </template>
  </v-text-field>

  <!-- Snackbar -->
  <!-- TODO：考虑消息条复用 & 显示在分享菜单处 -->
  <v-snackbar
    v-model="isSnackbarVisible"
    color="green"
    timeout="1000"
  >
    &#10024;&nbsp;已复制到剪贴板
  </v-snackbar>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import { mdiContentCopy } from '@mdi/js';

const isSnackbarVisible = ref(false);
const link = 'https://chargers.injs.eu';

const onClickCopyBtn = () => {
  // 复制网址
  navigator.clipboard.writeText(link);
  // 显示提示信息
  isSnackbarVisible.value = true;
};
</script>
