<!-- 状态详细信息抽屉的头部内容 -->
<!-- +---------------------+ -->
<!-- | |!|  Station Name   | -->
<!-- |                     | -->
<!-- | Station Description | -->
<!-- +---------------------+ -->

<template>
  <v-card
    color="green"
    rounded="0"
    variant="tonal"
  >
    <template v-slot:title>
      <div class="d-flex align-center">
        <!-- Map button -->
        <!-- TODO：link -->
        <v-btn
          :icon="true"
          variant="text"
        >
          <v-icon>
            {{ mdiMapMarkerOutline }}
          </v-icon>
          <v-tooltip
            activator="parent"
            location="bottom"
          >
            查看地图
          </v-tooltip>
        </v-btn>

        <!-- Station name -->
        <span class="ml-4 text-h5 font-weight-black">
          {{ stationName }}
        </span>
      </div>
    </template>

    <!-- Description -->
    <v-card-text
      v-show="stationDescription"
      class="ml-2"
    >
      {{ stationDescription }}
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import { mdiMapMarkerOutline } from '@mdi/js';

defineProps<{
  stationDescription: string | null | undefined;
  stationName: string;
}>();
</script>
