<!-- 分享菜单下的链接 -->

<template>
  <!-- Link -->
  <v-text-field
    v-model:model-value="config.thisSiteUrl"
    :readonly="true"
    density="compact"
    label="Link"
    rounded="lg"
    variant="outlined"
    style="width: 16rem"
  >
    <!-- Copy button -->
    <template v-slot:append-inner>
      <v-btn
        :icon="true"
        :rounded="true"
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
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store/app';
import config from '@/config';

import { mdiContentCopy } from '@mdi/js';

const appStore = useAppStore();

const onClickCopyBtn = () => {
  // 复制网址
  navigator.clipboard.writeText(config.thisSiteUrl);
  // 显示提示信息
  appStore.showSnackBar('&#10024;&nbsp;已复制到剪贴板', 'success');
};
</script>
