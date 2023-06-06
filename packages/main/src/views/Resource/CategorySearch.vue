<template>
  <div class="classify-search-container">
    <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelectMenu">
      <el-menu-item v-for="item in data" :key="item.key" :index="item.key">
        <img class="icon" :src="item.icon" />
        {{ item.label }}
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, PropType, defineEmits } from 'vue';

type Category = {
  key: string;
  icon: string;
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
}>();

const activeIndex = ref<string>(props.data[0]?.key || '');

const handleSelectMenu = (key: string) => {
  emit('change-category', key);
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
      margin: 0 6px;
      padding: 10px;
      font-size: 16px;
      font-weight: 500;
      color: #4a505f;
      line-height: 20px;
      border: none;

      &:focus,
      &:hover {
        --el-menu-hover-text-color: #4a505f;
        --el-menu-hover-bg-color: transparent;
      }

      &.is-active {
        --el-menu-active-color: #0081ff;
        background-color: #f1f6fe;
        font-weight: 500;
      }

      .icon {
        width: 20px;
        height: 20px;
        display: inline-block;
        margin-right: 4px;
      }
    }
  }
}
</style>
