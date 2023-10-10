<!-- 页脚 -->
<!-- +-------------------------+ -->
<!-- |  Link1 Link2 Link3 ...  | -->
<!-- |         Ver ...         | -->
<!-- |     ©2022-2023 ...      | -->
<!-- +-------------------------+ -->

<template>
  <div class="mb-4 align-end">
    <v-divider />
    <v-footer class="text-center bg-transparent">
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
        >
          Ver {{ version }}
        </v-col>

        <!-- CopyRight -->
        <v-col
          cols=" 12"
          class="pt-0"
        >
          <footer-copyright />
        </v-col>
      </v-row>
    </v-footer>
  </div>
</template>

<script setup lang="ts">
import { version } from '@/../package.json';
import FooterNavList from './FooterNavList.vue';
import FooterCopyright from './FooterCopyright.vue';
</script>
