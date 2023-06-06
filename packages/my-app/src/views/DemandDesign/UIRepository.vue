<template>
  <div class="wrap">
    <div class="header-box">
      <div class="title">我的UI库</div>
      <el-button type="primary">新建UI库</el-button>
    </div>
    <RepositoryList :data="data" />
  </div>
</template>

<script setup lang="ts">
import RepositoryList from '@/components/RepositoryList/index.vue';
const data = [
  {
    id: 1,
    name: '电商UI库1',
    type: 'APP',
    img: 'https://cdn3.codesign.qq.com/images/2022/12/29/P4VlZ22MagKQ12Zq6wL29/dm2nwglqomnowfra/09763115-9a72-4452-b899-d94543b8cc6e.png',
    createUser: '张大大',
    updateTime: '2023-05-23',
  },
  {
    id: 2,
    name: '电商UI库2222',
    type: 'APP',
    img: 'https://cdn3.codesign.qq.com/images/2022/12/29/P4VlZ22MagKQ12Zq6wL29/dm2nwglqomnowfra/09763115-9a72-4452-b899-d94543b8cc6e.png',
    createUser: '张大大',
    updateTime: '2023-05-23',
  },
  {
    id: 3,
    name: '电商UI库1',
    type: 'PC',
    img: 'https://cdn3.codesign.qq.com/images/2022/12/29/P4VlZ22MagKQ12Zq6wL29/dm2nwglqomnowfra/09763115-9a72-4452-b899-d94543b8cc6e.png',
    createUser: '张大大',
    updateTime: '2023-05-23',
  },
  {
    id: 4,
    name: '电商UI库qwe1',
    type: 'APP',
    img: 'https://cdn3.codesign.qq.com/images/2022/12/29/P4VlZ22MagKQ12Zq6wL29/dm2nwglqomnowfra/09763115-9a72-4452-b899-d94543b8cc6e.png',
    createUser: '张大大',
    updateTime: '2023-05-23',
  },
  {
    id: 5,
    name: '电商UI库eee1',
    type: 'APP',
    img: 'https://cdn3.codesign.qq.com/images/2022/12/29/P4VlZ22MagKQ12Zq6wL29/dm2nwglqomnowfra/09763115-9a72-4452-b899-d94543b8cc6e.png',
    createUser: '张大大',
    updateTime: '2023-05-23',
  },
  {
    id: 6,
    name: '电商UI库1',
    type: 'APP',
    img: 'https://cdn3.codesign.qq.com/images/2022/12/29/P4VlZ22MagKQ12Zq6wL29/dm2nwglqomnowfra/09763115-9a72-4452-b899-d94543b8cc6e.png',
    createUser: '张大大',
    updateTime: '2023-05-23',
  },
  {
    id: 7,
    name: '电商UI库1',
    type: 'APP',
    img: 'https://cdn3.codesign.qq.com/images/2022/12/29/P4VlZ22MagKQ12Zq6wL29/dm2nwglqomnowfra/09763115-9a72-4452-b899-d94543b8cc6e.png',
    createUser: '张大大',
    updateTime: '2023-05-23',
  },
  {
    id: 8,
    name: '电商UI库1',
    type: 'APP',
    img: 'https://cdn3.codesign.qq.com/images/2022/12/29/P4VlZ22MagKQ12Zq6wL29/dm2nwglqomnowfra/09763115-9a72-4452-b899-d94543b8cc6e.png',
    createUser: '张大大',
    updateTime: '2023-05-23',
  },
];
</script>
<style lang="scss" scoped>
.wrap {
  padding: 15px 30px;
  .header-box {
    display: flex;
    justify-content: space-between;
    height: 50px;
    .title {
      font-size: 20px;
    }
  }
}
</style>
