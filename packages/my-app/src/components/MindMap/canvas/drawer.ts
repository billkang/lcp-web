import type { TspanData, Mdata, IsMdata, Transition, SelectionG } from '../types';
import * as d3 from '../d3';
import { useSelection } from '../hooks/useSelection';
import useEditNode from '../hooks/useEditNode';
import { branch, changeSharpCorner, editable, addBtnRect } from '../config';
import { getSiblingGClass, makeTransition, getPath } from '../utils';
import { getAddPath, getTspanData } from './attrs-getter';
import {
  setTspanAttrs,
  setCreateBtnRectAttrs,
  setExpandBtnRectAttrs,
  setExpandBtnCircleAttrs,
  setGAttrs,
  setTextAttrs,
  setNodeElementAttrs,
} from './attrs-setter';
import { bindNodeEvent } from './events';
import style from '../style';

const { onCreateNode } = useEditNode();

// 绘制新增按钮
function drawCreateBtn(g: SelectionG) {
  const createBtn = g.append('g');
  setCreateBtnRectAttrs(createBtn.append('rect'));

  createBtn.append('path').attr('d', getAddPath(2, addBtnRect.side));
  createBtn.on('click', onCreateNode);

  return createBtn;
}

// 绘制打开按钮
const drawExpandBtn = (g: SelectionG): d3.Selection<SVGGElement, Mdata, SVGGElement, IsMdata> => {
  const expandBtn = g.append('g');
  setExpandBtnRectAttrs(expandBtn.append('rect'));
  setExpandBtnCircleAttrs(expandBtn.append('circle'), -4);
  setExpandBtnCircleAttrs(expandBtn.append('circle'), 0);
  setExpandBtnCircleAttrs(expandBtn.append('circle'), 4);
  return expandBtn;
};

function pathTween(data: Mdata, index: number, paths: ArrayLike<SVGPathElement>) {
  const precision = 10;
  const d = getPath(data);
  const path0 = paths[index];
  const path1 = path0.cloneNode() as SVGPathElement;
  const n0 = path0.getTotalLength();
  path1.setAttribute('d', d);
  const n1 = path1.getTotalLength();

  // Uniform sampling of distance based on specified precision.
  const distances = [0];
  const dt = precision / Math.max(n0, n1);
  let i = 0;
  while ((i += dt) < 1) distances.push(i);
  distances.push(1);

  // Compute point-interpolators at each distance.
  const points = distances.map(t => {
    const p0 = path0.getPointAtLength(t * n0);
    const p1 = path1.getPointAtLength(t * n1);
    return d3.interpolate([p0.x, p0.y], [p1.x, p1.y]);
  });

  return (t: number) => {
    return t < 1 ? 'M' + points.map(p => p(t)).join('L') : d;
  };
}

// 绘制连接线
const drawLink = (p: d3.Selection<SVGPathElement, Mdata, SVGGElement, IsMdata>, tran?: Transition): void => {
  const p1 = p.attr('stroke', d => d.color).attr('stroke-width', branch);

  if (tran) {
    const p2 = p1.transition(tran);
    if (changeSharpCorner) {
      // 只有在改变sharpCorner的时候才应该调用
      p2.attrTween('d', pathTween);
    } else {
      p2.attr('d', getPath);
    }
  } else {
    p1.attr('d', getPath);
  }
};

// 新增节点
function appendNode(enter: d3.Selection<d3.EnterElement, Mdata, SVGGElement, IsMdata>) {
  // 创建节点根容器，保存当前节点及子节点信息
  const enterG = enter.append('g');

  // 设置 attrs
  setGAttrs(enterG);

  // 绘制连接线
  drawLink(enterG.append('path'));

  // 节点内容容器
  const gContent = enterG.append('g').attr('class', style.content);
  // 创建一个长方形，监听事件
  const gTrigger = gContent.append('rect');

  // 绘制文本
  const gText = gContent.append('g').attr('class', style.text);
  const gTextRect = gText.append('rect');
  const text = gText.append('text');
  setTextAttrs(text);
  const tspan = text.selectAll('tspan').data(getTspanData).enter().append('tspan');
  setTspanAttrs(tspan);

  // 绘制添加按钮
  let createBtn: SelectionG;
  if (editable) {
    createBtn = drawCreateBtn(gContent);
  }
  // 绘制折叠按钮
  const expandBtn = drawExpandBtn(gContent);

  const isRoot = enter.data()[0]?.depth === 0;
  setNodeElementAttrs(isRoot, gTrigger, gTextRect, expandBtn, createBtn);

  // 节点绑定事件
  bindNodeEvent(enterG, isRoot);

  // 递归绘制子节点
  enterG.each((d, i) => {
    if (!d.children) {
      return;
    }

    drawNode(
      d.children,
      enterG.filter((a, b) => i === b)
    );
  });

  gContent.raise();

  return enterG;
}

function appendTspan(
  enter: d3.Selection<d3.EnterElement, TspanData, SVGTextElement, Mdata>
): d3.Selection<SVGTSpanElement, TspanData, SVGTextElement, Mdata> {
  const tspan = enter.append('tspan');
  setTspanAttrs(tspan);
  return tspan;
}

function updateTspan(
  update: d3.Selection<SVGTSpanElement, TspanData, SVGTextElement, Mdata>
): d3.Selection<SVGTSpanElement, TspanData, SVGTextElement, Mdata> {
  setTspanAttrs(update);
  return update;
}

// 更新节点
function updateNode(update: SelectionG) {
  const tran = makeTransition(500, d3.easePolyOut);
  setGAttrs(update, tran);

  // 绘制连接线
  drawLink(update.select<SVGPathElement>(':scope > path'), tran);
  const gContent = update.select<SVGGElement>(`:scope > g.${style.content}`);
  const gTrigger = gContent.select<SVGRectElement>(':scope > rect');
  const gText = gContent.select<SVGGElement>(`g.${style.text}`);
  const gTextRect = gText.select<SVGRectElement>('rect');
  const text = gText.select<SVGTextElement>('text');
  setTextAttrs(text, tran);
  text
    .selectAll<SVGTSpanElement, TspanData>('tspan')
    .data(getTspanData)
    .join(appendTspan, updateTspan, exit => exit.remove());

  let createBtn = gContent.select<SVGGElement>(`g.${style['add-btn']}`);
  const expandBtn = gContent.select<SVGGElement>(`g.${style['expand-btn']}`);
  if (editable) {
    if (!createBtn.node()) {
      createBtn = drawCreateBtn(gContent);
    }
  } else {
    createBtn.remove();
  }

  const isRoot = update.data()[0]?.depth === 0;
  setNodeElementAttrs(isRoot, gTrigger, gTextRect, expandBtn, createBtn);

  update.each((d, i) => {
    if (!d.children) {
      return;
    }
    drawNode(
      d.children,
      update.filter((a, b) => i === b)
    );
  });

  gContent.raise();

  return update;
}

// 绘制节点
export const drawNode = (data: Mdata[], selection?: d3.Selection<SVGGElement, any, any, any>): void => {
  if (!selection) {
    const { g } = useSelection();
    selection = g;
  }

  const temp = selection.selectAll<SVGGElement, Mdata>(`g.${getSiblingGClass(data[0]).join('.')}`);
  temp.data(data, d => d.gKey).join(appendNode, updateNode);
};
