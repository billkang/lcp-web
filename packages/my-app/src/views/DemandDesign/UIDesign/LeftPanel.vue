<template>
  <div class="board-left-panel">
    <div class="title">
      <div class="name">设计稿</div>
      <el-icon size="20" color="#777"><Fold /></el-icon>
    </div>
    <div class="tree-wrap">
      <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" />
    </div>
  </div>
</template>
<script lang="ts" setup>
interface Tree {
  label: string;
  children?: Tree[];
}

const handleNodeClick = (data: Tree) => {
  console.log(data);
};

const data: Tree[] = [
  {
    label: 'PC',
    children: [
      {
        label: '首页',
      },
      {
        label: '开放平台',
      },
      {
        label: '资源中心',
      },
    ],
  },
  {
    label: '小程序',
    children: [
      {
        label: '首页',
      },
      {
        label: '详情页',
      },
      {
        label: '列表页',
      },
    ],
  },
  {
    label: '微信公众号',
    children: [
      {
        label: '首页',
      },
      {
        label: '详情页',
      },
      {
        label: '列表页',
      },
    ],
  },
];

const defaultProps = {
  children: 'children',
  label: 'label',
};
</script>
<style lang="scss" scoped>
.board-left-panel {
  position: absolute;
  z-index: 3;
  top: 20px;
  left: 20px;
  width: 240px;
  border-radius: 8px;
  transform: translateX(0);
  transition: transform 0.2s linear;
  will-change: transform;
  background-color: #fff;
  padding: 15px;
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.04), 0 0 4px rgba(0, 0, 0, 0.08);
  .title {
    height: 36px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    margin-bottom: 10px;
    .name {
      font-size: 18px;
    }
  }
  :deep(.el-tree-node__content) {
    height: 36px;
  }
  .tree-wrap {
    max-height: calc(100vh - 240px);
    overflow-y: auto;
  }
}
</style>
