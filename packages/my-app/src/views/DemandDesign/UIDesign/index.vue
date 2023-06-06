<template>
  <div class="ui-wrap">
    <LeftPanel />
    <div class="canvas-panel">
      <Designer />
    </div>
  </div>
</template>
<script lang="ts" setup>
import LeftPanel from './LeftPanel.vue';
import Designer from './Designer/index.vue';
const canvas = reactive({ bgColor: '#e1e1e1', c: null, workspaces: null, editor: null });
provide('canvas', canvas);
</script>
<style lang="scss" scoped>
.ui-wrap {
  position: relative;
  background: #ddd;
  width: calc(100vw - 64px);
  height: calc(100vh - 128px);
}
</style>
