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

    <v-snackbar
      v-model="buildInfoVisible"
      :timeout="3000"
    >
      {{ buildInfo }}
    </v-snackbar>
  </div>
</template>

<script lang="ts" setup>
import { version } from '@/../package.json';
import { ref } from 'vue';

import FooterCopyright from './FooterCopyright.vue';
import FooterNavList from './FooterNavList.vue';

const buildInfoVisible = ref(false);
const buildInfo = import.meta.env.VITE_BUILD_INFO || version;
</script>
