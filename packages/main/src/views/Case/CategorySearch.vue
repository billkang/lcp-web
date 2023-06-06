<template>
  <div class="classify-search-container">
    <el-row>
      <el-col :span="18">
        <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelectMenu">
          <el-menu-item v-for="item in data" :key="item.key" :index="item.key">{{ item.label }}</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="6">
        <el-input v-model="searchMessage" placeholder="请输入关键字搜索">
          <template #append>
            <el-button :icon="Search" @click="handleSearch" />
          </template>
        </el-input>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, PropType, defineEmits } from 'vue';
import { Search } from '@element-plus/icons-vue';

type Category = {
  key: string;
  label: string;
};

const props = defineProps({
  data: {
    type: Array as PropType<Category[]>,
    required: true,
  },
});

const emit = defineEmits<{
  (e: 'change-category', key: string): void;
  (e: 'search', value: string): void;
}>();

const searchMessage = ref<string>('');
const activeIndex = ref<string>(props.data[0]?.key || '');

const handleSelectMenu = (key: string) => {
  emit('change-category', key);
};

const handleSearch = () => {
  emit('search', searchMessage.value);
};
</script>

<style lang="scss" scoped>
.classify-search-container {
  margin: 20px 0;
  height: 36px;

  .el-menu {
    --el-menu-bg-color: transparent;
    border: none;

    .el-menu-item {
      --el-menu-text-color: #4a505f;
      --el-menu-base-level-padding: 0;
      margin: 0 16px;
      padding: 7px 0;
      font-size: 16px;
      font-weight: 500;
      color: #4a505f;
      line-height: 20px;

      &:focus,
      &:hover {
        --el-menu-hover-text-color: #4a505f;
        --el-menu-hover-bg-color: transparent;
      }

      &.is-active {
        --el-menu-active-color: #ffffff;
        padding: 7px 22px;
        background-color: #0081ff;
        font-weight: 500;
        border-radius: 18px;
      }
    }
  }

  .el-input {
    height: 36px;
  }
}
</style>
