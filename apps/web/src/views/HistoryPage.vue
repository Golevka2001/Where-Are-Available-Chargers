<!-- 历史数据页面 -->

<template>
  <loading-indicator v-if="isLoadingIndicatorVisible" />

  <div
    v-else-if="campusStore.campuses.length === 0"
    :style="{ maxWidth: width < MOBILE_BREAKPOINT ? '40rem' : '70rem' }"
    class="mx-auto"
  >
    <div class="ma-8">
      <status-error
        inline
        @retry="retryFetch"
      />
    </div>
  </div>

  <div
    v-else
    :style="{ maxWidth: width < MOBILE_BREAKPOINT ? '40rem' : '70rem' }"
    class="mx-auto"
  >
    <div class="ma-8">
      <!-- Campus Selector -->
      <v-btn-toggle
        v-model="selectedCampusIndex"
        mandatory
        rounded="lg"
        class="mb-6"
        style="display: flex; width: 100%"
      >
        <v-btn
          v-for="(campus, index) in campusStore.campuses"
          density="comfortable"
          :key="campus.id"
          :value="index"
          style="flex: 1"
        >
          {{ campus.name }}
        </v-btn>
      </v-btn-toggle>

      <!-- Range Selector -->
      <div class="d-flex justify-center mb-2">
        <v-btn-toggle
          v-model="selectedRange"
          mandatory
          rounded="lg"
        >
          <v-btn
            v-for="r in ranges"
            :key="r.value"
            :value="r.value"
            density="comfortable"
          >
            {{ r.label }}
          </v-btn>
        </v-btn-toggle>
      </div>

      <!-- Custom Date Range Picker -->
      <div
        v-if="selectedRange === 'custom'"
        class="d-flex justify-center align-center mb-2 ga-2"
      >
        <v-menu
          v-model="startMenuOpen"
          :close-on-content-click="false"
        >
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              variant="outlined"
              rounded="lg"
              size="small"
            >
              {{ formatDateLabel(customStartDate) || '开始日期' }}
            </v-btn>
          </template>
          <v-date-picker
            v-model="customStartDate"
            :max="customEndDate || undefined"
            @update:model-value="onStartDateChange"
          />
        </v-menu>
        <span class="text-medium-emphasis">至</span>
        <v-menu
          v-model="endMenuOpen"
          :close-on-content-click="false"
        >
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              variant="outlined"
              rounded="lg"
              size="small"
            >
              {{ formatDateLabel(customEndDate) || '结束日期' }}
            </v-btn>
          </template>
          <v-date-picker
            v-model="customEndDate"
            :min="customStartDate || undefined"
            @update:model-value="onEndDateChange"
          />
        </v-menu>
      </div>
      <div
        v-if="selectedRange === 'custom'"
        class="text-center text-medium-emphasis text-caption mb-4"
      >
        时间范围不能超过 7 天
      </div>
      <div
        v-else
        class="mb-6"
      />

      <!-- Loading -->
      <loading-indicator v-if="loading" />

      <!-- Empty State -->
      <div
        v-else-if="historyData.length === 0"
        class="text-center py-8 text-medium-emphasis"
      >
        暂无历史数据
      </div>

      <!-- Chart -->
      <v-card
        v-else
        variant="flat"
        rounded="lg"
      >
        <v-card-text>
          <v-chart
            :option="chartOption"
            autoresize
            style="height: 400px"
          />
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useDisplay, useTheme } from 'vuetify';
import VChart from 'vue-echarts';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart } from 'echarts/charts';
import {
  TooltipComponent,
  GridComponent,
  LegendComponent,
} from 'echarts/components';
import { useCampusStore } from '@/store/campus';
import { getChargerHistory } from '@/apis/history';
import type { HistoryRecord } from '@/types/history';
import { MOBILE_BREAKPOINT } from '@/constants';
import { LoadingIndicator } from '@/components/global';
import { StatusError } from '@/components/error-page';

use([
  CanvasRenderer,
  LineChart,
  TooltipComponent,
  GridComponent,
  LegendComponent,
]);

const { width } = useDisplay();
const theme = useTheme();
const campusStore = useCampusStore();

const ranges = [
  { label: '1h', value: '1h' },
  { label: '24h', value: '24h' },
  { label: '7d', value: '7d' },
  { label: '自定义', value: 'custom' },
];

const selectedCampusIndex = ref(0);
const selectedRange = ref('24h');
const loading = ref(false);
const isLoadingIndicatorVisible = ref(true);
const historyData = ref<HistoryRecord[]>([]);

const customStartDate = ref<Date | null>(null);
const customEndDate = ref<Date | null>(null);
const startMenuOpen = ref(false);
const endMenuOpen = ref(false);

const currentCampusId = computed(() => {
  return campusStore.campuses[selectedCampusIndex.value]?.id || 'jiulonghu';
});

function formatDateLabel(date: Date | null): string {
  if (!date) return '';
  return `${date.getMonth() + 1}/${date.getDate()}`;
}

function initCustomDates() {
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  customStartDate.value = weekAgo;
  customEndDate.value = now;
}

// 限制时间范围不超过7天
function clampDateRange() {
  if (!customStartDate.value || !customEndDate.value) return;

  const maxRangeMs = 7 * 24 * 60 * 60 * 1000;
  const startMs = customStartDate.value.getTime();
  const endMs = customEndDate.value.getTime();

  if (endMs - startMs > maxRangeMs) {
    // 调整开始日期，保持结束日期不变
    customStartDate.value = new Date(endMs - maxRangeMs);
  }
}

async function fetchData() {
  loading.value = true;
  try {
    let res;
    if (
      selectedRange.value === 'custom' &&
      customStartDate.value &&
      customEndDate.value
    ) {
      const end = new Date(customEndDate.value);
      end.setHours(23, 59, 59, 999);
      res = await getChargerHistory(
        currentCampusId.value,
        undefined,
        customStartDate.value,
        end,
      );
    } else {
      res = await getChargerHistory(currentCampusId.value, selectedRange.value);
    }
    historyData.value = res.data || [];
  } catch {
    historyData.value = [];
  } finally {
    loading.value = false;
  }
}

function onCustomDateChange() {
  if (customStartDate.value && customEndDate.value) {
    clampDateRange();
    fetchData();
  }
}

function onStartDateChange() {
  startMenuOpen.value = false;
  onCustomDateChange();
}

function onEndDateChange() {
  endMenuOpen.value = false;
  onCustomDateChange();
}

const RANGE_MS: Record<string, number> = {
  '1h': 3600 * 1000,
  '24h': 24 * 3600 * 1000,
  '7d': 7 * 24 * 3600 * 1000,
};

const xAxisRange = computed(() => {
  if (
    selectedRange.value === 'custom' &&
    customStartDate.value &&
    customEndDate.value
  ) {
    const start = customStartDate.value.getTime();
    const end = new Date(customEndDate.value).setHours(23, 59, 59, 999);
    return { min: start, max: end };
  }
  const rangeMs = RANGE_MS[selectedRange.value] || RANGE_MS['24h'];
  const now = Date.now();
  return { min: now - rangeMs, max: now };
});

const chartOption = computed(() => {
  const data = historyData.value;
  const successColor = theme.current.value.colors.success;
  const defaultColor = theme.current.value.colors.default;
  const primaryColor = theme.current.value.colors.primary;
  const textColor = theme.current.value.dark ? '#e0e0e0' : '#333333';

  // 根据数据点数量动态调整symbol大小
  const symbolSize = data.length > 100 ? 2 : data.length > 50 ? 4 : 6;

  return {
    tooltip: {
      trigger: 'axis',
      formatter: (params: any) => {
        const time = new Date(params[0].value[0]).toLocaleString('zh-CN');
        let html = `<strong>${time}</strong><br/>`;
        params.forEach((p: any) => {
          if (p.value[1] != null) {
            html += `${p.marker} ${p.seriesName}: ${p.value[1]}<br/>`;
          }
        });
        return html;
      },
    },
    legend: {
      data: ['空闲数', '故障数', '总数'],
      top: 0,
    },
    grid: {
      left: '6%',
      right: '4%',
      top: '40px',
      bottom: '6%',
    },
    xAxis: {
      type: 'time',
      min: xAxisRange.value.min,
      max: xAxisRange.value.max,
      axisLabel: {
        color: textColor,
        interval: width.value < MOBILE_BREAKPOINT ? 'auto' : 0,
        hideOverlap: true,
        formatter: (val: number) => {
          const d = new Date(val);
          return `${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
        },
      },
    },
    yAxis: {
      type: 'value',
      min: 0,
      splitLine: { lineStyle: { color: `${defaultColor}40` } },
      axisLabel: { color: textColor },
    },
    animation: true,
    animationDuration: 1000,
    series: [
      {
        name: '空闲数',
        type: 'line',
        data: data.map((d) => [d.timestamp, d.available_count]),
        smooth: true,
        symbol: 'circle',
        symbolSize,
        itemStyle: { color: successColor },
        animationDelay: (idx: number) => {
          if (data.length === 0) return 0;
          const range = xAxisRange.value.max - xAxisRange.value.min;
          const offset = (data[0].timestamp - xAxisRange.value.min) / range;
          return idx === 0 ? offset * 1000 : 0;
        },
      },
      {
        name: '故障数',
        type: 'line',
        data: data.map((d) => [d.timestamp, d.fault_count]),
        smooth: true,
        symbol: 'circle',
        symbolSize,
        itemStyle: { color: defaultColor },
        animationDelay: (idx: number) => {
          if (data.length === 0) return 0;
          const range = xAxisRange.value.max - xAxisRange.value.min;
          const offset = (data[0].timestamp - xAxisRange.value.min) / range;
          return idx === 0 ? offset * 1000 : 0;
        },
      },
      {
        name: '总数',
        type: 'line',
        data: data.map((d) => [d.timestamp, d.total_count]),
        smooth: true,
        symbol: 'none',
        lineStyle: { type: 'dashed', color: primaryColor },
        itemStyle: { color: primaryColor },
        animationDelay: (idx: number) => {
          if (data.length === 0) return 0;
          const range = xAxisRange.value.max - xAxisRange.value.min;
          const offset = (data[0].timestamp - xAxisRange.value.min) / range;
          return idx === 0 ? offset * 1000 : 0;
        },
      },
    ],
  };
});

watch(selectedCampusIndex, () => {
  fetchData();
});

watch(selectedRange, (val) => {
  if (val === 'custom') {
    initCustomDates();
  } else {
    fetchData();
  }
});

onMounted(async () => {
  if (!campusStore.loaded) {
    await campusStore.fetchCampuses();
  }
  isLoadingIndicatorVisible.value = false;
  if (campusStore.campuses.length > 0) {
    fetchData();
  }
});

const retryFetch = async () => {
  isLoadingIndicatorVisible.value = true;
  await campusStore.fetchCampuses();
  isLoadingIndicatorVisible.value = false;
  if (campusStore.campuses.length > 0) {
    fetchData();
  }
};
</script>
