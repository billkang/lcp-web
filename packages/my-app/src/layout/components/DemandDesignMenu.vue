<template>
  <div class="menu-wrapper">
    <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelectMenu">
      <el-menu-item index="demand">需求设计</el-menu-item>
      <el-menu-item index="proto">原型设计</el-menu-item>
      <el-menu-item index="ui">UI设计</el-menu-item>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

// 菜单
const activeIndex = ref('demand');
const handleSelectMenu = (key: string) => {
  if (key === 'demand') {
    router.push('/demand-design');
  } else {
    router.push(`/demand-design/demand/${key}`);
  }
};

watchEffect(() => {
  const { fullPath } = route;
  const pathName = fullPath.split('/')[2];
  if (pathName) {
    activeIndex.value = pathName;
  } else {
    activeIndex.value = 'demand';
  }
});
</script>

<style lang="scss" scoped>
.menu-wrapper {
  background: #f5f5f7;
  border-radius: 4px;

  .el-menu-item {
    width: 142px;
    padding: 14px 36px;
    text-align: center;
    color: #292c2f !important;
    border-radius: 4px 8px 0px 4px;
    font-size: 16px;
    font-weight: 500;
    line-height: 20px;
    border: none !important;

    &.is-active,
    &:focus,
    &:hover {
      --el-menu-active-color: #0081ff;
      color: #0081ff !important;
      background: #ffffff !important;
    }
  }
}
</style>
