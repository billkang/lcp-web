import { SetupContext } from 'vue';
import { TwoNumber } from './types';
import * as d3 from './d3';

// context 对象
export let context: SetupContext = null;

// --------------------基础属性--------------------
// 缩放比例
export let scaleExtent: TwoNumber = [0.2, 4];
// 连接线宽度
export let branch = 3;
// 是否可以缩放
export let zoomable = true;
// 是否可以编辑
export let editable = true;
// 是否可以拖拽
export let dragable = true;

// --------------------元素间距--------------------
// node y轴间距
let yGap = 18;
// node x轴间距
let xGap = 84;

// 节点边距与间隔
export const rootTextRectRadius = 6;
export const rootTextRectPadding = 10;
// 文本边距
export let textRectPadding = Math.min(yGap / 2 - 1, rootTextRectPadding);

function updateTextRectPadding() {
  textRectPadding = Math.min(yGap / 2 - 1, rootTextRectPadding);
  textRectPadding = Math.min(xGap / 2 - 1, textRectPadding);
}

// --------------------按钮样式--------------------
export const addBtnRect = { side: 12, padding: 2, margin: 8 };
export const addBtnSide = addBtnRect.side + addBtnRect.padding * 2;
export const expandBtnRect = { width: 16, height: 4, radius: 2 };

// --------------------连接线样式--------------------
type CurveStepLink = ({ source, target }: { source: TwoNumber; target: TwoNumber }) => string | null;
type Link = d3.Link<unknown, d3.DefaultLinkObject, [number, number]> | CurveStepLink;

const linkHorizontal = d3
  .linkHorizontal()
  .source(d => d.source)
  .target(d => d.target);

const curveStepLine = d3.line().curve(d3.curveStep);
const linkCurveStep: CurveStepLink = ({ source, target }) => curveStepLine([source, target]);

export let sharpCorner = false;
export let link: Link = linkHorizontal;
export let changeSharpCorner = false; // 指示是否需要使用attrTween('d', pathTween)

// --------------------设置值--------------------
export default function setConfig(props, ctx?: SetupContext) {
  if (props.scaleExtent) {
    scaleExtent = props.scaleExtent;
  }

  if (props.xGap) {
    xGap = props.xGap;

    updateTextRectPadding();
  }

  if (props.yGap) {
    yGap = props.yGap;

    updateTextRectPadding();
  }

  if (props.branch) {
    branch = props.branch;
  }

  if (props.zoomable) {
    zoomable = props.zoomable;
  }

  if (props.editable) {
    editable = props.editable;
  }

  if (props.dragable) {
    dragable = props.dragable;
  }

  if (props.sharpCorner) {
    if (sharpCorner !== props.sharpCorner) {
      changeSharpCorner = true;
    }
    sharpCorner = !!props.sharpCorner;
    link = sharpCorner ? linkCurveStep : linkHorizontal;
  }

  if (ctx) {
    context = ctx;
  }
}
