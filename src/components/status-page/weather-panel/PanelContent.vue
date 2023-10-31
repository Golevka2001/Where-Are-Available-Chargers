<!-- 天气预报面板展开后的详细内容 -->
<!-- +--------------------------+ -->
<!-- | 3pm  6pm  9pm  12pm  3am | -->
<!-- |  ~    ~    ~    ~     ~  | -->
<!-- +--------------------------+ -->

<template>
  <v-row class="ma-0 justify-space-around">
    <v-col
      v-for="({ time, icon }, index) in weatherStore.getSkyconIconList(
        iconListInterval,
      )"
      :key="index"
      cols="auto"
      class="pa-1"
    >
      <v-card
        size="sm"
        variant="text"
        class="text-center"
      >
        <div class="ma-0">
          {{ width < 400 ? get12HourTime(time) : time }}
        </div>
        <v-icon>{{ icon }}</v-icon>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useDisplay } from 'vuetify';
import { useWeatherStore } from '@/store/weather';

const { width } = useDisplay();
const weatherStore = useWeatherStore();

// 宽度不够时间隔显示
const iconListInterval = computed(() => {
  if (width.value > 960) return 1;
  if (width.value > 500) return 2;
  if (width.value > 350) return 3;
  if (width.value > 300) return 4;
  return 6;
});

// 宽度不够时显示 am/pm 格式
const get12HourTime = (time: string) => {
  const hour = parseInt(time.split(':')[0]);
  return `${hour > 12 ? hour - 12 : hour}${hour >= 12 ? 'pm' : 'am'}`;
};
</script>
