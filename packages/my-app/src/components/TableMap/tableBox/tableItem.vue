<template>
  <div v-for="item in props.data" :key="item.name" :class="style['item-wrap']">
    <div :class="style['name']">
      <div v-if="item.isEdit" :class="style['isEditDiv']" @input="e => changeItemName(item, e)">
        {{ item.name }}
      </div>
      <div v-else @dblclick="item.isEdit = true">{{ item.name }}</div>
    </div>
    <div v-if="item.children" :class="style['item-children']">
      <table-item :data="item.children" />
    </div>
    <div v-else :class="style['item-placeholder']"></div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType } from 'vue';
import { Data } from '../types';
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
</script>

<style lang="scss" module>
.item-wrap {
  border: 1px solid #ddd;
  background: #fff;
  display: flex;
  justify-content: flex-start;
  margin: -1px;
  // &:after {
  //   content: '';
  //   position: absolute;
  //   left: 200px;
  //   bottom: 0;
  //   top: 0;
  //   border: 1px solid #ddd;
  // }

  .item {
    display: flex;
    align-items: center;
  }

  .name {
    width: 200px;
    display: flex;
    justify-content: center;
    font-size: 14px;
    line-height: 1.5;
    text-align: center;
    > div {
      display: flex;
      align-items: center;
      padding: 10px;
    }
    .isEditDiv {
      word-break: break-all;
      box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
    }
  }
  .item-children {
    display: flex;
    flex-direction: column;
  }
}
</style>
