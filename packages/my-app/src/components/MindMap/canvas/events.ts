import type { Mdata, SelectionG } from '../types';
import useDragNode from '../hooks/useDragNode';
import useEditNode from '../hooks/useEditNode';
import { expand, rename } from '../data';
import { selectGNode } from '../utils';
import { editable, dragable } from '../config';
import { useElementRef, useSelection } from '../hooks/useSelection';
import useZoom from '../hooks/useZoom';
import style from '../style';

const { dragNode } = useDragNode();
const { onEditText } = useEditNode();

// 选择文本
const onSelectText = (e: MouseEvent, d: Mdata): void => {
  e.stopPropagation();
  selectGNode(d);
};

// 点击展开按钮
const onClickExpandBtn = (e: MouseEvent, d: Mdata): void => {
  expand(d.id);
};

/**
 * @param this - gContent
 */
function onContentMouseEnter(this: SVGGElement): void {
  const temp = this.querySelector<HTMLElement>(`g.${style['add-btn']}`);
  if (temp) {
    temp.style.opacity = '1';
  }
}

/**
 * @param this - gContent
 */
function onContentMouseLeave(this: SVGGElement): void {
  const temp = this.querySelector<HTMLElement>(`g.${style['add-btn']}`);
  if (temp) {
    temp.style.opacity = '0';
  }
}

// 为节点绑定事件
export const bindNodeEvent = (g: SelectionG, isRoot: boolean) => {
  const expandBtn = g.select(`:scope > g.${style.content} > g.${style['expand-btn']}`);
  expandBtn.on('click', onClickExpandBtn);

  if (dragable || editable) {
    const gText = g.select<SVGGElement>(`:scope > g.${style.content} > g.${style.text}`);
    gText.on('mousedown', onSelectText);

    if (dragable && !isRoot) {
      dragNode(gText);
    }

    if (editable) {
      gText.on('click', onEditText);
    } else {
      gText.on('click', null);
    }
  }

  if (editable) {
    g.select<SVGGElement>(`:scope > g.${style.content}`)
      .on('mouseenter', onContentMouseEnter)
      .on('mouseleave', onContentMouseLeave);
  }
};

const { foreignDivEle, foreignEle } = useElementRef();
const { handleMoveView } = useZoom();

const onBlurContenteditable = (): void => {
  document.getElementsByClassName(style.edited)[0]?.classList.remove(style.edited, style.selected);

  if (foreignEle.value && foreignDivEle.value) {
    foreignEle.value.style.display = 'none';
    const id = foreignEle.value.getAttribute('data-id');
    const oldname = foreignEle.value.getAttribute('data-name');
    const name = foreignDivEle.value.textContent;
    if (id && name !== null && name !== oldname) {
      rename(id, name);
    }
  }
};

/**
 * foreignDivEle事件监听与观察
 */
export const bindContenteditable = (): void => {
  if (foreignDivEle.value) {
    /**
     * 观察foreignDiv，改变foreignObject的宽度和高度，并使其保持可见
     */
    const observer = new ResizeObserver((arr: ResizeObserverEntry[]) => {
      const { foreign } = useSelection();
      if (!foreign) {
        return;
      }

      const temp = arr[0];
      const foreignDiv = temp.target;
      const { width, height } = temp.contentRect;
      const pl = parseInt(getComputedStyle(foreignDiv).paddingLeft || '0', 10);
      const b = parseInt(getComputedStyle(foreignDiv.parentNode as Element).borderTopWidth || '0', 10);
      const gap = (pl + b) * 2;

      foreign.attr('width', width + gap).attr('height', height + gap);
      if (foreign.style('display') !== 'none') {
        handleMoveView(foreignDiv);
      }
    });

    observer.observe(foreignDivEle.value);
    foreignDivEle.value.addEventListener('blur', onBlurContenteditable);
    foreignDivEle.value.addEventListener('mousedown', (e: MouseEvent) => e.stopPropagation());
  }
};
