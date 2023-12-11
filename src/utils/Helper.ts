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
export function arrMix(infoArr: string[][], codeArr: string[][]): Record<any, any>[] {
  const finalArr: any[] = [];
  const len = infoArr.length;
  let loopTimes = 0;
  while (loopTimes < len) {
    const tempArr: string[] = [];
    for (let i = 0; i < infoArr[loopTimes].length; i++) {
      tempArr.push(`${infoArr[loopTimes][i]}/${codeArr[loopTimes][i]}`);
    }
    const [province, city, area, street] = tempArr;
    finalArr.push({ province, city, area, street });
    loopTimes++;
  }
  return finalArr;
}

/* 图片加载 */
interface ImageToLoad {
  width: number
  height: number
}

export async function loadImage(src: string): Promise<ImageToLoad> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height,
      });
    };
    img.onerror = () => {
      reject(new Error('img load error'));
    };
    img.src = src;
  });
}

export async function loadImages(
  imgsArr: string[],
): Promise<Array<ImageToLoad>> {
  if (imgsArr.length === 0)
    return [];
  const imgsInfo: Array<ImageToLoad> = [];
  for (let i = 0; i < imgsArr.length; i++) {
    imgsInfo.push(await loadImage(imgsArr[i]));
  }
  return imgsInfo;
}

/* 节流 防抖 */
export function throttle(fn: (args?: any[]) => void, delay: number) {
  let timer: any = null;
  return function (...params: any[]) {
    if (timer)
      return;
    fn(...params);
    timer = setTimeout(() => {
      timer = null;
    }, delay);
  };
}

export function debounce(fn: (args?: any[]) => void, delay: number) {
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
