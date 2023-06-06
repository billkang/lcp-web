import { cloneDeep } from 'lodash';
import type { Data, IsMdata, GetTextSize } from '../types';
import { drawNode } from '../canvas';
import ImData from './ImData';
import { context } from '../config';
import useSnapshot from '../hooks/useSnapshot';

const { record } = useSnapshot();

// 思维导图数据
export let mmdata: ImData;

export function initData(rawData: Data, xGap: number, yGap: number, getTextSize: GetTextSize) {
  mmdata = new ImData(cloneDeep(rawData), xGap, yGap, getTextSize);

  repaint();
}

export const repaint = (needRecord = true): void => {
  if (needRecord) {
    record(mmdata.data);
  }

  context.emit('update:modelValue', cloneDeep([mmdata.data.rawData]));

  drawNode([mmdata.data]);
};

export const rename = (id: string, name: string): void => {
  mmdata.rename(id, name);
  repaint();
};

export const moveChild = (pid: string, id: string): void => {
  mmdata.moveChild(pid, id);
  repaint();
};

export const moveSibling = (id: string, referenceId: string, after = 0): void => {
  mmdata.moveSibling(id, referenceId, after);
  repaint();
};

export const add = (id: string, name: string | Data): IsMdata => {
  const d = mmdata.add(id, name);
  repaint();
  return d;
};

export const del = (id: string): void => {
  mmdata.delete(id);
  repaint();
};

export const delOne = (id: string): void => {
  mmdata.deleteOne(id);
  repaint();
};

export const expand = (id: string): void => {
  mmdata.expand(id);
  repaint();
};

export const collapse = (id: string): void => {
  mmdata.collapse(id);
  repaint();
};

export const addSibling = (id: string, name: string, before = false): IsMdata => {
  const d = mmdata.addSibling(id, name, before);
  repaint();
  return d;
};

export const addParent = (id: string, name: string): IsMdata => {
  const d = mmdata.addParent(id, name);
  repaint();
  return d;
};

export const changeLeft = (id: string): void => {
  mmdata.changeLeft(id);
  repaint();
};
