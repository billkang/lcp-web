import { Ref, ref } from 'vue';
import { getDataId } from '../utils';
import { useSelection, useElementRef } from './useSelection';
import type { Mdata } from '../types';
import style from '../style';
import { add, mmdata } from '../data';
import useZoom from './useZoom';

// 是否可以编辑节点
export const enableEditNode: Ref<boolean> = ref(false);

export default function useEditNode() {
  const { handleMoveView } = useZoom();

  /**
   * 添加子节点并进入编辑模式
   */
  const onCreateNode = (e: MouseEvent, d: Mdata): void => {
    const child = add(d.id, '');
    if (child) {
      handleEditText(child, e);
    }
  };

  /**
   * 进入编辑状态
   * @param this - gText
   */
  function onEditText(this: SVGGElement, _e: MouseEvent, d: Mdata): void {
    const gNode = this.parentNode?.parentNode as SVGGElement;
    const { foreignDivEle } = useElementRef();
    const { foreign } = useSelection();

    if (!!enableEditNode.value && foreign && foreignDivEle.value) {
      enableEditNode.value = false;

      gNode.classList.add(style.edited);

      foreign
        .attr('x', d.x - 2 - (d.left ? d.width : 0))
        .attr('y', d.y - mmdata.data.y - 2)
        .attr('data-id', d.id)
        .attr('data-name', d.name)
        .style('display', '');
      const div = foreignDivEle.value;
      div.textContent = d.name;
      div.focus();
      getSelection()?.selectAllChildren(div);

      const gContent = gNode.querySelector<SVGGElement>(`:scope > .${style.content}`);
      if (gContent) {
        handleMoveView(gContent);
      }
    }
  }

  /**
   * 选中节点进入编辑模式
   */
  function handleEditText(d: Mdata, e = new MouseEvent('click')): void {
    const { g } = useSelection();
    if (!g) {
      return;
    }

    const gText = g.selectAll<SVGGElement, Mdata>(
      `g[data-id='${getDataId(d)}'] > g.${style.content} > g.${style.text}`,
    );
    const node = gText.node();

    if (node) {
      enableEditNode.value = true;
      onEditText.call(node, e, d);
    }
  }

  return {
    onCreateNode,
    onEditText,
    handleEditText,
  };
}
