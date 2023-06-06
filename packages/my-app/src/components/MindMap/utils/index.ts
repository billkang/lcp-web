import type { Mdata, TwoNumber } from '../types';
import * as d3 from '../d3';
import { useSelection } from '../hooks/useSelection';
import { link, sharpCorner, textRectPadding } from '../config';
import style from '../style';
import { enableEditNode } from '../hooks/useEditNode';

export const makeTransition = (
  dura: number,
  easingFn: (normalizedTime: number) => number,
): d3.Transition<d3.BaseType, Mdata, null, undefined> => {
  return d3.transition<Mdata>().duration(dura).ease(easingFn) as d3.Transition<any, Mdata, null, undefined>;
};

export function selectGNode(d: SVGGElement | Mdata): void {
  const el = d instanceof SVGGElement ? d : document.querySelector<SVGGElement>(`g[data-id='${getDataId(d)}']`);
  const oldEl = document.getElementsByClassName('selected')[0];

  if (el) {
    if (oldEl) {
      if (oldEl !== el) {
        oldEl.classList.remove(style.selected);
        el.classList.add(style.selected);
      } else {
        enableEditNode.value = true;
      }
    } else {
      el.classList.add(style.selected);
    }
  } else {
    throw new Error('selectGNode failed');
  }
}

/**
 * 将一个字符串按换行符切分，返回字符串数组
 * @param str - 字符串
 */
export const getMultiline = (str: string): string[] => {
  const multiline = str.split('\n');
  if (multiline.length > 1 && multiline[multiline.length - 1] === '') {
    multiline.pop();
  }
  return multiline;
};

/**
 * 获取文本在tspan中的宽度与高度
 * @param text -
 * @returns -
 */
export const getTextSize = (text: string): { width: number; height: number } => {
  const { asstSvg } = useSelection();
  if (!asstSvg) {
    throw new Error('asstSvg undefined');
  }

  const multiline = getMultiline(text);
  const t = asstSvg.append('text');
  t.selectAll('tspan')
    .data(multiline)
    .enter()
    .append('tspan')
    .text(d => d)
    .attr('x', 0);
  const tBox = (t.node() as SVGTextElement).getBBox();
  t.remove();

  return {
    width: Math.max(tBox.width, 22),
    height: Math.max(tBox.height, 22) * multiline.length,
  };
};

export const getYOffset = () => 3; // max-branch / 2

export const getSiblingGClass = (d?: Mdata): string[] => {
  const arr = ['node'];
  if (d) {
    arr.push(`depth-${d.depth}`);
  }
  return arr;
};

export const getGTransform = (d: Mdata): string => {
  return `translate(${d.dx + d.px},${d.dy + d.py})`;
};

export const getDataId = (d: Mdata): string => {
  return d.id;
};

export const getPath = (d: Mdata): string => {
  let dpw = 0;
  let dph = 0;
  const trp = Math.max(textRectPadding - 3, 0); // -3为了不超过选中框
  let w = d.width + trp;
  const targetOffset = getYOffset();
  let sourceOffset = targetOffset;

  const { parent } = d;
  if (parent) {
    dpw = parent.width;
    dph = parent.height;
    if (parent.depth === 0) {
      if (!sharpCorner) {
        dpw /= 2;
      }
      dph /= 2;
      sourceOffset = 0;
    }
  }

  if (d.left) {
    if (parent) {
      if (parent.depth !== 0) {
        dpw = -dpw;
      } else if (sharpCorner) {
        dpw = 0;
      }
    }
    w = -w;
  }

  const source: TwoNumber = [-d.dx + dpw - d.px, -d.dy + dph + sourceOffset - d.py];
  const target: TwoNumber = [0, d.height + targetOffset];

  return `${link({ source, target })}L${w},${target[1]}`;
};
