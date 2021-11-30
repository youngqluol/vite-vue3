import { generateRangeRondom } from './Helper';
export interface vetifyOptions {
  target?: string;
  pointNum?: Number;
  width?: number;
  height?: number;
  imgSrc?: string;
  onSuccess?: Function;
  onFail?: Function;
}

class Vetify {
  private DEFAULT_OPTIONS: vetifyOptions = {
    target: '',
    imgSrc: '../assets/logo.png',
    pointNum: 3,
    width: 400,
    height: 300,
    onSuccess: () => {},
    onFail: () => {}
  };

  private options: vetifyOptions = {
    target: '',
    imgSrc: ''
  };

  private dotWords =
    '天地玄黄宇宙洪荒日月盈昃辰宿列张寒来暑往秋收冬藏闰馀成岁律吕调阳'.split(
      ''
    );
  private wordPositons: number[][] = [];
  private clickPositions: number[][] = [];

  private canvas: HTMLCanvasElement = document.createElement('canvas');
  private canvasContext = this.canvas.getContext('2d');
  public static targetDom: HTMLElement | null;
  private static currentDotNum = 0;
  private clickAllowed: boolean = true;
  private resetTimer: any = null;

  constructor(_options: vetifyOptions) {
    this.options = Object.assign(this.DEFAULT_OPTIONS, _options);
    this.init();
  }

  async init() {
    if(this.resetTimer) {
      clearTimeout(this.resetTimer);
      this.resetTimer = null;
    }
    await this.initDom();
    this.createWordDom();
    this.bindEvents();
  }

  private async initDom() {
    const { width, height, target, imgSrc } = this.options;
    Vetify.targetDom = document.querySelector(target || '#vetify-container');
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
      image.crossOrigin = 'Anonymous';
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

  // 随机字
  private createRandomWords() {
    const maxIndex = this.dotWords.length - 1;
    const { pointNum = 0 } = this.options;
    const targetDotWords: Array<string> = [];
    while (targetDotWords.length < pointNum) {
      const word = this.dotWords[Math.ceil(Math.random() * maxIndex)];
      if (targetDotWords.indexOf(word) > -1) continue;
      targetDotWords.push(word);
    }
    return targetDotWords;
  }

  // 随机位置
  private createRandomPosition(): Array<Array<number>> {
    const { width, height, pointNum = 0 } = this.options;
    // 位置是否重合
    function isPositionSame(newOne: Array<number>, old: Array<Array<number>>) {
      let flag = false;
      for (let i = 0; i < old.length; i++) {
        const item = old[i];
        if (
          Math.abs(newOne[0] - item[0]) < 40 &&
          Math.abs(newOne[1] - item[1]) < 40
        ) {
          flag = true;
          break;
        }
      }
      return flag;
    }
    // 宽高范围： 20 - (width(height) - 20)，防止字体出现在图片边缘
    const widthRange = [20, (width as number) - 20];
    const heightRange = [20, (height as number) - 20];
    while (this.wordPositons.length < pointNum) {
      const randomLeft = generateRangeRondom(widthRange[0], widthRange[1]);
      const randomTop = generateRangeRondom(heightRange[0], heightRange[1]);
      if (isPositionSame([randomLeft, randomTop], this.wordPositons)) continue;
      this.wordPositons.push([randomLeft, randomTop]);
    }
    return this.wordPositons;
  }

  private createWordDom() {
    const words = this.createRandomWords();
    this.createRandomPosition();
    console.log(words);
    let domNum = 0;
    while (domNum < words.length) {
      const div = document.createElement('div');
      div.className = 'vetify-click-word';
      div.textContent = words[domNum];
      div.style.left = this.wordPositons[domNum][0] - 40 / 2 + 'px';
      div.style.top = this.wordPositons[domNum][1] - 40 / 2 + 'px';
      Vetify.targetDom && Vetify.targetDom.appendChild(div);
      domNum++;
    }
    const titleDom = document.querySelector('#vetify-title');
    if (titleDom) {
      titleDom.textContent = `请依次点击：${words.join(' ')}`;
    }
  }

  public static createClickPointDom(
    content: string | number,
    x: number,
    y: number
  ) {
    const pointDom: HTMLElement = document.createElement('div');
    pointDom.className = 'vetify-click-point';
    pointDom.textContent = `${content}`;
    // TODO：pointDom支持动态宽高
    pointDom.style.left = x - 20 / 2 + 'px';
    pointDom.style.top = y - 20 / 2 + 'px';
    Vetify.targetDom && Vetify.targetDom.appendChild(pointDom);
    Vetify.currentDotNum++;
  }

  private vetifyClickResult() {
    let vetifyFlag = true;
    console.log(this.wordPositons);
    console.log(this.clickPositions);
    for (let i = 0; i < this.wordPositons.length; i++) {
      // 验证失败：顺序不对 或 误差超过10
      if (
        Math.abs(this.wordPositons[i][0] - this.clickPositions[i][0]) > 10 ||
        Math.abs(this.wordPositons[i][1] - this.clickPositions[i][1]) > 10
      ) {
        vetifyFlag = false;
        break;
      }
    }
    console.log('验证结果:', vetifyFlag);
    return vetifyFlag;
  }

  private onClickImage(e: any) {
    if (!this.clickAllowed) return;
    const { pointNum = 0 } = this.options;
    let { offsetX: x, offsetY: y } = e;
    console.log(x, y);
    // 点击的是圆点
    if (e.target && e.target.className === 'vetify-click-point') {
      return;
    }
    // 点击的是字
    if (e.target && e.target.className === 'vetify-click-word') {
      const { offsetLeft, offsetTop } = e.target;
      x = offsetLeft + x;
      y = offsetTop + y;
    }
    console.log(e);
    this.clickPositions.push([x, y]);
    Vetify.createClickPointDom(Vetify.currentDotNum + 1, x, y);
    if (Vetify.currentDotNum >= pointNum) {
      this.clickAllowed = false;
      let alertText = '';
      let bgColor = ''
      if (this.vetifyClickResult()) {
        alertText = '验证通过';
        bgColor = 'green';
        this.options.onSuccess &&　this.options.onSuccess()
      } else {
        bgColor = 'red';
        alertText = '验证失败';
        this.options.onFail && this.options.onFail();
        // 失败后刷新
        this.resetTimer = setTimeout(() => {
          this.reset();
        }, 1500)
      }
      const alertDom = document.createElement('div');
      alertDom.className = 'vetify-click-alert';
      alertDom.textContent = alertText;
      alertDom.style.width = this.options.width + 'px';
      alertDom.style.backgroundColor = bgColor;
      alertDom.style.left = 0 + 'px';
      Vetify.targetDom && Vetify.targetDom.appendChild(alertDom);
    }
  }

  private bindEvents() {
    if(Vetify.targetDom) {
      Vetify.targetDom.onclick = this.onClickImage.bind(this)
    }
  }

  public removeEvents() {
    if(Vetify.targetDom) {
      Vetify.targetDom.onclick = null;
    }
  }

  // 刷新/重置
  public reset() {
    // 清除字、点、下方提示
    const words = document.getElementsByClassName('vetify-click-word')
    const points = document.getElementsByClassName('vetify-click-point')
    const alert = document.getElementsByClassName('vetify-click-alert')
    function removeDom(dom: any) {
      if(dom) {
        Array.prototype.slice.call(dom).forEach(item => {
          item.remove();
        })
      }
    }
    removeDom(words);
    removeDom(points);
    removeDom(alert);
    // 变量初始化
    this.wordPositons = [];
    this.clickPositions = [];
    Vetify.currentDotNum = 0;
    this.clickAllowed = true;
    // 清除事件绑定
    this.removeEvents();
    // 清空画布
    const { width = 0, height = 0 } = this.options;
    if(this.canvasContext) {
      this.canvasContext.clearRect(0, 0, width, height)
    }
    // 初始化
    this.init();
  }

  // 销毁
  public destroy() {
    this.removeEvents();
  }
}

export default Vetify;
