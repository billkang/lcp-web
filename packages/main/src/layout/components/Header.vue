<template>
  <div class="layout-header">
    <div class="brand-wrapper">
      <img class="logo" :src="logoImg" />
      <div class="title">xxx</div>
    </div>

    <div class="menu-wrapper">
      <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelectMenu">
        <el-menu-item index="home">首页</el-menu-item>
        <el-menu-item index="app-center">产品中心</el-menu-item>
        <el-menu-item index="resource">资源中心</el-menu-item>
        <el-menu-item index="solution">解决方案</el-menu-item>
        <el-menu-item index="case">行业案例</el-menu-item>
        <el-menu-item index="open-platform">开放平台</el-menu-item>
        <el-menu-item index="help-center">帮助&学习</el-menu-item>
      </el-menu>
    </div>

    <div class="user-wrapper">
      <img class="computer" :src="userImg" />

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
  </div>
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
  if (key === 'help-center') {
    location.href = 'http://localhost:8888';
  } else if (key === 'home') {
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
  position: fixed;
  box-sizing: border-box;
  width: 100%;
  font-size: 22px;
  color: #fff;
  padding: 12px 24px;
  height: 64px;
  background-color: #05336b;
  color: #fff;

  .brand-wrapper {
    float: left;
    display: flex;

    .logo {
      width: 40px;
      height: 40px;
      margin-right: 16px;
    }

    .title {
      height: 36px;
      font-size: 22px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      line-height: 36px;
    }
  }

  .menu-wrapper {
    max-width: 1200px;
    margin: 0 auto;

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
    position: absolute;
    top: 12px;
    right: 24px;
    float: right;
    display: flex;

    .computer,
    .avator {
      margin-left: 20px;
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
