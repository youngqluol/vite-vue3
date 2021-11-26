interface vetifyOptions {
  target: string;
  pointNum?: Number;
  width?: Number;
  height?: Number;
  imgSrc: string;
  onSuccess?: Function;
  onFail?: Function;
}

class Vetify {
  private DEFAULT_OPTIONS = {
    pointNum: 3,
    width: 400,
    height: 300
  };

  private options: vetifyOptions = {
    target: '',
    imgSrc: ''
  };

  private canvas: HTMLCanvasElement = document.createElement('canvas');
  private canvasContext = this.canvas.getContext('2d');
  public static targetDom: any;
  private static currentDotNum = 0;

  constructor(_options: vetifyOptions) {
    this.options = Object.assign(this.DEFAULT_OPTIONS, _options);
    this.init();
  }

  async init() {
    await this.initDom()
    this.bindEvents()
  }

  private async initDom() {
    const { width, height, target, imgSrc } = this.options;
    if (!target) {
      console.error('missing targetId');
      return;
    }
    Vetify.targetDom = document.querySelector(target);
    if (!Vetify.targetDom) {
      console.error('target not found');
      return;
    }
    Vetify.targetDom.style.position = 'relative';
    Vetify.targetDom.style.width = width + 'px';
    Vetify.targetDom.style.height = height + 'px';
    this.canvas.style.position = 'absolute';
    this.canvas.style.left = 0 + 'px';
    this.canvas.style.top = 0 + 'px';
    this.canvas.style.width = width + 'px';
    this.canvas.style.height = height + 'px';
    if (!imgSrc) {
      console.error('missing imgSrc');
      return;
    }
    const drawFlag = await this.drawImage(imgSrc);
    drawFlag && Vetify.targetDom.appendChild(this.canvas);
  }

  private async drawImage(imgSrc: string): Promise<boolean> {
    return new Promise(resolve => {
      const image = new Image();
      image.crossOrigin = 'Anonymous'
      image.src = imgSrc;
      image.onload = () => {
        this.canvasContext && this.canvasContext.drawImage(image, 0, 0);
        resolve(true);
      };
      image.onerror = () => {
        resolve(false);
      };
    });
  }

  // 创建随机字分布
  private createWords() {

  }

  public static createClickPointDom(content: string | number, x: number, y: number) {
    const pointDom: HTMLElement = document.createElement('div')
    pointDom.className = 'vetify-click-point';
    pointDom.textContent = `${content}`;
    // TODO：pointDom支持动态宽高
    pointDom.style.left = (x - 20/2) + 'px';
    pointDom.style.top = (y - 20/2) + 'px';
    Vetify.targetDom.appendChild(pointDom);
    Vetify.currentDotNum++;
  }

  private onClickImage(e: any) {
    const { pointNum = 0 } = this.options;
    if(Vetify.currentDotNum >= pointNum) {
      // TODO：校验结果
      return;
    }
    const { offsetX, offsetY } = e;
    Vetify.createClickPointDom(Vetify.currentDotNum + 1, offsetX, offsetY);
  }

  private bindEvents() {
    this.canvas && this.canvas.addEventListener('click', this.onClickImage.bind(this))
  }

  // public removeEvents() {
  //   this.canvas = null;
  // }
}

export default Vetify;
