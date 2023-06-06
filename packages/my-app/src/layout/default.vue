<template>
  <div class="layout-container">
    <Header />
    <div class="layout-main">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from './components/Header.vue';
</script>

<style lang="scss" scoped>
.layout-container {
  height: 100%;
  min-width: 1143px;
  overflow: auto;

  .layout-main {
    display: flex;
    height: calc(100vh - 80px);
  }
}
</style>
