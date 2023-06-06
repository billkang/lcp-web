<template>
  <teleport to="body">
    <div v-show="show && bindingValue && props.name === bindingValue" ref="contextmenu" class="g-contextmenu">
      <slot />
    </div>
  </teleport>
</template>
<script setup lang="ts">
import { defineProps, ref, onMounted, nextTick } from 'vue';
import busEmitter from './bus';

const props = defineProps({
  cutomClass: String,
  name: String,
});

const show = ref(false);
const contextmenu = ref<HTMLDivElement>();
const bindingValue = ref<string>();

const getMenuPosition = (x: number, y: number) => {
  const style = { top: y, left: x };
  const { innerWidth, innerHeight } = window;
  if (contextmenu.value) {
    const el: HTMLDivElement = contextmenu.value;
    const { clientWidth: eleWidth, clientHeight: eleHeight } = el;
    if (y + eleHeight > innerHeight) {
      style.top -= eleHeight;
    }
    if (x + eleWidth > innerWidth) {
      style.left -= eleWidth;
    }
    if (style.top < 0) {
      style.top = eleHeight < innerHeight ? (innerHeight - eleHeight) / 2 : 0;
    }
    if (style.left < 0) {
      style.left = eleWidth < innerWidth ? (innerWidth - eleWidth) / 2 : 0;
    }
    return style;
  }
};

// 显示菜单
const showMenu = async (x: number, y: number, val?: string) => {
  show.value = true;
  bindingValue.value = val;

  busEmitter.emit('bindValue', bindingValue.value);
  await nextTick();
  if (contextmenu.value) {
    const ele: HTMLDivElement = contextmenu.value;
    const p = getMenuPosition(x, y);
    if (p) {
      ele.style.top = `${p.top + 5}px`;
      ele.style.left = `${p.left + 5}px`;
    }
  }
};

// 隐藏菜单
const hideMenu = () => {
  show.value = false;
};

// 点击空白处隐藏菜单
const documentHandleClick = () => {
  busEmitter.emit('hideContextmenu');
};

onMounted(() => {
  busEmitter.on('showContextmenu', e => {
    showMenu(e.x, e.y, e.value);
  });
  busEmitter.on('hideContextmenu', () => {
    hideMenu();
  });
  busEmitter.on('menuItemClick', () => {
    show.value = false;
  });

  document.addEventListener('click', documentHandleClick);
});

onUnmounted(() => {
  document.removeEventListener('click', documentHandleClick);
});
</script>
<style scoped>
.g-contextmenu {
  position: fixed;
  top: 0;
  left: 0;
  color: #333;
  display: inline-block;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
}
</style>
