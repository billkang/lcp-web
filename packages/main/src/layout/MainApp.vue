<template>
  <div class="layout-container">
    <Header />
    <div class="layout-main">
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
</script>

<style lang="scss" scoped>
.layout-container {
  width: 100%;
  min-width: 1400px;
  height: 100%;
  overflow: auto;

  .layout-main {
    margin-top: 64px;
    padding: 0;
    min-height: calc(100vh - 224px);
  }
}
</style>
