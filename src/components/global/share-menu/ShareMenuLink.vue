<!-- 分享菜单下的链接 -->

<template>
  <!-- Link -->
  <v-fade-transition mode="out-in">
    <v-text-field
      v-model:model-value="text"
      :key="String(showHint)"
      :focused="isFocused"
      :readonly="true"
      :style="{ color: color }"
      density="compact"
      label="Link"
      rounded="lg"
      variant="outlined"
      style="width: 16rem"
      @update:focused="isFocused = false"
    >
      <!-- Copy button -->
      <template v-slot:append-inner>
        <v-btn
          :icon="true"
          :rounded="true"
          :variant="showHint ? 'text' : 'tonal'"
          size="x-small"
          @click.stop="onClickCopyBtn"
        >
          <v-icon> {{ showHint ? mdiCheck : mdiContentCopy }} </v-icon>
          <v-tooltip
            activator="parent"
            location="bottom"
          >
            复制网址
          </v-tooltip>
        </v-btn>
      </template>
    </v-text-field>
  </v-fade-transition>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useTheme } from 'vuetify';
import config from '@/config';

import { mdiCheck, mdiContentCopy } from '@mdi/js';

let isFocused = false; // 处理不希望文本框在点击时高亮的问题
let isProcessingClick = false;

// 点击按钮后，文字、颜色、按钮图标将变化
const showHint = ref(false);
const text = computed(() => {
  return showHint.value ? '✨已复制到剪贴板' : config.thisSiteUrl;
});
const color = computed(() => {
  return showHint.value ? useTheme().current.value.colors.success : '';
});

const onClickCopyBtn = () => {
  // 防止重复点击
  if (isProcessingClick) return;
  isProcessingClick = true;
  // 复制网址
  navigator.clipboard.writeText(config.thisSiteUrl);
  // 显示提示信息 2s
  showHint.value = true;
  setTimeout(() => {
    showHint.value = false;
    isProcessingClick = false;
  }, 2000);
};
</script>
