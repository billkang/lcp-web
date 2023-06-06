<template>
  <div id="Workspace" class="workspace">
    <canvas id="Canvas"></canvas>
    <ToolbarBottom />
  </div>
</template>
<script lang="ts" setup>
import ToolbarBottom from './ToolbarBottom.vue';
import { useWindowSize, useResizeObserver } from '@vueuse/core';
import Editor from './Editor.ts';

import img1 from '@/assets/images/首页.png';
import img2 from '@/assets/images/开放平台.png';
import img3 from '@/assets/images/资源中心.png';
import EditorWorkspace from './Workspace';

const canvas = inject('canvas');

onMounted(() => {
  const { width, height } = useWindowSize();
  canvas.c = new fabric.Canvas('Canvas', {
    fireRightClick: true, // 启用右键，button的数字为3
    stopContextMenu: true, // 禁止默认右键菜单
    controlsAboveOverlay: true, // 超出clipPath后仍然展示控制条
    width: width.value - 64,
    height: height.value - 128,
  });

  canvas.editor = new Editor(canvas.c);
  canvas.workspace = new EditorWorkspace(canvas.c, {
    width: width.value - 64,
    height: height.value - 128,
  });

  canvas.editor.addItem({
    img: img1,
    title: '首页',
  });
  canvas.editor.addItem({
    img: img2,
    title: '开放平台',
  });
  canvas.editor.addItem({
    img: img3,
    title: '资源中心',
  });
});

useResizeObserver(document.body, () => {
  const { width, height } = useWindowSize();
  canvas.workspace && canvas.workspace.setSize(width.value - 64, height.value - 128);
});
</script>
<style lang="scss" scoped>
.workspace {
  width: 100%;
  position: relative;
  background: #f1f1f1;
}
</style>
