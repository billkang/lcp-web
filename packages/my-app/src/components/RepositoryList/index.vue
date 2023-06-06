<template>
  <div :class="style['repository-list']">
    <div v-for="item in props.data" :key="item.id" :class="style['repository-list-item']">
      <div :class="style['repository-list-item-tag']">{{ item.type }}</div>
      <div :class="style['repository-list-item-cover']">
        <div :class="style['repository-list-item-cover-img']">
          <img :src="item.img" />
        </div>
      </div>
      <div :class="style['repository-list-item-info']">
        <div :class="style['base-info']">
          <el-icon :class="style['icon']" size="24"><Management /></el-icon>
          <div :class="style['name']">{{ item.name }}</div>
        </div>
        <div :class="style['other-info']">
          <div :class="style['create-user']">{{ item.createUser }}</div>
          <div :class="style['update-time']">{{ item.updateTime }}</div>
        </div>

        <div :class="style['info-more']">
          <div :class="style['icon-box']">
            <el-dropdown :show-timeout="1" :hide-timeout="0" popper-class="popper-hide-arrow">
              <span>
                <el-icon :class="style['icon']" size="16"><MoreFilled /></el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>重命名</el-dropdown-item>
                  <el-dropdown-item>删除</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </div>
    </div>
    <div :class="[style['repository-list-item-folder']]">
      <div :class="style['repository-list-item-folder-img']">
        <img :src="iconFolder" />
      </div>
      <div :class="style['folder-name']">
        <div :class="style['name']">文件夹名称</div>
        <div :class="style['file-count']">3个文件</div>
      </div>
    </div>
  </div>
  <!-- <div :class="style['page-box']">
    <el-pagination background layout="prev, pager, next" :total="1000" />
  </div> -->
</template>
<script setup lang="ts">
import { defineProps, PropType } from 'vue';
import { RepositoryList } from './typing';
import style from './index.module.scss';

import iconFolder from '@/assets/icons/icon_folder.png';
const props = defineProps({
  data: {
    type: Array as PropType<RepositoryList[]>,
    required: true,
  },
});
</script>
