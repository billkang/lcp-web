import { computed, ref, Ref, onMounted } from 'vue';
import { scaleExtent, editable } from '../config';
import { selectGNode } from '../utils';
import { MenuItem, Data } from '../types';
import useZoom, { scaleValue } from './useZoom';
import { useElementRef } from './useSelection';
import useEditNode from './useEditNode';
import type { MenuEvent, Mdata } from '../types';
import style from '../style';
import * as d3 from '../d3';
import { add, addParent, addSibling, collapse, del, delOne, expand, mmdata } from '../data';

const getRelativePos = (wrapper: HTMLElement, e: MouseEvent): { left: number; top: number } => {
  const { pageX, pageY } = e;
  const wrapperPos = wrapper.getBoundingClientRect();
  const wrapperLeft = wrapperPos.left + window.pageXOffset;
  const wrapperTop = wrapperPos.top + window.pageYOffset;

  return {
    left: pageX - wrapperLeft,
    top: pageY - wrapperTop,
  };
};

function getSelectedGData(): Mdata {
  const sele = d3.select<SVGGElement, Mdata>(`.${style.selected}`);
  return sele.data()[0];
}

/**
 * 判断字符串是否符合Data的数据格式，如果是，则返回格式化的数据，如果不是，返回false
 */
const isData = (str: string): Data | false => {
  let data;
  try {
    data = JSON.parse(str);
    return 'name' in data ? data : false;
  } catch (error) {
    return false;
  }
};

const showViewMenu = ref(true);
const menuPos = ref({ left: 0, top: 0 });

const collapseItem: Ref<MenuItem> = ref({ name: 'collapse', disabled: true });
const expandItem: Ref<MenuItem> = ref({ name: 'expand', disabled: true });
const deleteItem: Ref<MenuItem> = ref({ name: 'delete', disabled: false });
const addItem: Ref<MenuItem> = ref({ name: 'add', disabled: false });
const addParentItem: Ref<MenuItem> = ref({ name: 'add-parent', disabled: false });
const addSiblingItem: Ref<MenuItem> = ref({ name: 'add-sibling', disabled: false });
const addSiblingBeforeItem: Ref<MenuItem> = ref({ name: 'add-sibling-before', disabled: true });
const cutItem: Ref<MenuItem> = ref({ name: 'cut', disabled: false });
const copyItem: Ref<MenuItem> = ref({ name: 'copy', disabled: false });
const pasteItem: Ref<MenuItem> = ref({ name: 'paste', disabled: false });
const deleteOneItem: Ref<MenuItem> = ref({ name: 'delete-one', disabled: false });

// 是否显示Contextmenu
export const displayContextmenu: Ref<boolean> = ref(false);

export default function useContextmenu() {
  const { handleFitView, handleScaleBy } = useZoom();

  const nodeMenu = computed<MenuItem[][]>(() =>
    [
      [addItem.value, addParentItem.value, addSiblingItem.value, addSiblingBeforeItem.value],
      [cutItem.value, copyItem.value, pasteItem.value, deleteItem.value, deleteOneItem.value],
      [{ name: 'selectall', disabled: true }],
      [collapseItem.value, expandItem.value],
    ].filter((item, index) => {
      if (index === 0 || index === 1) {
        return editable;
      } else {
        return true;
      }
    }),
  );

  const viewMenu = computed(() => [
    [
      {
        name: 'zoomin',
        disabled: scaleValue.value >= scaleExtent[1],
      },
      {
        name: 'zoomout',
        disabled: scaleValue.value <= scaleExtent[0],
      },
      { name: 'zoomfit', disabled: false },
    ],
    [{ name: 'selectall', disabled: true }],
  ]);

  const menuGroups = computed(() => (showViewMenu.value ? viewMenu.value : nodeMenu.value));

  const onContextmenu = (e: MouseEvent): void => {
    e.preventDefault();

    const { wrapperEle } = useElementRef();
    if (!wrapperEle.value) {
      return;
    }

    const relativePos = getRelativePos(wrapperEle.value, e);
    menuPos.value = relativePos;

    const eventTargets = e.composedPath() as SVGElement[];
    const gNode = eventTargets.find(et => et.classList?.contains('node'));
    if (gNode) {
      const { classList } = gNode;
      const isRoot = classList.contains(style.root);
      const collapseFlag = classList.contains(style['collapse']);
      if (!classList.contains(style.selected)) {
        selectGNode(gNode as SVGGElement);
      }
      deleteItem.value.disabled = isRoot;
      cutItem.value.disabled = isRoot;
      deleteOneItem.value.disabled = isRoot;
      addSiblingItem.value.disabled = isRoot;
      addSiblingBeforeItem.value.disabled = isRoot;
      addParentItem.value.disabled = isRoot;
      expandItem.value.disabled = !collapseFlag;
      collapseItem.value.disabled = collapseFlag || classList.contains('leaf');
      showViewMenu.value = false;
    } else {
      showViewMenu.value = true;
    }

    displayContextmenu.value = true;
  };

  onMounted(() => {
    const { wrapperEle } = useElementRef();
    if (!wrapperEle.value) {
      return;
    }

    wrapperEle.value.addEventListener('contextmenu', onContextmenu);
  });

  onUnmounted(() => {
    const { wrapperEle } = useElementRef();
    if (!wrapperEle.value) {
      return;
    }

    wrapperEle.value.removeEventListener('contextmenu', onContextmenu);
  });

  const onClickMenu = (name: MenuEvent): void => {
    const { onCreateNode, handleEditText } = useEditNode();

    switch (name) {
      case 'zoomfit':
        handleFitView();
        break;
      case 'zoomin':
        handleScaleBy(true);
        break;
      case 'zoomout':
        handleScaleBy(false);
        break;
      case 'add':
        onCreateNode(new MouseEvent('click'), getSelectedGData());
        break;
      case 'delete':
        del(getSelectedGData().id);
        break;
      case 'delete-one':
        delOne(getSelectedGData().id);
        break;
      case 'collapse':
        collapse(getSelectedGData().id);
        break;
      case 'expand':
        expand(getSelectedGData().id);
        break;
      case 'add-sibling':
        {
          const seleData = getSelectedGData();
          const d = addSibling(seleData.id, '');
          if (d) {
            handleEditText(d);
          }
        }
        break;
      case 'add-sibling-before':
        {
          const seleData = getSelectedGData();
          const d = addSibling(seleData.id, '', true);
          if (d) {
            handleEditText(d);
          }
        }
        break;
      case 'add-parent':
        {
          const seleData = getSelectedGData();
          const d = addParent(seleData.id, '');
          if (d) {
            handleEditText(d);
          }
        }
        break;
      case 'cut':
        {
          const { id } = getSelectedGData();
          const rawdata = mmdata.find(id)?.rawData;
          if (rawdata) {
            // navigator.clipboard.write
            navigator.clipboard.writeText(JSON.stringify(rawdata));
          }
          del(id);
        }
        break;
      case 'copy':
        {
          const seleData = getSelectedGData();
          const rawdata = mmdata.find(seleData.id)?.rawData;
          if (rawdata) {
            // navigator.clipboard.write
            navigator.clipboard.writeText(JSON.stringify(rawdata));
          }
        }
        break;
      case 'paste':
        {
          const seleData = getSelectedGData();
          navigator.clipboard.readText().then(clipText => {
            const rawdata = isData(clipText) || { name: clipText };
            add(seleData.id, rawdata);
          });
        }
        break;
      default:
        break;
    }
  };

  return {
    menuPos,
    menuGroups,
    onClickMenu,
  };
}
