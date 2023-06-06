import type { Mdata, TwoNumber } from '../types';
import * as d3 from '../d3';
import { textRectPadding } from '../config';
import { getSiblingGClass } from '../utils';
import { changeLeft, mmdata, moveChild, moveSibling } from '../data';
import { useElementRef, useSelection } from './useSelection';
import { makeTransition, getGTransform, getDataId, getPath } from '../utils';
import style from '../style';

/**
 * @param this - gText
 */
function getDragContainer(this: SVGGElement): SVGGElement {
  return this.parentNode?.parentNode?.parentNode as SVGGElement;
}

const moveNode = (node: SVGGElement, d: Mdata, p: TwoNumber, dura = 0): void => {
  const tran = makeTransition(dura, d3.easePolyOut);
  d.px = p[0];
  d.py = p[1];
  d3.select<SVGGElement, Mdata>(node).transition(tran).attr('transform', getGTransform);
  d3.select<SVGPathElement, Mdata>(`g[data-id='${getDataId(d)}'] > path`)
    .transition(tran)
    .attr('d', d => getPath(d));
};

/**
 * @param this - gText
 */
function onDragMove(this: SVGGElement, e: d3.D3DragEvent<SVGGElement, Mdata, Mdata>, d: Mdata): void {
  const gNode = this.parentNode?.parentNode as SVGGElement;
  const { svgEle, gEle } = useElementRef();
  if (svgEle.value) {
    svgEle.value.classList.add(style.dragging);
  }

  const { g } = useSelection();
  if (!g) {
    return;
  }

  moveNode(gNode, d, [e.x - d.x, e.y - d.y]);
  // 鼠标相对gEle左上角的位置
  const mousePos = d3.pointer(e, gEle.value);
  mousePos[1] += mmdata.data.y;

  const temp = g.selectAll<SVGGElement, Mdata>('g.node').filter(other => {
    if (other !== d && other !== d.parent && !other.id.startsWith(d.id)) {
      let diffx0 = textRectPadding;
      let diffx1 = other.width + textRectPadding;
      if (other.left && other.depth !== 0) {
        [diffx0, diffx1] = [diffx1, diffx0];
      }
      const rect = {
        x0: other.x - diffx0,
        x1: other.x + diffx1,
        y0: other.y - textRectPadding,
        y1: other.y + other.height + textRectPadding,
      };

      return mousePos[0] > rect.x0 && mousePos[1] > rect.y0 && mousePos[0] < rect.x1 && mousePos[1] < rect.y1;
    }
    return false;
  });
  const old = Array.from(document.getElementsByClassName(style.outline));
  const n = temp.node();
  old.forEach(o => {
    if (o !== n) {
      o.classList.remove(style.outline);
    }
  });
  n?.classList.add(style.outline);
}

/**
 * @param this - gText
 */
function onDragEnd(this: SVGGElement, e: d3.D3DragEvent<SVGGElement, Mdata, Mdata>, d: Mdata): void {
  const gNode = this.parentNode?.parentNode as SVGGElement;
  const { svgEle } = useElementRef();
  if (svgEle.value) {
    svgEle.value.classList.remove(style.dragging);
  }

  // 判断是否找到了新的父节点
  const np = document.getElementsByClassName(style.outline)[0];
  if (np) {
    np.classList.remove(style.outline);
    const pid = np.getAttribute('data-id');
    if (pid) {
      d.px = 0;
      d.py = 0;
      moveChild(pid, d.id);
    } else {
      throw new Error('outline data-id null');
    }
    return;
  }

  // 判断是否变换left
  const xToCenter = d.x - mmdata.getRootWidth() / 2;
  const lr = d.depth === 1 && xToCenter * (xToCenter + d.px) < 0;
  const getSameSide = lr ? (a: Mdata) => a.left !== d.left : (a: Mdata) => a.left === d.left;
  // 判断是否需要调换节点顺序
  const p = gNode.parentNode as SVGGElement;
  let downD = lr ? { y: Infinity, id: d.id } : d;
  let upD = lr ? { y: -Infinity, id: d.id } : d;
  const brothers = d3
    .select<SVGGElement, Mdata>(p)
    .selectAll<SVGGElement, Mdata>(`g.${getSiblingGClass(d).join('.')}`)
    .filter(a => a !== d && getSameSide(a));
  const endY = d.y + d.py;
  brothers.each(b => {
    if ((lr || b.y > d.y) && b.y < endY && b.y > upD.y) {
      upD = b;
    } // 找新哥哥节点
    if ((lr || b.y < d.y) && b.y > endY && b.y < downD.y) {
      downD = b;
    } // 找新弟弟节点
  });

  if (downD.id !== d.id) {
    d.px = 0;
    d.py = 0;
    moveSibling(d.id, downD.id);
  } else if (upD.id !== d.id) {
    d.px = 0;
    d.py = 0;
    moveSibling(d.id, upD.id, 1);
  } else if (lr) {
    d.px = 0;
    d.py = 0;
    changeLeft(d.id);
  } else {
    // 复原
    moveNode(gNode, d, [0, 0], 500);
  }
}

export default function useDragNode() {
  const dragNode = d3
    .drag<SVGGElement, Mdata>()
    .container(getDragContainer)
    .on('drag', onDragMove)
    .on('end', onDragEnd);

  return {
    dragNode,
  };
}
