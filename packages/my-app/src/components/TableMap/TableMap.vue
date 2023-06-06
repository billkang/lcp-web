<template>
  <div :class="style['tablemap-container']" @mousewheel="mousewheel">
    <div :class="style['tablemap-main']">
      <div :class="style['tablemap-main-header']">
        <div :class="style['tablemap-main-header-item']">页面</div>
        <div :class="style['tablemap-main-header-item']">功能点</div>
        <div :class="style['tablemap-main-header-item']">描述</div>
        <div :class="style['tablemap-main-header-item']">备注</div>
      </div>
      <TableItem :data="props.modelValue"></TableItem>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, PropType } from 'vue';
import style from './style';
import TableItem from './tableBox/tableItem.vue';
import { TableMapData } from './types';

const props = defineProps({
  modelValue: {
    type: Array as PropType<TableMapData[]>,
    required: true,
  },
});
defineEmits(['update:modelValue']);

const mousewheel = (event: any) => {
  // ctrl键按下了 event.ctrlKey
  console.log('event', event);
  if (event.ctrlKey) {
    event.preventDefault();
    if (event.wheelDelta < 0 || event.detail < 0) {
      // 鼠标滚轮往下滚动
      console.log('缩小');
    } else if (event.wheelDelta > 0 || event.detail > 0) {
      // 鼠标滚轮往上滚动
      console.log('放大');
    }
  }
};
</script>
