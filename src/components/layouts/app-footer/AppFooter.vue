<!-- 页脚 -->
<!-- +-------------------------+ -->
<!-- |  Link1 Link2 Link3 ...  | -->
<!-- |         Ver ...         | -->
<!-- |     ©2022-2023 ...      | -->
<!-- +-------------------------+ -->

<template>
  <div class="align-end">
    <v-divider />
    <v-footer
      color="transparent"
      class="text-center"
    >
      <v-row class="my-0">
        <!-- Nav links -->
        <v-col cols="12">
          <footer-nav-list />
        </v-col>

        <!-- Version -->
        <v-col
          cols="12"
          class="py-0"
          style="font-size: 0.7rem"
          @click="buildInfoVisible = true"
        >
          Ver {{ version }}
        </v-col>

        <!-- Copyright -->
        <v-col
          cols=" 12"
          class="pt-0"
        >
          <footer-copyright />
        </v-col>
      </v-row>
    </v-footer>

    <v-dialog v-model="buildInfoVisible">
      <div style="display: flex; justify-content: center">
        <v-card
          max-width="400"
          title="版本详情"
        >
          <v-card-subtitle>版本号 {{ version }}</v-card-subtitle>
          <v-card-subtitle> 编译信息 </v-card-subtitle>
          <v-card-text>
            <code>
              {{ buildInfo }}
            </code>
          </v-card-text>
          <template v-slot:actions>
            <v-btn
              v-for="(i, index) in resetTypes"
              @click="
                resetDialogVisible = true;
                resetTypeSelected = index;
              "
            >
              {{ i.name }}
            </v-btn>
            <v-btn
              text="关闭"
              @click="buildInfoVisible = false"
            ></v-btn>
          </template>
        </v-card>
      </div>
    </v-dialog>

    <v-dialog v-model="resetDialogVisible">
      <div style="display: flex; justify-content: center">
        <v-card
          max-width="400"
          title="重置确认"
        >
          <v-card-text>
            确定要{{ (resetTypes ?? [])[resetTypeSelected]?.name ?? '' }}吗？
          </v-card-text>
          <template v-slot:actions>
            <v-btn
              color="red"
              text="确定"
              @click="
                ((resetTypes ?? [])[resetTypeSelected]?.f ?? (() => {}))()
              "
            ></v-btn>
            <v-btn
              text="取消"
              @click="resetDialogVisible = false"
            ></v-btn>
          </template>
        </v-card>
      </div>
    </v-dialog>
  </div>
</template>

<script lang="ts" setup>
import { version } from '@/../package.json';
import { ref } from 'vue';

import FooterCopyright from './FooterCopyright.vue';
import FooterNavList from './FooterNavList.vue';
import config from '@/config';

const buildInfoVisible = ref(false);
const buildInfo = import.meta.env.VITE_BUILD_INFO || version;

const resetDialogVisible = ref(false);
const resetTypeSelected = ref(0);

async function forceUpdate() {
  if ('serviceWorker' in navigator) {
    try {
      // 获取所有的 Service Worker 注册
      const registrations = await navigator.serviceWorker.getRegistrations();

      // 卸载所有的 Service Worker
      for (let registration of registrations) {
        await registration.unregister();
      }

      // 清除缓存
      const cacheNames = await caches.keys();
      for (let cacheName of cacheNames) {
        await caches.delete(cacheName);
      }

      // 重新加载页面
      window.location.reload();
    } catch (error) {
      console.error('刷新失败:', error);
    }
  } else {
    // 如果浏览器不支持 Service Worker，只重新加载页面
    window.location.reload();
  }
}

const CAMPUS_INDEX_STORAGE_KEY = config.CAMPUS_INDEX_STORAGE_KEY;

function resetLocalStorage() {
  localStorage.removeItem(CAMPUS_INDEX_STORAGE_KEY);
  window.location.reload();
}

async function resetAll() {
  localStorage.removeItem(CAMPUS_INDEX_STORAGE_KEY);
  await forceUpdate();
}

const resetTypes = [
  {
    name: '重置本地版本',
    f: forceUpdate,
  },
  {
    name: '重置偏好设置',
    f: resetLocalStorage,
  },
  {
    name: '全部重置',
    f: resetAll,
  },
];
</script>
