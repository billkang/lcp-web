import { Ref, onMounted } from 'vue';
import { useSelection, useElementRef } from './useSelection';
import { zoomable, scaleExtent } from '../config';
import * as d3 from '../d3';
import { mmdata } from '../data';

const formatScale = (val: number): number => {
  return +val.toFixed(1);
};

const onZoomMove = (e: d3.D3ZoomEvent<SVGSVGElement, null>): void => {
  const { g } = useSelection();
  if (!g) {
    return;
  }

  scaleValue.value = formatScale(e.transform.k);

  g.attr('transform', e.transform.toString());
};
const zoom = d3.zoom<SVGSVGElement, null>().on('zoom', onZoomMove).scaleExtent(scaleExtent);

export const scaleValue: Ref<number> = ref(1);

export default function useZoom() {
  onMounted(() => {
    const { svg } = useSelection();
    if (!svg) {
      return;
    }
    if (zoomable) {
      zoom(svg);
      svg.on('dblclick.zoom', null);
    } else {
      svg.on('.zoom', null);
    }
  });

  // 居中操作
  const handleCenterView = (): void => {
    const { svg } = useSelection();
    if (!svg) {
      return;
    }
    const data = mmdata.data;
    zoom.translateTo(svg, 0 + data.width / 2, 0 + data.height / 2);
  };

  /**
   * 缩放至合适大小并移动至全部可见
   */
  const handleFitView = (): void => {
    const { svgEle, gEle } = useElementRef();
    const { svg } = useSelection();

    if (!svg || !gEle.value || !svgEle.value) {
      return;
    }

    const gBB = gEle.value.getBBox();
    const svgBCR = svgEle.value.getBoundingClientRect();
    const multiple = formatScale(Math.min(svgBCR.width / gBB.width, svgBCR.height / gBB.height));
    const svgCenter = { x: svgBCR.width / 2, y: svgBCR.height / 2 };
    // after scale
    const gCenter = { x: (gBB.width * multiple) / 2, y: (gBB.height * multiple) / 2 };
    const center = d3.zoomIdentity
      .translate(-gBB.x * multiple + svgCenter.x - gCenter.x, -gBB.y * multiple + svgCenter.y - gCenter.y)
      .scale(multiple);

    scaleValue.value = multiple;

    zoom.transform(svg, center);
  };

  /**
   * 元素被遮挡时，移动视图使其处于可见区域
   * @param ele - 元素
   */
  const handleMoveView = (ele: Element): void => {
    const { svgEle } = useElementRef();
    const { svg } = useSelection();
    // 得到d相对于视图左上角的坐标
    if (svg && svgEle.value) {
      const scale = scaleValue.value;
      const gBCR = ele.getBoundingClientRect();
      const { x, y, width, height } = svgEle.value.getBoundingClientRect();
      const gLeft = gBCR.x - x;
      const gRight = gLeft + gBCR.width;
      const gTop = gBCR.y - y;
      const gBottom = gTop + gBCR.height;
      const space = 2; // 元素与视图的空隙，方便区分
      let x1 = 0;
      let y1 = 0;

      if (gLeft < 0) {
        x1 = -gLeft / scale + space;
      }
      if (gBCR.width > width || gRight > width) {
        x1 = -(gRight - width) / scale - space;
      }

      if (gTop < 0) {
        y1 = -gTop / scale + space;
      }
      if (gBCR.height > height || gBottom > height) {
        y1 = -(gBottom - height) / scale - space;
      }

      zoom.translateBy(svg, x1, y1);
    }
  };

  /**
   * 按一定程度缩放
   * @param flag - 为true时放大，false缩小
   */
  const handleScaleBy = (flag: boolean): void => {
    const { svg } = useSelection();
    if (!svg) {
      return;
    }

    const step = flag ? 1.1 : 0.9;

    const oldVal = scaleValue.value;
    const newVal = formatScale(oldVal * step);

    scaleValue.value = newVal;

    zoom.scaleBy(svg, step);
  };

  /**
   * 将缩放比率调整到指定大小
   * @param val
   * @returns
   */
  const handleScaleTo = (val: number): void => {
    const { svg } = useSelection();
    if (!svg) {
      return;
    }

    val = formatScale(val);

    if (val < scaleExtent[0] || val > scaleExtent[1]) {
      return;
    }

    scaleValue.value = val;

    zoom.scaleTo(svg, val);
  };

  return {
    handleCenterView,
    handleFitView,
    handleMoveView,
    handleScaleBy,
    handleScaleTo,
  };
}
