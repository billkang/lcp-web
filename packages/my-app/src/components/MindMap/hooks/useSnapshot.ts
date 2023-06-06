import { Ref, ref } from 'vue';
import { cloneDeep } from 'lodash';
import { Mdata } from '../types';

class Snapshot {
  private length: number;
  private recordList: Mdata[];
  private cursor: number;

  constructor() {
    this.length = 20;
    this.recordList = [];
    this.cursor = -1;
  }

  get hasPrev(): boolean {
    return this.cursor > 0;
  }

  get hasNext(): boolean {
    return this.recordList.length > this.cursor + 1;
  }

  // 记录快照
  record(data: Mdata): void {
    const _data = cloneDeep(data);

    // 去除多余数据
    while (this.cursor < this.recordList.length - 1) {
      this.recordList.pop();
    }
    this.recordList.push(_data);

    // 确保长度限制
    if (this.recordList.length > this.length) {
      this.recordList.shift();
    }
    this.cursor = this.recordList.length - 1;
  }

  prev(): Mdata | null {
    if (this.hasPrev) {
      this.cursor -= 1;
      return cloneDeep(this.recordList[this.cursor]);
    }

    return null;
  }

  next(): Mdata | null {
    if (this.hasNext) {
      this.cursor += 1;
      return cloneDeep(this.recordList[this.cursor]);
    }

    return null;
  }
}

let snapshot: Snapshot;
const hasPrev: Ref<boolean> = ref(false);
const hasNext: Ref<boolean> = ref(false);

export default function useSnapshot() {
  if (!snapshot) {
    snapshot = new Snapshot();
  }

  const updateState = (): void => {
    hasPrev.value = snapshot.hasPrev;
    hasNext.value = snapshot.hasNext;
  };

  const record = (data: Mdata): void => {
    snapshot.record(data);
    updateState();
  };

  const prev = (): Mdata | null => {
    const data = snapshot.prev();
    updateState();
    return data;
  };

  const next = (): Mdata | null => {
    const data = snapshot.next();
    updateState();
    return data;
  };

  return {
    hasPrev,
    hasNext,
    record,
    prev,
    next,
  };
}
