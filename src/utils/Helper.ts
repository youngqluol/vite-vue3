// 范围随机数
export function generateRangeRondom(max: number, min: number): number {
  return Math.round(Math.random() * (max - min)) + min;
}

/**
 *
 * @param infoArr
 * @param codeArr
 * @returns
 */
export function arrMix(infoArr: string[][], codeArr: string[][]): Object[] {
  const finalArr = [];
  const len = infoArr.length;
  let loopTimes = 0;
  while (loopTimes < len) {
    const tempArr = [];
    for (let i = 0; i < infoArr[loopTimes].length; i++) {
      tempArr.push(`${infoArr[loopTimes][i]}/${codeArr[loopTimes][i]}`);
    }
    finalArr.push({
      province: tempArr[0],
      city: tempArr[1],
      area: tempArr[2],
      street: tempArr[3]
    });
    loopTimes++;
  }
  return finalArr;
}

/* 图片加载 */
interface ImageToLoad {
  width: number;
  height: number;
}

export async function loadImage(src: string): Promise<ImageToLoad> {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height
      });
    };
    img.onerror = () => {
      reject('img load error');
    };
    img.src = src;
  });
}

export async function loadImages(
  imgsArr: string[]
): Promise<Array<ImageToLoad>> {
  if (imgsArr.length === 0) return [];
  const imgsInfo = [];
  for (let i = 0; i < imgsArr.length; i++) {
    imgsInfo.push(await loadImage(imgsArr[i]));
  }
  return imgsInfo;
}

/* 节流 防抖 */
export function throttle(fn: Function, delay: number) {
  let timer: any = null;
  return function (...params: any[]) {
    if (timer) return;
    fn(...params);
    timer = setTimeout(() => {
      timer = null;
    }, delay);
  };
}

export function debounce(fn: Function, delay: number) {
  let timer: any = null;
  return function (...params: any[]) {
    if (timer) {
      clearTimeout(timer);
      timer = null;
      return;
    }
    timer = setTimeout(() => {
      fn(...params);
    }, delay);
  };
}
