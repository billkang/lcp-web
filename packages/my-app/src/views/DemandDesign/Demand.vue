<template>
  <div class="page-container">
    <el-radio-group v-model="showType" class="show-type" @change="changeShowType">
      <el-radio-button label="mindMap">思维导图</el-radio-button>
      <el-radio-button label="levelMap">层级展示</el-radio-button>
      <el-radio-button label="tableMap">表格展示</el-radio-button>
    </el-radio-group>

    <!-- 思维导图 -->
    <mindmap
      v-if="showType == 'mindMap'"
      v-model="data"
      :branch="rangeList['branch'].value"
      :x-gap="rangeList['x-gap'].value"
      :y-gap="rangeList['y-gap'].value"
      :sharp-corner="checkboxList['sharp-corner'].value"
      :zoomable="checkboxList['zoomable'].value"
      :dragable="checkboxList['dragable'].value"
      :editable="checkboxList['editable'].value"
      :btns="{
        fit: checkboxList['fit-btn'].value,
        center: checkboxList['center-btn'].value,
        download: checkboxList['download-btn'].value,
        timetravel: checkboxList['timetravel'].value,
      }"
      @update:model-value="onChange" />

    <!-- 层级展示 -->
    <div v-if="showType == 'levelMap'">
      <level-map v-model="data" />
    </div>

    <!-- 表格展示 -->
    <div v-if="showType == 'tableMap'">
      <table-map v-model="data" />
    </div>
  </div>
</template>

<script lang="ts">
import levelMap from '@/components/LevelMap';
import mindmap from '@/components/MindMap';
import tableMap from '@/components/TableMap';
import { defineComponent, reactive, ref } from 'vue';
import learn from './learn.json';

type checkbox = { [key: string]: { value: boolean; disabled?: boolean } };

export default defineComponent({
  components: {
    mindmap,
    levelMap,
    tableMap,
  },
  setup() {
    // 展示方式
    const showType = ref('mindMap');

    const checkboxList = reactive<checkbox>({
      'center-btn': { value: true },
      'fit-btn': { value: true },
      timetravel: { value: true },
      'download-btn': { value: true },
      keyboard: { value: false, disabled: true },
      zoomable: { value: true },
      dragable: { value: true },
      editable: { value: true },
      'sharp-corner': { value: false },
      vertical: { value: false, disabled: true },
    });
    const rangeList = reactive({
      branch: { value: 3, min: 1, max: 6 },
      'x-gap': { value: 84, min: 0, max: 100 },
      'y-gap': { value: 18, min: 0, max: 100 },
    });
    const data = ref(learn);
    const onChange = () => console.log('update:model-value');

    const changeShowType = data => {
      showType.value = data;
    };

    return {
      showType,
      data,
      checkboxList,
      rangeList,
      onChange,
      changeShowType,
    };
  },
});
</script>

<style lang="scss">
.page-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 128px);

  border-radius: 4px;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.12);
  .show-type {
    position: absolute;
    z-index: 1;
    top: 10px;
    right: 15px;
  }
}
</style>
