<template>
  <div class="scale-container">
    <div class="">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          {{ formatPercent(scaleValue) }}
          <el-icon class="el-icon--right">
            <CaretBottom />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item v-for="num in scaleDropdownList" :key="num" :command="num">
              {{ formatPercent(num) }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <div class="silder-wrapper">
      <el-icon size="13" color="#000000">
        <RemoveFilled @click="handleClickReduce" />
      </el-icon>
      <el-slider v-model="scaleValue" :min="0.2" :max="4" :step="0.1" />
      <el-icon size="13" color="#000000">
        <CirclePlusFilled @click="handleClickIncrease" />
      </el-icon>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useZoom, { scaleValue } from '../hooks/useZoom';

export default defineComponent({
  setup() {
    const scaleDropdownList = [4, 2, 1, 0.8, 0.6, 0.4, 0.2];

    const { handleScaleTo } = useZoom();

    // 格式化百分比
    const formatPercent = (val: number): string => {
      return `${(val * 100).toFixed(0)}%`;
    };

    const handleClickIncrease = (): void => {
      const oldVal = scaleValue.value;

      if (oldVal >= 4) {
        return;
      }

      handleScaleTo(oldVal + 0.1);
    };

    const handleClickReduce = (): void => {
      const oldVal = scaleValue.value;

      if (oldVal <= 0.2) {
        return;
      }

      handleScaleTo(oldVal - 0.1);
    };

    // 处理选中dropdown
    const handleCommand = (val: number): void => {
      handleScaleTo(val);
    };

    watch(scaleValue, (val: number, oldval: number) => {
      if (val && val !== oldval) {
        handleScaleTo(val);
      }
    });

    return {
      scaleValue,
      scaleDropdownList,
      formatPercent,
      handleCommand,
      handleClickIncrease,
      handleClickReduce,
    };
  },
});
</script>

<style lang="scss">
.scale-container {
  display: flex;
  padding: 13px 17px;
  height: 40px;

  .el-dropdown {
    .el-dropdown-link {
      outline: none;
    }
  }

  .silder-wrapper {
    margin: 1px 0;
    display: flex;

    .el-slider {
      margin: 0 8px;
      width: 200px;
      height: 12px;

      .el-slider__runway {
        --el-slider-height: 2px;
        --el-slider-runway-bg-color: #cad0d7;
        --el-slider-border-radius: 2px;

        .el-slider__bar {
          --el-slider-height: 2px;
          --el-slider-main-bg-color: #4a505f;
          --el-slider-border-radius: 2px;
          --el-slider-border-radius: 2px;
        }

        .el-slider__button-wrapper {
          --el-slider-button-wrapper-size: 12px;
          --el-slider-button-wrapper-size: 12px;
          --el-slider-button-wrapper-offset: -9px;

          .el-slider__button {
            --el-slider-button-size: 12px;
            --el-slider-button-size: 12px;
            --el-slider-main-bg-color: #4a505f;
            --el-color-white: #ffffff;
          }
        }
      }
    }
  }
}
</style>
