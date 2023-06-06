<template>
  <div class="wrap">
    <div class="header-box">
      <div class="title">我的需求库</div>
      <el-button type="primary" @click="dialogFormVisible = true">新建文件夹</el-button>
    </div>
    <RepositoryList :data="data" />

    <el-dialog v-model="dialogFormVisible" width="600" title="新建文件夹">
      <el-form :model="form" label-position="top">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="请选择适用端" :label-width="formLabelWidth">
          <el-radio-group v-model="form.type" size="default" class="type-radio">
            <el-radio label="APP" border />
            <el-radio label="微信小程序" border />
            <el-radio label="微信公众号" border />
            <el-radio label="PC网站" border />
            <el-radio label="管理后台" border />
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';

import RepositoryList from '@/components/RepositoryList/index.vue';
const data = [
  {
    id: 1,
    name: '电商需求库1',
    type: 'APP',
    img: 'https://codesign-v2-1258344706.cos.ap-guangzhou.myqcloud.com/images/2022/12/29/P4VlZ22MagKQ12Zq6wL29/dm2nwglqomnowfra/2efd86ef-4f4e-47f2-ba7c-4c083d76bf6c.png?imageMogr2/crop/480x270/gravity/north',
    createUser: '张大大',
    updateTime: '2023-05-23',
  },
  {
    id: 2,
    name: '电商需求库2222',
    type: 'APP',
    img: 'https://codesign-v2-1258344706.cos.ap-guangzhou.myqcloud.com/images/2022/12/29/P4VlZ22MagKQ12Zq6wL29/dm2nwglqomnowfra/2efd86ef-4f4e-47f2-ba7c-4c083d76bf6c.png?imageMogr2/crop/480x270/gravity/north',
    createUser: '张大大',
    updateTime: '2023-05-23',
  },
  {
    id: 3,
    name: '电商需求库1',
    type: 'PC',
    img: 'https://codesign-v2-1258344706.cos.ap-guangzhou.myqcloud.com/images/2022/12/29/P4VlZ22MagKQ12Zq6wL29/dm2nwglqomnowfra/2efd86ef-4f4e-47f2-ba7c-4c083d76bf6c.png?imageMogr2/crop/480x270/gravity/north',
    createUser: '张大大',
    updateTime: '2023-05-23',
  },
  {
    id: 4,
    name: '电商需求库qwe1',
    type: 'APP',
    img: 'https://codesign-v2-1258344706.cos.ap-guangzhou.myqcloud.com/images/2022/12/29/P4VlZ22MagKQ12Zq6wL29/dm2nwglqomnowfra/2efd86ef-4f4e-47f2-ba7c-4c083d76bf6c.png?imageMogr2/crop/480x270/gravity/north',
    createUser: '张大大',
    updateTime: '2023-05-23',
  },
  {
    id: 5,
    name: '电商需求库eee1',
    type: 'APP',
    img: 'https://codesign-v2-1258344706.cos.ap-guangzhou.myqcloud.com/images/2022/12/29/P4VlZ22MagKQ12Zq6wL29/dm2nwglqomnowfra/2efd86ef-4f4e-47f2-ba7c-4c083d76bf6c.png?imageMogr2/crop/480x270/gravity/north',
    createUser: '张大大',
    updateTime: '2023-05-23',
  },
  {
    id: 6,
    name: '电商需求库1',
    type: 'APP',
    img: 'https://codesign-v2-1258344706.cos.ap-guangzhou.myqcloud.com/images/2022/12/29/P4VlZ22MagKQ12Zq6wL29/dm2nwglqomnowfra/2efd86ef-4f4e-47f2-ba7c-4c083d76bf6c.png?imageMogr2/crop/480x270/gravity/north',
    createUser: '张大大',
    updateTime: '2023-05-23',
  },
  {
    id: 7,
    name: '电商需求库1',
    type: 'APP',
    img: 'https://codesign-v2-1258344706.cos.ap-guangzhou.myqcloud.com/images/2022/12/29/P4VlZ22MagKQ12Zq6wL29/dm2nwglqomnowfra/2efd86ef-4f4e-47f2-ba7c-4c083d76bf6c.png?imageMogr2/crop/480x270/gravity/north',
    createUser: '张大大',
    updateTime: '2023-05-23',
  },
  {
    id: 8,
    name: '电商需求库1',
    type: 'APP',
    img: 'https://codesign-v2-1258344706.cos.ap-guangzhou.myqcloud.com/images/2022/12/29/P4VlZ22MagKQ12Zq6wL29/dm2nwglqomnowfra/2efd86ef-4f4e-47f2-ba7c-4c083d76bf6c.png?imageMogr2/crop/480x270/gravity/north',
    createUser: '张大大',
    updateTime: '2023-05-23',
  },
];

const form = reactive({
  name: '',
  type: '',
});
const dialogFormVisible = ref(false);
const formLabelWidth = '140px';
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
  .type-radio {
    :deep(.el-radio) {
      margin-right: 10px;
    }
    :deep(.el-radio__input) {
      display: none !important;
    }
  }
}
</style>
