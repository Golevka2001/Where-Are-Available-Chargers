<template>
  <div>
    <!-- 卡片的 padding 保持 3 不要改 -->
    <v-card
      variant="outlined"
      class="px-3 py-3 mx-6 my-6 text-center"
    >
      <v-row>
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
