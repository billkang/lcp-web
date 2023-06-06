import type { TspanData, Mdata, IsMdata, Transition, SelectionG, SelectionRect, SelectionCircle } from '../types';
import * as d3 from '../d3';
import { getDataId, getGTransform, getSiblingGClass, getYOffset } from '../utils';
import {
  rootTextRectPadding,
  rootTextRectRadius,
  textRectPadding,
  expandBtnRect,
  addBtnRect,
  addBtnSide,
} from '../config';
import style from '../style';

export const setTextAttrs = (
  text: d3.Selection<SVGTextElement, Mdata, SVGGElement, IsMdata>,
  tran?: Transition
): void => {
  const t1 = tran ? text.transition(tran) : text;
  t1.attr('transform', d => `translate(${d.left ? -d.width : 0},0)`);
};

export const setTspanAttrs = (tspan: d3.Selection<SVGTSpanElement, TspanData, SVGTextElement, Mdata>): void => {
  tspan
    .attr('alignment-baseline', 'text-before-edge')
    .text(d => d.name || ' ')
    .attr('x', 0)
    .attr('dy', (d, i) => (i ? d.height : 0));
};

export const setCreateBtnRectAttrs = (rect: SelectionRect): void => {
  const { side, padding } = addBtnRect;
  const radius = 4;
  const temp0 = -padding - side / 2;
  const temp1 = side + padding * 2;

  rect
    .attr('x', temp0)
    .attr('y', temp0)
    .attr('rx', radius)
    .attr('ry', radius)
    .attr('width', temp1)
    .attr('height', temp1);
};

export const setExpandBtnRectAttrs = (rect: SelectionRect): void => {
  rect
    .attr('x', -expandBtnRect.width / 2)
    .attr('y', -expandBtnRect.height / 2)
    .attr('width', expandBtnRect.width)
    .attr('height', expandBtnRect.height)
    .attr('rx', expandBtnRect.radius)
    .attr('ry', expandBtnRect.radius)
    .attr('stroke', d => d.color || 'grey')
    .attr('fill', d => d.color || 'grey');
};

export const setExpandBtnCircleAttrs = (circle: SelectionCircle, cx: number): void => {
  circle.attr('cx', cx).attr('cy', 0).attr('r', 1);
};

// 为g元素设置attrs
function getGClass(d?: Mdata): string[] {
  const arr = getSiblingGClass(d);
  if (d) {
    if (d.depth === 0) {
      arr.push(style.root);
    }
    if (d.collapse) {
      arr.push(style['collapse']);
    } else if (!d.children || d.children.length === 0) {
      arr.push('leaf');
    }
  }
  return arr;
}

export const setGAttrs = (g: SelectionG, tran?: Transition): void => {
  const g1 = g.attr('class', d => getGClass(d).join(' ')).attr('data-id', getDataId);
  const g2 = tran ? g1.transition(tran) : g1;
  g2.attr('transform', getGTransform);
};

function getCreateBtnTransform(d: Mdata, trp: number): string {
  const y = d.depth === 0 ? d.height / 2 : d.height + getYOffset();
  let x = d.width + trp + addBtnSide / 2 + addBtnRect.margin;
  if (d.left) {
    x = -x;
  }
  return `translate(${x},${y})`;
}

function getCreateBtnClass(d: Mdata): string[] {
  const arr = [style['add-btn']];
  if (d.collapse) {
    arr.push(style['hidden']);
  }
  return arr;
}

function setCreateBtnAttrs(g: SelectionG, trp: number): void {
  g.attr('class', d => getCreateBtnClass(d).join(' ')).attr('transform', d => getCreateBtnTransform(d, trp));
}

function setTriggerAttrs(rect: SelectionRect, padding: number): void {
  const w = addBtnSide + addBtnRect.margin;
  const p = padding * 2;
  rect
    .attr('class', style.trigger)
    .attr('x', d => -padding - (d.left ? d.width + w : 0))
    .attr('y', -padding)
    .attr('width', d => d.width + p + w)
    .attr('height', d => d.height + p);
}

function setTextRectAttrs(rect: SelectionRect, padding: number, radius = 4): void {
  rect
    .attr('x', d => -padding - (d.left ? d.width : 0))
    .attr('y', -padding)
    .attr('rx', radius)
    .attr('ry', radius)
    .attr('width', d => d.width + padding * 2)
    .attr('height', d => d.height + padding * 2);
}

function getExpandBtnTransform(d: Mdata, trp: number): string {
  const gap = 4;
  const y = d.depth === 0 ? d.height / 2 : d.height + getYOffset();
  let x = d.width + trp + expandBtnRect.width / 2 + gap;
  if (d.left) {
    x = -x;
  }
  return `translate(${x},${y})`;
}

function setExpandBtnAttrs(g: SelectionG, trp: number): void {
  g.attr('class', style['expand-btn'])
    .attr('transform', d => getExpandBtnTransform(d, trp))
    .style('color', d => d.color);
}

/**
 * 根据该节点是否是根节点，绘制不同的效果
 */
export const setNodeElementAttrs = (
  isRoot: boolean,
  gTrigger: SelectionRect,
  gTextRect: SelectionRect,
  gExpandBtn: SelectionG,
  gAddBtn?: SelectionG
): void => {
  if (isRoot) {
    setTriggerAttrs(gTrigger, rootTextRectPadding);
    setTextRectAttrs(gTextRect, rootTextRectPadding, rootTextRectRadius);
    setExpandBtnAttrs(gExpandBtn, rootTextRectPadding);
    if (gAddBtn) {
      setCreateBtnAttrs(gAddBtn, rootTextRectPadding);
    }
  } else {
    setTriggerAttrs(gTrigger, textRectPadding);
    setTextRectAttrs(gTextRect, textRectPadding);
    setExpandBtnAttrs(gExpandBtn, textRectPadding);
    if (gAddBtn) {
      setCreateBtnAttrs(gAddBtn, textRectPadding);
    }
  }
};
