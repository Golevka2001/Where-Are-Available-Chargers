<!-- 分享菜单下的链接 -->

<template>
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
        @click.stop="clickCopyBtn"
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

  <!-- Snackbar -->
  <!-- TODO：考虑消息条复用 & 显示在分享菜单处 -->
  <v-snackbar
    v-model="isSnackbarVisible"
    timeout="1000"
    color="success"
  >
    &#10024;&nbsp;已复制到剪贴板
  </v-snackbar>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const isSnackbarVisible = ref(false);

const clickCopyBtn = () => {
  // 复制网址
  navigator.clipboard.writeText('https://chargers.injs.eu');
  // 显示提示信息
  isSnackbarVisible.value = true;
};
</script>
