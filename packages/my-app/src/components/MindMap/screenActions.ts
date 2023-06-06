import html2canvas from 'html2canvas';
import { repaint, mmdata } from './data';
import useSnapshot from './hooks/useSnapshot';
import { useElementRef } from './hooks/useSelection';

const convertToImg = (svgdiv: HTMLDivElement, name: string): void => {
  html2canvas(svgdiv).then(canvas => {
    const dataUrl = canvas.toDataURL();
    const window = open();
    if (window) {
      window.document.write(`<img src='${dataUrl}'>`);
      window.document.title = name;
      window.document.close();
    }
  });
};

export const handleDownload = (): void => {
  const { wrapperEle } = useElementRef();
  if (!wrapperEle.value) {
    return;
  }
  convertToImg(wrapperEle.value, mmdata.data.name);
};

export const handleNext = (): void => {
  const { next: nextData } = useSnapshot();
  const data = nextData();
  if (data) {
    mmdata.data = data;
    repaint(false);
  }
};

export const handlePrev = (): void => {
  const { prev: prevData } = useSnapshot();
  const data = prevData();
  if (data) {
    mmdata.data = data;
    repaint(false);
  }
};
