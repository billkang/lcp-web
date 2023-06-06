import { fabric } from 'fabric';

interface EditorWorkspaceOption {
  width: number;
  height: number;
}
type ExCanvas = fabric.Canvas & {
  isDragging: boolean;
  lastPosX: number;
  lastPosY: number;
};

class EditorWorkspace {
  canvas: fabric.Canvas;
  workspace: fabric.Rect | null;
  workspaceEle: HTMLElement;
  option: EditorWorkspaceOption;
  constructor(canvas: fabric.Canvas, option: EditorWorkspaceOption) {
    this.canvas = canvas;
    this.workspaceEle = document.querySelector('#Workspace') as HTMLElement;
    this.workspace = null;
    this.option = option;

    this.init();
    this.initDrag();
  }

  // 初始化画布
  init() {
    const { width, height } = this.option;
    const workspace = new fabric.Rect({
      fill: '#e1e1e1',
      width: width * 100,
      height: height * 100,
      id: 'Workspace',
    });
    workspace.set('selectable', false);
    workspace.set('hasControls', false);
    workspace.hoverCursor = 'default';
    this.canvas.add(workspace);
    this.workspace = workspace;
  }

  // 设置大小
  setSize(width: number, height: number) {
    this.option.width = width;
    this.option.height = height;
    this.workspace.set('width', width * 100);
    this.workspace.set('height', height * 100);
    this.workspace.set('left', -width * 50);
    this.workspace.set('top', -height * 50);

    this.canvas.setWidth(width);
    this.canvas.setHeight(height);

    this.canvas.renderAll();
  }

  // 设置颜色
  setColor(color: string) {
    this.workspace.set('fill', color);
    this.canvas.renderAll();
  }

  // 放大
  zoomIn() {
    let ratio = this.canvas.getZoom();
    ratio += 0.05;
    const center = this.canvas.getCenter();
    this.canvas.zoomToPoint(new fabric.Point(center.left, center.top), ratio);
  }

  // 缩小
  zoomOut() {
    let ratio = this.canvas.getZoom();
    ratio -= 0.05;
    const center = this.canvas.getCenter();
    this.canvas.zoomToPoint(new fabric.Point(center.left, center.top), ratio < 0 ? 0.01 : ratio);
  }

  // 拖动画布
  initDrag() {
    const _self = this;
    this.canvas.on('mouse:down', function (this: ExCanvas, opts) {
      const e = opts.e;

      if (e.metaKey) {
        _self.canvas.discardActiveObject();
        _self.setDrag();
        this.selection = false;
        this.isDragging = true;
        this.lastPosX = e.clientX;
        this.lastPosY = e.clientY;
        this.requestRenderAll();
      }
    });

    this.canvas.on('mouse:move', function (this: ExCanvas, opts) {
      if (this.isDragging) {
        _self.canvas.discardActiveObject();
        const { e } = opts;
        if (!this.viewportTransform) return;
        const vp = this.viewportTransform;
        vp[4] += e.clientX - this.lastPosX;
        vp[5] += e.clientY - this.lastPosY;
        this.lastPosX = e.clientX;
        this.lastPosY = e.clientY;
        this.requestRenderAll();
      }
    });

    this.canvas.on('mouse:up', function (this: ExCanvas) {
      if (!this.viewportTransform) {
        return;
      }
      this.isDragging = false;
      this.setViewportTransform(this.viewportTransform);
      this.selection = true;

      this.getObjects().forEach(obj => {
        if (obj.id !== 'Workspace' && obj.hasControls) {
          obj.selectable = true;
        }
      });
      this.requestRenderAll();
    });

    this.canvas.on('mouse:wheel', function (this: fabric.Canvas, opt) {
      opt.e.preventDefault();
      opt.e.stopPropagation();

      const delta = opt.e.deltaY;
      let zoom = this.getZoom();
      zoom *= 0.999 ** delta;
      if (zoom > 10) {
        zoom = 10;
      }
      if (zoom < 0.1) {
        zoom = 0.1;
      }
      const center = this.getCenter();
      this.zoomToPoint(new fabric.Point(center.left, center.top), zoom);
    });
  }

  setDrag() {
    this.canvas.selection = false;
    this.canvas.defaultCursor = 'grab';
    this.canvas.getObjects().forEach(obj => {
      obj.selectable = false;
    });
    this.canvas.renderAll();
    this.canvas.requestRenderAll();
  }
}

export default EditorWorkspace;
