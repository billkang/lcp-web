import { Ref, ref, onMounted } from 'vue';
import * as d3 from '../d3';
import style from '../style';

// 页面html元素
const wrapperEle: Ref<HTMLDivElement | undefined> = ref();
const svgEle: Ref<SVGSVGElement | undefined> = ref();
const gEle: Ref<SVGGElement | undefined> = ref();
const asstSvgEle: Ref<SVGSVGElement | undefined> = ref();
const foreignEle: Ref<SVGForeignObjectElement | undefined> = ref();
const foreignDivEle: Ref<HTMLDivElement | undefined> = ref();

// 页面html元素
export function useElementRef() {
  return {
    wrapperEle,
    svgEle,
    gEle,
    asstSvgEle,
    foreignEle,
    foreignDivEle,
  };
}

interface D3Selection {
  svg: d3.Selection<SVGSVGElement, null, null, null> | undefined;
  g: d3.Selection<SVGGElement, null, SVGSVGElement, null> | undefined;
  asstSvg: d3.Selection<SVGSVGElement, unknown, null, undefined> | undefined;
  foreign: d3.Selection<SVGForeignObjectElement, null, null, undefined> | undefined;
}

const $d3: D3Selection = {
  svg: undefined,
  g: undefined,
  asstSvg: undefined,
  foreign: undefined,
};

// d3绑定元素
export default function useInitSelection() {
  const { svgEle, gEle, asstSvgEle, foreignEle } = useElementRef();

  onMounted(() => {
    if (!svgEle.value || !gEle.value || !asstSvgEle.value || !foreignEle.value) return;

    $d3.svg = d3.select(svgEle.value);
    $d3.g = d3.select(gEle.value);
    $d3.asstSvg = d3.select(asstSvgEle.value);
    $d3.foreign = d3.select(foreignEle.value);

    $d3.foreign?.raise();

    // mousedown与drag/zoom绑定的先后顺序会有影响
    $d3.svg?.on('mousedown', () => {
      const oldSele = document.getElementsByClassName(style.selected)[0];
      oldSele?.classList.remove(style.selected);
    });
  });
}

// 获取 d3元素
export function useSelection(): D3Selection {
  return $d3;
}
