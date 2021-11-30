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
