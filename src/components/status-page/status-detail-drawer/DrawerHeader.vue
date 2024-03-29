<!-- 状态详细信息抽屉的头部内容 -->
<!-- +---------------------+ -->
<!-- | |!| Station Name  > | -->
<!-- |                     | -->
<!-- | Station Description | -->
<!-- +---------------------+ -->

<template>
  <v-card
    color="success"
    rounded="0"
    variant="tonal"
  >
    <template v-slot:title>
      <div class="d-flex align-center">
        <v-btn
          :icon="true"
          variant="text"
          @click.stop="appStore.isStatusDetailDrawerOpen = false"
        >
          <v-icon>
            {{ mdiClose }}
          </v-icon>
        </v-btn>

        <!-- Station name -->
        <vue-scroll-picker
          v-model="appStore.curStationIndex"
          :key="appStore.curStationIndex"
          :options="stationNameList"
          class="ml-4"
        />

        <v-spacer />

        <!-- Map button -->
        <v-btn
          :icon="true"
          :to="`/map/${props.stationName}`"
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
      </div>
    </template>

    <!-- Description -->
    <v-card-text
      v-show="stationDescription"
      class="ml-2"
    >
      {{ stationDescription }}
    </v-card-text>

    <v-divider />
  </v-card>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useAppStore } from '@/store/app';
import { useStatusStore } from '@/store/status';

import { VueScrollPicker } from '@/components/global';

import { mdiClose, mdiMapMarkerOutline } from '@mdi/js';

const props = defineProps<{
  stationDescription: string | null | undefined;
  stationName: string;
}>();

const appStore = useAppStore();
const statusStore = useStatusStore();

const stationNameList = computed(() =>
  statusStore.statusDetail.stations.map((station, index) => ({
    name: station.name,
    value: index,
  })),
);
</script>

<!-- vue-scroll-picker 的样式文件，为适应此页面样式做出更改 -->
<!-- Copyright: https://github.com/wan2land/vue-scroll-picker/tree/main -->
<style>
.vue-scroll-picker {
  position: relative;
  width: 50%;
  height: 4rem;
  overflow: hidden;
}

.vue-scroll-picker-rotator {
  position: relative;
  left: 0;
  right: 0;
  top: calc(50% - 0.6em);
}

.vue-scroll-picker-rotator-transition {
  transition: top ease 200ms;
}

.vue-scroll-picker-item {
  font-size: large;
  text-align: left;
  line-height: 1.1em;
  color: rgba(128, 128, 128, 0.5);
}
.vue-scroll-picker-item-selected {
  font-size: x-large;
  font-weight: bolder;
  color: inherit;
}

.vue-scroll-picker-item-empty,
.vue-scroll-picker-item-placeholder {
  color: #aaa;
}

.vue-scroll-picker-item-empty.vue-scroll-picker-item-selected,
.vue-scroll-picker-item-placeholder.vue-scroll-picker-item-selected {
  color: #777;
}

.vue-scroll-picker-layer {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.vue-scroll-picker-layer-top,
.vue-scroll-picker-layer-selection,
.vue-scroll-picker-layer-bottom {
  position: absolute;
  left: 0;
  right: 0;
}
/*
.vue-scroll-picker-layer-top {
  box-sizing: border-box;
  border-bottom: 1px solid #c8c7cc;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0),
    70%,
    rgba(255, 255, 255, 0.4)
  );
  top: 0;
  height: calc(50% - 1em);
  cursor: pointer;
}
*/

.vue-scroll-picker-layer-selection {
  top: calc(20% - 1em);
  bottom: calc(20% - 1em);
}

/*
.vue-scroll-picker-layer-bottom {
  border-top: 1px solid #c8c7cc;
  background: linear-gradient(
    0deg,
    rgba(255, 255, 255, 0),
    70%,
    rgba(255, 255, 255, 0.4)
  );
  bottom: 0;
  height: calc(50% - 1em);
  cursor: pointer;
}
*/
</style>
