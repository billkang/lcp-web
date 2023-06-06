<template>
  <div class="canvas-toolbar-bottom">
    <div class="item">
      <div class="colorPicker">
        <el-color-picker v-model="bgColor" show-alpha @change="changeColor" />
      </div>
    </div>
    <div class="item">
      <el-button @click="zoomIn">放大</el-button>
      <el-button @click="zoomOut">缩小</el-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
const canvas = inject('canvas');

const bgColor = ref(canvas.bgColor);

const zoomIn = () => {
  canvas.workspace.zoomIn();
};
const zoomOut = () => {
  canvas.workspace.zoomOut();
};

// 修改背景色
const changeColor = data => {
  bgColor.value = data;
  canvas.bgColor = data;
  canvas.workspace.setColor(data);
};
</script>
<style lang="scss" scoped>
.canvas-toolbar-bottom {
  position: fixed;
  right: 15px;
  bottom: 15px;
  z-index: 3;
  display: flex;
  align-items: center;
  bottom: 16px;
  background-color: #fff;
  height: 45px;
  user-select: none;
  border-radius: 8px;
  transition: right 0.2s ease;
  .item {
    padding: 0 10px;
  }
}
</style>

