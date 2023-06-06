<template>
  <div class="layout-container">
    <!-- 微应用容器 -->
    <div id="view-main" />
    <!-- 主应用自己的路由渲染 -->
    <router-view></router-view>
  </div>
</template>

<style lang="scss" scoped>
.layout-container {
  height: 100%;
  min-width: 1143px;
  overflow-x: auto;

  #view-main {
    width: 100%;
    height: 100%;
  }
}
</style>
