<!-- 关于页面中的开发阶段时间线 -->

<template>
  <v-timeline
    align="start"
    density="compact"
    direction="vertical"
    side="end"
    truncate-line="start"
  >
    <v-timeline-item
      v-for="devStage in devStageList"
      :key="devStage.version"
      dot-color="surface"
      size="x-small"
    >
      <v-card
        :width="cardWidth"
        rounded="lg"
        variant="elevated"
      >
        <!-- Title: version + date -->
        <v-card
          :color="devStage.color"
          rounded="0"
          variant="tonal"
          class="ma-auto px-4 py-1 d-flex"
        >
          <div v-html="devStage.version"></div>
          <v-spacer />
          <div>
            {{ devStage.startTime }}
          </div>
        </v-card>

        <!-- Description -->
        <v-card-text
          v-html="devStage.description"
          class="bg-background"
        />
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useDisplay } from 'vuetify';
import { devStageList } from '@/utils/lists';

const { width } = useDisplay();

const cardWidth = computed(() => {
  if (width.value <= 350) {
    return '220px';
  } else if (width.value <= 600) {
    // 不能直接使用百分比
    return width.value * 0.6 + 'px';
  } else {
    return '400px';
  }
});
</script>
