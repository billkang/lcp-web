<template>
  <div
    ref="itemRef"
    draggable="true"
    :class="style[beforeItem ? 'beforeItem' : '']"
    @dragstart="dragStart(props.data, $event)"
    @dragend="dragEnd(props.data, $event)">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType } from 'vue';
import { LevelMapData } from '../types';

const itemRef = ref(null);

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});
const style = useCssModule();

const dragStart = (data, e) => {
  console.log('data', data, e, itemRef);
};
const dragEnd = (data, e) => {
  console.log('data', data, e);
};

const beforeItem = computed(() => {
  return false;
});
</script>

<style lang="scss" module>
.hoverItem {
  background: red;
}
.clickItem {
  background: blue;
}
.beforeItem {
  position: relative;
  &:before {
    content: '';
    position: absolute;
    width: 5px;
    top: 0;
    left: -20px;
    bottom: 0;
    background: #ddd;
  }
}
.afterItem {
  position: relative;
  &:before {
    content: '';
    position: absolute;
    width: 5px;
    top: 0;
    right: -20px;
    bottom: 0;
    background: #ddd;
  }
}
</style>
