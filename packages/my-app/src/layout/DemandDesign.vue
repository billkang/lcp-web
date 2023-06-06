<template>
  <div class="layout-container">
    <Header />
    <div class="layout-main">
      <div class="sidebar">
        <DemandDesignSidebar />
      </div>
      <div class="main-body">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from './components/Header.vue';
import DemandDesignSidebar from './components/DemandDesignSidebar.vue';
</script>

<style lang="scss" scoped>
.layout-container {
  height: 100%;
  min-width: 1143px;
  overflow: auto;

  .layout-main {
    display: flex;
    height: calc(100vh - 80px);

    .main-body {
      flex: 1;

      .page-container {
        height: calc(100% - 50px);
      }
    }
  }
}
</style>
