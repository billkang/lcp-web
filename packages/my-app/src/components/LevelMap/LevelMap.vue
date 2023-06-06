<template>
  <div :class="style['levelmap-container']">
    <div :class="style['levelmap-container-main']">
      <LevelItem :data="props.modelValue"></LevelItem>

      <context-menu name="contextmenu">
        <context-menu-item @itemClickHandle="addNextMenu">添加下一级</context-menu-item>
        <context-menu-item @itemClickHandle="delMenuItem">删除</context-menu-item>
      </context-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, PropType } from 'vue';
import style from './style';
import { LevelMapData } from './types';
import busEmitter from './ContextMenu/bus';

import LevelItem from './levelBox/levelItem.vue';

const contextmenuItem = ref<object>();

const props = defineProps({
  modelValue: {
    type: Array as PropType<LevelMapData[]>,
    required: true,
  },
});
defineEmits(['update:modelValue']);

const addNextMenu = data => {
  console.log('添加下一级操作', data, contextmenuItem.value);
};

const delMenuItem = data => {
  console.log('删除操作', data);
};

onMounted(() => {
  busEmitter.on('setContextmenuItem', (item: object) => {
    contextmenuItem.value = item;
  });
});
</script>
