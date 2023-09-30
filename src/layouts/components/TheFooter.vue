<!-- 页脚 -->
<!-- 包含：链接、版本号、版权、鸣谢（待补充） -->

<template>
  <v-footer class="my-4 text-center">
    <v-row style="align-self: self-end">
      <v-divider />

      <!-- Nav links -->
      <v-col cols="12">
        <v-btn
          v-for="navItem in navItems"
          :key="navItem.text"
          size="small"
          variant="plain"
          rounded="xl"
          class="px-2"
          style="font-size: 0.7rem"
        >
          <!-- 区分外链和内部路由 -->
          <router-link
            v-if="navItem.isRouterLink"
            :to="navItem.link"
            class="text-decoration-none"
            style="color: inherit"
          >
            {{ navItem.text }}
          </router-link>
          <a
            v-else
            :href="navItem.link"
            :target="navItem.target"
            class="text-decoration-none"
            style="color: inherit"
          >
            {{ navItem.text }}
          </a>
        </v-btn>
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
        class="py-0"
        style="font-size: 0.7rem"
      >
        &#169;&nbsp;2022-{{ new Date().getFullYear() }}&nbsp;
        <span
          v-for="maintainer in maintainers"
          :key="maintainer.name"
        >
          <a
            :href="maintainer.link"
            target="_blank"
            v-text="maintainer.name"
            class="text-decoration-none"
            style="color: inherit"
          />
          <span v-if="maintainer !== maintainers[maintainers.length - 1]">
            &
          </span>
        </span>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script setup lang="ts">
import { version } from '@/../package.json';
const navItems = [
  {
    text: 'Source Code',
    link: 'https://github.com/Golevka2001/Where-Are-Available-Chargers',
    target: '_blank',
    isRouterLink: false,
  },
  {
    text: 'Issues',
    link: 'https://github.com/Golevka2001/Where-Are-Available-Chargers/issues',
    target: '_blank',
    isRouterLink: false,
  },
  {
    text: 'API',
    link: 'https://chargers.injs.eu/doc/ver4_pub/api/get_status/',
    target: '_blank',
    isRouterLink: false,
  },
  {
    text: 'Docs',
    link: 'https://chargers.injs.eu/doc/',
    target: '_blank',
    isRouterLink: false,
  },
  {
    text: 'About',
    link: '/about',
    target: '',
    isRouterLink: true,
  },
];

const maintainers = [
  {
    name: 'Gol3vka',
    link: 'https://github.com/Golevka2001',
  },
  {
    name: 'Csimide',
    link: 'https://github.com/csimide',
  },
];
</script>
