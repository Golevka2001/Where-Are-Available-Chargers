<template>
  <div>
    <v-card
      variant="outlined"
      class="mx-6 my-6 text-center"
    >
      <v-row class="mx-auto my-auto">
        <!-- TODO：列数根据屏幕宽度调整 -->
        <v-col
          v-for="(stationStatus, stationName, index) in appStore.statusManager
            .statusOverview"
          :key="index"
          cols="12"
          class="px-0 py-0"
        >
          <!-- stationName 会被推断为 number，不用 String() 处理会红线 -->
          <StationCard
            :stationName="String(stationName)"
            :stationStatus="stationStatus"
          />
          <v-divider
            v-if="
              index !==
              Object.keys(appStore.statusManager.statusOverview).length - 1
            "
            class="border-opacity-100"
          />
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store/app';
import StationCard from '@/components/StatusOverview/StationCard.vue';

const appStore = useAppStore();

appStore.statusManager.updateData();
</script>
