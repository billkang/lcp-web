<template>
  <div class="menu-wrapper">
    <el-menu :default-active="activeIndex" mode="vertical" @select="handleSelectMenu">
      <el-menu-item index="demand">
        <img :src="logoImg" />
        <span>需求</span>
      </el-menu-item>
      <el-menu-item index="demand-repository">
        <img :src="logoImg" />
        <span>需求库</span>
      </el-menu-item>
      <el-menu-item index="proto-repository">
        <img :src="logoImg" />
        <span>原型库</span>
      </el-menu-item>
      <el-menu-item index="ui-repository">
        <img :src="logoImg" />
        <span>UI库</span>
      </el-menu-item>
      <el-menu-item index="template-repository">
        <img :src="logoImg" />
        <span>模板库</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import logoImg from '@/assets/images/logo.ico';

const router = useRouter();
const route = useRoute();

// 菜单
const activeIndex = ref('demand');
const handleSelectMenu = (key: string) => {
  if (key === 'demand') {
    router.push('/demand-design');
  } else {
    router.push(`/demand-design/${key}`);
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
  width: 64px;
  height: 100%;
  background: #ffffff;
  box-shadow: 4px 4px 8px 0px rgba(130, 145, 169, 0.16);

  .el-menu-item {
    width: 64px;
    height: 64px;
    text-align: center;
    padding: 6px !important;
    flex-direction: column;
    justify-content: space-around;

    &.is-active {
      background: #f1f6fe;
      border-left: 6px solid #0081ff;
    }

    img {
      width: 23px;
      height: 23px;
      display: inline-block;
    }

    span {
      color: #000000 !important;
      font-size: 14px;
      line-height: 16px;
    }
  }
}
</style>
