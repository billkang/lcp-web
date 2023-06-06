import { v4 as uuid } from 'uuid';

declare type TItem = {
  img: string;
  title: string;
};

class Editor {
  canvas: fabric.Canvas;
  itemList: [];
  constructor(canvas: fabric.Canvas) {
    this.canvas = canvas;
    this.itemList = [];
  }

  // 添加新数据
  addItem(item: TItem) {
    const id = uuid();
    this.itemList.push({ ...{ id }, ...item });
    this.addItemImg(item.img, id);
    this.addItemTitle(item.title, id);
  }

  // 重新设置文字位置
  setTxtPosition(imgObj) {
    const textObj = this.canvas.getObjects().find(item => item.id === imgObj.id + '_txt');

    textObj.set({
      left: imgObj.left,
      top: imgObj.top - 25,
    });
  }

  addItemImg(imgSrc, id) {
    const img = new fabric.Image();
    img['index'] = this.itemList.length;
    img['id'] = id;
    img.setSrc(imgSrc, imgData => {
      imgData['padding'] = 0;
      imgData
        .set({
          left: 350 * imgData.index,
          top: 100,
          lockScalingX: true, // 禁止水平放大/缩小
          lockScalingY: true, // 禁止垂直放大/缩小
          cornerSize: 0,
          hasControl: false,
          hasRotatingPoint: false, // 隐藏旋转控件
          strokeWidth: 5,
          borderColor: '#0072f7',
          stroke: '#0072f7',
        })
        .scale(300 / imgData.width);

      img.controls.mtr.offsetY = 0;

      this.canvas.add(imgData);

      imgData.on('moving', () => {
        this.setTxtPosition(imgData);
      });
      // imgData.on('scaling', () => console.log('scaling'));
    });
  }
  addItemTitle(txt, id) {
    const text = new fabric.Text(txt, {
      fontSize: 18,
    });
    text['id'] = id + '_txt';
    text.set({
      left: 350 * this.itemList.length,
      top: 75,
    });

    this.canvas.add(text);
  }
}
export default Editor;
