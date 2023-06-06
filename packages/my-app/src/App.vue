<template id="app">
  <el-config-provider>
    <router-view></router-view>
  </el-config-provider>
</template>

<style>
#app {
  width: 100%;
  height: 100%;
  color: var(--text-primary-color);
  background-color: var(--body-background);
}
.popper-hide-arrow {
  margin-top: -8px;
}
.popper-hide-arrow .el-popper__arrow {
  visibility: hidden;
}
</style>
