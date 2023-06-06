<template>
  <el-header class="layout-header">
    <div class="brand-wrapper">
      <img class="logo" :src="logoImg" />
      <div class="title">xxx应用</div>
    </div>

    <div class="menu-wrapper">
      <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelectMenu">
        <el-menu-item index="home">首页</el-menu-item>
        <el-menu-item index="demand-design">需求设计</el-menu-item>
        <el-menu-item index="app-design">应用设计</el-menu-item>
        <el-menu-item index="app-develop">应用开发</el-menu-item>
        <el-menu-item index="integrate-auto">集成&自动化</el-menu-item>
        <el-menu-item index="build-publish">构建&发布</el-menu-item>
      </el-menu>
    </div>

    <div class="user-wrapper">
      <!-- 用户头像 -->
      <img class="avator" :src="userImg" />

      <!-- 用户名下拉菜单 -->
      <el-dropdown class="user-name" trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          {{ username }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="user">个人中心</el-dropdown-item>
            <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import logoImg from '@/assets/images/logo.ico';
import userImg from '@/assets/images/user.jpg';

const router = useRouter();
const route = useRoute();

// 用户名
const username: string | null = localStorage.getItem('ms_username') || '测试用户';

// 菜单
const activeIndex = ref('home');
const handleSelectMenu = (key: string) => {
  if (key === 'home') {
    router.push('/');
  } else {
    router.push(`/${key}`);
  }
};

watchEffect(() => {
  const { fullPath } = route;
  const pathName = fullPath.split('/')[1];
  if (pathName) {
    activeIndex.value = pathName;
  } else {
    activeIndex.value = 'home';
  }
});

// 用户名下拉菜单选择事件
const handleCommand = (command: string) => {
  if (command === 'loginout') {
    localStorage.removeItem('ms_username');
    router.push('/login');
  } else if (command === 'user') {
    router.push('/user');
  }
};
</script>

<style lang="scss" scoped>
.layout-header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 80px;
  font-size: 22px;
  color: #fff;
  display: flex;
  justify-content: space-between;

  &.el-header {
    --el-header-padding: 20px;
    --el-header-height: 80px;
    background-color: #05336b;
    color: #fff;
  }

  .brand-wrapper {
    display: flex;

    .logo {
      width: 40px;
      height: 40px;
      margin: 0 22px 0 6px;
    }

    .title {
      min-width: 156px;
      height: 36px;
      margin-right: 26px;
      font-size: 22px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      line-height: 36px;
    }
  }

  .menu-wrapper {
    flex: 1;

    .el-menu {
      --el-menu-bg-color: transparent;
      border: none;

      .el-menu-item {
        --el-menu-text-color: #ffffff;
        --el-menu-item-height: 40px;
        --el-menu-base-level-padding: 0;
        font-size: 18px;
        margin: 0 20px;

        &:focus,
        &:hover {
          --el-menu-hover-text-color: #ffffff;
          --el-menu-hover-bg-color: transparent;
        }

        &.is-active {
          --el-menu-active-color: #ffffff;
          font-weight: 500;
        }
      }
    }
  }

  .user-wrapper {
    display: flex;

    .avator {
      width: 40px;
      height: 40px;
    }

    .user-name {
      margin-left: 15px;
      height: 24px;
      font-size: 17px;
      color: #e5e9ef;
      line-height: 40px;
    }
  }
}
</style>
