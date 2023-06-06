<template>
  <div class="wrap">
    <div class="header-box">
      <div class="title">我的原型库</div>
      <el-button type="primary">新建原型库</el-button>
    </div>
    <RepositoryList :data="data" />
  </div>
</template>

<script setup lang="ts">
import RepositoryList from '@/components/RepositoryList/index.vue';
const data = [
  {
    id: 1,
    name: '电商原型库1',
    type: 'APP',
    img: 'https://cdn3.codesign.qq.com/images/2022/12/29/P4VlZ22MagKQ12Zq6wL29/dm2nwglqomnowfra/260a524c-bfea-41fd-bad1-f407a91e0b5e.png?imageMogr2/crop/480x270/gravity/north',
    createUser: '张大大',
    updateTime: '2023-05-23',
  },
  {
    id: 2,
    name: '电商原型库2222',
    type: 'APP',
    img: 'https://cdn3.codesign.qq.com/images/2022/12/29/P4VlZ22MagKQ12Zq6wL29/dm2nwglqomnowfra/260a524c-bfea-41fd-bad1-f407a91e0b5e.png?imageMogr2/crop/480x270/gravity/north',
    createUser: '张大大',
    updateTime: '2023-05-23',
  },
  {
    id: 3,
    name: '电商原型库1',
    type: 'PC',
    img: 'https://cdn3.codesign.qq.com/images/2022/12/29/P4VlZ22MagKQ12Zq6wL29/dm2nwglqomnowfra/260a524c-bfea-41fd-bad1-f407a91e0b5e.png?imageMogr2/crop/480x270/gravity/north',
    createUser: '张大大',
    updateTime: '2023-05-23',
  },
  {
    id: 4,
    name: '电商原型库qwe1',
    type: 'APP',
    img: 'https://cdn3.codesign.qq.com/images/2022/12/29/P4VlZ22MagKQ12Zq6wL29/dm2nwglqomnowfra/260a524c-bfea-41fd-bad1-f407a91e0b5e.png?imageMogr2/crop/480x270/gravity/north',
    createUser: '张大大',
    updateTime: '2023-05-23',
  },
  {
    id: 5,
    name: '电商原型库eee1',
    type: 'APP',
    img: 'https://cdn3.codesign.qq.com/images/2022/12/29/P4VlZ22MagKQ12Zq6wL29/dm2nwglqomnowfra/260a524c-bfea-41fd-bad1-f407a91e0b5e.png?imageMogr2/crop/480x270/gravity/north',
    createUser: '张大大',
    updateTime: '2023-05-23',
  },
  {
    id: 6,
    name: '电商原型库1',
    type: 'APP',
    img: 'https://cdn3.codesign.qq.com/images/2022/12/29/P4VlZ22MagKQ12Zq6wL29/dm2nwglqomnowfra/260a524c-bfea-41fd-bad1-f407a91e0b5e.png?imageMogr2/crop/480x270/gravity/north',
    createUser: '张大大',
    updateTime: '2023-05-23',
  },
  {
    id: 7,
    name: '电商原型库1',
    type: 'APP',
    img: 'https://cdn3.codesign.qq.com/images/2022/12/29/P4VlZ22MagKQ12Zq6wL29/dm2nwglqomnowfra/260a524c-bfea-41fd-bad1-f407a91e0b5e.png?imageMogr2/crop/480x270/gravity/north',
    createUser: '张大大',
    updateTime: '2023-05-23',
  },
  {
    id: 8,
    name: '电商原型库1',
    type: 'APP',
    img: 'https://cdn3.codesign.qq.com/images/2022/12/29/P4VlZ22MagKQ12Zq6wL29/dm2nwglqomnowfra/260a524c-bfea-41fd-bad1-f407a91e0b5e.png?imageMogr2/crop/480x270/gravity/north',
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
