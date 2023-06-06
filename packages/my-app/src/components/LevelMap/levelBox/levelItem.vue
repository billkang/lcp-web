<template>
  <div v-for="item in props.data" :key="item.name" :class="style['item-wrap']">
    <DragKit :data="item">
      <div :class="style['name']" @contextmenu="e => showContextMenu(e, item)">
        <div
          v-if="item.isEdit"
          contenteditable="true"
          :class="style['isEditDiv']"
          @input="e => changeItemName(item, e)">
          {{ item.name }}
        </div>
        <div v-else class="" @dblclick="item.isEdit = true">{{ item.name }}</div>
      </div>
      <div v-if="item.children" :class="style['item-children']"><level-item :data="item.children" /></div>
    </DragKit>
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType } from 'vue';
import { Data } from '../types';
import DragKit from './DragKit.vue';
import bus from '../ContextMenu/bus';
const props = defineProps({
  data: {
    type: Array as PropType<Data[]>,
    required: true,
  },
});

const style = useCssModule();

const changeItemName = (item, e) => {
  console.log('item', item, e.target.textContent);
};

const showContextMenu = (e, item) => {
  e.preventDefault();
  bus.emit('showContextmenu', { x: e.x, y: e.y, value: 'contextmenu' });
  bus.emit('setContextmenuItem', item);
};
</script>

<style lang="scss" module>
.item-wrap {
  border: 1px solid #ddd;
  padding: 10px;
  background: #fff;
  display: flex;
  justify-content: center;
  .name {
    display: flex;
    justify-content: center;
    font-size: 14px;
    line-height: 1.5;
    text-align: center;
    .is-edit {
      word-break: break-all;
      box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
    }
  }
  .item-children {
    margin-top: 10px;
    display: flex;
    grid-gap: 10px;
  }
}
</style>
