<template>
  <div class="demand-layout">
    <DemandDesignMenu />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import DemandDesignMenu from '../../layout/components/DemandDesignMenu.vue';
</script>
<style scoped>
.demand-layout {
  height: calc(100vh - 80px);
}
</style>
