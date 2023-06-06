<template>
  <div class="mindmap-container">
    <div class="header-wrapper">
      <el-menu class="menu-wrapper" mode="horizontal" @select="handleSelectMenu">
        <el-menu-item index="preview">
          <img :src="logoImg" />
          <span>预览</span>
        </el-menu-item>
        <el-menu-item index="edit">
          <img :src="logoImg" />
          <span>编辑</span>
        </el-menu-item>
        <el-menu-item index="version">
          <img :src="logoImg" />
          <span>版本</span>
        </el-menu-item>
        <el-menu-item index="download">
          <img :src="logoImg" />
          <span>下载</span>
        </el-menu-item>
        <el-menu-item index="history">
          <img :src="logoImg" />
          <span>归档</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="body-wrapper">
      <div id="svg-wrapper" ref="wrapperEle">
        <svg ref="svgEle" :class="style['svg']">
          <g ref="gEle">
            <foreignObject ref="foreignEle" style="display: none">
              <div ref="foreignDivEle" contenteditable></div>
            </foreignObject>
          </g>
        </svg>
      </div>
      <svg ref="asstSvgEle" class="asst-svg"></svg>
      <div class="button-list right-bottom">
        <button v-if="btns.center" @click="handleCenterView()">
          <i class="gps"></i>
        </button>
        <button v-if="btns.fit" @click="handleFitView()">
          <i class="fit"></i>
        </button>
        <button v-if="btns.download" @click="handleDownload()">
          <i class="download"></i>
        </button>
      </div>
      <div v-if="btns.timetravel" class="button-list right-top">
        <button :class="{ disabled: !hasPrev }" @click="handlePrev">
          <i class="prev"></i>
        </button>
        <button :class="{ disabled: !hasNext }" @click="handleNext">
          <i class="next"></i>
        </button>
      </div>
      <contextmenu :position="menuPos" :groups="menuGroups" @click-item="onClickMenu"></contextmenu>
    </div>
    <div class="footer-wrapper">
      <ScaleController />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, EmitsOptions, onMounted, PropType, SetupContext } from 'vue';
import { Data, Locale, TwoNumber } from './types';
import style from './style';
import { initData } from './data';
import { handleNext, handlePrev, handleDownload } from './screenActions';
import Contextmenu from './components/Contextmenu.vue';
import ScaleController from './components/ScaleController.vue';
import { bindContenteditable } from './canvas';
import useInitSelection, { useElementRef } from './hooks/useSelection';
import useContextmenu from './hooks/useContextmenu';
import useZoom, { scaleValue } from './hooks/useZoom';
import useSnapshot from './hooks/useSnapshot';
import setConfig from './config';
import { getTextSize } from './utils';
import logoImg from '@/assets/images/logo.ico';

type OperationBtn = {
  center?: boolean;
  fit?: boolean;
  download?: boolean;
  timetravel?: boolean;
};

export default defineComponent({
  name: 'Mindmap',
  components: {
    Contextmenu,
    ScaleController,
  },
  props: {
    modelValue: {
      type: Array as PropType<Data[]>,
      required: true,
    },
    // 绘制所需的变量
    xGap: { type: Number, default: 84 },
    yGap: { type: Number, default: 18 },
    branch: {
      type: Number,
      default: 3,
      validator: (val: number) => val >= 1 && val <= 6,
    },
    scaleExtent: {
      type: Array as unknown as PropType<TwoNumber>,
      default: () => [0.2, 4],
    },
    sharpCorner: {
      type: Boolean,
      default: true,
    },
    editable: {
      type: Boolean,
      default: true,
    },
    dragable: {
      type: Boolean,
      default: true,
    },
    keyboard: Boolean,
    zoomable: {
      type: Boolean,
      default: true,
    },
    // i18n
    locale: { type: String as PropType<Locale>, default: 'zh' },
    // 操作按钮
    btns: {
      type: Object as PropType<OperationBtn>,
      default: () => ({
        center: true,
        fit: true,
        download: true,
        timetravel: true,
      }),
    },
  },
  emits: ['update:modelValue'],
  setup(props, context) {
    setConfig(props, context as SetupContext<EmitsOptions>);

    const { wrapperEle, svgEle, gEle, asstSvgEle, foreignEle, foreignDivEle } = useElementRef();
    useInitSelection();

    const { hasNext, hasPrev } = useSnapshot();

    const { handleFitView, handleCenterView } = useZoom();
    const { menuGroups, menuPos, onClickMenu } = useContextmenu();

    // onMounted
    onMounted(() => {
      const { modelValue, xGap, yGap } = props;
      initData(modelValue[0], xGap, yGap, getTextSize);

      bindContenteditable();

      handleFitView();
    });

    const handleSelectMenu = (key: string) => {
      console.log(key);
    };

    return {
      logoImg,
      wrapperEle,
      svgEle,
      gEle,
      style,
      asstSvgEle,
      foreignEle,
      foreignDivEle,
      scaleValue,
      hasPrev,
      hasNext,
      menuGroups,
      menuPos,
      onClickMenu,
      handleSelectMenu,
      handleCenterView,
      handleFitView,
      handleNext,
      handlePrev,
      handleDownload,
    };
  },
});
</script>

<style lang="scss" scoped>
$seleColor: rgba(
  $color: blue,
  $alpha: 0.15,
);

.mindmap-container {
  position: relative;
  height: 100%;
  background-color: #f5f5f7;

  .header-wrapper {
    height: 50px;
    background-color: #ffffff;

    .menu-wrapper {
      margin: 0 15px;
      :deep(.el-menu-item) {
        padding: 8px 10px;
        text-align: center;
        flex-direction: column;
        justify-content: space-around;

        img {
          width: 18px;
          height: 18px;
          margin-bottom: 5px;
          display: inline-block;
        }

        span {
          height: 16px;
          font-size: 12px;
          color: #4a505f;
          line-height: 16px;
        }
      }
    }
  }

  .body-wrapper {
    position: relative;
    height: calc(100% - 90px);

    #svg-wrapper {
      width: 100%;
      height: 100%;

      svg text {
        white-space: pre;
      }
    }

    .asst-svg {
      position: absolute;
      width: 0;
      height: 0;
    }

    .button-list {
      position: absolute;

      &.right-bottom {
        bottom: 0;
        right: 0;
      }
      &.right-top {
        top: 0;
        right: 0;
        display: flex;
      }

      button {
        position: relative;
        cursor: pointer;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background-color: transparent;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        border: 0;
        color: #3f51b5;

        &::before {
          background-color: currentColor;
          border-radius: inherit;
          content: '';
          opacity: 0;
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          transition: opacity 0.2s cubic-bezier(0.4, 0, 0.6, 1);
        }

        &:hover::before {
          opacity: 0.1;
        }

        &.disabled {
          pointer-events: none;

          i {
            filter: invert(85%) sepia(20%) saturate(0%) hue-rotate(125deg) brightness(86%) contrast(93%);
          }
        }

        i {
          filter: invert(25%) sepia(40%) saturate(5050%) hue-rotate(227deg) brightness(78%) contrast(74%);
          width: 24px;
          height: 24px;

          &.gps {
            background-image: url(@/assets/icons/crosshairs-gps.png);
          }
          &.fit {
            background-image: url(@/assets/icons/fit-to-page-outline.png);
          }
          &.download {
            background-image: url(@/assets/icons/download.png);
          }
          &.prev {
            background-image: url(@/assets/icons/prev.png);
          }
          &.next {
            background-image: url(@/assets/icons/next.png);
          }
          &.close {
            background-image: url(@/assets/icons/close.png);
          }
        }
      }
    }
  }

  .footer-wrapper {
    display: flex;
    flex-direction: row-reverse;
    height: 40px;
  }
}
</style>
