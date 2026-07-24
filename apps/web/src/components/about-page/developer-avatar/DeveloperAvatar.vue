<!-- 关于页面中的开发者头像、ID、链接 -->

<template>
  <div>
    <div class="d-flex justify-space-evenly">
      <div
        v-for="developer in developerList"
        :key="developer.name"
      >
        <v-avatar>
          <v-img
            :alt="developer.name"
            :src="developer.avatar"
          />
        </v-avatar>
        <a
          :href="developer.link"
          target="_blank"
          class="ml-1 text-decoration-none"
          style="font-size: 0.8rem; color: inherit; opacity: 0.6"
        >
          @{{ developer.name }}
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { developerList } from '@/utils/lists';
</script>
