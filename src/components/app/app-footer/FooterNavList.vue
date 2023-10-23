<!-- 页脚导航链接 -->

<template>
  <v-btn
    v-for="navItem in navList"
    :key="navItem.text"
    :ripple="false"
    rounded="xl"
    size="small"
    variant="plain"
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
      target="_blank"
      class="text-decoration-none"
      style="color: inherit"
    >
      {{ navItem.text }}
    </a>
  </v-btn>
</template>

<script lang="ts" setup>
const navList = [
  {
    text: 'Source Code',
    link: 'https://github.com/Golevka2001/Where-Are-Available-Chargers',
    isRouterLink: false,
  },
  {
    text: 'Issues',
    link: 'https://github.com/Golevka2001/Where-Are-Available-Chargers/issues',
    isRouterLink: false,
  },
  {
    text: 'API',
    link: 'https://chargers.injs.eu/doc/ver4_pub/api/get_status/',
    isRouterLink: false,
  },
  {
    text: 'Docs',
    link: 'https://chargers.injs.eu/doc/',
    isRouterLink: false,
  },
  {
    text: 'About',
    link: '/about',
    isRouterLink: true,
  },
];
</script>
