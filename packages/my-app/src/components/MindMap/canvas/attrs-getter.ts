import type { TspanData, Mdata } from '../types';
import { getMultiline } from '../utils';

/**
 * 获取一个加号图形的path路径，图形的中心坐标为（0，0）
 * @param stroke - 线条的粗细
 * @param side - 图形的边长
 */
export const getAddPath = (stroke: number, side: number): string => {
  const temp0 = -side / 2;
  const temp1 = -stroke / 2;
  const temp2 = stroke / 2;
  const temp3 = side / 2;
  return `M${temp3},${temp2}H${temp2}V${temp3}H${temp1}V${temp2}H${temp0}V${temp1}H${temp1}V${temp0}H${temp2}V${temp1}H${temp3}V${temp2}Z`;
};

export const getTspanData = (d: Mdata): TspanData[] => {
  const multiline = getMultiline(d.name);
  const height = d.height / multiline.length;
  return multiline.map(name => ({ name, height }));
};
